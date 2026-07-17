# jsonx

[![Go Reference](https://pkg.go.dev/badge/github.com/cplieger/jsonx.svg)](https://pkg.go.dev/github.com/cplieger/jsonx)
[![Go version](https://img.shields.io/github/go-mod/go-version/cplieger/jsonx)](https://github.com/cplieger/jsonx/blob/main/go.mod)
[![Test coverage](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/cplieger/jsonx/badges/coverage.json)](https://github.com/cplieger/jsonx/actions/workflows/coverage.yml)
[![Mutation](https://img.shields.io/endpoint?url=https://raw.githubusercontent.com/cplieger/jsonx/badges/mutation.json)](https://github.com/cplieger/jsonx/issues?q=label%3Agremlins-tracker)
[![OpenSSF Best Practices](https://www.bestpractices.dev/projects/13649/badge)](https://www.bestpractices.dev/projects/13649)
[![OpenSSF Scorecard](https://api.scorecard.dev/projects/github.com/cplieger/jsonx/badge)](https://scorecard.dev/viewer/?uri=github.com/cplieger/jsonx)

> Defensive decoding of untrusted upstream JSON: number-or-string integer fields under an explicit, pluggable tolerance policy

A standalone Go library for the JSON shape variance every scraper-adjacent app eventually meets: the same numeric field arrives as `14` on one endpoint and `"14"` on another, and odd rows carry `null`, `""`, `"unknown"`, floats, negatives, or absurdly large values. Three apps had hand-rolled this decode with three deliberate — and drifting — policies; only one copy (seadex-scout's) carried integrity guards against NaN, fractional truncation, and out-of-range ids. jsonx is the shared, hardened replacement:

- **One syntactic core.** `Classify` extracts a value's facts — shape, was-string, float form, fractional, negative, overflow, padding — without judging them. It is total: any bytes yield a classification, never a panic.
- **Pluggable policy.** A `Policy` decides per fact: accept the parsed value, tolerate the oddity as zero, or reject it with a typed `*ParseError`. Three ready-made policies reproduce the origin decoders exactly; custom variants are plain struct copies with a field changed.
- **Everyone gains the integrity guards.** Fractional values are never truncated (9.9 truncated to 9 would silently point at a different entity), large integers never round-trip through float64, and the accepted range is an explicit part of every policy.

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
v, err := jsonx.ParseInt64(data, jsonx.Strict())      // strict: error on anything odd
v, _   := jsonx.ParseInt64(data, jsonx.TolerantZero()) // tolerant: odd values become 0
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

## The three policies

Each shipped policy reproduces one origin decoder's pinned behavior; the origin apps' test suites are the acceptance spec.

| Policy | Origin | Semantics |
| --- | --- | --- |
| `TolerantZero()` | seadex-scout's Fribb id decoder (`flexInt`) | Every odd shape or invalid value decodes to 0 — an upstream placeholder must neither fail the record nor masquerade as a valid id. Integral float forms accepted (`"9.0"` → 9, `"1e3"` → 1000), fractional zeroed (never truncated), range pinned to [0, MaxInt32]. Only a malformed JSON string errors. |
| `Strict()` | subflux's provider `ParseFlexInt` core | Bare or quoted decimal integer anywhere in int64; `null` and `""` tolerated as 0; everything else — float forms, padded strings, non-numeric strings, other shapes, overflow, empty input — is an error. |
| `StrictAbsentZero()` | plex-language-sync's `FlexInt` | `Strict()`, plus zero-length input tolerated as 0 (the pre-flex `json.Number` absent-field fallback its tests pin). Identical in every other field (drift-guarded by test). |

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

The two per-caller wrappers in subflux compose as pure policies too (pinned by tests): **hdbits** (reject null and non-positive ids) is `Strict()` with `Null`/`EmptyString` rejected and `MinValue: 1`; **subsource** (lenient, any error → 0) is the all-`Zero` policy over the full int64 range.

## Facts and gate order

`Classify` produces `Facts`; `ParseInt64` applies the policy's gates in a fixed order:

1. Non-numeric shapes dispatch on `Shape`: `Empty`, `Null`, `EmptyString`, `MalformedString`, `NonNumericString`, `Other` → the matching `Disposition` (`Zero` or `Reject`).
2. Numeric values then pass `PaddedString` → `FloatForm` → `Fractional` → range (`MinValue`/`MaxValue`, including int64 overflow → `OutOfRange`).

`Disposition` is fail-closed: its zero value is `Reject`, and `Accept` is meaningful only where a usable integer exists (`PaddedString`, `FloatForm`) — on any other gate it is treated as `Reject`, never as silent acceptance. There is deliberately no truncation path: `Fractional` can only zero or reject. A zero-value `Policy` rejects everything except the literal 0.

Rejections are typed: match with `errors.As` against `*jsonx.ParseError`, which carries the `Reason` (which gate fired), the full `Facts`, and a bounded snippet of the offending bytes.

## Hardening deltas vs the hand-rolled originals

The origin decoders leaned on raw `strconv` parsers, whose grammar is looser than any of them intended. jsonx accepts only decimal number forms; the deltas are deliberate and none is pinned by an origin test:

- Quoted hex floats (`"0x1p2"`), `"Inf"`/`"NaN"` words, and digit-separator underscores (`"1_000"`) — accepted by `strconv.ParseFloat`, so silently accepted by the tolerant origin — now classify as non-numeric strings.
- Only ASCII JSON whitespace counts as padding; a Unicode-space-padded token stays garbage.
- Integer literals parse via `strconv.ParseInt` across the whole int64 range — never through float64, whose rounding corrupts ids above 2^53 (the tolerant origin funneled everything through float64; harmless under its MaxInt32 bound, wrong for wider bounds).
- Float-form literals (`"9.0"`, `1e3`) are classified on their decimal digits, never converted through float64 either: integrality, range, and the exact value are decided from significand and exponent. `9007199254740993.0` (2^53+1, the first integer binary64 cannot represent) decodes exactly instead of rounding to 2^53, a full underflow (`1e-999`) classifies as fractional instead of collapsing to an integral zero, and the int64 boundary is exact — `"9223372036854775807.0"` is MaxInt64, one more overflows. Adversarially long exponents saturate, so classification work stays bounded by input length.

Quoted-number reality is still honored: leading zeros (`"007"`) and a leading `+` (`"+5"`) parse in string form (all three origins accepted them via `Atoi`/`ParseFloat`), while bare tokens must be exact JSON grammar — as every origin already required.

## Adoption notes

The origin apps keep their exported type names and pinned error prefixes by swapping method bodies, not types:

- **seadex-scout** — `flexInt.UnmarshalJSON` body becomes reset + `jsonx.ParseInt64(b, jsonx.TolerantZero())`; `setNumber` and the ParseFloat funnel are deleted. The malformed-string error propagation and the duplicate-key reset invariant its tests pin are library behavior (`TolerantInt` pins both).
- **subflux** — `provider.ParseFlexInt` becomes a shim over `jsonx.ParseInt64(data, jsonx.Strict())` (wrap the error to keep the `flexint:` message shape). The hdbits and subsource wrappers keep their provider-specific error text, or migrate to the composed policies above.
- **plex-language-sync** — `FlexInt.UnmarshalJSON` becomes `jsonx.ParseInt64(data, jsonx.StrictAbsentZero())` with errors wrapped under its pinned `flexint:` prefix.

## Unsupported by design

| Feature | Rationale |
| --- | --- |
| Truncating fractional values | Silent data corruption: 9.9 truncated to 9 points at a different entity. The tolerant origin explicitly refused it; `Fractional` has no `Accept`. |
| Float-valued fields | This library targets integer ids/counts. Decode real floats with `float64` or `json.Number`. |
| Wire-form round-tripping | Field types marshal as plain numbers via their underlying int64; the original number-vs-string form is not preserved. |
| Tolerant string/array/object decoding | seadex-scout's `flexString`/`stringList`/`tmdbID` stay app-shaped: only the number-or-string integer is duplicated across apps. Candidates for extraction if a second consumer appears. |
| `json.Number` replacement | Different concept: `json.Number` defers parsing to every reader; jsonx parses once under an explicit policy. |

## Disclaimer

This project is built with care and follows security best practices, but it is intended for personal / self-hosted use. No guarantees of fitness for production environments. Use at your own risk.

This project was built with AI-assisted tooling using [Claude Opus](https://www.anthropic.com/claude) and [Kiro](https://kiro.dev). The human maintainer defines architecture, supervises implementation, and makes all final decisions.

## License

GPL-3.0 — see [LICENSE](LICENSE).
