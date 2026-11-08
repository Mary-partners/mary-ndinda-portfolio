import type { Category, SectionId, Workstream } from "../types";
import { ws01 } from "./01-strategy.ts";
import { ws02 } from "./02-origination.ts";
import { ws03 } from "./03-diligence.ts";
import { ws04 } from "./04-modelling.ts";
import { ws05 } from "./05-structuring.ts";
import { ws06 } from "./06-fx.ts";
import { ws07 } from "./07-portfolio.ts";
import { ws08 } from "./08-strengthening.ts";
import { ws09 } from "./09-impact.ts";
import { ws10 } from "./10-fundraising.ts";
import { ws11 } from "./11-exits.ts";
import { ws12 } from "./12-leadership.ts";

export const workstreams: Workstream[] = [ws01, ws02, ws03, ws04, ws05, ws06, ws07, ws08, ws09, ws10, ws11, ws12];

export const getWorkstream = (slug: string) => workstreams.find((w) => w.slug === slug);
export const byNumber = (n: string) => workstreams.find((w) => w.number === n);

export const categoryLabels: Record<Category, string> = {
  investment: "Investment",
  portfolio: "Portfolio",
  capital: "Capital",
  leadership: "Leadership",
};

export const sectionTitles: Record<SectionId, string> = {
  outcome: "Intended outcome",
  "before-acting": "What I would establish first",
  method: "How I would do it",
  deliverables: "Deliverables and templates",
  ownership: "Ownership and dependencies",
  gates: "Decision gates",
  kpis: "Cadence and KPIs",
  risks: "Risks and trade-offs",
  timeline: "First 90 days and months 4–12",
  success: "Success and assumptions",
};

export const sectionOrder: SectionId[] = [
  "outcome",
  "before-acting",
  "method",
  "deliverables",
  "ownership",
  "gates",
  "kpis",
  "risks",
  "timeline",
  "success",
];

/** Ordered list of section ids/titles for a workstream, including extras. */
export function sectionsFor(w: Workstream): { id: string; title: string; extra: boolean }[] {
  const out: { id: string; title: string; extra: boolean }[] = [];
  for (const id of sectionOrder) {
    out.push({ id, title: sectionTitles[id], extra: false });
    for (const x of w.extras?.filter((e) => e.after === id) ?? []) out.push({ id: x.id, title: x.title, extra: true });
  }
  return out;
}
