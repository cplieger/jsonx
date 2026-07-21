package bounded_test

import (
	"bytes"
	"encoding/json"
	"errors"
	"reflect"
	"strings"
	"testing"

	"github.com/cplieger/jsonx/bounded"
)

// widget / part form the small schema the parity tests decode both ways: a
// bounded token walk must be observably identical to json.Unmarshal on any
// input both accept.
type widget struct {
	Name  string   `json:"name"`
	Count int      `json:"count"`
	Tags  []string `json:"tags"`
	Parts []part   `json:"parts"`
}

type part struct {
	ID   int    `json:"id"`
	Kind string `json:"kind"`
}

// decodeWidget is the reference consumer shape: Object walk, EqualFold
// dispatch, Array for slices with prior for duplicate-key parity, Skip for
// unknown fields.
func decodeWidget(d *bounded.Decoder, w *widget, tagCap, partCap int) error {
	return d.Object(func(k string) error {
		switch {
		case strings.EqualFold(k, "name"):
			return d.Decode(&w.Name)
		case strings.EqualFold(k, "count"):
			return d.Decode(&w.Count)
		case strings.EqualFold(k, "tags"):
			var err error
			w.Tags, err = bounded.Array(d, w.Tags, tagCap, "tags", func(s *string) error { return d.Decode(s) })
			return err
		case strings.EqualFold(k, "parts"):
			var err error
			w.Parts, err = bounded.Array(d, w.Parts, partCap, "parts", func(p *part) error { return decodePart(d, p) })
			return err
		default:
			return d.Skip()
		}
	})
}

func decodePart(d *bounded.Decoder, p *part) error {
	return d.Object(func(k string) error {
		switch {
		case strings.EqualFold(k, "id"):
			return d.Decode(&p.ID)
		case strings.EqualFold(k, "kind"):
			return d.Decode(&p.Kind)
		default:
			return d.Skip()
		}
	})
}

// boundedWidget decodes body through the bounded walk with the given caps
// and budget, including the End trailing-data check (matching
// json.Unmarshal's whole-input strictness).
func boundedWidget(body []byte, tagCap, partCap, budget int) (widget, error) {
	d := bounded.NewDecoder(bytes.NewReader(body), budget)
	var w widget
	if err := decodeWidget(d, &w, tagCap, partCap); err != nil {
		return widget{}, err
	}
	if err := d.End(); err != nil {
		return widget{}, err
	}
	return w, nil
}

func TestParityWithUnmarshal(t *testing.T) {
	t.Parallel()
	cases := []struct {
		name string
		body string
	}{
		{name: "full document", body: `{"name":"a","count":2,"tags":["x","y"],"parts":[{"id":1,"kind":"k"},{"id":2}]}`},
		{name: "case-variant keys", body: `{"NAME":"a","Count":2,"TAGS":["x"],"PaRtS":[{"ID":7,"KIND":"k"}]}`},
		{name: "unknown fields skipped", body: `{"other":{"deep":[1,2,{"x":null}]},"name":"a","junk":[[[]]],"flag":true}`},
		{name: "huge number in skipped field", body: `{"big":1e1000,"name":"a"}`},
		{name: "duplicate scalar last wins", body: `{"count":1,"count":9}`},
		{name: "duplicate array merges fieldwise", body: `{"parts":[{"id":1,"kind":"k"},{"id":2,"kind":"m"}],"parts":[{"id":5}]}`},
		{name: "duplicate array empty replaces", body: `{"tags":["x","y"],"tags":[]}`},
		{name: "duplicate array null nils", body: `{"tags":["x"],"tags":null}`},
		{name: "empty array allocates empty non-nil slice", body: `{"tags":[],"parts":[]}`},
		{name: "null into slice", body: `{"tags":null}`},
		{name: "null array element is no-op", body: `{"parts":[null]}`},
		{name: "top-level null", body: `null`},
		{name: "empty object", body: `{}`},
		{name: "duplicate object key merges", body: `{"name":"a","name":"b","count":3}`},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			var want widget
			if err := json.Unmarshal([]byte(tc.body), &want); err != nil {
				t.Fatalf("json.Unmarshal: %v (parity cases must be stdlib-accepted)", err)
			}
			got, err := boundedWidget([]byte(tc.body), 0, 0, 0)
			if err != nil {
				t.Fatalf("bounded decode: %v", err)
			}
			// Exact DeepEqual, no normalization: nil-vs-empty parity is part
			// of the contract (null → nil, `[]` → empty non-nil, absent →
			// untouched), exactly as json.Unmarshal behaves.
			if !reflect.DeepEqual(got, want) {
				t.Errorf("bounded = %+v, want json.Unmarshal parity %+v", got, want)
			}
		})
	}
}

func TestTrailingDataRejected(t *testing.T) {
	t.Parallel()
	for _, body := range []string{`{} {}`, `{"name":"a"} x`, `null 1`} {
		if _, err := boundedWidget([]byte(body), 0, 0, 0); err == nil {
			t.Errorf("boundedWidget(%q) = nil error, want trailing-data rejection", body)
		}
		var w widget
		if err := json.Unmarshal([]byte(body), &w); err == nil {
			t.Errorf("json.Unmarshal(%q) = nil error; parity case is stale", body)
		}
	}
}

