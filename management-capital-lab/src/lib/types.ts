export type ContributionStatus = "pending" | "approved" | "rejected";

export type Role =
  | "Founder"
  | "Bank / Lender"
  | "Investor"
  | "Advisor"
  | "Researcher"
  | "ESO"
  | "Policymaker"
  | "Development Partner"
  | "Other";

export interface Contribution {
  id: string;
  prompt: string;
  content: string;
  name: string;
  isAnonymous: boolean;
  email: string;
  role: Role | string;
  country: string;
  sector: string;
  organisation: string;
  consentToContact: boolean;
  consentToPublish: boolean;
  status: ContributionStatus;
  color: NoteColor;
  themes: string[];
  createdAt: string;
  updatedAt: string;
  approvedAt: string | null;
  // True for the sample notes seeded at launch, so the UI can label them.
  illustrative?: boolean;
}

export interface CollaborationLead {
  id: string;
  name: string;
  email: string;
  organisation: string;
  role: string;
  country: string;
  collaborationType: string;
  message: string;
  consentToContact: boolean;
  createdAt: string;
}

export type NoteColor =
  | "yellow"
  | "blue"
  | "green"
  | "pink"
  | "cream"
  | "lavender";

export interface FieldNote {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  body: string[];
  category: string;
  tags: string[];
  publishedAt: string;
  readingTime: number;
  status: "published" | "draft";
}

export type SourceRegion = "Kenya" | "South Africa" | "Other Africa" | "Global";

export interface ResearchSource {
  id: string;
  title: string;
  /** Short citation form, e.g. "Bloom & Van Reenen" or "McKenzie et al." */
  author: string;
  year: string;
  theme: string;
  /** Key finding of the source. */
  summary: string;
  whyItMatters: string;
  url?: string | null;
  createdAt: string;
  // Fields below are present for records in the literature review database.
  dbId?: number;
  authorsFull?: string;
  journal?: string;
  geography?: string;
  region?: SourceRegion;
  method?: string;
  openAccess?: boolean;
  reviewStatus?: "Abstract reviewed" | "Full text pending";
  citations?: number | null;
  /** True when the summary was reviewed by hand rather than taken from the database. */
  curated?: boolean;
}

export interface ResearchPhase {
  id: string;
  phase: number;
  title: string;
  status: "Completed" | "Submitted" | "In Progress" | "Open" | "Upcoming";
  /** Optional short milestone label shown under the title, e.g. "Submitted Nov 2026". */
  milestone?: string;
  /** Optional link to more detail, e.g. "/findings". */
  href?: string;
  description: string;
  order: number;
}
