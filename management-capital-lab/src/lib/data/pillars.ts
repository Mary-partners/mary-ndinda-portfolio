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
  /** What the Chapter Two literature review says about this dimension. */
  evidence: string;
  /** The coverage gap the empirical study still has to test. */
  openQuestion: string;
  /** Optional note on how the dimension changed after Chapter Two. */
  changeNote?: string;
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
      "Separation of business and personal cash",
      "Working-capital management",
      "Budget variance review",
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
    evidence:
      "The dimension with the most direct link to the financing problem. Record keeping and financial planning predict small-firm sales, profits and survival across seven countries including Kenya (McKenzie & Woodruff), and simple financial rules of thumb changed behaviour more than formal accounting training (Drexler et al.). What matters is whether information changes decisions, not whether a founder can recite accounting terms.",
    openQuestion:
      "Do simple routines in a micro-firm and formal systems in a growing SME measure the same underlying capability across size bands?",
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
      "Ownership clarity",
      "Approval limits",
      "Conflict-of-interest controls",
      "Key-person cover and succession",
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
    evidence:
      "Information-asymmetry theory explains its external value: clear ownership, decision rights and controls reduce a funder's uncertainty about how money will be used. Ownership and boards shape SMEs' capacity for strategic change (Brunninge et al.), and capital experiments show that control over cash affects whether funds stay in the business (Fafchamps et al.). The construct is effective accountability, not the number of committees.",
    openQuestion:
      "Owner-managed and informal SMEs are under-represented in governance research. Which proportionate practices signal real accountability in a five-person firm?",
  },
  {
    id: 3,
    slug: "strategic-clarity",
    name: "Strategic Clarity and Market Orientation",
    short: "A clear model, market, and use of funds.",
    definition:
      "A coherent understanding of the business model, the customer, the market, and how capital will translate into growth, plus the routines through which customer and competitor evidence is gathered and acted on.",
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
      "Customer evidence",
      "Milestones",
      "Scenario review",
      "Reallocation when evidence changes",
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
    evidence:
      "Business planning has a positive but context-dependent link with performance (Brinckmann et al.), and entrepreneurial orientation is associated with SME growth in South Africa (Neneh & van Zyl). More is not always better: the orientation-performance link can be an inverted U (Wales et al.). Many plans are written for competitions and never used again, so a strategy document is not proof of strategic capability.",
    openQuestion:
      "Planning effects are contingent and rarely linked directly to capital absorption. Does strategic clarity predict how well funds are deployed?",
    changeNote:
      "Renamed after Chapter Two to include market orientation: the routines for gathering and acting on customer evidence.",
  },
  {
    id: 4,
    slug: "operational-systems",
    name: "Operational Systems and Process Discipline",
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
      "Quality control",
      "KPI review and corrective action",
      "Supplier and power redundancy",
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
    evidence:
      "Draws most directly on the World Management Survey and management experiments. Monitoring, targets and problem-solving correlate with productivity (Bloom & Van Reenen), and introducing them raised productivity in Indian textile plants (Bloom et al.). In Kampala, firms with backup inventory or power and a trusted stand-in manager recovered better from disruptions (Kundu et al.). The aim is minimum effective formalisation, not paperwork.",
    openQuestion:
      "Service firms' routines look different from production lines. Sector-equivalent indicators and thresholds still need validation.",
    changeNote:
      "Renamed after Chapter Two to stress process discipline: reliable execution and correction, not documentation for its own sake.",
  },
  {
    id: 5,
    slug: "founder-and-management-capability",
    name: "Founder and Management-Team Capability",
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
      "Delegation",
      "Team complementarity",
      "Learning behaviour",
      "Key-person risk",
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
    evidence:
      "Task-related experience and knowledge matter more than general credentials (Unger et al.). Personal-initiative training beat traditional training in Togo (Campos et al.), and in Kenya local mentors passed on knowledge a classroom could not (Brooks et al.). A capable founder is not one who makes every decision, but one who builds a team and systems that keep working in their absence.",
    openQuestion:
      "Education alone is an inadequate proxy. How can behavioural and team evidence, such as delegation and learning, be measured reliably?",
    changeNote:
      "Renamed after Chapter Two to cover the management team, separating what the founder knows from what the organisation can do.",
  },
  {
    id: 6,
    slug: "capital-absorption-capability",
    name: "Capital Deployment and Absorption Capability",
    short: "Planning, governing and tracking capital before and after it arrives.",
    definition:
      "The routines through which a firm diagnoses its financing need, chooses a suitable instrument, plans and sequences the use of funds, monitors milestones and corrects course. In the index this is assessed before capital arrives, as deployment readiness.",
    whyItMatters:
      "Receiving capital and converting it into growth are separate events. The same grants produced very different returns across firms, and the moment after money lands is when hiring, branding, premises or owner withdrawals can run ahead of demand and controls.",
    indicators: [
      "Use-of-funds plan",
      "Staged budget and sequencing",
      "Hiring and marketing assumptions",
      "Working-capital buffer",
      "Spending approval limits",
      "Milestone tracking",
      "Reporting to funders",
      "Capital type matched to need",
      "Corrective action when assumptions fail",
    ],
    diagnosticQuestions: [
      "Before funding, is there a sequenced use-of-funds plan with owners and milestones?",
      "Who approves spending once funds arrive, and up to what limit?",
      "Is the type of capital matched to the business need (debt vs equity vs grant)?",
      "After a past financing event, was actual spending compared with the plan, and were deviations explained and corrected?",
    ],
    weak: "Money arrives before the plan does. Hiring, branding or premises are brought forward, owner withdrawals creep up, and no one can explain how actual spending departed from the plan.",
    strong:
      "A staged, governed use-of-funds plan exists before money lands. Deployment is tracked against milestones, and deviations are explained, corrected and learned from.",
    evidence:
      "Capital experiments are clear that funds are not self-executing. Identical grants produced very unequal returns in Sri Lanka (de Mel et al.); in Ghana, in-kind support stayed in the business while cash leaked out (Fafchamps et al.); and consulting plus cash did not create lasting gains for Ghanaian tailors (Karlan et al.). Yet most studies record sales or profit at follow-up, not the sequence of decisions made after the money arrived.",
    openQuestion:
      "Measurement proposition MP1: does separating deployment routines (before funding) from realised absorption (after funding) give a cleaner, more valid model than combining them?",
    changeNote:
      "Refined after Chapter Two. This pillar now measures deployment readiness before funding. Realised capital absorption, what actually happens after funds arrive, is modelled separately as an outcome, so the index does not build the outcome into the predictor.",
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
