import {
  ShieldCheck,
  Landmark,
  Compass,
  type LucideIcon,
} from "lucide-react";
import type { ImageKey } from "./images";

export const site = {
  name: "Mdawida LLP",
  wordmark: "mdawidallp",
  domain: "mdawidallp.com",
  tagline: "Audit. Tax. Advisory.",
  descriptor:
    "A partner-led audit, tax, and advisory firm building stronger financial foundations for scalable growth across East Africa.",
  region: "East Africa",
  city: "Nairobi, Kenya",
  email: "mdawida@mdawidallp.com",
  phone: "+254 715 014 143",
  phoneRaw: "+254715014143",
  year: 2026,
};

export type NavItem = { label: string; href: string };

export const primaryNav: NavItem[] = [
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Industries", href: "/industries" },
  { label: "Insights", href: "/insights" },
];

export type ServiceCapability = { title: string; items: string[] };
export type ServiceStep = { title: string; body: string };
export type ServiceFaq = { q: string; a: string };

export type Service = {
  slug: string;
  name: string;
  short: string;
  tagline: string;
  icon: LucideIcon;
  image: ImageKey;
  summary: string;
  overview: string[];
  capabilities: ServiceCapability[];
  process: ServiceStep[];
  deliverables: string[];
  outcomes: string[];
  faqs: ServiceFaq[];
  relatedInsights: string[];
};

