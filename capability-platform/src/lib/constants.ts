// The app is served under this base path (managementcapitallab.com/platform).
// next/link, router and redirect() prefix it automatically; use it only for
// plain <a> hrefs and manually-built URLs.
export const BASE_PATH = "/platform";

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

// Management Capital Index instrument version.
export const FRAMEWORK_VERSION = "1.1";

// Answer scale (0-4): MCI 1.1 practice levels.
export const MATURITY_ANCHORS = [
  { score: 0, label: "Not in place", desc: "The practice does not exist." },
  { score: 1, label: "Occasional", desc: "Occasional, or entirely dependent on one person." },
  { score: 2, label: "Basic", desc: "Basic, but inconsistent." },
  { score: 3, label: "Regular", desc: "Used regularly and supported by recent examples." },
  { score: 4, label: "Embedded", desc: "Embedded, reviewed and improved over time." },
] as const;

// The Management Capital Index (MCI 1.1): six pillars, proposed weights and
// plain-language labels. managementcapitallab.com/framework (Mary Ndinda, DBA).
export const DIMENSION_META: { key: string; name: string; label: string; weight: number; description: string }[] = [
  { key: "financial", name: "Financial Management Capability", label: "Know the numbers", weight: 15, description: "Reliable records, pricing, cash planning, and informed choices." },
  { key: "governance", name: "Governance and Accountability", label: "Clear responsibility", weight: 15, description: "Roles, decisions, checks, accountability and oversight." },
  { key: "strategic", name: "Strategic Clarity", label: "Know where to grow", weight: 20, description: "Customers, demand, value proposition, priorities and direction." },
  { key: "operational", name: "Operational Systems", label: "Deliver consistently", weight: 20, description: "Repeatable processes, service quality, tracking and reliability." },
  { key: "founder", name: "Founder and Management Capability", label: "Lead and adapt", weight: 20, description: "Team leadership, delegation, learning, problem solving and execution." },
  { key: "absorption", name: "Capital Absorption Capability", label: "Use resources well", weight: 10, description: "Plan resources, choose suitable financing and measure what changes." },
];

// MCI capability stages (overall 0-100). Legacy website bands kept as aliases.
export const READINESS_BANDS: { min: number; max: number; label: string; legacy: string; tone: "bad" | "warn" | "ok"; description: string }[] = [
  { min: 0, max: 20, label: "Fragile", legacy: "Fragile", tone: "bad", description: "Most essential business routines absent." },
  { min: 21, max: 40, label: "Emerging", legacy: "Emerging", tone: "bad", description: "First practices present but inconsistent." },
  { min: 41, max: 60, label: "Developing", legacy: "Developing", tone: "warn", description: "Some routines work; important gaps remain." },
  { min: 61, max: 80, label: "Established", legacy: "Finance-preparing", tone: "ok", description: "Core practices mostly consistent." },
  { min: 81, max: 100, label: "Strong", legacy: "Finance-ready", tone: "ok", description: "Well-embedded practices and ongoing improvement." },
];

export const DIMENSION_NAME: Record<string, string> = Object.fromEntries(
  DIMENSION_META.map((d) => [d.key, d.name])
);
