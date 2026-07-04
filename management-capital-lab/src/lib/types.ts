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

export interface ResearchSource {
  id: string;
  title: string;
  author: string;
  year: string;
  theme: string;
  summary: string;
  whyItMatters: string;
  url?: string;
  createdAt: string;
}

export interface ResearchPhase {
  id: string;
  phase: number;
  title: string;
  status: "Completed" | "In Progress" | "Open" | "Upcoming";
  description: string;
  order: number;
}
