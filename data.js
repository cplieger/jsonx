window.BENCHMARK_DATA = {
  "lastUpdate": 1787310862891,
  "repoUrl": "https://github.com/cplieger/ci",
  "entries": {
    "Benchmark": [
      {
        "commit": {
          "author": {
            "name": "cplieger",
            "username": "cplieger",
            "email": "917744+cplieger@users.noreply.github.com"
          },
          "committer": {
            "name": "Christopher Plieger",
            "username": "cplieger",
            "email": "917744+cplieger@users.noreply.github.com"
          },
          "id": "a66dd3d4479d96bf77d84ed08b78651e2477d1f4",
          "message": "fix: measure the weekly benchmarks instead of reporting an empty run green\n\nThe fanout discovered repos with a jq filter that emits one name per line, then tested enrolment with a space-delimited substring match. A newline is not a space, so every enrolled repo was rejected as not live, the matrix came out empty, the run job skipped on its non-empty guard, and the leg reported success having measured nothing. Confirmed by the absence of a benchmarks branch on all four enrolled repos despite three consecutive green runs.\n\nFlattens the discovery output, then makes the two silent paths fail closed: a hardcoded enrolment list resolving to zero live repos is a defect rather than a weekly state, and an empty matrix now fails instead of skipping the run job. Also guards the HEAD lookup, which had the same unguarded shape that took down the sibling mutation-testing fanout in August.",
          "timestamp": "2026-08-21T11:04:22Z",
          "url": "https://github.com/cplieger/ci/commit/a66dd3d4479d96bf77d84ed08b78651e2477d1f4"
        },
        "date": 1787310862183,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "BenchmarkClassify/adversarial - B/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial - allocs/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial",
            "value": 157.8,
            "range": "± 0.9",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - B/op",
            "value": 2,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - allocs/op",
            "value": 1,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float",
            "value": 162.05,
            "range": "± 0.9",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - B/op",
            "value": 8242,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - allocs/op",
            "value": 3,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits",
            "value": 8447.5,
            "range": "± 137.0",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - B/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - allocs/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null",
            "value": 29.97,
            "range": "± 0.05",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - B/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - allocs/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain",
            "value": 158.4,
            "range": "± 2.4",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - B/op",
            "value": 16,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - allocs/op",
            "value": 1,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted",
            "value": 243.25,
            "range": "± 12.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - B/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - allocs/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null",
            "value": 37.325,
            "range": "± 0.43",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - B/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - allocs/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain",
            "value": 158.95,
            "range": "± 3.7",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - B/op",
            "value": 16,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - allocs/op",
            "value": 1,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted",
            "value": 242.35,
            "range": "± 2.1",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - B/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - allocs/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null",
            "value": 36.98,
            "range": "± 0.23",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - B/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - allocs/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain",
            "value": 159.1,
            "range": "± 4.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - B/op",
            "value": 16,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - allocs/op",
            "value": 1,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted",
            "value": 242.45,
            "range": "± 6.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - B/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - allocs/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null",
            "value": 36.975,
            "range": "± 0.06",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - B/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - allocs/op",
            "value": 0,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain",
            "value": 159.85,
            "range": "± 4.1",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - B/op",
            "value": 16,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - allocs/op",
            "value": 1,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted",
            "value": 242.1,
            "range": "± 3.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - B/op",
            "value": 64,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - allocs/op",
            "value": 2,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent",
            "value": 253,
            "range": "± 11.3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - B/op",
            "value": 131251,
            "range": "± 2.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - allocs/op",
            "value": 5,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run",
            "value": 124613,
            "range": "± 2698.0",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - B/op",
            "value": 400,
            "range": "± 0.0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - allocs/op",
            "value": 11,
            "range": "± 0.0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero",
            "value": 622.9,
            "range": "± 13.8",
            "unit": "ns/op",
            "extra": "10 samples, median"
          }
        ]
      }
    ]
  }
}