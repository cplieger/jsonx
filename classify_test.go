package jsonx_test

import (
	"math"
	"testing"

	"github.com/cplieger/jsonx"
)

// TestClassify pins the syntactic core: shape taxonomy, fact flags, and
// exact values across the wire forms the three origin decoders see, plus
// the int64/float64 boundary cases the hardened conversion must get right.
func TestClassify(t *testing.T) {
	t.Parallel()
	tests := []struct {
		name string
		in   string
		want jsonx.Facts
	}{
		// Non-numeric shapes.
		{"empty input", ``, jsonx.Facts{Shape: jsonx.Empty}},
		{"whitespace only", " \t\r\n", jsonx.Facts{Shape: jsonx.Empty}},
		{"null", `null`, jsonx.Facts{Shape: jsonx.Null}},
		{"padded null", ` null `, jsonx.Facts{Shape: jsonx.Null}},
		{"empty string", `""`, jsonx.Facts{Shape: jsonx.EmptyString}},
		{"unterminated string", `"abc`, jsonx.Facts{Shape: jsonx.MalformedString}},
		{"invalid escape", `"\q"`, jsonx.Facts{Shape: jsonx.MalformedString}},
		{"string with trailing data", `"a" x`, jsonx.Facts{Shape: jsonx.MalformedString}},
		{"non-numeric string", `"unknown"`, jsonx.Facts{Shape: jsonx.NonNumericString}},
		{"whitespace-only string", `" "`, jsonx.Facts{Shape: jsonx.NonNumericString, Padded: true}},
		{"padded garbage string", `" abc "`, jsonx.Facts{Shape: jsonx.NonNumericString, Padded: true}},
		{"object", `{}`, jsonx.Facts{Shape: jsonx.Other}},
		{"array", `[1]`, jsonx.Facts{Shape: jsonx.Other}},
		{"bool", `true`, jsonx.Facts{Shape: jsonx.Other}},
		{"garbage", `!!!`, jsonx.Facts{Shape: jsonx.Other}},
		{"lone minus", `-`, jsonx.Facts{Shape: jsonx.Other}},
		{"bare leading zeros", `007`, jsonx.Facts{Shape: jsonx.Other}},
		{"bare plus sign", `+5`, jsonx.Facts{Shape: jsonx.Other}},
		{"number with trailing data", `5 x`, jsonx.Facts{Shape: jsonx.Other}},

		// Hardened rejections: strconv would accept these, this package
		// deliberately does not.
		{"hex float string", `"0x1p2"`, jsonx.Facts{Shape: jsonx.NonNumericString}},
		{"inf word string", `"Inf"`, jsonx.Facts{Shape: jsonx.NonNumericString}},
		{"nan word string", `"NaN"`, jsonx.Facts{Shape: jsonx.NonNumericString}},
		{"underscore digits string", `"1_000"`, jsonx.Facts{Shape: jsonx.NonNumericString}},

		// Bare numbers.
		{"bare int", `14`, jsonx.Facts{Shape: jsonx.Number, Value: 14}},
		{"bare zero", `0`, jsonx.Facts{Shape: jsonx.Number, Value: 0}},
		{"bare negative", `-3`, jsonx.Facts{Shape: jsonx.Number, Value: -3, Negative: true}},
		{"bare negative zero", `-0`, jsonx.Facts{Shape: jsonx.Number, Value: 0}},
		{"bare integral float", `9.0`, jsonx.Facts{Shape: jsonx.Number, Value: 9, FloatForm: true}},
		{"bare exponent", `1e3`, jsonx.Facts{Shape: jsonx.Number, Value: 1000, FloatForm: true}},
		{"bare integral via exponent", `50e-1`, jsonx.Facts{Shape: jsonx.Number, Value: 5, FloatForm: true}},
		{"bare fractional", `1.5`, jsonx.Facts{Shape: jsonx.Number, FloatForm: true, Fractional: true}},
		{"bare negative fractional", `-1.5`, jsonx.Facts{Shape: jsonx.Number, FloatForm: true, Fractional: true, Negative: true}},
		{"bare negative float zero", `-0.0`, jsonx.Facts{Shape: jsonx.Number, Value: 0, FloatForm: true}},
		{"bare float overflow", `1e999`, jsonx.Facts{Shape: jsonx.Number, FloatForm: true, Overflow: true}},
		{"bare float underflow to zero", `1e-999`, jsonx.Facts{Shape: jsonx.Number, Value: 0, FloatForm: true}},
		{"bare subnormal", `1e-310`, jsonx.Facts{Shape: jsonx.Number, FloatForm: true, Fractional: true}},
		{"bare max int64", `9223372036854775807`, jsonx.Facts{Shape: jsonx.Number, Value: math.MaxInt64}},
		{"bare min int64", `-9223372036854775808`, jsonx.Facts{Shape: jsonx.Number, Value: math.MinInt64, Negative: true}},
		{"bare int64 overflow", `9223372036854775808`, jsonx.Facts{Shape: jsonx.Number, Overflow: true}},
		{"bare negative int64 overflow", `-9223372036854775809`, jsonx.Facts{Shape: jsonx.Number, Overflow: true, Negative: true}},

		// Quoted numbers: decimal-relaxed grammar.
		{"quoted int", `"14"`, jsonx.Facts{Shape: jsonx.NumericString, Value: 14}},
		{"quoted negative", `"-7"`, jsonx.Facts{Shape: jsonx.NumericString, Value: -7, Negative: true}},
		{"quoted negative zero", `"-0"`, jsonx.Facts{Shape: jsonx.NumericString, Value: 0}},
		{"quoted leading zeros", `"007"`, jsonx.Facts{Shape: jsonx.NumericString, Value: 7}},
		{"quoted plus sign", `"+5"`, jsonx.Facts{Shape: jsonx.NumericString, Value: 5}},
		{"quoted padded int", `" 12 "`, jsonx.Facts{Shape: jsonx.NumericString, Value: 12, Padded: true}},
		{"quoted escaped digit", `"\u0035"`, jsonx.Facts{Shape: jsonx.NumericString, Value: 5}},
		{"quoted integral float", `"9.0"`, jsonx.Facts{Shape: jsonx.NumericString, Value: 9, FloatForm: true}},
		{"quoted exponent", `"1e3"`, jsonx.Facts{Shape: jsonx.NumericString, Value: 1000, FloatForm: true}},
		{"quoted fractional", `"12.5"`, jsonx.Facts{Shape: jsonx.NumericString, FloatForm: true, Fractional: true}},
		{"quoted trailing dot", `"5."`, jsonx.Facts{Shape: jsonx.NumericString, Value: 5, FloatForm: true}},
		{"quoted leading dot", `".5"`, jsonx.Facts{Shape: jsonx.NumericString, FloatForm: true, Fractional: true}},
		{"quoted int32 overflow value", `"2147483648"`, jsonx.Facts{Shape: jsonx.NumericString, Value: 2147483648}},
		{"quoted int64 overflow", `"9223372036854775808"`, jsonx.Facts{Shape: jsonx.NumericString, Overflow: true}},
		{"quoted float at 2^63", `"9223372036854775808.0"`, jsonx.Facts{Shape: jsonx.NumericString, FloatForm: true, Overflow: true}},
		// float64 rounds MaxInt64 up to 2^63, so the float FORM of
		// MaxInt64 must classify as overflow rather than wrap.
		{"quoted float at max int64", `"9223372036854775807.0"`, jsonx.Facts{Shape: jsonx.NumericString, FloatForm: true, Overflow: true}},
		{"quoted float at min int64", `"-9223372036854775808.0"`, jsonx.Facts{Shape: jsonx.NumericString, Value: math.MinInt64, FloatForm: true, Negative: true}},
	}
	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			got := jsonx.Classify([]byte(tc.in))
			if got != tc.want {
				t.Errorf("Classify(%q) = %+v, want %+v", tc.in, got, tc.want)
			}
		})
	}
}

// TestFactsWasString pins the derived was-string fact across every shape.
func TestFactsWasString(t *testing.T) {
	t.Parallel()
	tests := []struct {
		in   string
		want bool
	}{
		{`"7"`, true},
		{`"x"`, true},
		{`""`, true},
		{`"broken`, true},
		{`7`, false},
		{`null`, false},
		{``, false},
		{`{}`, false},
	}
	for _, tc := range tests {
		if got := jsonx.Classify([]byte(tc.in)).WasString(); got != tc.want {
			t.Errorf("Classify(%q).WasString() = %v, want %v", tc.in, got, tc.want)
		}
	}
}
