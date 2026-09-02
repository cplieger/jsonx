window.BENCHMARK_DATA = {
  "lastUpdate": 1788307664033,
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
      },
      {
        "commit": {
          "author": {
            "name": "Christopher Plieger",
            "username": "cplieger",
            "email": "917744+cplieger@users.noreply.github.com"
          },
          "committer": {
            "name": "Christopher Plieger",
            "username": "cplieger",
            "email": "917744+cplieger@users.noreply.github.com"
          },
          "id": "9b784475c83b9540230831ae3621fc38e5d80686",
          "message": "fix: revert the benchmark attribution change that broke publishing\n\nThe attempted fix set GITHUB_REPOSITORY on the publish step to redirect the action commit lookup at the repo being benchmarked. That cannot work: GitHub reserves the default GITHUB_* variables and the runner value wins at process level, so the step env block printed the override while the lookup still targeted cplieger/ci. Passing the consumer SHA as ref then asked ci for an object it does not have, and all four repos failed with \"No commit found for SHA\".\n\nRestores the previous behaviour, which publishes correctly but attributes each data point to a cplieger/ci commit. That attribution defect is real and still open; it needs either an upstream owner/repo input for the commit lookup, a post-processing pass over the published data, or running the benchmark in the consumer own workflow context.",
          "timestamp": "2026-08-21T12:10:35Z",
          "url": "https://github.com/cplieger/ci/commit/9b784475c83b9540230831ae3621fc38e5d80686"
        },
        "date": 1787315106330,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "BenchmarkClassify/adversarial - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial",
            "value": 144.45,
            "range": "± 2.3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - B/op",
            "value": 2,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float",
            "value": 156.5,
            "range": "± 0.8",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - B/op",
            "value": 8242,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - allocs/op",
            "value": 3,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits",
            "value": 7688,
            "range": "± 67",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null",
            "value": 28.21,
            "range": "± 0.79",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain",
            "value": 162.7,
            "range": "± 0.9",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted",
            "value": 270.85,
            "range": "± 1.3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null",
            "value": 35.29,
            "range": "± 0.13",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain",
            "value": 169.35,
            "range": "± 0.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted",
            "value": 279.55,
            "range": "± 6.8",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null",
            "value": 35.435,
            "range": "± 0.13",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain",
            "value": 169.6,
            "range": "± 0.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted",
            "value": 279.55,
            "range": "± 3.4",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null",
            "value": 35.295,
            "range": "± 0.06",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain",
            "value": 169.35,
            "range": "± 1.8",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted",
            "value": 279.25,
            "range": "± 2.3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - B/op",
            "value": 64,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - allocs/op",
            "value": 2,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent",
            "value": 218.65,
            "range": "± 1",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - B/op",
            "value": 131250,
            "range": "± 1",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - allocs/op",
            "value": 5,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run",
            "value": 114403.5,
            "range": "± 996",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - B/op",
            "value": 400,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - allocs/op",
            "value": 11,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero",
            "value": 687.8,
            "range": "± 12.7",
            "unit": "ns/op",
            "extra": "10 samples, median"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Christopher Plieger",
            "username": "cplieger",
            "email": "917744+cplieger@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "66c5e020d96caa625284d59e7cab943d689cfb32",
          "message": "chore(sync): synced file(s) with cplieger/ci (#117)\n\nCo-authored-by: github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>",
          "timestamp": "2026-08-21T12:10:36Z",
          "url": "https://github.com/cplieger/jsonx/commit/66c5e020d96caa625284d59e7cab943d689cfb32"
        },
        "date": 1787316426234,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "BenchmarkClassify/adversarial - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial",
            "value": 110.5,
            "range": "± 1.3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - B/op",
            "value": 2,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float",
            "value": 106.75,
            "range": "± 1.3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - B/op",
            "value": 8242,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - allocs/op",
            "value": 3,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits",
            "value": 7111.5,
            "range": "± 60",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null",
            "value": 22.46,
            "range": "± 0.09",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain",
            "value": 115.15,
            "range": "± 2.4",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted",
            "value": 199.4,
            "range": "± 2.8",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null",
            "value": 27.085,
            "range": "± 0.17",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain",
            "value": 120.55,
            "range": "± 2.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted",
            "value": 202.5,
            "range": "± 4.1",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null",
            "value": 27.035,
            "range": "± 0.08",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain",
            "value": 120.7,
            "range": "± 4.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted",
            "value": 202.9,
            "range": "± 2.1",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null",
            "value": 27.04,
            "range": "± 0.03",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain",
            "value": 120.75,
            "range": "± 2.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted",
            "value": 202.7,
            "range": "± 2.1",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - B/op",
            "value": 64,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - allocs/op",
            "value": 2,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent",
            "value": 162.1,
            "range": "± 0.9",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - B/op",
            "value": 131248,
            "range": "± 1",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - allocs/op",
            "value": 5,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run",
            "value": 101995.5,
            "range": "± 621",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - B/op",
            "value": 400,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - allocs/op",
            "value": 11,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero",
            "value": 525.4,
            "range": "± 4.3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Christopher Plieger",
            "username": "cplieger",
            "email": "917744+cplieger@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "4cc11fd7a39e91ea6791a02f43070b7a9436a71f",
          "message": "chore(sync): synced file(s) with cplieger/ci (#118)\n\nCo-authored-by: github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>",
          "timestamp": "2026-08-21T13:16:42Z",
          "url": "https://github.com/cplieger/jsonx/commit/4cc11fd7a39e91ea6791a02f43070b7a9436a71f"
        },
        "date": 1787320352627,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "BenchmarkClassify/adversarial - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial",
            "value": 119.8,
            "range": "± 3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - B/op",
            "value": 2,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float",
            "value": 122.8,
            "range": "± 3.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - B/op",
            "value": 8242,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - allocs/op",
            "value": 3,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits",
            "value": 6473,
            "range": "± 212",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null",
            "value": 23.24,
            "range": "± 0.12",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain",
            "value": 123.3,
            "range": "± 4.4",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted",
            "value": 186.4,
            "range": "± 4.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null",
            "value": 28.66,
            "range": "± 0.06",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain",
            "value": 123.95,
            "range": "± 1.7",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted",
            "value": 186.45,
            "range": "± 1.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null",
            "value": 28.665,
            "range": "± 0.14",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain",
            "value": 123.8,
            "range": "± 3.2",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted",
            "value": 186.95,
            "range": "± 1.4",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null",
            "value": 28.66,
            "range": "± 0.06",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain",
            "value": 123.3,
            "range": "± 3.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted",
            "value": 186.85,
            "range": "± 1.4",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - B/op",
            "value": 64,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - allocs/op",
            "value": 2,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent",
            "value": 171.15,
            "range": "± 0.7",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - B/op",
            "value": 131251,
            "range": "± 2",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - allocs/op",
            "value": 5,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run",
            "value": 96906.5,
            "range": "± 1220",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - B/op",
            "value": 400,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - allocs/op",
            "value": 11,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero",
            "value": 484.2,
            "range": "± 18.2",
            "unit": "ns/op",
            "extra": "10 samples, median"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Christopher Plieger",
            "username": "cplieger",
            "email": "917744+cplieger@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "4cc11fd7a39e91ea6791a02f43070b7a9436a71f",
          "message": "chore(sync): synced file(s) with cplieger/ci (#118)\n\nCo-authored-by: github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>",
          "timestamp": "2026-08-21T13:16:42Z",
          "url": "https://github.com/cplieger/jsonx/commit/4cc11fd7a39e91ea6791a02f43070b7a9436a71f"
        },
        "date": 1787321333625,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "BenchmarkClassify/adversarial - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial",
            "value": 154.6,
            "range": "± 1.2",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - B/op",
            "value": 2,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float",
            "value": 157.75,
            "range": "± 3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - B/op",
            "value": 8242,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - allocs/op",
            "value": 3,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits",
            "value": 8482.5,
            "range": "± 202",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null",
            "value": 29.99,
            "range": "± 0.14",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain",
            "value": 159,
            "range": "± 2.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted",
            "value": 241.6,
            "range": "± 11.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null",
            "value": 37.33,
            "range": "± 0.06",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain",
            "value": 161,
            "range": "± 4.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted",
            "value": 240.75,
            "range": "± 4.2",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null",
            "value": 37.07,
            "range": "± 0.34",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain",
            "value": 160.8,
            "range": "± 3.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted",
            "value": 240.95,
            "range": "± 7.4",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null",
            "value": 36.97,
            "range": "± 0.12",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain",
            "value": 159.35,
            "range": "± 3.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted",
            "value": 241.4,
            "range": "± 4.3",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - B/op",
            "value": 64,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - allocs/op",
            "value": 2,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent",
            "value": 222.55,
            "range": "± 5.1",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - B/op",
            "value": 131251,
            "range": "± 3",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - allocs/op",
            "value": 5,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run",
            "value": 125946,
            "range": "± 1180",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - B/op",
            "value": 400,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - allocs/op",
            "value": 11,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero",
            "value": 622.7,
            "range": "± 4.7",
            "unit": "ns/op",
            "extra": "10 samples, median"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Christopher Plieger",
            "username": "cplieger",
            "email": "917744+cplieger@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "6d02e16c9e84faa179a56da8dbb00cefb841a944",
          "message": "chore(sync): synced file(s) with cplieger/ci (#125)\n\nCo-authored-by: github-actions[bot] <41898282+github-actions[bot]@users.noreply.github.com>",
          "timestamp": "2026-08-25T08:09:51Z",
          "url": "https://github.com/cplieger/jsonx/commit/6d02e16c9e84faa179a56da8dbb00cefb841a944"
        },
        "date": 1787697954141,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "BenchmarkClassify/adversarial - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial",
            "value": 98.085,
            "range": "± 1.835",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - B/op",
            "value": 2,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float",
            "value": 89.145,
            "range": "± 1.315",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - B/op",
            "value": 8242,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - allocs/op",
            "value": 3,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits",
            "value": 5797,
            "range": "± 95",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null",
            "value": 20.115,
            "range": "± 0.36",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain",
            "value": 90.385,
            "range": "± 1.03",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted",
            "value": 161.55,
            "range": "± 3.55",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null",
            "value": 23.89,
            "range": "± 0.39",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain",
            "value": 93.415,
            "range": "± 0.73",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted",
            "value": 165.5,
            "range": "± 3.25",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null",
            "value": 23.91,
            "range": "± 0.175",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain",
            "value": 95.28,
            "range": "± 1.64",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted",
            "value": 167.75,
            "range": "± 2.2",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null",
            "value": 23.85,
            "range": "± 0.28",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain",
            "value": 92.435,
            "range": "± 1.215",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted",
            "value": 163.6,
            "range": "± 1.15",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - B/op",
            "value": 64,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - allocs/op",
            "value": 2,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent",
            "value": 140.45,
            "range": "± 2.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - B/op",
            "value": 131248,
            "range": "± 0.5",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - allocs/op",
            "value": 5,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run",
            "value": 81739,
            "range": "± 1829",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - B/op",
            "value": 400,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - allocs/op",
            "value": 11,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero",
            "value": 443.15,
            "range": "± 8.1",
            "unit": "ns/op",
            "extra": "10 samples, median"
          }
        ]
      },
      {
        "commit": {
          "author": {
            "name": "Christopher Plieger",
            "username": "cplieger",
            "email": "917744+cplieger@users.noreply.github.com"
          },
          "committer": {
            "name": "GitHub",
            "username": "web-flow",
            "email": "noreply@github.com"
          },
          "id": "73fcb5e94e2f68f4366ffd27bd2af0247e0b054a",
          "message": "chore(deps): update cplieger/ci digest to 77bb665 (#557)",
          "timestamp": "2026-09-01T16:02:18Z",
          "url": "https://github.com/cplieger/ci/commit/73fcb5e94e2f68f4366ffd27bd2af0247e0b054a"
        },
        "date": 1788307663739,
        "tool": "customSmallerIsBetter",
        "benches": [
          {
            "name": "BenchmarkClassify/adversarial - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/adversarial",
            "value": 155.5,
            "range": "± 1.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - B/op",
            "value": 2,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/float",
            "value": 159.75,
            "range": "± 1.25",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - B/op",
            "value": 8242,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits - allocs/op",
            "value": 3,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/long_digits",
            "value": 8259.5,
            "range": "± 47",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/null",
            "value": 29.975,
            "range": "± 0.06",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/plain",
            "value": 157.35,
            "range": "± 1.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkClassify/quoted",
            "value": 245.85,
            "range": "± 0.65",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/null",
            "value": 37.335,
            "range": "± 0.065",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/plain",
            "value": 160.9,
            "range": "± 1.85",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict/quoted",
            "value": 247.15,
            "range": "± 1.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/null",
            "value": 37.325,
            "range": "± 0.15",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/plain",
            "value": 160.75,
            "range": "± 1.25",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/strict_absentzero/quoted",
            "value": 247.2,
            "range": "± 3.4",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/null",
            "value": 36.98,
            "range": "± 0.06",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - B/op",
            "value": 0,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain - allocs/op",
            "value": 0,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/plain",
            "value": 160.6,
            "range": "± 1.6",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - B/op",
            "value": 16,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted - allocs/op",
            "value": 1,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64/tolerant_zero/quoted",
            "value": 247,
            "range": "± 1.1",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - B/op",
            "value": 64,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent - allocs/op",
            "value": 2,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/huge_exponent",
            "value": 221.55,
            "range": "± 1.35",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - B/op",
            "value": 131251,
            "range": "± 0.5",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run - allocs/op",
            "value": 5,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_digit_run",
            "value": 124777,
            "range": "± 601.5",
            "unit": "ns/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - B/op",
            "value": 400,
            "range": "± 0",
            "unit": "B/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero - allocs/op",
            "value": 11,
            "range": "± 0",
            "unit": "allocs/op",
            "extra": "10 samples, median"
          },
          {
            "name": "BenchmarkParseInt64Adversarial/long_leading_zero",
            "value": 622.9,
            "range": "± 9",
            "unit": "ns/op",
            "extra": "10 samples, median"
          }
        ]
      }
    ]
  }
}