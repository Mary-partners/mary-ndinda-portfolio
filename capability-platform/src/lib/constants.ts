// Allowed values for the string-based status/role fields (stored as strings for portability).

export const ROLES = {
  ADMIN: "ADMIN",
  PROGRAM_MANAGER: "PROGRAM_MANAGER",
  ADVISOR: "ADVISOR",
  FOUNDER: "FOUNDER",
  REVIEWER: "REVIEWER",
} as const;
export type Role = (typeof ROLES)[keyof typeof ROLES];

export const ROLE_LABELS: Record<string, string> = {
  ADMIN: "Platform Administrator",
  PROGRAM_MANAGER: "Programme Manager",
  ADVISOR: "Enterprise Advisor",
  FOUNDER: "Founder / Company Manager",
  REVIEWER: "Independent Reviewer",
};

export const PLAN_STATUSES = [
  "Not started",
  "In progress",
  "Awaiting company action",
  "Awaiting advisor review",
  "Evidence submitted",
  "Changes requested",
  "Verified",
  "Rejected",
  "Blocked",
] as const;
export type PlanStatus = (typeof PLAN_STATUSES)[number];

export const MILESTONE_STATUSES = [
  "Not started",
  "In progress",
  "Evidence submitted",
  "Verified",
  "Rejected",
] as const;

export const EVIDENCE_STATUSES = [
  "Submitted",
  "Under review",
  "More info required",
  "Verified",
  "Rejected",
  "Superseded",
] as const;

export const CONSTRAINT_TYPES = [
  "WorkingCapital",
  "InvestmentCapital",
  "MarketDemand",
  "BusinessModel",
  "Infrastructure",
  "Regulation",
  "Technology",
  "SkilledLabour",
] as const;

export const CONSTRAINT_LABELS: Record<string, string> = {
  WorkingCapital: "Working capital",
  InvestmentCapital: "Investment capital",
  MarketDemand: "Market demand",
  BusinessModel: "Business model viability",
  Infrastructure: "Infrastructure",
  Regulation: "Regulation",
  Technology: "Technology",
  SkilledLabour: "Skilled labour",
};

// Answer scale (0-4) used when responding to each diagnostic question.
export const MATURITY_ANCHORS = [
  { score: 0, label: "Absent", desc: "The practice does not exist, or there is no credible evidence of it." },
  { score: 1, label: "Informal", desc: "Exists informally, is inconsistent, or depends entirely on one individual." },
  { score: 2, label: "Introduced", desc: "A defined practice exists with evidence of initial adoption." },
  { score: 3, label: "Consistent", desc: "Used across repeated operating cycles, with assigned responsibility and records." },
  { score: 4, label: "Embedded", desc: "Consistently applied, monitored and improved; evidence shows it informs decisions." },
] as const;

// The Management Capital Index — 6 pillars, as published at
// https://www.managementcapitallab.com/framework (Mary Ndinda, DBA research).
export const DIMENSION_META: { key: string; name: string; description: string }[] = [
  { key: "financial", name: "Financial Management Capability", description: "The ability to plan, track, control and interpret the financial position." },
  { key: "governance", name: "Governance and Accountability", description: "Structures, controls and accountability that make decisions traceable and reduce founder concentration." },
  { key: "strategic", name: "Strategic Clarity", description: "A coherent understanding of the model, customer, market and how capital translates into growth." },
  { key: "operational", name: "Operational Systems", description: "Processes, tools and structures that let the business deliver consistently and scale without chaos." },
  { key: "founder", name: "Founder and Management Capability", description: "The judgement, discipline, financial literacy and leadership maturity of the people running the business." },
  { key: "absorption", name: "Capital Absorption Capability", description: "The ability to receive capital and convert it into productive outcomes." },
];

// Management Capital Index readiness bands (overall score out of 100).
export const READINESS_BANDS: { min: number; max: number; label: string; tone: "bad" | "warn" | "ok"; description: string }[] = [
  { min: 0, max: 20, label: "Fragile", tone: "bad", description: "Survival-focused; systems and records are largely absent." },
  { min: 21, max: 40, label: "Emerging", tone: "bad", description: "Some structure forming, but numbers are not yet reliable." },
  { min: 41, max: 60, label: "Developing", tone: "warn", description: "Basic systems in place; readiness is uneven across pillars." },
  { min: 61, max: 80, label: "Finance-preparing", tone: "ok", description: "Close to ready; specific gaps to close before financing." },
  { min: 81, max: 100, label: "Finance-ready", tone: "ok", description: "Evidence, discipline and absorption capacity are in place." },
];

export const DIMENSION_NAME: Record<string, string> = Object.fromEntries(
  DIMENSION_META.map((d) => [d.key, d.name])
);
