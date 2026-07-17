package jsonx_test

import (
	"math"
	"strconv"
	"testing"

	"github.com/cplieger/jsonx"
)

// reporter is the failure-reporting surface shared by *testing.T and
// *rapid.T, so the invariant helpers below serve both the fuzz targets
// and the rapid properties.
type reporter interface {
	Helper()
	Errorf(format string, args ...any)
}

// seedCorpus is the union of wire shapes the three origin decoders see,
// plus the adversarial forms the hardening targets. Shared by the fuzz
// seeds and the rapid input generator.
var seedCorpus = []string{
	`14`, `"14"`, `0`, `-0`, `-3`, `"-3"`, `null`, `""`, ``, ` `,
	`"abc"`, `"unknown"`, `1.5`, `"1.5"`, `9.0`, `"9.0"`, `1e3`, `"1e3"`,
	`50e-1`, `{}`, `[1]`, `true`, `"unterminated`, `"\q"`, `"\u0035"`,
	`2147483647`, `2147483648`, `"2147483648"`, `9223372036854775807`,
	`-9223372036854775808`, `9223372036854775808`, `" 12 "`, `"007"`,
	`"+5"`, `"0x1p2"`, `"NaN"`, `"Inf"`, `"1_000"`, `"5."`, `".5"`,
	`"1e-999"`, `"1e999"`, `007`, `+5`, `5 x`, `!!!`,
}

// checkFactsConsistency asserts the internal coherence of a
// classification, for any input.
func checkFactsConsistency(t reporter, data []byte, f jsonx.Facts) {
	t.Helper()
	numeric := f.Shape == jsonx.Number || f.Shape == jsonx.NumericString
	if !numeric && (f.Value != 0 || f.FloatForm || f.Fractional || f.Overflow || f.Negative) {
		t.Errorf("Classify(%q): non-numeric shape %d carries numeric facts: %+v", data, f.Shape, f)
	}
	if f.Fractional && !f.FloatForm {
		t.Errorf("Classify(%q): Fractional without FloatForm: %+v", data, f)
	}
	if f.Padded && f.Shape != jsonx.NumericString && f.Shape != jsonx.NonNumericString {
		t.Errorf("Classify(%q): Padded on shape %d: %+v", data, f.Shape, f)
	}
	if (f.Overflow || f.Fractional) && f.Value != 0 {
		t.Errorf("Classify(%q): value set despite overflow/fractional: %+v", data, f)
	}
	if numeric && !f.Overflow && !f.Fractional && f.Negative != (f.Value < 0) {
		t.Errorf("Classify(%q): Negative=%v inconsistent with Value=%d", data, f.Negative, f.Value)
	}
}

// checkCrossPolicyInvariants asserts the relationships between the three
// shipped policies, for any input:
//
//  1. TolerantZero errors only on a malformed string, and its result
//     always stays inside [0, math.MaxInt32].
//  2. StrictAbsentZero agrees with Strict on every input Strict accepts,
//     and accepts beyond Strict only zero-length input.
//  3. Strict and TolerantZero never disagree about a nonzero value: an
//     input both accept as nonzero yields the same integer (no
//     truncation or re-interpretation divergence), and any nonzero
//     Strict-accepted value within tolerant range is accepted
//     identically by TolerantZero.
func checkCrossPolicyInvariants(t reporter, data []byte) {
	t.Helper()
	facts := jsonx.Classify(data)
	checkFactsConsistency(t, data, facts)

	tv, terr := jsonx.ParseInt64(data, jsonx.TolerantZero())
	sv, serr := jsonx.ParseInt64(data, jsonx.Strict())
	av, aerr := jsonx.ParseInt64(data, jsonx.StrictAbsentZero())

	// (1) Tolerant-zero soundness.
	if terr != nil && facts.Shape != jsonx.MalformedString {
		t.Errorf("TolerantZero(%q) errored on non-malformed input: %v", data, terr)
	}
	if terr == nil && (tv < 0 || tv > math.MaxInt32) {
		t.Errorf("TolerantZero(%q) = %d, outside [0, MaxInt32]", data, tv)
	}

	// (2) StrictAbsentZero is Strict plus empty-input tolerance.
	if serr == nil && (aerr != nil || av != sv) {
		t.Errorf("StrictAbsentZero(%q) = %d, %v diverges from Strict = %d", data, av, aerr, sv)
	}
	if aerr == nil && serr != nil && facts.Shape != jsonx.Empty {
		t.Errorf("StrictAbsentZero(%q) accepted beyond Strict on non-empty input", data)
	}

	// (3) Strict/tolerant agreement on nonzero values.
	if serr == nil && terr == nil && sv != 0 && tv != 0 && sv != tv {
		t.Errorf("policies disagree on %q: strict %d vs tolerant %d", data, sv, tv)
	}
	if serr == nil && sv > 0 && sv <= math.MaxInt32 && (terr != nil || tv != sv) {
		t.Errorf("TolerantZero(%q) = %d, %v, want %d (a strict-accepted in-range value)", data, tv, terr, sv)
	}
}

// checkFormsEquivalence asserts the metamorphic dual-shape invariant for
// one integer under every shipped policy: the canonical bare-number form
// and its quoted form decode identically (same value, same error-ness).
// This generalizes seadex-scout's FuzzParseFribb_numericIDFormsEquivalent
// and plex-language-sync's FuzzFlexIntUnmarshal invariants.
func checkFormsEquivalence(t reporter, n int64) {
	t.Helper()
	bare := strconv.FormatInt(n, 10)
	quoted := `"` + bare + `"`
	for name, p := range map[string]jsonx.Policy{
		"TolerantZero":     jsonx.TolerantZero(),
		"Strict":           jsonx.Strict(),
		"StrictAbsentZero": jsonx.StrictAbsentZero(),
	} {
		bv, berr := jsonx.ParseInt64([]byte(bare), p)
		qv, qerr := jsonx.ParseInt64([]byte(quoted), p)
		if bv != qv || (berr == nil) != (qerr == nil) {
			t.Errorf("%s: forms diverge for %d: bare (%d, %v) vs quoted (%d, %v)",
				name, n, bv, berr, qv, qerr)
		}
	}
}

// FuzzParseInt64CrossPolicy drives Classify and all three shipped
// policies with arbitrary bytes, asserting facts coherence and the
// cross-policy invariants documented on checkCrossPolicyInvariants.
func FuzzParseInt64CrossPolicy(f *testing.F) {
	for _, s := range seedCorpus {
		f.Add([]byte(s))
	}
	f.Fuzz(func(t *testing.T, data []byte) {
		checkCrossPolicyInvariants(t, data)
	})
}

// FuzzNumericFormsEquivalent pins the number-vs-string metamorphic
// equivalence for every int64 under every shipped policy.
func FuzzNumericFormsEquivalent(f *testing.F) {
	for _, n := range []int64{0, 1, -1, 9, 2147483647, 2147483648, -2147483648, math.MaxInt64, math.MinInt64} {
		f.Add(n)
	}
	f.Fuzz(func(t *testing.T, n int64) {
		checkFormsEquivalence(t, n)
	})
}
