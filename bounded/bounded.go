// Package bounded provides token-level bounded decoding of untrusted
// upstream JSON with json.Unmarshal-parity semantics.
//
// json.Unmarshal materializes the entire decoded value before any
// caller-side count check can run, so compact serialized elements ("[0,0,0,"
// repeated) amplify a wire-capped body into decoded structs and slice
// backing arrays far beyond the byte cap. A Decoder instead walks the token
// stream and lets the caller enforce every cardinality cap BEFORE an element
// is decoded — a per-array cap and an aggregate element budget both reject
// hostile cardinality before allocation scales with it.
//
// The building blocks reproduce encoding/json's observable semantics
// exactly, so a schema decoder built from them is a drop-in for
// json.Unmarshal on well-formed input:
//
//   - a JSON null where a container is expected is a no-op for objects
//     (Object leaves the target untouched) and sets the slice nil for
//     arrays (Array), matching Unmarshal's null handling; an empty array
//     allocates an empty non-nil slice, also matching Unmarshal;
//   - duplicate object keys merge field-wise (decode into the existing
//     value), and duplicate array keys re-expose retained backing within
//     capacity, truncate to the new length, and replace the slice on an
//     empty re-occurrence — Array owns that lifecycle;
//   - unknown fields are token-skipped without materializing (Skip);
//   - scalar values decode via json.Decoder.Decode for stdlib-identical
//     type handling (Decode).
//
// Key dispatch stays caller-side; match keys with strings.EqualFold to
// reproduce json.Unmarshal's case-insensitive field fallback.
//
// The underlying json.Decoder runs with UseNumber, so skipping an unknown
// field never converts its numbers through float64 (which would reject
// syntactically valid values like 1e1000 that json.Unmarshal's field
// skipping accepts). Decoding into typed int/string/bool fields is
// unaffected; a caller decoding into an untyped any receives json.Number.
//
// Preflight is the other half of the same concern: where the Decoder bounds
// what a schema decode ALLOCATES, Preflight is a standalone pass that rejects
// a body whose STRUCTURE is ambiguous or unbounded before any decode runs — a
// repeated object key (which json.Unmarshal resolves to the last occurrence,
// destroying the evidence that it happened) and nesting past MaxDepth (which
// json.Decoder.Token does not bound on its own). It is the fail-closed
// counterpart to Object and Array, which deliberately REPRODUCE Unmarshal's
// duplicate-key merge: a schema decoder must match the stdlib, while a caller
// that cannot tolerate the ambiguity rejects the body outright.
package bounded

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
	"strings"
	"unicode"
	"unicode/utf8"
)

// Sentinel errors, matched with errors.Is through the wrapped errors the
// budget and cap checks return.
var (
	// ErrElementBudget reports that the Decoder's aggregate element budget
	// was exhausted: the total number of array elements decoded (across
	// every Array call on this Decoder) exceeded the budget given to
	// NewDecoder.
	ErrElementBudget = errors.New("jsonx/bounded: element budget exceeded")
	// ErrArrayCap reports that one array exceeded its per-Array cardinality
	// cap. The wrapping error names the array via Array's what argument.
	ErrArrayCap = errors.New("jsonx/bounded: array cardinality cap exceeded")
	// ErrDuplicateKey reports that Preflight found an object repeating a key
	// (matched case-insensitively). The wrapping error carries a bounded,
	// quoted snippet of the offending key.
	ErrDuplicateKey = errors.New("jsonx/bounded: duplicate object key")
	// ErrMaxDepth reports that Preflight found more than MaxDepth nested
	// containers open at once.
	ErrMaxDepth = errors.New("jsonx/bounded: maximum nesting depth exceeded")
)

// MaxDepth is the nesting ceiling Preflight enforces: at most MaxDepth
// containers open at once. It mirrors encoding/json's own scanner limit, so a
// body Preflight rejects for depth is one the decode step would have rejected
// anyway - only rejected before a token walk has built the stack to find out.
// The explicit ceiling is necessary because json.Decoder.Token does NOT apply
// that limit itself: a token walk over a 1 MiB body of '[' otherwise recurses
// once per byte (~1M frames, measured at 206 MB RSS inside a 256 MiB
// container).
const MaxDepth = 10000

