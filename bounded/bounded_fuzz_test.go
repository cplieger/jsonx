package bounded_test

import (
	"encoding/json"
	"reflect"
	"testing"
)

// FuzzParityWithUnmarshal drives arbitrary bytes through the bounded widget
// walk (uncapped, unbudgeted) and json.Unmarshal. Invariants: the walk never
// panics, and it is never LOOSER than json.Unmarshal — an input the bounded
// walk accepts must be stdlib-accepted with an observably identical result
// (nil-vs-empty normalized). Bounded-stricter is allowed by design (caps and
// budget exist to reject what Unmarshal would materialize), so an
// Unmarshal-accepted input the walk rejects is not a violation; here with no
// caps configured the accept sets should in practice coincide.
func FuzzParityWithUnmarshal(f *testing.F) {
	f.Add([]byte(`{"name":"a","count":2,"tags":["x","y"],"parts":[{"id":1,"kind":"k"},{"id":2}]}`))
	f.Add([]byte(`{"NAME":"a","Count":2,"TAGS":["x"],"PaRtS":[{"ID":7,"KIND":"k"}]}`))
	f.Add([]byte(`{"parts":[{"id":1,"kind":"k"}],"parts":[{"id":5}]}`))
	f.Add([]byte(`{"tags":["x"],"tags":null}`))
	f.Add([]byte(`{"big":1e1000,"name":"a"}`))
	f.Add([]byte(`{"parts":[null]}`))
	f.Add([]byte(`null`))
	f.Add([]byte(`{} {}`))
	f.Add([]byte(`{"count":"x"}`))
	f.Fuzz(func(t *testing.T, body []byte) {
		got, err := boundedWidget(body, 0, 0, 0)
		if err != nil {
			return // bounded-stricter or both-reject: nothing to compare
		}
		var want widget
		if uErr := json.Unmarshal(body, &want); uErr != nil {
			t.Fatalf("bounded accepted %q but json.Unmarshal rejects it: %v (the walk must never be looser than stdlib)", body, uErr)
		}
		if !reflect.DeepEqual(normalize(got), normalize(want)) {
			t.Errorf("bounded(%q) = %+v, want json.Unmarshal parity %+v", body, got, want)
		}
	})
}