func TestArrayCapRejects(t *testing.T) {
	t.Parallel()
	body := []byte(`{"tags":["a","b","c","d"]}`)
	_, err := boundedWidget(body, 3, 0, 0)
	if !errors.Is(err, bounded.ErrArrayCap) {
		t.Fatalf("err = %v, want ErrArrayCap", err)
	}
	if !strings.Contains(err.Error(), "tags") {
		t.Errorf("err = %q, want the array named via what", err)
	}
	if _, err := boundedWidget(body, 4, 0, 0); err != nil {
		t.Errorf("at-cap decode = %v, want nil", err)
	}
}

func TestElementBudgetAggregatesAcrossArrays(t *testing.T) {
	t.Parallel()
	// 3 tags + 2 parts = 5 elements against the aggregate budget, whichever
	// array they belong to.
	body := []byte(`{"tags":["a","b","c"],"parts":[{"id":1},{"id":2}]}`)
	if _, err := boundedWidget(body, 0, 0, 4); !errors.Is(err, bounded.ErrElementBudget) {
		t.Fatalf("budget 4: err = %v, want ErrElementBudget", err)
	}
	if _, err := boundedWidget(body, 0, 0, 5); err != nil {
		t.Errorf("budget 5: err = %v, want nil", err)
	}
	d := bounded.NewDecoder(bytes.NewReader(body), 0)
	var w widget
	if err := decodeWidget(d, &w, 0, 0); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if got := d.Elements(); got != 5 {
		t.Errorf("Elements() = %d, want 5", got)
	}
}

func TestArrayCapCheckedBeforeBudgetAndDecode(t *testing.T) {
	t.Parallel()
	// The 4th element crosses the per-array cap of 3: the cap must reject
	// before the element is charged or decoded, so the error is ErrArrayCap
	// even though the budget (also 3) would have tripped on the same element.
	body := []byte(`{"tags":["a","b","c","d"]}`)
	_, err := boundedWidget(body, 3, 0, 3)
	if !errors.Is(err, bounded.ErrArrayCap) {
		t.Fatalf("err = %v, want the per-array cap to fire before the budget charge", err)
	}
}

func TestOpen(t *testing.T) {
	t.Parallel()
	cases := []struct {
		name    string
		body    string
		wantOK  bool
		wantErr bool
	}{
		{name: "object opens", body: `{}`, wantOK: true},
		{name: "null reports not-ok without error", body: `null`},
		{name: "wrong delimiter errors", body: `[]`, wantErr: true},
		{name: "scalar errors", body: `5`, wantErr: true},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			t.Parallel()
			d := bounded.NewDecoder(strings.NewReader(tc.body), 0)
			ok, err := d.Open(json.Delim('{'))
			if ok != tc.wantOK || (err != nil) != tc.wantErr {
				t.Errorf("Open = (%v, %v), want ok=%v wantErr=%v", ok, err, tc.wantOK, tc.wantErr)
			}
		})
	}
}

func TestSkipConsumesWholeValue(t *testing.T) {
	t.Parallel()
	// After skipping the first key's nested value, the walk must land
	// exactly on the next key.
	d := bounded.NewDecoder(strings.NewReader(`{"skip":{"a":[1,{"b":2}],"c":"d"},"name":"kept"}`), 0)
	var w widget
	if err := decodeWidget(d, &w, 0, 0); err != nil {
		t.Fatalf("decode: %v", err)
	}
	if w.Name != "kept" {
		t.Errorf("Name = %q, want the key after the skipped container decoded", w.Name)
	}
}

func TestObjectNullLeavesTargetUntouched(t *testing.T) {
	t.Parallel()
	d := bounded.NewDecoder(strings.NewReader(`null`), 0)
	p := part{ID: 7, Kind: "k"}
	if err := decodePart(d, &p); err != nil {
		t.Fatalf("decodePart on null: %v", err)
	}
	if p.ID != 7 || p.Kind != "k" {
		t.Errorf("part = %+v, want pre-decoded value untouched by null", p)
	}
}

func TestDuplicateArrayRegrowReExposesBacking(t *testing.T) {
	t.Parallel()
	// First occurrence decodes two full parts; the duplicate decodes one
	// partial part INTO the retained backing element, so the un-overwritten
	// field survives (stdlib duplicate-key merge) and the length truncates.
	body := []byte(`{"parts":[{"id":1,"kind":"k"},{"id":2,"kind":"m"}],"parts":[{"id":5}]}`)
	got, err := boundedWidget(body, 0, 0, 0)
	if err != nil {
		t.Fatalf("decode: %v", err)
	}
	want := []part{{ID: 5, Kind: "k"}}
	if !reflect.DeepEqual(got.Parts, want) {
		t.Errorf("Parts = %+v, want %+v (merge into retained backing, truncated)", got.Parts, want)
	}
}