// maxKeySnippet bounds the untrusted key text a duplicate-key error renders,
// so an oversized upstream key cannot balloon an error string or a log line.
// The key is rendered with %q, which escapes controls and newlines, so the
// message stays single-line and safe to log as-is; a caller with a stricter
// text policy applies it to its own wrapping message.
const maxKeySnippet = 64

// Decoder walks one JSON value as a token stream, charging every decoded
// array element against an aggregate budget. It is not safe for concurrent
// use.
type Decoder struct {
	dec      *json.Decoder
	limit    int
	elements int
}

// NewDecoder returns a Decoder reading from r with the given aggregate
// element budget. Every array element decoded through Array is charged
// against the budget, whichever array it belongs to, so deeply nested or
// repeated arrays cannot multiply a per-array cap. elementBudget <= 0 means
// no aggregate budget (per-array caps still apply).
func NewDecoder(r io.Reader, elementBudget int) *Decoder {
	dec := json.NewDecoder(r)
	dec.UseNumber()
	return &Decoder{dec: dec, limit: elementBudget}
}

// Elements reports how many array elements have been charged against the
// budget so far, so a caller paginating across multiple bodies can carry
// one budget across Decoders.
func (d *Decoder) Elements() int { return d.elements }

// More reports whether the current array or object has another element,
// delegating to json.Decoder.More.
func (d *Decoder) More() bool { return d.dec.More() }

// Decode decodes the next value via json.Decoder.Decode, giving
// stdlib-identical handling for scalar and leaf values.
func (d *Decoder) Decode(v any) error { return d.dec.Decode(v) }

// count charges one decoded array element against the aggregate budget.
func (d *Decoder) count() error {
	d.elements++
	if d.limit > 0 && d.elements > d.limit {
		return fmt.Errorf("%w: %d", ErrElementBudget, d.limit)
	}
	return nil
}

// Open consumes the opening delimiter of a container. It reports ok=false
// (without error) for a JSON null, so the caller can implement Unmarshal's
// null-into-value semantics, and errors on any other token.
func (d *Decoder) Open(delim json.Delim) (ok bool, err error) {
	t, err := d.dec.Token()
	if err != nil {
		return false, err
	}
	if t == nil {
		return false, nil
	}
	if got, isDelim := t.(json.Delim); !isDelim || got != delim {
		return false, fmt.Errorf("expected %q, got %v", delim, t)
	}
	return true, nil
}

// Close consumes a container's closing delimiter (the token json.Decoder
// guarantees once More reports false).
func (d *Decoder) Close() error {
	_, err := d.dec.Token()
	return err
}

// Key reads the next object key.
func (d *Decoder) Key() (string, error) {
	t, err := d.dec.Token()
	if err != nil {
		return "", err
	}
	s, isString := t.(string)
	if !isString {
		return "", fmt.Errorf("expected object key, got %v", t)
	}
	return s, nil
}

// Skip consumes and discards one whole value (scalar or container) without
// materializing it — json.Unmarshal's unknown-field handling without the
// allocation.
func (d *Decoder) Skip() error {
	depth := 0
	for {
		t, err := d.dec.Token()
		if err != nil {
			return err
		}
		if delim, isDelim := t.(json.Delim); isDelim {
			switch delim {
			case '{', '[':
				depth++
			case '}', ']':
				depth--
			}
		}
		if depth == 0 {
			return nil
		}
	}
}

// Object decodes one JSON object by walking its keys: field is invoked once
// per key and must consume exactly that key's value (Decode a known field,
// Skip an unknown one, or recurse into Object/Array for a container). A
// JSON null in place of the object is a no-op — field is never invoked and
// the caller's target stays untouched — matching json.Unmarshal's
// null-into-struct semantics, which is what makes a duplicate key like
// `"expand": null` unable to wipe an already-decoded value. Dispatch keys
// with strings.EqualFold for Unmarshal's case-insensitive field matching.
func (d *Decoder) Object(field func(key string) error) error {
	ok, err := d.Open('{')
	if err != nil || !ok {
		return err
	}
	for d.dec.More() {
		k, err := d.Key()
		if err != nil {
			return err
		}
		if err := field(k); err != nil {
			return err
		}
	}
	return d.Close()
}

