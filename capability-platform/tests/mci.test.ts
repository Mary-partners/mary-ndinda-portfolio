import { test } from "node:test";
import assert from "node:assert/strict";
import { computeScores, type ScoringDimension, type ScoringQuestion, type ScoringResponse } from "../src/lib/scoring";
import { DIMENSION_META } from "../src/lib/constants";
import { FRAMEWORK_CONTENT } from "../src/lib/framework-content";

// Build the MCI 1.1 instrument (6 weighted pillars, 36 questions).
function buildInstrument() {
  const dims: ScoringDimension[] = DIMENSION_META.map((d) => ({ id: d.key, key: d.key, weight: d.weight }));
  const questions: ScoringQuestion[] = [];
  for (const d of FRAMEWORK_CONTENT) {
    d.questions.forEach((_, i) => questions.push({ id: `${d.key}:${i}`, dimensionId: d.key, weight: 1 }));
  }
  return { dims, questions };
}

const toIndex = (s: number | null) => (s === null ? null : Math.round((s / 4) * 100));

function responsesFor(answers: Record<string, number[]>): ScoringResponse[] {
  const out: ScoringResponse[] = [];
  for (const d of FRAMEWORK_CONTENT) {
    const a = answers[d.key];
    d.questions.forEach((_, i) => out.push({ questionId: `${d.key}:${i}`, score: a[i], applicable: true, evidenceStatus: "none" }));
  }
  return out;
}

test("MCI instrument has 6 pillars, 36 questions, weights sum to 100", () => {
  assert.equal(DIMENSION_META.length, 6);
  assert.equal(FRAMEWORK_CONTENT.reduce((n, d) => n + d.questions.length, 0), 36);
  FRAMEWORK_CONTENT.forEach((d) => assert.equal(d.questions.length, 6));
  assert.equal(DIMENSION_META.reduce((n, d) => n + d.weight, 0), 100);
});

test("worked example (Kijani Foods) scores 46.0 / Developing", () => {
  const { dims, questions } = buildInstrument();
  // Example answers from MCI_Question_Bank_v1_1.json (F,G,S,O,L=founder,A=absorption)
  const r = computeScores(dims, questions, responsesFor({
    financial: [2, 2, 1, 2, 2, 1],
    governance: [2, 2, 1, 1, 2, 1],
    strategic: [3, 2, 2, 2, 3, 2],
    operational: [2, 1, 1, 2, 2, 1],
    founder: [3, 2, 2, 2, 3, 2],
    absorption: [2, 1, 1, 1, 2, 1],
  }));
  assert.ok(r.overall !== null);
  assert.ok(Math.abs((r.overall as number) - 1.8416) < 0.002, `overall raw ${r.overall}`);
  assert.equal(toIndex(r.overall), 46);
});

test("all zero = 0, all four = 100", () => {
  const { dims, questions } = buildInstrument();
  const zero = computeScores(dims, questions, questions.map((q) => ({ questionId: q.id, score: 0, applicable: true })));
  assert.equal(toIndex(zero.overall), 0);
  const four = computeScores(dims, questions, questions.map((q) => ({ questionId: q.id, score: 4, applicable: true })));
  assert.equal(toIndex(four.overall), 100);
});

test("unanswered is never scored as zero", () => {
  const { dims, questions } = buildInstrument();
  // Answer only the first question with a 4; overall must reflect that, not 36 zeros.
  const r = computeScores(dims, questions, [{ questionId: questions[0].id, score: 4, applicable: true }]);
  assert.equal(r.totalAnswered, 1);
  assert.equal(toIndex(r.overall), 100);
});
