// Allowed values for the string-based status/role fields (SQLite has no enums).

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

// Custom SME maturity anchors (0-4). NOT the official WMS scale.
export const MATURITY_ANCHORS = [
  { score: 0, label: "Absent", desc: "The practice does not exist, or there is no credible evidence of it." },
  { score: 1, label: "Informal", desc: "Exists informally, is inconsistent, or depends entirely on one individual." },
  { score: 2, label: "Introduced", desc: "A defined practice exists with evidence of initial adoption." },
  { score: 3, label: "Consistent", desc: "Used across repeated operating cycles, with assigned responsibility and records." },
  { score: 4, label: "Embedded", desc: "Consistently applied, monitored and improved; evidence shows it informs decisions." },
] as const;

export const DIMENSION_META: { key: string; name: string; description: string }[] = [
  { key: "strategic", name: "Strategic Management", description: "Priorities, resource allocation, decision-making and adaptability." },
  { key: "financial", name: "Financial Management", description: "Records, management accounts, cash forecasting, pricing and financial decisions." },
  { key: "operational", name: "Operational Management", description: "Process documentation, quality, productivity and continuous improvement." },
  { key: "performance", name: "Performance Monitoring", description: "KPI selection, data reliability, review cadence and accountability." },
  { key: "people", name: "People & Talent Management", description: "Structure, role clarity, performance management and succession." },
  { key: "commercial", name: "Commercial Management", description: "Segmentation, pricing, pipeline, customer profitability and retention." },
  { key: "governance", name: "Governance & Delegation", description: "Delegation, authority limits, controls and founder dependency." },
  { key: "learning", name: "Organisational Learning", description: "Problem identification, feedback, experimentation and resilience." },
];

export const DIMENSION_NAME: Record<string, string> = Object.fromEntries(
  DIMENSION_META.map((d) => [d.key, d.name])
);
