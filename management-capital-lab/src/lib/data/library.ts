import type { ResearchSource } from "../types";
import { LITERATURE } from "./literature";

/**
 * The research library has two collections:
 *
 * 1. LITERATURE: the 64 verified records in the Management Capital literature
 *    review database that underpins Chapter Two (generated from the
 *    spreadsheet by scripts/import-literature.py).
 * 2. CONTEXT_SOURCES: institutional and policy sources used for market
 *    context in Chapter One. These are not part of the peer-reviewed
 *    review database.
 */
export { LITERATURE };

export const CONTEXT_SOURCES: ResearchSource[] = [
  {
    id: "ctx-ifc-factsheet",
    title: "Micro, Small and Medium Enterprises Factsheet",
    author: "International Finance Corporation (IFC)",
    year: "2025",
    theme: "Policy & market context",
    summary:
      "MSMEs account for more than 90% of firms worldwide, about 70% of employment and roughly half of global GDP. The formal MSME finance gap is estimated at about US$5.7 trillion, rising to about US$8 trillion when informal enterprises are included.",
    whyItMatters:
      "Cited in Chapter One to establish the scale of the finance gap, while the chapter argues that a gap in aggregate demand is not the same as every firm's binding constraint.",
    createdAt: "2026-11-12",
  },
  {
    id: "ctx-ifc-digital",
    title: "Handbook: MSME Banking in the Digital Era",
    author: "International Finance Corporation (IFC)",
    year: "2025",
    theme: "Policy & market context",
    summary:
      "Banking guidance for serving MSMEs with digital tools. Estimates the MSME funding gap in Sub-Saharan Africa at approximately US$331 billion.",
    whyItMatters:
      "Provides the Sub-Saharan Africa gap estimate used in Chapter One, and shows the opportunity to pair SME finance with better diagnostics.",
    createdAt: "2026-11-12",
  },
  {
    id: "ctx-wb-es",
    title: "Enterprise Surveys Data: Finance and Biggest Obstacle Indicators",
    author: "World Bank",
    year: "2026",
    theme: "Policy & market context",
    summary:
      "Firm-level survey data showing that access to finance remains a major reported obstacle across Sub-Saharan Africa, with severity varying by country, firm size and survey year.",
    whyItMatters:
      "Benchmarks formal SMEs. The Kenya 2025 survey includes management-practice modules, but it cannot represent the many very small and informal firms outside its sampling frame.",
    url: "https://www.enterprisesurveys.org/en/data",
    createdAt: "2026-11-12",
  },
  {
    id: "ctx-wb-smefinance",
    title: "SME Finance",
    author: "World Bank",
    year: "Ongoing",
    theme: "Policy & market context",
    summary:
      "SMEs are central to economies and employment but face major financing constraints.",
    whyItMatters: "Establishes the dominant access-to-finance narrative.",
    url: "https://www.worldbank.org/en/topic/smefinance",
    createdAt: "2026-02-01",
  },
  {
    id: "ctx-bloom-2010",
    title: "Why Do Management Practices Differ Across Firms and Countries?",
    author: "Bloom & Van Reenen",
    year: "2010",
    theme: "Policy & market context",
    summary:
      "Synthesises evidence that management practices vary widely and are associated with firm productivity and performance; competition, ownership and information help explain the variation.",
    whyItMatters:
      "An accessible companion to the World Management Survey research reviewed in Chapter Two.",
    url: "https://www.aeaweb.org/articles?id=10.1257/jep.24.1.203",
    createdAt: "2026-02-01",
  },
  {
    id: "ctx-pedl",
    title: "Poor Management and African Development",
    author: "CEPR / PEDL",
    year: "2019",
    theme: "Policy & market context",
    summary:
      "Discusses the role of management skills in African productivity and development.",
    whyItMatters:
      "Supports the research gap around management practices in African contexts.",
    createdAt: "2026-02-01",
  },
];

/** Themes used in the literature review database, in the order of Chapter Two's evidence map. */
export const LITERATURE_THEMES = [
  "Theory",
  "Management practices",
  "Capital use",
  "Finance",
  "Human capital",
  "Strategy",
  "Governance",
  "Absorptive capacity",
  "Africa context",
] as const;

export const THEME_DESCRIPTIONS: Record<string, string> = {
  Theory: "Defines the causal logic and construct boundaries for the proposed index.",
  "Management practices":
    "Supports observable routines as indicators and shows whether capability can be developed.",
  "Capital use":
    "Directly informs capital-deployment readiness, allocation discipline and post-investment interview questions.",
  Finance:
    "Informs investment readiness, access-to-finance measures and finance-related controls.",
  "Human capital":
    "Informs founder and management-team capability while cautioning against proxy-only measurement.",
  Strategy: "Informs strategic clarity, planning discipline and market orientation.",
  Governance: "Informs accountability, decision rights, reporting and oversight dimensions.",
  "Absorptive capacity":
    "Supports the distinction between potential readiness and realised post-investment absorption.",
  "Africa context":
    "Provides contextual variables and evidence for the Kenya–South Africa comparison.",
};

export const REGIONS = ["Kenya", "South Africa", "Other Africa", "Global"] as const;

export const METHODS = [
  "Experiment (RCT / field)",
  "Quantitative study",
  "Review / meta-analysis",
  "Conceptual / theory",
  "Scale development",
  "Method to verify",
] as const;

/** Headline numbers for the evidence base, computed from the data. */
export const LITERATURE_STATS = {
  total: LITERATURE.length,
  themes: LITERATURE_THEMES.length,
  abstractReviewed: LITERATURE.filter((s) => s.reviewStatus === "Abstract reviewed").length,
  fullTextPending: LITERATURE.filter((s) => s.reviewStatus === "Full text pending").length,
  kenya: LITERATURE.filter((s) => s.region === "Kenya").length,
  southAfrica: LITERATURE.filter((s) => s.region === "South Africa").length,
  africa: LITERATURE.filter((s) => s.region && s.region !== "Global").length,
  experiments: LITERATURE.filter((s) => s.method === "Experiment (RCT / field)").length,
  /** Priority publications appraised from full text for the Chapter Two revision. */
  fullTextAppraised: 27,
  target: { min: 80, max: 100 },
  byTheme: LITERATURE_THEMES.map((theme) => ({
    theme,
    count: LITERATURE.filter((s) => s.theme === theme).length,
  })),
};

/** Kept for backward compatibility with earlier imports. */
export const RESEARCH_SOURCES: ResearchSource[] = [...LITERATURE, ...CONTEXT_SOURCES];
