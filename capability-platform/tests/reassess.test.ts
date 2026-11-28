import { test } from "node:test";
import assert from "node:assert/strict";
import { reassessFrom, REASSESS_WINDOW_DAYS } from "../src/lib/reassess";

const DAY = 24 * 60 * 60 * 1000;
const daysAgo = (n: number) => new Date(Date.now() - n * DAY);

test("no prior assessment: a first assessment is always allowed", () => {
  const g = reassessFrom(null);
  assert.equal(g.hasAssessment, false);
  assert.equal(g.canStart, true);
  assert.equal(g.nextEligibleAt, null);
});

test("just completed: reassessment is blocked and dated 90 days out", () => {
  const last = new Date();
  const g = reassessFrom(last);
  assert.equal(g.hasAssessment, true);
  assert.equal(g.canStart, false);
  const expected = last.getTime() + REASSESS_WINDOW_DAYS * DAY;
  assert.equal(g.nextEligibleAt?.getTime(), expected);
});

test("within the window (89 days): still blocked", () => {
  assert.equal(reassessFrom(daysAgo(89)).canStart, false);
});

test("at the boundary (90 days): allowed", () => {
  assert.equal(reassessFrom(daysAgo(90)).canStart, true);
});

test("after the window (91 days): allowed", () => {
  assert.equal(reassessFrom(daysAgo(91)).canStart, true);
});
