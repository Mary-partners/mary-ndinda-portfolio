// The Management Capital Index question library — the 6 pillars and their
// diagnostic questions, as published at
// https://www.managementcapitallab.com/framework (Mary Ndinda, DBA research).
// Each question is answered on the 0-4 scale in src/lib/constants.ts
// (MATURITY_ANCHORS); pillar and overall scores roll up into the 0-100 Index.

export interface SeedQuestion {
  text: string;
  helpText?: string;
  weight?: number;
  appliesTo?: string; // "Micro,Small,Medium" subset; omit = all
}
export interface SeedDimension {
  key: string;
  questions: SeedQuestion[];
}

export const FRAMEWORK_CONTENT: SeedDimension[] = [
  {
    key: "financial",
    questions: [
      { text: "Does the business know its monthly revenue, gross margin, and net profit?", helpText: "Recordkeeping and profitability monitoring." },
      { text: "Can the founder explain cash-flow pressure before it becomes a crisis?", helpText: "Cash-flow forecasting." },
      { text: "Are business and personal finances separated?", helpText: "Basic financial discipline and control." },
      { text: "Does the business prepare monthly management accounts?", helpText: "Management accounts and use of accounting systems." },
    ],
  },
  {
    key: "governance",
    questions: [
      { text: "Are key roles and decision rights clearly defined?", helpText: "Defined roles and separation of decision-making powers." },
      { text: "Is there an approval process for significant spending?", helpText: "Approval processes and internal controls." },
      { text: "Does the founder answer to a board, advisory board, or peer structure?", helpText: "Founder accountability." },
      { text: "Are basic internal controls in place to prevent leakage or fraud?", helpText: "Internal controls and compliance." },
    ],
  },
  {
    key: "strategic",
    questions: [
      { text: "Can the founder explain who the customer is and why they buy?", helpText: "Customer segmentation and market positioning." },
      { text: "Is there a clear, credible use of funds?", helpText: "Use-of-funds clarity." },
      { text: "Do the unit economics work at the level of a single sale?", helpText: "Unit economics and revenue model." },
      { text: "Is the growth strategy specific rather than aspirational?", helpText: "Growth strategy and business model clarity." },
    ],
  },
  {
    key: "operational",
    questions: [
      { text: "Are core processes documented rather than held in one person's memory?", helpText: "SOPs and delivery systems." },
      { text: "Is inventory or delivery tracked reliably?", helpText: "Inventory controls and delivery systems." },
      { text: "Does the team have a clear structure and accountability?", helpText: "Team structure." },
      { text: "Is performance measured against targets?", helpText: "Performance tracking." },
    ],
  },
  {
    key: "founder",
    questions: [
      { text: "Does the founder make decisions with data or with instinct alone?", helpText: "Decision-making discipline and risk awareness." },
      { text: "Is the founder financially literate about their own business?", helpText: "Financial literacy." },
      { text: "Is the founder open to advice and willing to be challenged?", helpText: "Advisory openness and adaptability." },
      { text: "Does the team execute consistently on what it commits to?", helpText: "Execution consistency." },
    ],
  },
  {
    key: "absorption",
    questions: [
      { text: "Is there a plan to track how capital is deployed once received?", helpText: "Capital deployment tracking." },
      { text: "Can the business report back to a funder with credible numbers?", helpText: "Ability to report to funders." },
      { text: "Is the type of capital matched to the business need (debt vs equity vs grant)?", helpText: "Alignment between capital type and business model." },
      { text: "Has past capital produced revenue growth or productive assets?", helpText: "Productive asset creation and revenue growth after financing." },
    ],
  },
];
