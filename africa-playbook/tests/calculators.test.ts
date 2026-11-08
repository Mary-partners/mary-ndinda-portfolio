import { test } from "node:test";
import assert from "node:assert/strict";
import { computeEquityCase, DEFAULT_INPUTS, PRESETS, validate, type EquityInputs } from "../src/lib/equity-case.ts";
import { CRITERIA, DEFAULT_MARKETS, scoreMarkets, normaliseWeights } from "../src/lib/prioritisation.ts";

const close = (a: number, b: number, tol = 1e-3) => assert.ok(Math.abs(a - b) <= tol, `${a} not within ${tol} of ${b}`);

test("default equity case matches hand-checked values", () => {
  // 400 × 8 = 3,200 LCUm; × 25% = 800; × 0.98 = 784; ÷ 120 = 6.5333 USDm
  const r = computeEquityCase(DEFAULT_INPUTS);
  assert.equal(r.status, "ok");
  close(r.equityValueLcuM, 3200);
  close(r.afterCostsLcuM, 784);
  close(r.exitFx, 120);
  close(r.proceedsUsdM, 6.5333);
  close(r.moic, 1.3067);
  close(r.annualisedReturn as number, 0.05495, 1e-4); // ≈ 5.50%
  close(r.proceedsAtInitialFxUsdM, 7.84);
  close(r.fxDragUsdM, 1.3067);
  // Break-even P/E: 5 × 120 ÷ (400 × 0.25 × 0.98) = 6.1224
  close(r.breakEvenPe as number, 6.1224);
});

test("downside preset", () => {
  // 300 × 6 = 1,800; × 25% = 450; × 0.97 = 436.5; ÷ 135 = 3.2333; MOIC 0.6467; 0.6467^(1/6) − 1 = −7.01%
  const r = computeEquityCase(PRESETS[1].inputs);
  close(r.proceedsUsdM, 3.2333);
  close(r.moic, 0.6467);
  close(r.annualisedReturn as number, -0.0701, 1e-4);
});

test("stress preset", () => {
  // 150 × 5 = 750; × 25% = 187.5; × 0.96 = 180; ÷ 160 = 1.125; MOIC 0.225; 0.225^(1/7) − 1 = −19.19%
  const r = computeEquityCase(PRESETS[2].inputs);
  close(r.proceedsUsdM, 1.125);
  close(r.moic, 0.225);
  close(r.annualisedReturn as number, -0.1919, 1e-4);
});

test("zero and negative earnings are flagged, not computed as returns", () => {
  const z = computeEquityCase({ ...DEFAULT_INPUTS, netIncomeLcuM: 0 });
  assert.equal(z.status, "zero-earnings");
  assert.equal(z.annualisedReturn, null);
  const n = computeEquityCase({ ...DEFAULT_INPUTS, netIncomeLcuM: -50 });
  assert.equal(n.status, "negative-earnings");
  assert.equal(n.proceedsUsdM, 0);
});

test("appreciation increases USD proceeds", () => {
  const r = computeEquityCase({ ...DEFAULT_INPUTS, depreciationPct: -10 });
  close(r.exitFx, 90);
  assert.ok(r.proceedsUsdM > 7.84);
});

test("validation rejects blanks, text, out-of-range and fractional years", () => {
  const raw = Object.fromEntries(Object.entries(DEFAULT_INPUTS).map(([k, v]) => [k, String(v)])) as Record<keyof EquityInputs, string>;
  assert.ok(validate(raw).values);
  assert.equal(validate({ ...raw, entryUsdM: "" }).errors.entryUsdM, "Required.");
  assert.equal(validate({ ...raw, exitPe: "abc" }).errors.exitPe, "Enter a number.");
  assert.ok(validate({ ...raw, entryUsdM: "0" }).errors.entryUsdM);
  assert.ok(validate({ ...raw, ownershipPct: "120" }).errors.ownershipPct);
  assert.ok(validate({ ...raw, years: "4.5" }).errors.years);
});

test("prioritisation: defaults reproduce the Workstream 01 worked example", () => {
  const w = Object.fromEntries(CRITERIA.map((c) => [c.id, c.defaultWeight]));
  const { results } = scoreMarkets(DEFAULT_MARKETS, w);
  const by = Object.fromEntries(results.map((r) => [r.id, r]));
  close(by.ke.score as number, 67.8);
  close(by.ug.score as number, 62.4);
  close(by.tz.score as number, 62.4);
  close(by.gh.score as number, 53.0);
  assert.equal(by.ci.status, "incomplete");
  assert.equal(by.ci.score, null);
  assert.equal(by.ci.rank, null);
  assert.equal(by.ke.rank, 1);
  assert.equal(by.ug.rank, 2);
  assert.equal(by.tz.rank, 2); // tie shares rank
  assert.equal(by.gh.rank, 4);
});

test("prioritisation: failed screen excludes regardless of score", () => {
  const w = Object.fromEntries(CRITERIA.map((c) => [c.id, c.defaultWeight]));
  const markets = DEFAULT_MARKETS.map((m) => (m.id === "ke" ? { ...m, screens: { ...m.screens, sanctions: "fail" as const } } : m));
  const ke = scoreMarkets(markets, w).results.find((r) => r.id === "ke")!;
  assert.equal(ke.status, "excluded");
  assert.equal(ke.score, null);
});

test("prioritisation: weights normalise to 100 and zero weights invalidate", () => {
  const n = normaliseWeights({ a: 1, b: 3 });
  close(n.a + n.b, 100);
  close(n.b, 75);
  const zero = Object.fromEntries(CRITERIA.map((c) => [c.id, 0]));
  const { weightsValid, results } = scoreMarkets(DEFAULT_MARKETS, zero);
  assert.equal(weightsValid, false);
  assert.ok(results.every((r) => r.status !== "scored"));
});

test("prioritisation: a zero-weighted criterion with missing data does not block scoring", () => {
  const w = Object.fromEntries(CRITERIA.map((c) => [c.id, c.defaultWeight]));
  w.regulation = 0;
  w.protection = 0;
  const markets = DEFAULT_MARKETS.map((m) => (m.id === "ci" ? { ...m, screens: { ...m.screens, route: "pass" as const } } : m));
  const ci = scoreMarkets(markets, w).results.find((r) => r.id === "ci")!;
  assert.equal(ci.status, "scored");
});
