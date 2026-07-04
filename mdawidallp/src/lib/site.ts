import {
  ShieldCheck,
  Landmark,
  Compass,
  type LucideIcon,
} from "lucide-react";

export const site = {
  name: "Mdawida LLP",
  wordmark: "mdawidallp",
  domain: "mdawidallp.com",
  tagline: "Audit. Tax. Advisory.",
  descriptor:
    "A premium audit, tax, and advisory firm building stronger financial foundations for scalable growth across East Africa.",
  region: "East Africa",
  city: "Nairobi, Kenya",
  email: "info@mdawidallp.com",
  phone: "+254 700 000 000",
  year: 2026,
};

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
];

export type Service = {
  slug: string;
  name: string;
  short: string;
  icon: LucideIcon;
  summary: string;
  offerings: string[];
};

export const services: Service[] = [
  {
    slug: "audit-assurance",
    name: "Audit & Assurance",
    short: "Assurance that stands up to scrutiny.",
    icon: ShieldCheck,
    summary:
      "Independent, evidence-driven assurance that gives boards, lenders, and regulators confidence in the numbers. We audit to international standards while staying close to the realities of businesses in East Africa.",
    offerings: [
      "Statutory and external audits (IFRS and IFRS for SMEs)",
      "Internal audit and controls review",
      "Assurance and agreed-upon procedures engagements",
      "Financial statement preparation and review",
      "IPSAS audits for public and donor-funded entities",
      "Forensic reviews and special investigations",
    ],
  },
  {
    slug: "tax-regulatory",
    name: "Tax & Regulatory Services",
    short: "Compliant today, planned for tomorrow.",
    icon: Landmark,
    summary:
      "Practical tax and regulatory support that keeps you compliant with the Kenya Revenue Authority and regional authorities while structuring for efficiency. We turn tax from a year-end scramble into a managed part of the business.",
    offerings: [
      "Corporate and personal tax compliance",
      "Tax planning, structuring, and health checks",
      "VAT, PAYE, and withholding tax management",
      "Transfer pricing policy and documentation",
      "KRA audits, objections, and dispute resolution",
      "Regulatory and statutory compliance advisory",
    ],
  },
  {
    slug: "advisory",
    name: "Advisory",
    short: "Strategic finance for scalable growth.",
    icon: Compass,
    summary:
      "CFO grade thinking for founders and boards, from investment readiness to transactions. We help you build the financial capability to absorb capital and convert it into sustainable growth.",
    offerings: [
      "Virtual CFO and strategic finance advisory",
      "Investment readiness and capital raising support",
      "Business valuation and transaction advisory",
      "Financial modelling and forecasting",
      "Risk management and governance advisory",
      "Restructuring and performance improvement",
    ],
  },
];

export type Industry = {
  slug: string;
  name: string;
  blurb: string;
};

export const industries: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial Services & Banking",
    blurb:
      "SACCOs, microfinance, fintech, and banks navigating tight regulation and capital adequacy.",
  },
  {
    slug: "sme-family-business",
    name: "SMEs & Family Businesses",
    blurb:
      "Growth stage and founder led businesses building the systems to scale and attract capital.",
  },
  {
    slug: "manufacturing-fmcg",
    name: "Manufacturing & FMCG",
    blurb:
      "Producers and distributors managing margins, working capital, and complex supply chains.",
  },
  {
    slug: "agribusiness",
    name: "Agribusiness",
    blurb:
      "Value chain players from farm to export, balancing seasonality, grants, and growth.",
  },
  {
    slug: "real-estate-construction",
    name: "Real Estate & Construction",
    blurb:
      "Developers and contractors managing project accounting, financing, and compliance.",
  },
  {
    slug: "development-ngo",
    name: "NGOs & Donor-Funded",
    blurb:
      "Development organisations delivering donor assurance, IPSAS reporting, and grant compliance.",
  },
  {
    slug: "technology-startups",
    name: "Technology & Startups",
    blurb:
      "Early and scaling ventures that need investor ready finance and clean cap tables.",
  },
  {
    slug: "energy-infrastructure",
    name: "Energy & Infrastructure",
    blurb:
      "Capital intensive projects requiring rigorous modelling, controls, and reporting.",
  },
];

export type Value = { title: string; body: string };

export const values: Value[] = [
  {
    title: "Independence & Integrity",
    body: "We say what the numbers say. Our assurance means something because our judgement is never for sale.",
  },
  {
    title: "Technical Rigour",
    body: "IFRS, IPSAS, and tax law applied with precision, then translated into decisions you can act on.",
  },
  {
    title: "Partner-Led Attention",
    body: "Senior people on every engagement. You work directly with the professionals accountable for the work.",
  },
  {
    title: "Built for Growth",
    body: "We do more than sign off on the past. We help you build the financial capability to scale.",
  },
];

export const leadership = {
  name: "CPA Kennedy Mdawida",
  role: "Founder & Managing Partner",
  headline: "Strategic Finance Leader",
  location: "Nairobi County, Kenya",
  initials: "KM",
  bio: [
    "Kennedy Mdawida is a Certified Public Accountant and strategic finance leader focused on building stronger financial foundations for scalable growth. He founded Mdawida LLP to bring partner led audit, tax, and advisory services to businesses across East Africa.",
    "His work sits at the meeting point of assurance and strategy: rigorous, standards based reporting on one side, and forward looking advisory that helps founders and boards become genuinely investment ready on the other.",
    "Kennedy leads engagements across financial services, SMEs, agribusiness, and the development sector, pairing technical depth with a practical understanding of what it takes to grow a business in the region.",
  ],
  credentials: [
    "Certified Public Accountant (CPA)",
    "Strategic finance and investment readiness",
    "IFRS, IFRS for SMEs, and IPSAS reporting",
    "Nairobi, Kenya, serving East Africa",
  ],
};

export const stats: { value: string; label: string }[] = [
  { value: "3", label: "Integrated service lines" },
  { value: "6", label: "Countries across East Africa" },
  { value: "CPA-led", label: "Partner accountability" },
  { value: "IFRS · IPSAS", label: "Reporting standards" },
];

export const countries: string[] = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Burundi",
  "South Sudan",
];
