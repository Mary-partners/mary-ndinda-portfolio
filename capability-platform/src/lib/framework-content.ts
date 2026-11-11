// Original SME assessment question library, authored from the publicly described
// WMS / Management Matters constructs. These are NOT official WMS questions and
// the resulting scores are NOT validated WMS scores — see the Research page.

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
    key: "strategic",
    questions: [
      { text: "Can management state the company's three most important priorities and explain how they were chosen?" },
      { text: "Are priorities translated into specific responsibilities for teams or individuals?" },
      { text: "Does management have a clear basis for rejecting opportunities that do not fit the strategy?" },
      { text: "Is relevant information (financial, customer, operational) used when making significant decisions?" },
      { text: "Can management describe a recent decision that changed after new evidence emerged?" },
    ],
  },
  {
    key: "financial",
    questions: [
      { text: "Are management accounts prepared on a regular, predictable schedule?" },
      { text: "Is there a named person responsible for reviewing financial performance?" },
      { text: "Does the business forecast its cash requirements before shortfalls occur?" },
      { text: "Are customer or product margins understood and used in pricing decisions?" },
      { text: "Can management evaluate whether it can afford a new investment using its own numbers?" },
      { text: "Can management point to a decision made in the last quarter using financial information?" },
    ],
  },
  {
    key: "operational",
    questions: [
      { text: "Are the processes most critical to customer value identified and documented appropriately for the company's size?" },
      { text: "Does management have a reliable way to detect operating inefficiencies or bottlenecks?" },
      { text: "When a delivery or quality target is missed, is there a defined response?" },
      { text: "Are recurring operational problems investigated for root cause rather than repeatedly patched?" },
      { text: "Can management demonstrate a process improvement completed in the last six months?" },
    ],
  },
  {
    key: "performance",
    questions: [
      { text: "Does management track a defined set of KPIs chosen for a clear reason?" },
      { text: "Are the underlying data for those KPIs reasonably reliable and current?" },
      { text: "Is performance information reviewed on a regular cadence by the right people?" },
      { text: "When performance falls below target, are corrective actions assigned to named individuals?" },
      { text: "Does management verify that assigned corrective actions were actually completed?" },
    ],
  },
  {
    key: "people",
    questions: [
      { text: "Does every function critical to the business have an accountable owner?" },
      { text: "Are hiring needs determined from business requirements rather than ad hoc reaction?" },
      { text: "Is there a practical way to evaluate and discuss employee performance?" },
      { text: "Are high-performing employees recognised and underperformance addressed?" },
      { text: "Could the business continue to operate key functions if the founder were away for two weeks?" },
    ],
  },
  {
    key: "commercial",
    questions: [
      { text: "Does management know which customers or products generate the strongest contribution margins?" },
      { text: "Is there a deliberate, repeatable basis for setting prices?" },
      { text: "Is the sales pipeline recorded and reviewed rather than held in people's heads?" },
      { text: "Can the business identify and act on unprofitable customers or products?" },
      { text: "Have commercial decisions changed in response to performance information?" },
    ],
  },
  {
    key: "governance",
    questions: [
      { text: "Is it clear which decisions require founder approval and which managers can make independently?" },
      { text: "Are expenditure approval limits defined and respected at a level appropriate to the company's size?" },
      { text: "Are incompatible duties (e.g. approving and paying) separated where practical?" },
      { text: "Is there a regular management meeting where decisions are recorded?" },
      { text: "Would core functions keep running if the founder were suddenly unavailable?" },
    ],
  },
  {
    key: "learning",
    questions: [
      { text: "Does management have a way to identify practices that are not working?" },
      { text: "Is employee feedback captured and acted upon in a visible way?" },
      { text: "Was a meaningful operational change introduced in the last six months, and its effect assessed?" },
      { text: "Are lessons from mistakes documented and shared rather than lost?" },
      { text: "Does management adjust its approach when its assumptions prove incorrect?" },
    ],
  },
];

export const TOTAL_QUESTIONS = FRAMEWORK_CONTENT.reduce((n, d) => n + d.questions.length, 0);
