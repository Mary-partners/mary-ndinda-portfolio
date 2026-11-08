import { test } from "node:test";
import assert from "node:assert/strict";
import { workstreams, sectionsFor } from "../src/content/workstreams/index.ts";
import { phases } from "../src/content/first-year.ts";
import { evidenceRows } from "../src/content/evidence.ts";
import { sources, publicFacts } from "../src/content/sources.ts";
import type { Block, Workstream } from "../src/content/types.ts";

const words = (s: string) => s.split(/\s+/).filter(Boolean).length;

function blocksText(blocks: Block[]): string {
  return blocks
    .map((b) => {
      if (b.kind === "p") return b.text;
      if (b.kind === "list") return b.items.join(" ");
      if (b.kind === "callout") return b.title + " " + b.text;
      if (b.kind === "flow") return b.steps.map((s) => s.label + " " + (s.detail ?? "")).join(" ");
      return "";
    })
    .join(" ");
}

/** Prose only (tables excluded) so the 600–900 word guide is not inflated by templates. */
export function proseWords(w: Workstream): number {
  const parts = [
    w.summary,
    w.outcome.intended,
    w.outcome.why,
    ...w.establishFirst.data,
    ...w.establishFirst.conversations,
    ...w.establishFirst.constraints,
    ...w.method.map((m) => m.title + " " + m.detail),
    ...w.deliverables.map((d) => d.description),
    ...w.gates.map((g) => g.proceedIf + " " + g.deferOrDeclineIf),
    ...w.risks.map((r) => r.risk + " " + r.tradeoff + " " + r.mitigation),
    w.timeline.first90,
    w.timeline.months4to12,
    w.success.looksLike,
    ...w.success.assumptions,
    ...(w.extras ?? []).map((x) => blocksText(x.blocks)),
  ];
  return words(parts.join(" "));
}

test("twelve workstreams, numbered 01–12, unique slugs", () => {
  assert.equal(workstreams.length, 12);
  workstreams.forEach((w, i) => assert.equal(w.number, String(i + 1).padStart(2, "0")));
  assert.equal(new Set(workstreams.map((w) => w.slug)).size, 12);
});

for (const w of workstreams) {
  test(`WS${w.number} has every required element`, () => {
    assert.ok(w.summary.length > 100, "summary");
    assert.ok(w.outcome.intended && w.outcome.why, "outcome");
    assert.ok(w.establishFirst.data.length >= 2 && w.establishFirst.conversations.length >= 2 && w.establishFirst.constraints.length >= 1, "establish first");
    assert.ok(w.method.length >= 4, "method steps");
    assert.ok(w.deliverables.length >= 2, "deliverables");
    assert.ok(w.templates.length >= 1, "at least one populated template");
    assert.ok(w.templates.every((t) => t.rows.length >= 3), "templates are populated");
    assert.ok(w.ownership.lead.length && w.ownership.delegate.length && w.ownership.recommend.length && w.ownership.escalate.length, "ownership");
    assert.ok(w.ownership.dependencies.length >= 2, "dependencies");
    assert.ok(w.gates.length >= 2 && w.gates.every((g) => g.deferOrDeclineIf.length > 20), "gates with defer/decline reasons");
    assert.ok(w.cadence.length >= 2, "cadence");
    assert.ok(w.kpis.length >= 3 && w.kpis.every((k) => k.definition && k.source && k.owner && k.frequency), "KPIs complete");
    assert.ok(w.risks.length >= 3, "risks");
    assert.ok(w.timeline.first90 && w.timeline.months4to12, "timeline");
    assert.ok(w.success.looksLike && w.success.assumptions.length >= 2, "success and assumptions");
    assert.ok(proseWords(w) >= 600, `prose words ${proseWords(w)} below 600`);
  });

  test(`WS${w.number} tables are rectangular and ids unique`, () => {
    const tables = [...w.templates, ...(w.extras ?? []).flatMap((x) => x.blocks.filter((b) => b.kind === "table"))];
    for (const t of tables) {
      if (t.kind !== "table") continue;
      t.rows.forEach((r, i) => assert.equal(r.length, t.columns.length, `${t.caption} row ${i}`));
    }
    const ids = sectionsFor(w).map((s) => s.id);
    assert.equal(new Set(ids).size, ids.length, "section ids unique");
  });

  test(`WS${w.number} uses no real investee names and no em-dash prose`, () => {
    const all = JSON.stringify(w);
    assert.ok(!all.includes("—"), "em dash");
    assert.ok(!/\bwe (have|led|closed)\b/i.test(all));
  });
}

test("first-year deliverables reference real workstreams", () => {
  const nums = new Set(workstreams.map((w) => w.number));
  for (const p of phases) for (const d of p.deliverables) for (const n of d.workstreams) assert.ok(nums.has(n), `${d.deliverable} → ${n}`);
  assert.equal(phases.length, 5);
});

test("evidence map marks core investing requirements as evidence to establish", () => {
  for (const req of ["Proprietary deal origination", "Transaction ownership", "Investment committee", "Board or nominee", "Exits"]) {
    const row = evidenceRows.find((r) => r.requirement.startsWith(req));
    assert.ok(row, req);
    assert.equal(row!.status, "evidence-to-establish");
  }
});

test("every public fact cites a registered source", () => {
  const ids = new Set(sources.map((s) => s.id));
  for (const f of publicFacts) assert.ok(ids.has(f.source));
  assert.equal(sources.length, 7);
});

test("report prose word counts", () => {
  const counts = workstreams.map((w) => `${w.number}:${proseWords(w)}`);
  console.log("prose words", counts.join(" "));
});
