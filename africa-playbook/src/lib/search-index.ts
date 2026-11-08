import type { Block, Category, SectionId, Workstream } from "@/content/types";
import { sectionsFor, workstreams } from "@/content/workstreams";

export interface SearchSection {
  id: string;
  title: string;
  text: string;
}

export interface SearchDoc {
  slug: string;
  number: string;
  title: string;
  tagline: string;
  categories: Category[];
  keywords: string;
  sections: SearchSection[];
}

const blocksText = (blocks: Block[]) =>
  blocks
    .map((b) => {
      switch (b.kind) {
        case "p":
          return b.text;
        case "list":
          return b.items.join(" ");
        case "callout":
          return `${b.title}. ${b.text}`;
        case "flow":
          return b.caption + " " + b.steps.map((s) => `${s.label} ${s.detail ?? ""}`).join(" ");
        case "table":
          return b.caption + " " + b.columns.join(" ") + " " + b.rows.map((r) => r.join(" ")).join(" ");
      }
    })
    .join(" ");

function standardText(w: Workstream, id: SectionId): string {
  switch (id) {
    case "outcome":
      return `${w.summary} ${w.outcome.intended} ${w.outcome.why}`;
    case "before-acting":
      return [...w.establishFirst.data, ...w.establishFirst.conversations, ...w.establishFirst.constraints].join(" ");
    case "method":
      return w.method.map((m) => `${m.title}. ${m.detail}`).join(" ");
    case "deliverables":
      return w.deliverables.map((d) => `${d.name}. ${d.description}`).join(" ") + " " + blocksText(w.templates);
    case "ownership":
      return [...w.ownership.lead, ...w.ownership.delegate, ...w.ownership.recommend, ...w.ownership.escalate, ...w.ownership.dependencies.map((d) => `${d.party} ${d.need}`)].join(" ");
    case "gates":
      return w.gates.map((g) => `${g.gate}. ${g.proceedIf} ${g.deferOrDeclineIf}`).join(" ");
    case "kpis":
      return w.cadence.join(" ") + " " + w.kpis.map((k) => `${k.name}. ${k.definition} ${k.source} ${k.owner} ${k.frequency} ${k.threshold ?? ""}`).join(" ");
    case "risks":
      return w.risks.map((r) => `${r.risk} ${r.tradeoff} ${r.mitigation}`).join(" ");
    case "timeline":
      return `${w.timeline.first90} ${w.timeline.months4to12}`;
    case "success":
      return `${w.success.looksLike} ${w.success.assumptions.join(" ")}`;
  }
}

export function buildSearchIndex(): SearchDoc[] {
  return workstreams.map((w) => ({
    slug: w.slug,
    number: w.number,
    title: w.title,
    tagline: w.tagline,
    categories: [w.category, ...(w.alsoIn ?? [])],
    keywords: w.keywords.join(" "),
    sections: sectionsFor(w).map((s) => {
      const extra = w.extras?.find((x) => x.id === s.id);
      return { id: s.id, title: s.title, text: extra ? blocksText(extra.blocks) : standardText(w, s.id as SectionId) };
    }),
  }));
}
