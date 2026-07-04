export interface Pillar {
  id: number;
  slug: string;
  name: string;
  short: string;
  definition: string;
  whyItMatters: string;
  indicators: string[];
  diagnosticQuestions: string[];
  weak: string;
  strong: string;
}

export const PILLARS: Pillar[] = [
  {
    id: 1,
    slug: "financial-management-capability",
    name: "Financial Management Capability",
    short: "Plan, track, control, and interpret the financial position.",
    definition:
      "The ability of the SME to plan, track, control, and interpret its financial position.",
    whyItMatters:
      "Reliable numbers are the language finance is priced in. Without them, capital is granted on a story rather than evidence, and the business cannot see pressure building before it becomes a crisis.",
    indicators: [
      "Recordkeeping",
      "Management accounts",
      "Budgeting",
      "Cash-flow forecasting",
      "Pricing discipline",
      "Cost tracking",
      "Debt management",
      "Tax compliance",
      "Profitability monitoring",
      "Use of accounting systems",
    ],
    diagnosticQuestions: [
      "Does the business know its monthly revenue, gross margin, and net profit?",
      "Can the founder explain cash-flow pressure before it becomes a crisis?",
      "Are business and personal finances separated?",
      "Does the business prepare monthly management accounts?",
    ],
    weak: "Numbers live in the founder's head. Personal and business money mix. Reports, if they exist, cannot be traced to a bank statement or system.",
    strong:
      "Monthly management accounts are produced and understood. Cash flow is forecast, pricing is deliberate, and every figure can be verified against a system.",
  },
  {
    id: 2,
    slug: "governance-and-accountability",
    name: "Governance and Accountability",
    short: "Roles, controls, and accountable decision-making.",
    definition:
      "The structures, controls, and accountability that make decisions traceable and protect the business from its own concentration of power.",
    whyItMatters:
      "Funders lend to institutions, not to individuals. Clear roles, approvals, and controls reduce risk, prevent leakage, and make the business resilient beyond the founder.",
    indicators: [
      "Defined roles",
      "Internal controls",
      "Approval processes",
      "Compliance",
      "Advisory board or board",
      "Founder accountability",
      "Separation of decision-making powers",
    ],
    diagnosticQuestions: [
      "Are key roles and decision rights clearly defined?",
      "Is there an approval process for significant spending?",
      "Does the founder answer to a board, advisory board, or peer structure?",
      "Are basic internal controls in place to prevent leakage or fraud?",
    ],
    weak: "One person decides everything with no checks. No approvals, no controls, and no structure to catch mistakes or hold anyone accountable.",
    strong:
      "Roles and decision rights are defined, spending is approved, controls prevent leakage, and the founder is accountable to a board or advisory structure.",
  },
  {
    id: 3,
    slug: "strategic-clarity",
    name: "Strategic Clarity",
    short: "A clear model, market, and use of funds.",
    definition:
      "A coherent understanding of the business model, the customer, the market, and how capital will translate into growth.",
    whyItMatters:
      "Capital amplifies whatever strategy already exists. Without a clear model and use of funds, financing simply accelerates confusion.",
    indicators: [
      "Business model clarity",
      "Customer segmentation",
      "Market positioning",
      "Revenue model",
      "Growth strategy",
      "Use-of-funds clarity",
      "Unit economics",
    ],
    diagnosticQuestions: [
      "Can the founder explain who the customer is and why they buy?",
      "Is there a clear, credible use of funds?",
      "Do the unit economics work at the level of a single sale?",
      "Is the growth strategy specific rather than aspirational?",
    ],
    weak: "The business sells to 'everyone', cannot explain its unit economics, and would struggle to say exactly what new capital would be used for.",
    strong:
      "The customer, model, and positioning are clear. Unit economics are understood and the use of funds is specific and credible.",
  },
  {
    id: 4,
    slug: "operational-systems",
    name: "Operational Systems",
    short: "The systems that let the business scale without chaos.",
    definition:
      "The processes, tools, and structures that allow a business to deliver consistently and to grow without losing control of quality or cash.",
    whyItMatters:
      "Funding often exposes weak systems as much as it unlocks growth. Systems are what let a business absorb a bigger order without breaking.",
    indicators: [
      "SOPs",
      "Inventory controls",
      "Technology adoption",
      "Customer management",
      "Team structure",
      "Delivery systems",
      "Performance tracking",
    ],
    diagnosticQuestions: [
      "Are core processes documented rather than held in one person's memory?",
      "Is inventory or delivery tracked reliably?",
      "Does the team have a clear structure and accountability?",
      "Is performance measured against targets?",
    ],
    weak: "Everything depends on the founder being present. No documented processes, unreliable inventory or delivery, and no way to track performance.",
    strong:
      "Core processes are documented, inventory and delivery are controlled, the team is structured, and performance is tracked against targets.",
  },
  {
    id: 5,
    slug: "founder-and-management-capability",
    name: "Founder and Management Capability",
    short: "Discipline, literacy, leadership, and openness to advice.",
    definition:
      "The judgement, discipline, financial literacy, and leadership maturity of the people running the business.",
    whyItMatters:
      "Diagnostics and systems are only as good as the people using them. Founder discipline and openness to advice often predict whether capital is used well.",
    indicators: [
      "Decision-making discipline",
      "Financial literacy",
      "Leadership maturity",
      "Advisory openness",
      "Execution consistency",
      "Risk awareness",
      "Adaptability",
    ],
    diagnosticQuestions: [
      "Does the founder make decisions with data or with instinct alone?",
      "Is the founder financially literate about their own business?",
      "Is the founder open to advice and willing to be challenged?",
      "Does the team execute consistently on what it commits to?",
    ],
    weak: "Decisions are impulsive, financial literacy is thin, feedback is resisted, and commitments are inconsistently executed.",
    strong:
      "Decisions are disciplined and evidence-led, the founder is financially literate, open to advice, and the team executes consistently.",
  },
  {
    id: 6,
    slug: "capital-absorption-capability",
    name: "Capital Absorption Capability",
    short: "Turning capital received into productive outcomes.",
    definition:
      "The ability of a business to receive capital and convert it into productive outcomes.",
    whyItMatters:
      "This is the pillar the whole index builds toward. Absorption capacity is the difference between capital that compounds and capital that disappears.",
    indicators: [
      "Clear use of funds",
      "Capital deployment tracking",
      "Revenue growth after financing",
      "Repayment discipline",
      "Productive asset creation",
      "Ability to report to funders",
      "Alignment between capital type and business model",
    ],
    diagnosticQuestions: [
      "Is there a plan to track how capital is deployed once received?",
      "Can the business report back to a funder with credible numbers?",
      "Is the type of capital matched to the business need (debt vs equity vs grant)?",
      "Has past capital produced revenue growth or productive assets?",
    ],
    weak: "Capital is spent without tracking, cannot be accounted for afterwards, and is often the wrong type for the need. Growth does not follow funding.",
    strong:
      "Capital is deployed against a plan, tracked, and reported. The type of capital fits the model, and past financing produced measurable growth.",
  },
];