export const services: Service[] = [
  {
    slug: "audit-assurance",
    name: "Audit & Assurance",
    short: "Assurance that stands up to scrutiny.",
    tagline:
      "Independent, evidence-driven assurance boards and lenders can rely on.",
    icon: ShieldCheck,
    image: "meeting",
    summary:
      "Independent, evidence-driven assurance that gives boards, lenders, and regulators confidence in the numbers. We audit to international standards while staying close to the realities of businesses in East Africa.",
    overview: [
      "An audit should do more than satisfy a filing requirement. Done well, it tells your board where the business is strong, where control is thin, and where risk is quietly building. We deliver assurance that a regulator will accept and that a lender will lean on, and we translate what we find into decisions you can act on.",
      "Every engagement is led by a partner and planned around your specific risks, not a generic checklist. We audit to International Standards on Auditing and report under IFRS, IFRS for SMEs, or IPSAS, whichever framework fits your entity. The result is a clean, defensible opinion and a management letter that is genuinely worth reading.",
    ],
    capabilities: [
      {
        title: "Statutory and external audit",
        items: [
          "Annual statutory audits under IFRS and IFRS for SMEs",
          "Group and consolidated financial statement audits",
          "Audits for lenders, investors, and grant funders",
        ],
      },
      {
        title: "Internal audit and controls",
        items: [
          "Internal audit function set-up and co-sourcing",
          "Internal control and process reviews",
          "Risk-based audit planning and testing",
        ],
      },
      {
        title: "Specialist assurance",
        items: [
          "Agreed-upon procedures and limited assurance reviews",
          "IPSAS audits for public and donor-funded entities",
          "Forensic reviews and special investigations",
        ],
      },
    ],
    process: [
      {
        title: "Scope and risk",
        body: "We meet your board and finance team, understand the business, and build an audit plan around the areas that actually carry risk.",
      },
      {
        title: "Fieldwork",
        body: "We gather evidence, test controls and balances, and raise questions early so there are no surprises at sign-off.",
      },
      {
        title: "Report",
        body: "We issue a clear opinion and a management letter that sets out findings and practical recommendations in plain language.",
      },
      {
        title: "Follow through",
        body: "We walk your team through the findings and stay available as you act on them through the year.",
      },
    ],
    deliverables: [
      "Audited financial statements and audit opinion",
      "Management letter with prioritised recommendations",
      "Board and audit committee presentation",
      "Control and risk observations with a remediation path",
    ],
    outcomes: [
      "A clean, defensible opinion your stakeholders trust",
      "Earlier sight of control weaknesses and emerging risk",
      "A finance function that is readier for capital and scrutiny",
    ],
    faqs: [
      {
        q: "Which reporting framework will you use?",
        a: "We report under full IFRS, IFRS for SMEs, or IPSAS depending on your entity, its size, and who relies on the accounts. We agree this with you at planning.",
      },
      {
        q: "How disruptive is the audit to my team?",
        a: "We plan around your calendar, request information in a single structured list, and raise issues as we go, so your team is not pulled in at the last minute.",
      },
      {
        q: "Can you audit a group with entities in more than one country?",
        a: "Yes. We handle consolidations and coordinate across the region so the group opinion holds together.",
      },
    ],
    relatedInsights: [
      "ifrs-18-preparation-2026",
      "ifrs-for-smes-access-to-capital",
      "internal-audit-before-you-scale",
      "kenya-sacco-governance-after-kuscco",
    ],
  },
  {
    slug: "tax-regulatory",
    name: "Tax & Regulatory Services",
    short: "Compliant today, planned for tomorrow.",
    tagline:
      "Practical tax and regulatory support that keeps you compliant and efficient.",
    icon: Landmark,
    image: "analytics",
    summary:
      "Practical tax and regulatory support that keeps you compliant with the Kenya Revenue Authority and regional authorities while structuring for efficiency. We turn tax from a year-end scramble into a managed part of the business.",
    overview: [
      "Tax in the region moves quickly. eTIMS, the Tax Laws (Amendment) Act, minimum top-up tax, and a more assertive Kenya Revenue Authority mean the cost of getting it wrong has risen sharply. We keep you compliant and, just as importantly, structured so you are not paying more than the law requires.",
      "We work as an extension of your finance team through the year, not just at filing season. That means fewer penalties, cleaner records, and a tax position you can defend if the authority comes knocking.",
    ],
    capabilities: [
      {
        title: "Compliance",
        items: [
          "Corporate and personal income tax filing",
          "VAT, PAYE, and withholding tax management",
          "eTIMS onboarding and invoicing compliance",
        ],
      },
      {
        title: "Planning and structuring",
        items: [
          "Tax planning and periodic health checks",
          "Group and transaction structuring",
          "Incentive, exemption, and capital allowance reviews",
        ],
      },
      {
        title: "Transfer pricing and disputes",
        items: [
          "Transfer pricing policy and documentation",
          "KRA audits, objections, and dispute resolution",
          "Voluntary disclosure and penalty mitigation",
        ],
      },
    ],
    process: [
      {
        title: "Health check",
        body: "We review your current filings, exposures, and processes to find risk and opportunity before the authority does.",
      },
      {
        title: "Fix and file",
        body: "We bring you current, clean up records, and put a reliable compliance calendar in place.",
      },
      {
        title: "Structure",
        body: "We plan ahead so transactions, remuneration, and group flows are efficient and defensible.",
      },
      {
        title: "Defend",
        body: "If a review or dispute arises, we manage the response, the objection, and the negotiation on your behalf.",
      },
    ],
    deliverables: [
      "A clean compliance calendar and filing history",
      "Tax health check report with quantified exposures",
      "Transfer pricing documentation where required",
      "Managed responses to KRA queries and audits",
    ],
    outcomes: [
      "Fewer penalties and less year-end firefighting",
      "A tax position you can defend on audit",
      "Cash kept in the business through lawful efficiency",
    ],
    faqs: [
      {
        q: "We are behind on filings. Can you help?",
        a: "Yes. We regularly bring businesses current, negotiate on penalties where possible, and put a process in place so it does not recur.",
      },
      {
        q: "Do we need transfer pricing documentation?",
        a: "If you transact with related parties, very likely. We assess your position and prepare a Local File and supporting policy so you are ready if asked.",
      },
      {
        q: "Can you handle a KRA audit for us?",
        a: "We manage the full process, from the first query to objection and resolution, and keep you out of avoidable escalation.",
      },
    ],
    relatedInsights: [
      "etims-electronic-invoicing-tax-deductions",
      "tax-laws-amendment-act-2024-board-briefing",
      "pillar-two-minimum-top-up-tax-kenya",
      "transfer-pricing-documentation-east-africa",
    ],
  },
  {
    slug: "advisory",
    name: "Advisory",
    short: "Strategic finance for scalable growth.",
    tagline:
      "CFO-grade thinking for founders and boards, from readiness to transactions.",
    icon: Compass,
    image: "collaboration",
    summary:
      "CFO-grade thinking for founders and boards, from investment readiness to transactions. We help you build the financial capability to absorb capital and convert it into sustainable growth.",
    overview: [
      "Most businesses in the region do not fail for lack of ambition. They stall because the finance function cannot keep pace with the growth, or because they meet an investor before the numbers are ready. Our advisory practice closes that gap.",
      "We bring the discipline of a chief financial officer without the cost of a full-time hire: clean numbers, a credible model, a data room that survives due diligence, and a seat at the table when the big decisions are made. When you are ready to raise or transact, we stand beside you through it.",
    ],
    capabilities: [
      {
        title: "Strategic finance",
        items: [
          "Virtual CFO and finance function build-out",
          "Management reporting and KPI design",
          "Financial modelling and forecasting",
        ],
      },
      {
        title: "Capital and transactions",
        items: [
          "Investment readiness and data room preparation",
          "Capital raising and investor support",
          "Business valuation and transaction advisory",
        ],
      },
      {
        title: "Governance and performance",
        items: [
          "Risk management and governance advisory",
          "Restructuring and performance improvement",
          "Board reporting and decision support",
        ],
      },
    ],
    process: [
      {
        title: "Diagnose",
        body: "We assess where your finance function and numbers stand against what your next stage of growth demands.",
      },
      {
        title: "Build",
        body: "We put the reporting, model, and controls in place so the business runs on reliable information.",
      },
      {
        title: "Ready",
        body: "We prepare you for capital: the model, the data room, and the story that stands up to diligence.",
      },
      {
        title: "Execute",
        body: "We support the raise or transaction through to close, and stay on to help you deploy the capital well.",
      },
    ],
    deliverables: [
      "A board-ready reporting pack and KPI dashboard",
      "An investor-grade financial model",
      "A data room prepared for due diligence",
      "Valuation and transaction support to close",
    ],
    outcomes: [
      "Finance that keeps pace with the growth",
      "Credibility in front of investors and lenders",
      "Capital raised and converted into real growth",
    ],
    faqs: [
      {
        q: "What does a virtual CFO actually do for us?",
        a: "We take ownership of your numbers: reporting, forecasting, cash, and the board pack, at a fraction of a full-time cost, scaling up when a raise or transaction is live.",
      },
      {
        q: "We want to raise capital. Where do we start?",
        a: "With readiness. We get the numbers clean, build the model, and prepare the data room so you approach investors from a position of strength.",
      },
      {
        q: "Can you value my business?",
        a: "Yes. We prepare defensible valuations for transactions, fundraising, and internal decisions, grounded in method and evidence.",
      },
    ],
    relatedInsights: [
      "investment-readiness-capital-gap",
      "virtual-cfo-scaling-business",
      "financing-agribusiness-east-africa",
      "pbo-act-ngo-finance-playbook",
    ],
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

export type Industry = {
  slug: string;
  name: string;
  blurb: string;
  image: ImageKey;
};

export const industries: Industry[] = [
  {
    slug: "financial-services",
    name: "Financial Services & Banking",
    blurb:
      "SACCOs, microfinance, fintech, and banks navigating tight regulation and capital adequacy.",
    image: "financialServices",
  },
  {
    slug: "sme-family-business",
    name: "SMEs & Family Businesses",
    blurb:
      "Growth-stage and founder-led businesses building the systems to scale and attract capital.",
    image: "meeting",
  },
  {
    slug: "manufacturing-fmcg",
    name: "Manufacturing & FMCG",
    blurb:
      "Producers and distributors managing margins, working capital, and complex supply chains.",
    image: "manufacturing",
  },
  {
    slug: "agribusiness",
    name: "Agribusiness",
    blurb:
      "Value-chain players from farm to export, balancing seasonality, grants, and growth.",
    image: "agribusiness",
  },
  {
    slug: "real-estate-construction",
    name: "Real Estate & Construction",
    blurb:
      "Developers and contractors managing project accounting, financing, and compliance.",
    image: "construction",
  },
  {
    slug: "development-ngo",
    name: "NGOs & Donor-Funded",
    blurb:
      "Development organisations delivering donor assurance, IPSAS reporting, and grant compliance.",
    image: "development",
  },
  {
    slug: "technology-startups",
    name: "Technology & Startups",
    blurb:
      "Early and scaling ventures that need investor-ready finance and clean cap tables.",
    image: "technology",
  },
  {
    slug: "energy-infrastructure",
    name: "Energy & Infrastructure",
    blurb:
      "Capital-intensive projects requiring rigorous modelling, controls, and reporting.",
    image: "energy",
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
    "Kennedy Mdawida is a Certified Public Accountant and strategic finance leader focused on building stronger financial foundations for scalable growth. He founded Mdawida LLP to bring partner-led audit, tax, and advisory services to businesses across East Africa.",
    "His work sits at the meeting point of assurance and strategy: rigorous, standards-based reporting on one side, and forward-looking advisory that helps founders and boards become genuinely investment-ready on the other.",
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
  { value: "Partner-led", label: "Senior attention on every file" },
  { value: "IFRS · IPSAS", label: "International reporting standards" },
  { value: "6 markets", label: "Served across East Africa" },
  { value: "One team", label: "Audit, tax, and advisory together" },
];

// Standards and frameworks the firm works to. Used as credibility signals.
export const standards: string[] = [
  "IFRS",
  "IFRS for SMEs",
  "IPSAS",
  "ISA",
  "Kenya Revenue Authority",
  "OECD Transfer Pricing",
];

export const countries: string[] = [
  "Kenya",
  "Uganda",
  "Tanzania",
  "Rwanda",
  "Burundi",
  "South Sudan",
];
