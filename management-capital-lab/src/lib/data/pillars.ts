export interface Pillar {
  id: number;
  slug: string;
  name: string;
  short: string;
  definition: string;
  whyItMatters: string;
  indicators: string[];
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
  /** The growth stage where this profile is most often seen. */
  typicalStage: "Early-stage" | "Growing" | "Scaling" | "Any stage";
}

export const ARCHETYPES: Archetype[] = [
  {
    name: "Survival-stage SME",
    description: "Fighting for cash flow week to week, with little structure or record.",
    need: "Stabilisation and basic financial visibility before any finance.",
    typicalStage: "Early-stage",
  },
  {
    name: "High-potential but system-weak SME",
    description: "Real demand and revenue, but fragile systems and unreliable numbers.",
    need: "Operational systems and records to convert potential into readiness.",
    typicalStage: "Early-stage",
  },
  {
    name: "Advisory-first SME",
    description: "Fundamentally sound but needs guidance before taking on capital.",
    need: "Advisory support and governance ahead of debt or equity.",
    typicalStage: "Any stage",
  },
  {
    name: "Founder-bottlenecked growth firm",
    description: "Strong demand and a growing team, but every decision still runs through the founder.",
    need: "Delegated authority, a real management team and an advisory board, so growth doesn't stall at the founder's desk.",
    typicalStage: "Growing",
  },
  {
    name: "Finance-preparing SME",
    description: "Close to ready, with a few specific, closable gaps.",
    need: "Targeted preparation to reach full finance readiness.",
    typicalStage: "Any stage",
  },
  {
    name: "Funded but stretched",
    description: "Has raised significant capital, but reporting, controls and management depth haven't kept pace with the money or the growth.",
    need: "Deployment discipline first: staged plans, investor-grade reporting and controls before the next raise.",
    typicalStage: "Growing",
  },
  {
    name: "Capital-ready SME",
    description: "Evidence, discipline, and a credible use of funds are in place.",
    need: "Access to the right type of capital, matched to the model.",
    typicalStage: "Any stage",
  },
  {
    name: "Growth-ready SME",
    description: "Proven absorption capacity and a track record of deploying capital well.",
    need: "Growth capital and partners to scale responsibly, with board-level governance to match.",
    typicalStage: "Scaling",
  },
];