// End verifies the input is exhausted after the top-level value: anything
// but io.EOF — trailing data or a syntax error — is rejected, matching
// json.Unmarshal's whole-input strictness (json.Decoder alone would leave
// trailing garbage unread and unreported).
func (d *Decoder) End() error {
	if _, err := d.dec.Token(); !errors.Is(err, io.EOF) {
		if err != nil {
			return fmt.Errorf("trailing data after top-level value: %w", err)
		}
		return errors.New("trailing data after top-level value")
	}
	return nil
}

// Array decodes one JSON array under the shared bounded lifecycle:
// per-array cap check BEFORE the element is counted (an over-cap array
// errors with ErrArrayCap, named by what), aggregate budget charge BEFORE
// the element is allocated (ErrElementBudget), decode INTO the regrown
// element, and truncation at the decoded length.
//
// prior is the already-decoded value of a previous occurrence of the same
// key, giving json.Unmarshal's duplicate-key slice semantics: elements
// decode into the existing slice (a within-capacity regrow re-exposes the
// retained backing element, so field-wise merge matches stdlib), the result
// truncates to the new array's length, and an empty re-occurrence REPLACES
// the slice (a fresh empty non-nil slice, no retained backing a later
// occurrence could re-expose). A JSON null in place of the array yields nil
// without error, matching Unmarshal's null-into-slice; an empty array `[]`
// yields an empty non-nil slice, matching Unmarshal's empty-array
// allocation. Pass maxElems <= 0 for no per-array cap (the aggregate budget
// still applies).
func Array[T any](d *Decoder, prior []T, maxElems int, what string, decodeElem func(*T) error) ([]T, error) {
	ok, err := d.Open('[')
	if err != nil || !ok {
		return nil, err
	}
	s := prior
	n := 0
	for d.dec.More() {
		if maxElems > 0 && n >= maxElems {
			return nil, fmt.Errorf("%s: %w: %d", what, ErrArrayCap, maxElems)
		}
		if err := d.count(); err != nil {
			return nil, err
		}
		s = growForIndex(s, n)
		if err := decodeElem(&s[n]); err != nil {
			return nil, err
		}
		n++
	}
	return truncateArray(s, n), d.Close()
}

// growForIndex ensures the slice covers index n, matching json.Unmarshal's
// slice-regrow semantics for duplicate keys: within retained capacity the
// existing backing element is re-exposed (stdlib SetLen), beyond capacity a
// zero element is appended (stdlib Grow reallocates; the new tail is zero).
func growForIndex[T any](s []T, n int) []T {
	if n < len(s) {
		return s
	}
	if n < cap(s) {
		return s[:n+1]
	}
	var zero T
	return append(s, zero)
}

// truncateArray finalizes a decoded array at n elements, matching
// json.Unmarshal's end-of-array semantics: an empty array REPLACES the
// slice with a fresh empty non-nil slice (stdlib MakeSlice(0,0) — allocated,
// so `[]` is distinguishable from null's nil, and no retained backing a
// later duplicate occurrence could re-expose), a non-empty one truncates in
// place (stdlib SetLen).
func truncateArray[T any](s []T, n int) []T {
	if n == 0 {
		return []T{}
	}
	return s[:n]
}

