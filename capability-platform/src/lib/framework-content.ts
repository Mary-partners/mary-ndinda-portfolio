// The Management Capital Index (MCI 1.1) question bank — 36 behaviour-based
// questions, six per pillar, as supplied with the build brief
// (managementcapitallab.com/framework, Mary Ndinda, DBA research).
// Answered on the 0-4 practice scale in constants.ts (MATURITY_ANCHORS).

export interface SeedQuestion {
  text: string;
  helpText?: string;
  weight?: number;
  appliesTo?: string;
}
export interface SeedDimension {
  key: string;
  questions: SeedQuestion[];
}

export const FRAMEWORK_CONTENT: SeedDimension[] = [
  {
    key: "financial",
    questions: [
      { text: "Can you show a clear record of what the business earned and spent in each of the past three months?", helpText: "Evidence: sales records, spending log, reconciliation." },
      { text: "Does someone review monthly results and decide what needs to change?", helpText: "Evidence: monthly review pack or meeting notes." },
      { text: "Can you see expected receipts and payments for at least the next eight weeks?", helpText: "Evidence: weekly cash plan." },
      { text: "Do you know which products or services make money after their direct costs?", helpText: "Evidence: cost and pricing worksheet." },
      { text: "Do you compare actual results with your plan and respond when results differ?", helpText: "Evidence: simple budget-to-actual tracker." },
      { text: "Are upcoming taxes, supplier payments and loan instalments recorded before they fall due?", helpText: "Evidence: payment calendar and current obligations." },
    ],
  },
  {
    key: "governance",
    questions: [
      { text: "Can staff explain who is responsible for key decisions and results?", helpText: "Evidence: role chart and responsibility matrix." },
      { text: "Are major purchases and payments checked before approval?", helpText: "Evidence: approval matrix, examples." },
      { text: "Are stock, cash, customer data and equipment regularly checked and protected?", helpText: "Evidence: inventory checks, permissions, asset register." },
      { text: "Is there a regular forum where leaders review results and challenge decisions?", helpText: "Evidence: meeting minutes and action log." },
      { text: "Does the firm track permits, contracts, staff obligations and deadlines?", helpText: "Evidence: contract and compliance calendar." },
      { text: "When something goes wrong, is it recorded, assigned and resolved?", helpText: "Evidence: incident and complaints log." },
    ],
  },
  {
    key: "strategic",
    questions: [
      { text: "Can the team name its priority customer groups and explain why they buy?", helpText: "Evidence: customer list by segment, interviews." },
      { text: "Can you show repeat purchases, orders or customer evidence for the next growth step?", helpText: "Evidence: orders, retention and pipeline." },
      { text: "Does the team know what it earns from a typical product, job or customer after direct costs?", helpText: "Evidence: unit-level cost and sales examples." },
      { text: "Can customers and staff explain why buyers choose the business rather than alternatives?", helpText: "Evidence: customer interviews, win-loss notes." },
      { text: "Does the business have three measurable priorities with owners and due dates?", helpText: "Evidence: quarterly operating plan." },
      { text: "Can the team explain what must change to serve more customers successfully?", helpText: "Evidence: capacity and growth plan." },
    ],
  },
  {
    key: "operational",
    questions: [
      { text: "Are the five most important recurring tasks documented and followed?", helpText: "Evidence: process checklists and observation." },
      { text: "Do you track whether orders or services are completed on time and to standard?", helpText: "Evidence: order log, defect rate." },
      { text: "Can you identify shortages, waste or capacity limits before customers are affected?", helpText: "Evidence: stock/capacity records." },
      { text: "Are customer requests, complaints and repeat sales tracked in a shared system?", helpText: "Evidence: CRM or customer register." },
      { text: "Do teams review a few practical measures and solve recurring problems?", helpText: "Evidence: weekly KPI board and action notes." },
      { text: "Could the team deliver normal work for two weeks without the founder managing every task?", helpText: "Evidence: delegation plan, absence test." },
    ],
  },
  {
    key: "founder",
    questions: [
      { text: "Can leaders explain a recent decision and the information they used to make it?", helpText: "Evidence: decision notes and supporting data." },
      { text: "Does each manager know their targets and review progress with their team?", helpText: "Evidence: team plans and meeting notes." },
      { text: "Do managers give ownership of outcomes instead of approving every step?", helpText: "Evidence: responsibility map and work examples." },
      { text: "Are agreed actions completed by their deadlines, with delays explained?", helpText: "Evidence: task completion log." },
      { text: "Has customer feedback caused a real improvement in the last three months?", helpText: "Evidence: change log, feedback evidence." },
      { text: "Does the team identify problems early, seek challenge and adjust plans?", helpText: "Evidence: risk and issue reviews." },
    ],
  },
  {
    key: "absorption",
    questions: [
      { text: "Can the business explain whether it needs better use of existing resources, a partner or outside funding?", helpText: "Evidence: options appraisal." },
      { text: "For a planned investment, are activities, costs, owners and milestones documented?", helpText: "Evidence: project plan and budget." },
      { text: "Can the team show what happened to resources received for a past project?", helpText: "Evidence: project spending and output log." },
      { text: "If the business borrows, has it tested whether it can manage repayments in a weak sales month?", helpText: "Evidence: conservative cash scenario." },
      { text: "Does the firm compare project results with the improvement it expected?", helpText: "Evidence: baseline and outcome metrics." },
      { text: "Can management give clear updates to funders, partners or its own board?", helpText: "Evidence: recent update and supporting figures." },
    ],
  },
];
