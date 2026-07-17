package jsonx_test

import (
	"encoding/json"
	"fmt"

	"github.com/cplieger/jsonx"
)

// ExampleParseInt64 shows the same wire value under two policies: the
// tolerant policy accepts the integral float form, the strict one
// rejects it.
func ExampleParseInt64() {
	v, _ := jsonx.ParseInt64([]byte(`"9.0"`), jsonx.TolerantZero())
	fmt.Println(v)

	_, err := jsonx.ParseInt64([]byte(`"9.0"`), jsonx.Strict())
	fmt.Println(err)
	// Output:
	// 9
	// jsonx: float form: "\"9.0\""
}

// ExampleTolerantInt decodes a shape-variant upstream record: the odd
// values become 0 instead of failing the record.
func ExampleTolerantInt() {
	type record struct {
		AniListID jsonx.TolerantInt `json:"anilist_id"`
		TvdbID    jsonx.TolerantInt `json:"tvdb_id"`
	}
	var r record
	_ = json.Unmarshal([]byte(`{"anilist_id":"1e3","tvdb_id":"unknown"}`), &r)
	fmt.Println(r.AniListID, r.TvdbID)
	// Output: 1000 0
}

// ExamplePolicy shows composing a custom policy from a shipped one: a
// strict decoder for ids that must be positive, with null rejected.
func ExamplePolicy() {
	p := jsonx.Strict()
	p.Null = jsonx.Reject
	p.EmptyString = jsonx.Reject
	p.MinValue = 1

	_, err := jsonx.ParseInt64([]byte(`0`), p)
	fmt.Println(err)
	// Output: jsonx: out of range: "0"
}