// Preflight walks one complete JSON value from r and rejects the two
// structural defects json.Unmarshal silently tolerates. It decodes nothing
// into a caller value.
//
// Duplicate object keys: encoding/json accepts a repeated key and applies the
// LAST occurrence to the struct field, discarding the earlier value unseen. A
// body carrying a real value and then a null for the same key therefore
// decodes as the null, and no schema decoder downstream can tell that
// happened - the evidence is gone before it is reachable. Matching is
// case-insensitive because encoding/json matches struct FIELDS
// case-insensitively too, so "media" and "Media" address the same field and
// are equally ambiguous. The first repeat fails with ErrDuplicateKey. Note
// this is the opposite fail direction from Object and Array, which reproduce
// Unmarshal's duplicate-key MERGE semantics: a schema decoder must behave
// exactly like the stdlib, while a caller that cannot tolerate the ambiguity
// at all rejects the body before decoding it.
//
// Nesting depth: bounded at MaxDepth (see that constant for why the token
// stream needs its own ceiling). Over-deep input fails with ErrMaxDepth.
//
// It is a PREFLIGHT, not a decode: run it over the whole body, then hand the
// same bytes to json.Unmarshal or a Decoder schema walk. It reads r to
// completion and rejects trailing data after the top-level value (End's
// whole-input strictness), so it never accepts a body the decode step would
// reject. Content policy stays the caller's: Preflight takes no view of which
// keys or values are acceptable, only of whether the structure is unambiguous
// and bounded. Invalid UTF-8 is likewise not its concern - json.Unmarshal
// replaces malformed bytes inside strings with U+FFFD rather than failing, and
// whether that is acceptable depends on what the caller does with the decoded
// text.
func Preflight(r io.Reader) error {
	d := NewDecoder(r, 0)
	if err := d.preflightValue(0); err != nil {
		return err
	}
	return d.End()
}

// preflightValue consumes exactly one JSON value, recursing into objects and
// arrays. A scalar is consumed by the leading Token call; a container is
// closed by the trailing one. Depth is checked BEFORE recursing, so the frame
// count is bounded by MaxDepth by construction.
func (d *Decoder) preflightValue(depth int) error {
	t, err := d.dec.Token()
	if err != nil {
		return err
	}
	delim, isDelim := t.(json.Delim)
	if !isDelim {
		return nil
	}
	if depth >= MaxDepth {
		return fmt.Errorf("%w: %d", ErrMaxDepth, MaxDepth)
	}
	if err := d.preflightContainer(delim, depth); err != nil {
		return err
	}
	return d.Close()
}

// preflightContainer traverses the members of a container whose opening
// delimiter preflightValue has read and whose depth it has validated. The
// closing delimiter stays preflightValue's, so container framing has one
// owner.
func (d *Decoder) preflightContainer(delim json.Delim, depth int) error {
	switch delim {
	case '{':
		return d.preflightObject(depth + 1)
	case '[':
		for d.dec.More() {
			if err := d.preflightValue(depth + 1); err != nil {
				return err
			}
		}
		return nil
	default:
		return fmt.Errorf("unexpected JSON delimiter %q", delim)
	}
}

// preflightObject consumes an object's members after its opening delimiter,
// failing on the first repeated key. Keys are held in a fold-canonicalized
// set, so a key-dense object costs O(keys) rather than the O(keys^2) an
// EqualFold scan over the accumulated keys would.
func (d *Decoder) preflightObject(depth int) error {
	seen := make(map[string]struct{})
	for d.dec.More() {
		key, err := d.Key()
		if err != nil {
			return err
		}
		folded := foldKey(key)
		if _, dup := seen[folded]; dup {
			return fmt.Errorf("%w: %q", ErrDuplicateKey, keySnippet(key))
		}
		seen[folded] = struct{}{}
		if err := d.preflightValue(depth); err != nil {
			return err
		}
	}
	return nil
}

// foldKey canonicalizes each rune to the smallest member of its simple
// case-folding orbit, so map equality on the result is exactly
// strings.EqualFold equality without the per-key linear scan.
func foldKey(key string) string {
	var b strings.Builder
	b.Grow(len(key))
	for _, r := range key {
		c := r
		for f := unicode.SimpleFold(r); f != r; f = unicode.SimpleFold(f) {
			if f < c {
				c = f
			}
		}
		b.WriteRune(c)
	}
	return b.String()
}

// keySnippet truncates an untrusted key to maxKeySnippet bytes on a rune
// boundary, so the error text stays bounded and valid UTF-8.
func keySnippet(key string) string {
	if len(key) <= maxKeySnippet {
		return key
	}
	cut := maxKeySnippet
	for cut > 0 && !utf8.RuneStart(key[cut]) {
		cut--
	}
	return key[:cut]
}
