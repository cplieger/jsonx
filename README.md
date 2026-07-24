# jsonx

[![Go Reference](https://pkg.go.dev/badge/github.com/cplieger/jsonx.svg)](https://pkg.go.dev/github.com/cplieger/jsonx)
[![Go version](https://img.shields.io/github/go-mod/go-version/cplieger/jsonx)](https://github.com/cplieger/jsonx/blob/main/go.mod)
[![Test coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/cplieger/jsonx/badges/coverage.json)](https://github.com/cplieger/jsonx/actions/workflows/coverage.yml)
[![Mutation](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/cplieger/jsonx/badges/mutation.json)](https://github.com/cplieger/jsonx/issues?q=label%3Agremlins-tracker)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/13649/badge)](https://www.bestpractices.dev/projects/13649)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/cplieger/jsonx/badge)](https://scorecard.dev/viewer/?uri=github.com/cplieger/jsonx)

> Defensive decoding of untrusted upstream JSON: number-or-string integer fields under an explicit, pluggable tolerance policy, plus bounded token-level decoding with `json.Unmarshal` parity (`jsonx/bounded`)

A standalone Go library for the JSON shape variance every scraper-adjacent app eventually meets: the same numeric field arrives as `14` on one endpoint and `"14"` on another, and odd rows carry `null`, `""`, `"unknown"`, floats, negatives, or absurdly large values. jsonx decodes all of them under one hardened core:

- **One syntactic core.** `Classify` extracts a value's facts (shape, was-string, float form, fractional, negative, overflow, padding) without judging them. It is total: any bytes yield a classification, never a panic.
- **Pluggable policy.** A `Policy` decides per fact: accept the parsed value, tolerate the oddity as zero, or reject it with a typed `*ParseError`. Three ready-made policies cover the common stances; custom variants are plain struct copies with a field changed.
- **Integrity guards in every policy.** Fractional values are never truncated (9.9 truncated to 9 would silently point at a different entity), large integers never round-trip through float64, and the accepted range is an explicit part of every policy.

Standard library only (test dependency: pgregory.net/rapid).

## Install

```sh
go get github.com/cplieger/jsonx@latest
```

## Usage

### Ready-made field types

```go
type fribbRecord struct {
    AniListID jsonx.TolerantInt `json:"anilist_id"` // odd shapes become 0
    TvdbID    jsonx.TolerantInt `json:"tvdb_id"`
}

type hdbItem struct {
    ID jsonx.StrictInt `json:"id"` // odd shapes are errors
}
```

### Functional core

```go
v, err := jsonx.ParseInt64(data, jsonx.Strict())       // strict: error on anything odd
t, _ := jsonx.ParseInt64(data, jsonx.TolerantZero())   // tolerant: odd values become 0
```

### Composing a policy

Policies are plain values; copy a shipped one and adjust:

```go
// A strict id decoder: null is an error, ids must be positive.
p := jsonx.Strict()
p.Null = jsonx.Reject
p.EmptyString = jsonx.Reject
p.MinValue = 1

// A tolerant decoder with a wider bound than the default MaxInt32.
t := jsonx.TolerantZero()
t.MaxValue = math.MaxInt64
```

### Inspecting facts directly

```go
f := jsonx.Classify(data)
// f.Shape, f.Value, f.WasString(), f.FloatForm, f.Fractional,
// f.Negative, f.Overflow, f.Padded
```

### Bounded token decoding (`jsonx/bounded`)

The `jsonx/bounded` subpackage is a token-level decoder toolkit for schema decoders that must bound decode amplification. `json.Unmarshal` materializes the entire value before any caller-side count check can run, so compact serialized elements amplify a wire-capped body into structs and slice backing far beyond the byte cap. A `bounded.Decoder` walks the token stream and rejects hostile cardinality BEFORE each element is allocated: a per-array cap (`ErrArrayCap`) and an aggregate element budget (`ErrElementBudget`), both matched with `errors.Is`.

The building blocks reproduce `encoding/json`'s observable semantics exactly, so a schema decoder built from them is a drop-in for `json.Unmarshal` on well-formed input:

- Null-into-object is a no-op; null-into-array yields nil.
- Duplicate object keys merge field-wise; duplicate arrays re-expose retained backing, truncate, and replace-on-empty (`Array`'s `prior` argument owns that lifecycle).
- Unknown fields are token-skipped without materializing; scalars decode via `json.Decoder.Decode`.
- Dispatch keys with `strings.EqualFold` for Unmarshal's case-insensitive field matching.
- The underlying decoder runs with `UseNumber`, so skipping an unknown field never rejects extreme-but-valid numbers (`1e1000`) through float64 conversion.

```go
d := bounded.NewDecoder(bytes.NewReader(body), maxPageElements)
var page pbList
err := d.Object(func(k string) error {
	switch {
	case strings.EqualFold(k, "items"):
		var err error
		page.Items, err = bounded.Array(d, page.Items, perPage, "page items",
			func(e *pbEntry) error { return decodeEntry(d, e) })
		return err
	case strings.EqualFold(k, "totalItems"):
		return d.Decode(&page.TotalItems)
	default:
		return d.Skip()
	}
})
if err == nil {
	err = d.End() // reject trailing data, matching json.Unmarshal strictness
}
```

The schema decode functions stay app code; the toolkit owns only the walk scaffold. The walk is never looser than `json.Unmarshal`.

## API

One line per concern; symbol depth lives in the [Go Reference](https://pkg.go.dev/github.com/cplieger/jsonx).

- **Policies:** `Policy`, `Disposition` (`Reject`/`Zero`/`Accept`), and the presets `TolerantZero()`, `Strict()`, `StrictAbsentZero()`. A policy is a plain struct value deciding each fact's outcome; the zero value rejects everything except the literal 0.
- **Parsing:** `Classify(data) Facts` (total syntactic fact extraction, never panics), `ParseInt64(data, policy)`, the field types `TolerantInt` / `StrictInt` / `StrictAbsentZeroInt` (`json.Unmarshaler`, one per preset), and the typed rejection `*ParseError` carrying a `Reason` constant per gate.
- **`jsonx/bounded`:** `NewDecoder(r, elementBudget)`, `Object`, generic `Array[T]`, token primitives `Open`/`Close`/`Key`/`Skip`/`Decode`/`More`, `End` (trailing-data strictness), `Elements` (carry one budget across paginated bodies), sentinels `ErrElementBudget`/`ErrArrayCap`. Token-level decoding that rejects hostile cardinality before each element is allocated.

## The three policies

| Policy | Semantics |
| --- | --- |
| `TolerantZero()` | Every odd shape or invalid value decodes to 0: an upstream placeholder must neither fail the record nor masquerade as a valid id. Integral float forms accepted (`"9.0"` → 9, `"1e3"` → 1000), fractional zeroed (never truncated), range pinned to [0, MaxInt32]. Only a malformed JSON string errors. |
| `Strict()` | Bare or quoted decimal integer anywhere in int64; `null` and `""` tolerated as 0; everything else is an error: float forms, padded strings, non-numeric strings, other shapes, overflow, empty input. |
| `StrictAbsentZero()` | `Strict()`, plus zero-length input tolerated as 0 (an absent field decodes as zero instead of erroring). Identical in every other field. |

Behavior matrix (`v, err` per input):

| Input | `TolerantZero` | `Strict` | `StrictAbsentZero` |
| --- | --- | --- | --- |
| `14` / `"14"` | 14 | 14 | 14 |
| `-3` / `"-3"` | 0 | -3 | -3 |
| `null` / `""` | 0 | 0 | 0 |
| zero-length input | 0 | error | 0 |
| `"abc"`, `"unknown"` | 0 | error | error |
| `9.0`, `"9.0"`, `1e3` | 9 / 1000 | error | error |
| `1.5`, `"1.5"` | 0 (never truncated) | error | error |
| `" 12 "` | 12 | error | error |
| `"007"`, `"+5"` | 7 / 5 | 7 / 5 | 7 / 5 |
| `2147483648` | 0 (> MaxInt32) | 2147483648 | 2147483648 |
| `9223372036854775808` | 0 | error | error |
| `{}`, `[1]`, `true`, garbage | 0 | error | error |
| `"unterminated` | error | error | error |

Other stances compose the same way: a fully lenient decoder (any error → 0) is the all-`Zero` policy over the full int64 range.

## Facts and gate order

`Classify` produces `Facts`; `ParseInt64` applies the policy's gates in a fixed order:

1. Non-numeric shapes dispatch on `Shape`: `Empty`, `Null`, `EmptyString`, `MalformedString`, `NonNumericString`, `Other` → the matching `Disposition` (`Zero` or `Reject`).
2. Numeric values then pass `PaddedString` → `FloatForm` → `Fractional` → range (`MinValue`/`MaxValue`, including int64 overflow → `OutOfRange`).

`Disposition` is fail-closed: its zero value is `Reject`, and `Accept` is meaningful only where a usable integer exists (`PaddedString`, `FloatForm`); on any other gate it is treated as `Reject`, never as silent acceptance. There is deliberately no truncation path: `Fractional` can only zero or reject. A zero-value `Policy` rejects everything except the literal 0.

Rejections are typed: match with `errors.As` against `*jsonx.ParseError`, which carries the `Reason` (which gate fired), the full `Facts`, and a bounded snippet of the offending bytes.

## Accepted number grammar

jsonx accepts only decimal number forms, a deliberately tighter grammar than raw `strconv` parsing:

- Quoted hex floats (`"0x1p2"`), `"Inf"`/`"NaN"` words, and digit-separator underscores (`"1_000"`) classify as non-numeric strings, even though `strconv.ParseFloat` would accept them.
- Only ASCII JSON whitespace counts as padding; a Unicode-space-padded token stays garbage.
- Integer literals parse via `strconv.ParseInt` across the whole int64 range, never through float64, whose rounding corrupts ids above 2^53.
- Float-form literals (`"9.0"`, `1e3`) never pass through float64 either: integrality, range, and the exact value are decided from the decimal digits. `9007199254740993.0` (2^53+1, the first integer binary64 cannot represent) decodes exactly instead of rounding to 2^53. A full underflow (`1e-999`) classifies as fractional, not as an integral zero. The int64 boundary is exact: `"9223372036854775807.0"` is MaxInt64; one more overflows. Adversarially long exponents saturate, so classification work stays bounded by input length.

Quoted-number reality is still honored: leading zeros (`"007"`) and a leading `+` (`"+5"`) parse in string form, while bare tokens must be exact JSON number grammar.

## Unsupported by Design

| Feature | Rationale |
| --- | --- |
| Truncating fractional values | Silent data corruption: 9.9 truncated to 9 points at a different entity. `Fractional` has no `Accept`. |
| Float-valued fields | This library targets integer ids/counts. Decode real floats with `float64` or `json.Number`. |
| Wire-form round-tripping | Field types marshal as plain numbers via their underlying int64; the original number-vs-string form is not preserved. |
| Tolerant string/array/object decoding | This library targets the number-or-string integer case; tolerant decoding of other shapes stays application code. |
| `json.Number` replacement | Different concept: `json.Number` defers parsing to every reader; jsonx parses once under an explicit policy. |

## Disclaimer

This project is built with care and follows security best practices, but it is intended for personal / self-hosted use. No guarantees of fitness for production environments. Use at your own risk.

This project was built with AI-assisted tooling using [Claude](https://claude.com), [GPT](https://openai.com), and [Kiro](https://kiro.dev). The human maintainer defines architecture, supervises implementation, and makes all final decisions.

## License

GPL-3.0. See [LICENSE](LICENSE).
