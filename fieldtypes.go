package jsonx

import "encoding/json"

// The ready-made json.Unmarshaler field types below bind one shipped
// policy each, for direct use in struct definitions. Each resets its
// receiver before decoding: encoding/json reuses the same field receiver
// for duplicate object keys, so a later tolerated-odd value must clear an
// earlier decode rather than silently retain it. On error the receiver is
// left at 0 (no partial value). They marshal as plain numbers via their
// underlying int64; the original wire form is not round-tripped.

// TolerantInt decodes a number-or-string integer field under the
// TolerantZero policy: odd shapes and invalid values become 0, integral
// float forms are accepted, and only a malformed JSON string errors.
type TolerantInt int64

var _ json.Unmarshaler = (*TolerantInt)(nil)

// UnmarshalJSON implements json.Unmarshaler under TolerantZero.
func (v *TolerantInt) UnmarshalJSON(data []byte) error {
	*v = 0
	n, err := ParseInt64(data, TolerantZero())
	if err != nil {
		return err
	}
	*v = TolerantInt(n)
	return nil
}

// StrictInt decodes a number-or-string integer field under the Strict
// policy: a bare or quoted decimal integer, with null and "" tolerated as
// 0 and everything else an error.
type StrictInt int64

var _ json.Unmarshaler = (*StrictInt)(nil)

// UnmarshalJSON implements json.Unmarshaler under Strict.
func (v *StrictInt) UnmarshalJSON(data []byte) error {
	*v = 0
	n, err := ParseInt64(data, Strict())
	if err != nil {
		return err
	}
	*v = StrictInt(n)
	return nil
}

// StrictAbsentZeroInt decodes a number-or-string integer field under the
// StrictAbsentZero policy: Strict, plus zero-length input tolerated as 0
// for direct callers emulating an absent field.
type StrictAbsentZeroInt int64

var _ json.Unmarshaler = (*StrictAbsentZeroInt)(nil)

// UnmarshalJSON implements json.Unmarshaler under StrictAbsentZero.
func (v *StrictAbsentZeroInt) UnmarshalJSON(data []byte) error {
	*v = 0
	n, err := ParseInt64(data, StrictAbsentZero())
	if err != nil {
		return err
	}
	*v = StrictAbsentZeroInt(n)
	return nil
}
