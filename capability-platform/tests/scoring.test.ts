import { test } from "node:test";
import assert from "node:assert/strict";
import { computeScores, interventionPriority } from "../src/lib/scoring";
import { pctChange } from "../src/lib/utils";

const dims = [
  { id: "d1", key: "a", weight: 1 },
  { id: "d2", key: "b", weight: 1 },
];
const questions = [
  { id: "q1", dimensionId: "d1", weight: 1 },
  { id: "q2", dimensionId: "d1", weight: 1 },
  { id: "q3", dimensionId: "d2", weight: 1 },
];

test("weighted average of answered applicable questions", () => {
  const r = computeScores(dims, questions, [
    { questionId: "q1", score: 2, applicable: true },
    { questionId: "q2", score: 4, applicable: true },
    { questionId: "q3", score: 3, applicable: true },
  ]);
  assert.equal(r.dimensions.find((d) => d.dimensionId === "d1")!.score, 3); // (2+4)/2
  assert.equal(r.dimensions.find((d) => d.dimensionId === "d2")!.score, 3);
  assert.equal(r.overall, 3);
  assert.equal(r.completeness, 1);
});

test("unanswered questions are never scored as zero", () => {
  const r = computeScores(dims, questions, [
    { questionId: "q1", score: 4, applicable: true },
    // q2 unanswered, q3 unanswered
  ]);
  // d1 score should be 4 (only q1 counts), not 2 (which would treat q2 as 0)
  assert.equal(r.dimensions.find((d) => d.dimensionId === "d1")!.score, 4);
  // d2 has no answers -> null, not 0
  assert.equal(r.dimensions.find((d) => d.dimensionId === "d2")!.score, null);
  assert.ok(r.completeness < 1);
});

test("not-applicable questions are excluded from denominators", () => {
  const r = computeScores(dims, questions, [
    { questionId: "q1", score: 4, applicable: true },
    { questionId: "q2", score: 0, applicable: false },
    { questionId: "q3", score: 2, applicable: true },
  ]);
  assert.equal(r.dimensions.find((d) => d.dimensionId === "d1")!.score, 4); // q2 NA excluded
  assert.equal(r.totalApplicable, 2);
});

test("evidence coverage counts only verified evidence", () => {
  const r = computeScores(dims, questions, [
    { questionId: "q1", score: 3, applicable: true, evidenceStatus: "verified" },
    { questionId: "q2", score: 3, applicable: true, evidenceStatus: "claimed" },
    { questionId: "q3", score: 3, applicable: true, evidenceStatus: "none" },
  ]);
  assert.equal(Math.round(r.evidenceCoverage * 100), 33);
});

test("percentage change guards missing/zero/negative baselines", () => {
  assert.equal(pctChange(100, 150).value, 50);
  assert.equal(pctChange(null, 150).value, null);
  assert.equal(pctChange(0, 150).value, null);
  assert.equal(pctChange(-10, 150).value, null);
});

test("intervention priority is monotonic in gap", () => {
  const low = interventionPriority({ gap: 1, importance: 2, riskSeverity: 2, feasibility: 2, evidenceConfidence: 2 });
  const high = interventionPriority({ gap: 3, importance: 2, riskSeverity: 2, feasibility: 2, evidenceConfidence: 2 });
  assert.ok(high > low);
});
