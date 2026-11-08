/**
 * Content model for the Africa Investment & Leadership Playbook.
 *
 * Every substantive statement on the site belongs to one of four evidence
 * classes. Components render the class visibly next to the content, so a
 * reader never has to look in the footer to learn whether something is a
 * sourced fact, a candidate claim, a proposal or fictional illustration.
 */

export type EvidenceClass =
  /** Public source fact. Must cite a SourceId and carry a date. */
  | "public"
  /** Candidate-supplied experience, awaiting verification for external circulation. */
  | "candidate"
  /** Proposed approach. Not an existing Abler Nordic policy. */
  | "proposed"
  /** Illustrative data. Fictional, not investment guidance. */
  | "illustrative";

export type Category = "investment" | "portfolio" | "capital" | "leadership";

export type SourceId = "S1" | "S2" | "S3" | "S4" | "S5" | "S6" | "S7";

/* ------------------------------------------------------------------ */
/* Rich content blocks                                                  */
/* ------------------------------------------------------------------ */

export interface ParagraphBlock {
  kind: "p";
  text: string;
}

export interface ListBlock {
  kind: "list";
  ordered?: boolean;
  items: string[];
}

export interface TableBlock {
  kind: "table";
  /** Short, descriptive caption. Rendered as <caption>. */
  caption: string;
  evidence: EvidenceClass;
  columns: string[];
  /** Each row must have exactly columns.length cells. */
  rows: string[][];
  /** Optional note rendered under the table (assumptions, limits). */
  note?: string;
}

export interface CalloutBlock {
  kind: "callout";
  tone: "gate" | "note" | "risk" | "example";
  title: string;
  text: string;
  evidence?: EvidenceClass;
}

/** A simple left-to-right (stacked on mobile) process diagram. */
export interface FlowBlock {
  kind: "flow";
  caption: string;
  evidence: EvidenceClass;
  steps: { label: string; detail?: string }[];
}

export type Block = ParagraphBlock | ListBlock | TableBlock | CalloutBlock | FlowBlock;

/* ------------------------------------------------------------------ */
/* Workstream structure                                                 */
/* ------------------------------------------------------------------ */

export interface MethodStep {
  title: string;
  /** Explain the decision being made, not just the activity. */
  detail: string;
}

export interface Deliverable {
  name: string;
  description: string;
}

export interface Ownership {
  /** What I would lead personally. */
  lead: string[];
  /** What I would delegate, and to whom (role, not name). */
  delegate: string[];
  /** What I would recommend for others' decision. */
  recommend: string[];
  /** What I would escalate, and to whom. */
  escalate: string[];
  /** Dependencies on other functions. */
  dependencies: { party: string; need: string }[];
}

export interface DecisionGate {
  gate: string;
  proceedIf: string;
  deferOrDeclineIf: string;
}

export interface Kpi {
  name: string;
  definition: string;
  source: string;
  owner: string;
  frequency: string;
  /** Proposed threshold. Always rendered with a "Proposed threshold" label. */
  threshold?: string;
}

export interface Risk {
  risk: string;
  tradeoff: string;
  mitigation: string;
}

/** Stable section ids used for deep links: /playbook/[slug]#[sectionId] */
export type SectionId =
  | "outcome"
  | "before-acting"
  | "method"
  | "deliverables"
  | "ownership"
  | "gates"
  | "kpis"
  | "risks"
  | "timeline"
  | "success";

export interface ExtraSection {
  /** Kebab-case id, unique within the workstream, used for deep links. */
  id: string;
  title: string;
  /** Render this extra section immediately after the named standard section. */
  after: SectionId;
  evidence: EvidenceClass;
  blocks: Block[];
}

export interface Workstream {
  /** "01".."12" */
  number: string;
  slug: string;
  title: string;
  /** Up to ~4 words, used in navigation. */
  shortTitle: string;
  /** Primary filter category. */
  category: Category;
  /** Additional categories for filtering. */
  alsoIn?: Category[];
  /** One sentence for index rows. */
  tagline: string;
  /** Executive summary: 2–4 sentences, first person. */
  summary: string;
  /** 1. Intended outcome and why it matters. */
  outcome: { intended: string; why: string };
  /** 2. What I would establish before acting. */
  establishFirst: { data: string[]; conversations: string[]; constraints: string[] };
  /** 3. Sequential execution method. */
  method: MethodStep[];
  /** 4. Practical deliverables. */
  deliverables: Deliverable[];
  /** 4. At least one fully populated illustrative template. */
  templates: TableBlock[];
  /** 5. Ownership. */
  ownership: Ownership;
  /** 6. Decision gates. */
  gates: DecisionGate[];
  /** 7. Cadence. */
  cadence: string[];
  /** 7. KPIs. */
  kpis: Kpi[];
  /** 8. Risks, trade-offs and mitigations. */
  risks: Risk[];
  /** 9. First 90-day output and months 4–12 outcome. */
  timeline: { first90: string; months4to12: string };
  /** 10. What success looks like and assumptions to validate. */
  success: { looksLike: string; assumptions: string[] };
  /** Optional deeper sections (diagnostics, worked examples, matrices). */
  extras?: ExtraSection[];
  /** Search terms not otherwise present in the text. */
  keywords: string[];
}

/* ------------------------------------------------------------------ */
/* Sources, evidence map, first-year plan                               */
/* ------------------------------------------------------------------ */

export type SourceCheckStatus =
  | "verified"
  /** Could not be retrieved from the build environment; supplied context used. */
  | "not-rechecked";

export interface Source {
  id: SourceId;
  title: string;
  publisher: string;
  url: string;
  /** Publication date if known, ISO or descriptive. */
  published: string;
  status: SourceCheckStatus;
  statusNote: string;
  usedFor: string[];
}

export interface PublicFact {
  id: string;
  statement: string;
  source: SourceId;
  asOf: string;
  caveat?: string;
}

export type EvidenceStatus =
  | "supplied-awaiting-verification"
  | "partly-transferable"
  | "evidence-to-establish";

export interface EvidenceRow {
  requirement: string;
  supplied: string;
  relevance: string;
  evidenceNeeded: string;
  status: EvidenceStatus;
}

export interface PhaseDeliverable {
  deliverable: string;
  dependencies: string;
  owner: string;
  evidence: string;
  acceptance: string;
  /** Workstream numbers this deliverable draws on. */
  workstreams: string[];
}

export interface Phase {
  id: string;
  label: string;
  window: string;
  intent: string;
  deliverables: PhaseDeliverable[];
}