export interface ScoreBand {
  range: string;
  label: string;
  description: string;
}

export const SCORE_BANDS: ScoreBand[] = [
  { range: "0–20", label: "Fragile", description: "Survival-focused; systems and records are largely absent." },
  { range: "21–40", label: "Emerging", description: "Some structure forming, but numbers are not yet reliable." },
  { range: "41–60", label: "Developing", description: "Basic systems in place; readiness is uneven across pillars." },
  { range: "61–80", label: "Finance-preparing", description: "Close to ready; specific gaps to close before financing." },
  { range: "81–100", label: "Finance-ready", description: "Evidence, discipline, and absorption capacity are in place." },
];

export interface Archetype {
  name: string;
  description: string;
  need: string;
}

export const ARCHETYPES: Archetype[] = [
  {
    name: "Survival-stage SME",
    description: "Fighting for cash flow week to week, with little structure or record.",
    need: "Stabilisation and basic financial visibility before any finance.",
  },
  {
    name: "High-potential but system-weak SME",
    description: "Real demand and revenue, but fragile systems and unreliable numbers.",
    need: "Operational systems and records to convert potential into readiness.",
  },
  {
    name: "Advisory-first SME",
    description: "Fundamentally sound but needs guidance before taking on capital.",
    need: "Advisory support and governance ahead of debt or equity.",
  },
  {
    name: "Finance-preparing SME",
    description: "Close to ready, with a few specific, closable gaps.",
    need: "Targeted preparation to reach full finance readiness.",
  },
  {
    name: "Capital-ready SME",
    description: "Evidence, discipline, and a credible use of funds are in place.",
    need: "Access to the right type of capital, matched to the model.",
  },
  {
    name: "Growth-ready SME",
    description: "Proven absorption capacity and a track record of deploying capital well.",
    need: "Growth capital and partners to scale responsibly.",
  },
];
