import { test } from "node:test";
import assert from "node:assert/strict";
import { computeV2, buildPlanV2, type V2Input } from "../src/lib/scoring-v2";
import { MCI_ITEMS, bandV2, roundHalfUp } from "../src/lib/mci-v2";

// Pwani Food Packaging synthetic fixture (bank order per pillar).
const PWANI: Record<string, number[]> = {
  financial: [1, 2, 1, 2, 2, 2],
  governance: [3, 3, 2, 3, 2, 3],
  strategic: [3, 3, 2, 3, 2, 2],
  operational: [2, 2, 2, 2, 1, 2],
  founder: [2, 2, 1, 2, 2, 3],
  absorption: [2, 2, 2, 2, 3, 2],
};

function inputs(ans: Record<string, number[]>): V2Input[] {
  const out: V2Input[] = [];
  for (const it of MCI_ITEMS) {
    const score = ans[it.pillar]?.[it.order - 1];
    out.push({ code: it.code, status: "numeric", score });
  }
  return out;
}

test("fixture: Pwani scores 53/100 Developing", () => {
  const r = computeV2(inputs(PWANI));
  assert.equal(r.mci, 53);
  assert.equal(r.overallBand.label, "Developing");
  assert.equal(r.totalNumeric, 36);
  assert.equal(r.totalApplicable, 36);
});

test("fixture: pillar displays 42,67,63,46,50,54", () => {
  const r = computeV2(inputs(PWANI));
  const by = Object.fromEntries(r.pillars.map((p) => [p.key, p.display]));
  assert.equal(by.financial, 42);
  assert.equal(by.governance, 67);
  assert.equal(by.strategic, 63);
  assert.equal(by.operational, 46);
  assert.equal(by.founder, 50);
  assert.equal(by.absorption, 54);
});

test("fixture: priorities FM01, FM03, OP05 and finance Start now FM01+FM03", () => {
  const p = buildPlanV2(inputs(PWANI));
  assert.deepEqual(p.priorities.map((x) => x.code), ["FM01", "FM03", "OP05"]);
  assert.deepEqual(p.priorities.map((x) => x.horizon), ["Days 1-30", "Days 31-60", "Days 61-90"]);
  const startNow = p.startNow.map((x) => x.code).sort();
  assert.ok(startNow.includes("FM01") && startNow.includes("FM03"));
});

test("round-half-up: 62.5 -> 63, boundaries", () => {
  assert.equal(roundHalfUp(62.5), 63);
  assert.equal(roundHalfUp(41.666 * 1), 42);
  assert.equal(roundHalfUp(0.5), 1);
});

test("all zeros -> 0 Starting out; all fours -> 100 Embedded", () => {
  const zeros = MCI_ITEMS.map((i) => ({ code: i.code, status: "numeric" as const, score: 0 }));
  const fours = MCI_ITEMS.map((i) => ({ code: i.code, status: "numeric" as const, score: 4 }));
  const z = computeV2(zeros), f = computeV2(fours);
  assert.equal(z.mci, 0);
  assert.equal(z.overallBand.label, "Starting out");
  assert.equal(f.mci, 100);
  assert.equal(f.overallBand.label, "Embedded");
});

test("coverage gate: a pillar with only 3 applicable items cannot qualify", () => {
  // Make financial have 3 N/A (only 3 applicable), rest fully rated.
  const list: V2Input[] = MCI_ITEMS.map((i) => {
    if (i.pillar === "financial" && i.order > 3) return { code: i.code, status: "na" as const, score: null };
    return { code: i.code, status: "numeric" as const, score: 3 };
  });
  const r = computeV2(list);
  const fin = r.pillars.find((p) => p.key === "financial")!;
  assert.equal(fin.qualifies, false);
  assert.equal(fin.display, null);
  assert.equal(r.overallQualifies, false);
  assert.equal(r.mci, null);
});

// CFOIP regression: 48/100 Developing, Governance and Strategic Clarity tied at
// 1.17/4, priorities FM03 (1/4), FM02 (1/4), GA01 (0/4).
const CFOIP: Record<string, number[]> = {
  financial: [3, 1, 1, 3, 2, 2],
  governance: [0, 2, 1, 2, 1, 1],
  strategic: [1, 1, 1, 2, 1, 1],
  operational: [2, 2, 2, 3, 2, 3],
  founder: [2, 2, 2, 3, 2, 3],
  absorption: [2, 3, 2, 3, 2, 3],
};

test("CFOIP regression: 48/100 Developing with Governance and Strategic tied", () => {
  const r = computeV2(inputs(CFOIP));
  assert.equal(r.mci, 48);
  assert.equal(r.overallBand.label, "Developing");
  const by = Object.fromEntries(r.pillars.map((p) => [p.key, p.raw ?? NaN]));
  assert.ok(Math.abs(by.governance - 7 / 6) < 1e-9);
  assert.ok(Math.abs(by.strategic - 7 / 6) < 1e-9);
  // both are the joint lowest
  const minRaw = Math.min(...r.pillars.map((p) => p.raw ?? 9));
  assert.ok(Math.abs(by.governance - minRaw) < 1e-9 && Math.abs(by.strategic - minRaw) < 1e-9);
});

test("CFOIP regression: priorities FM03, FM02, GA01 with scores 1,1,0", () => {
  const p = buildPlanV2(inputs(CFOIP));
  assert.deepEqual(p.priorities.map((x) => x.code), ["FM03", "FM02", "GA01"]);
  assert.deepEqual(p.priorities.map((x) => x.score), [1, 1, 0]);
});

test("75% coverage: 4 of 5 applicable qualifies, 4 of 6 fails", () => {
  // pillar with 1 N/A + 1 unknown + 4 numeric => 5 applicable, 4 numeric = 80% -> qualifies
  const pass: V2Input[] = MCI_ITEMS.map((i) => {
    if (i.pillar === "financial") {
      if (i.order === 6) return { code: i.code, status: "na" as const, score: null };
      if (i.order === 5) return { code: i.code, status: "dontknow" as const, score: null };
      return { code: i.code, status: "numeric" as const, score: 3 };
    }
    return { code: i.code, status: "numeric" as const, score: 3 };
  });
  assert.equal(computeV2(pass).pillars.find((p) => p.key === "financial")!.qualifies, true);
  // pillar with 2 unknown + 4 numeric => 6 applicable, 4 numeric = 66% -> fails
  const fail: V2Input[] = MCI_ITEMS.map((i) => {
    if (i.pillar === "financial" && i.order >= 5) return { code: i.code, status: "dontknow" as const, score: null };
    return { code: i.code, status: "numeric" as const, score: 3 };
  });
  assert.equal(computeV2(fail).pillars.find((p) => p.key === "financial")!.qualifies, false);
});
