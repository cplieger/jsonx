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
//     arrays (Array), matching Unmarshal's null handling;
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
package bounded

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"
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
)

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
// the slice (nil, no retained backing a later occurrence could re-expose).
// A JSON null in place of the array yields nil without error, matching
// Unmarshal's null-into-slice. Pass maxElems <= 0 for no per-array cap
// (the aggregate budget still applies).
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
// slice (stdlib MakeSlice(0,0) — no retained backing a later duplicate
// occurrence could re-expose), a non-empty one truncates in place (stdlib
// SetLen). Returning nil for the empty case stays inside the documented
// nil-vs-empty divergence callers cannot observe through element access.
func truncateArray[T any](s []T, n int) []T {
	if n == 0 {
		return nil
	}
	return s[:n]
}
