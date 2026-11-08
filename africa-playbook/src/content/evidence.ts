import type { EvidenceRow, EvidenceStatus } from "./types";

export const statusLabels: Record<EvidenceStatus, string> = {
  "supplied-awaiting-verification": "Supplied, awaiting verification",
  "partly-transferable": "Partly transferable",
  "evidence-to-establish": "Evidence to establish",
};

/**
 * Candid map of role requirements to transferable evidence.
 * "Supplied" text is deliberately general: specific employers, figures and
 * scopes are held back until approved (see src/content/profile.ts).
 */
export const evidenceRows: EvidenceRow[] = [
  {
    requirement: "Financial leadership and control",
    supplied: "Senior finance leadership in growth-stage African businesses, including CFO-level responsibility, and earlier audit training.",
    relevance: "Direct for reading investee financials, testing management reporting and judging finance-function quality. Not the same as fund investment experience.",
    evidenceNeeded: "Approved role titles, dates and scope of each role; references.",
    status: "supplied-awaiting-verification",
  },
  {
    requirement: "Multi-country operating experience",
    supplied: "Finance leadership spanning several African countries, in separate roles with separate scopes.",
    relevance: "Relevant to cross-border regulation, FX and tax exposure. Scopes must not be combined into one.",
    evidenceNeeded: "Countries covered per role, confirmed separately.",
    status: "supplied-awaiting-verification",
  },
  {
    requirement: "Team leadership",
    supplied: "Leadership of finance teams in operating businesses.",
    relevance: "Relevant to leading and coaching a small Nairobi team. An investment team has different review standards and judgement calls.",
    evidenceNeeded: "Largest team size and context per role; reference from a direct report or manager.",
    status: "supplied-awaiting-verification",
  },
  {
    requirement: "Financial modelling and valuation",
    supplied: "Building financial models, pricing and unit-economics analysis, and financial reconstruction for founders.",
    relevance: "Transferable to investee modelling. Regulated FSP models (credit, funding, capital) need specific depth, shown in Workstream 04 but still to be demonstrated in practice.",
    evidenceNeeded: "A redacted model or work sample approved for sharing; references.",
    status: "partly-transferable",
  },
  {
    requirement: "Investee growth support and institutional capability",
    supplied: "Investment-readiness, reporting-system and finance-operations work with founders, including support to a cohort of early-stage enterprises through an accelerator alumni programme.",
    relevance: "Relevant to value-creation plans and TA design. These were not institutional investments Mary executed, and the enterprises are not Abler Nordic investees.",
    evidenceNeeded: "Programme description approved for sharing; outcomes evidence, if any, with method.",
    status: "partly-transferable",
  },
  {
    requirement: "Systems, data and digitalisation",
    supplied: "Design of reporting systems and finance and climate-finance systems for SMEs, in a product-lead role.",
    relevance: "Relevant to MIS and data-quality diagnostics (Workstream 08).",
    evidenceNeeded: "Approved role description and examples.",
    status: "supplied-awaiting-verification",
  },
  {
    requirement: "Climate finance",
    supplied: "Product work on SME and climate-finance systems.",
    relevance: "Relevant to climate-related themes, subject to the firm's actual framework and methodology.",
    evidenceNeeded: "Approved description of scope and outputs.",
    status: "supplied-awaiting-verification",
  },
  {
    requirement: "Research on management and financial capital",
    supplied: "Ongoing doctoral (DBA) research on how management capital and financial capital interact in African SMEs.",
    relevance: "Informs the playbook's emphasis on capability alongside capital. It is ongoing research, not a completed doctorate or a proven causal finding.",
    evidenceNeeded: "Programme and expected completion, as Mary wishes to state it.",
    status: "supplied-awaiting-verification",
  },
  {
    requirement: "Proprietary deal origination for a fund",
    supplied: "Not supplied.",
    relevance: "Core to the role.",
    evidenceNeeded: "Examples of sourced and qualified opportunities, if any, with Mary's role stated precisely.",
    status: "evidence-to-establish",
  },
  {
    requirement: "Transaction ownership through to close",
    supplied: "Fundraising and investment-readiness support has been supplied. That is not the same as leading an investment transaction.",
    relevance: "Core to the role.",
    evidenceNeeded: "Any transaction where Mary led diligence, structuring or negotiation, with the counterparty's or employer's confirmation.",
    status: "evidence-to-establish",
  },
  {
    requirement: "Investment committee recommendations and approvals",
    supplied: "Not supplied.",
    relevance: "Core to the role.",
    evidenceNeeded: "IC papers authored or presented, if any, described without confidential terms.",
    status: "evidence-to-establish",
  },
  {
    requirement: "Board or nominee-director mandates",
    supplied: "Not supplied.",
    relevance: "Important for portfolio governance (Workstream 07).",
    evidenceNeeded: "Any board, audit-committee or observer roles, with dates.",
    status: "evidence-to-establish",
  },
  {
    requirement: "Exits, refinancings and recoveries",
    supplied: "Not supplied.",
    relevance: "Important for Workstream 11.",
    evidenceNeeded: "Any exit, refinancing or recovery Mary worked on, with her role stated precisely.",
    status: "evidence-to-establish",
  },
  {
    requirement: "Substantial emerging-market private-equity experience",
    supplied: "Not supplied as fund-side experience.",
    relevance: "Explicitly requested in the role description.",
    evidenceNeeded: "A candid account of fund-side exposure, if any. A playbook does not substitute for a track record.",
    status: "evidence-to-establish",
  },
];

export const evidenceIntro =
  "This page maps what the role asks for against the experience Mary has supplied, how far each transfers, and what would need to be evidenced. It is written to be read candidly. Several core requirements are marked 'Evidence to establish', and this playbook does not change that. What it can show is how I would approach the work, and where I would rely on colleagues, the Investment Committee and specialists while building direct investment experience.";

export const howIWouldCloseGaps: string[] = [
  "Work through the first transactions with the CIO or a senior colleague reviewing my memos and models in detail, and invite that challenge rather than treating it as oversight.",
  "Ask for clear delegations and use the IC process to calibrate my judgement against experienced members.",
  "Bring in external specialists for regulatory, legal and valuation questions beyond my experience, using the criteria in Workstream 12.",
  "Keep a personal decision log of recommendations, the reasons for them and what happened, to review with the CIO each quarter.",
];
