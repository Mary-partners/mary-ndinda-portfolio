// The Management Capital Index (MCI 1.1) question bank: 36 behaviour-based
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

// Suggested first corrective action per question (in order), from the MCI 1.1
// question bank. Used by the deterministic action engine for weak items.
export const SUGGESTED_ACTIONS: Record<string, string[]> = {
  financial: [
    "Create a simple sales and spending tracker; reconcile the last 90 days",
    "Hold a monthly performance review with named actions",
    "Set up and update a weekly cash plan",
    "Calculate margins on the three biggest offers",
    "Review monthly variances and agree actions",
    "Create a payment and obligations calendar",
  ],
  governance: [
    "Assign an owner to each core responsibility",
    "Set approval limits and a second-person check",
    "Introduce monthly control checks",
    "Hold a quarterly management or adviser review",
    "Maintain a single obligations calendar",
    "Create an issue register and name an escalation owner",
  ],
  strategic: [
    "Identify three priority customer segments",
    "Test demand before expanding",
    "Review the economics for the main product or job",
    "Interview five customers and lost prospects",
    "Set three measurable 90-day priorities",
    "Map growth bottlenecks and dependencies",
  ],
  operational: [
    "Document five core processes",
    "Track on-time delivery and quality weekly",
    "Start weekly stock or capacity checks",
    "Use a shared customer follow-up register",
    "Introduce a 30-minute weekly operating review",
    "Delegate two recurring decisions and test cover",
  ],
  founder: [
    "Start a decision log with outcomes",
    "Set weekly team check-ins",
    "Delegate one measurable outcome per team lead",
    "Review overdue actions weekly",
    "Run a 30-day customer-feedback experiment",
    "Hold a monthly lessons and risks discussion",
  ],
  absorption: [
    "Compare non-financing and financing solutions",
    "Turn the growth idea into a milestone plan",
    "Track resources against planned outputs",
    "Stress-test repayment before taking on debt",
    "Set a baseline and monthly outcome measures",
    "Create a quarterly stakeholder update",
  ],
};

// Plain-language guidance that helps a founder think through each question,
// in pillar order. Shown under the question in the self-assessment.
export const QUESTION_HELP: Record<string, string[]> = {
  financial: [
    "This asks whether your income and costs are written down somewhere you can show, not just held in your head. A notebook, spreadsheet or app where each month's sales and expenses are listed and add up is enough.",
    "This is about whether someone actually looks at the monthly numbers and decides what to do next, rather than filing them away. Think of a short monthly sit-down: what went well, what did not, and what to change.",
    "This asks whether you can see money coming in and going out over the next two months, so a shortfall does not surprise you. A simple week-by-week list of expected payments in and out covers it.",
    "This is about knowing which products or jobs actually make money once you subtract their direct costs, not just which ones sell the most. Think about your top offers and the profit left on each.",
    "This asks whether you set a rough plan for the month, then check how the real results compared and act when they differ. It is the habit of comparing plan against actual.",
    "This is about knowing what you owe and when, before it falls due, so taxes, suppliers and loan payments are never a shock. A simple calendar of due dates and amounts is enough.",
  ],
  governance: [
    "This asks whether your team can say who is responsible for each important decision and result, so nothing falls through the cracks. Consider whether roles are clear or everything comes back to you.",
    "This is about whether big purchases or payments are checked by someone before they happen, to prevent mistakes and misuse. For example, spending above a set amount needs a second person to approve.",
    "This asks whether stock, cash, customer data and equipment are checked and protected regularly, so losses or theft are caught early. Think simple routine checks, not a formal audit.",
    "This is about having a regular meeting where leaders review results and are free to question decisions, rather than decisions going unchallenged. Even a quarterly review with an adviser counts.",
    "This asks whether the business keeps track of permits, contracts, staff obligations and deadlines in one place, so nothing important lapses. A single calendar or list is enough.",
    "This is about whether, when something goes wrong, it gets written down, given to someone to fix, and actually resolved. Consider whether issues are tracked or just forgotten.",
  ],
  strategic: [
    "This asks whether your team can clearly name your main customers and why they choose you, rather than trying to sell to everyone. Think about your two or three most important customer groups.",
    "This is about having real evidence, like repeat orders or a pipeline, that customers want the next thing you plan to grow into, before you invest in it.",
    "This asks whether you know what you earn from a typical sale, job or customer after direct costs, so growth adds profit and not just more work.",
    "This is about whether customers and staff can explain why buyers pick you over competitors. If the only answer is price, that is worth noticing.",
    "This asks whether you have about three clear, measurable priorities for the next three months, each with an owner and a due date, instead of a long vague wish list.",
    "This is about understanding what actually has to change, in people, systems or capacity, for you to serve more customers well, rather than assuming growth just happens.",
  ],
  operational: [
    "This asks whether your most important recurring tasks are written down as simple steps and followed, so quality does not depend on one person remembering. Think checklists for your core work.",
    "This is about whether you track if orders or services are finished on time and to standard, so you can see and fix slippage early.",
    "This asks whether you can spot shortages, waste or capacity limits before they affect customers, rather than discovering them when something runs out.",
    "This is about keeping customer requests, complaints and repeat sales in one shared place, so follow-up does not depend on one person's memory or phone.",
    "This asks whether teams regularly look at a few practical measures and solve the problems that keep recurring, instead of firefighting the same issues.",
    "This is about whether normal work could continue for two weeks if you, the founder, stepped back from managing every task. It tests how much the business depends on you personally.",
  ],
  founder: [
    "This asks whether leaders can explain a recent decision and the information they used, showing decisions are thought through rather than purely by gut.",
    "This is about whether each manager knows their targets and reviews progress with their team, so everyone is pulling in the same direction.",
    "This asks whether managers give people ownership of outcomes, rather than needing to approve every small step themselves.",
    "This is about whether agreed actions actually get done by their deadlines, and when they slip, the reason is understood and addressed.",
    "This asks whether customer feedback has led to a real change in the business in the last three months, showing you listen and adapt.",
    "This is about whether the team spots problems early, welcomes challenge and adjusts plans, rather than pushing on regardless.",
  ],
  absorption: [
    "This asks whether you can honestly say whether your next step needs better use of what you already have, a partner, or outside funding, rather than assuming the answer is money.",
    "This is about whether a planned investment has its activities, costs, owners and milestones written down, so money would be used to a plan.",
    "This asks whether, for money or resources you received before, you can show what they were used for and what came of it.",
    "This is about whether, before borrowing, you have tested that you could still make repayments in a weak sales month, not only a good one.",
    "This asks whether you compare what a project actually achieved against the improvement you expected, so you learn what works.",
    "This is about whether management can give clear, honest updates with figures to funders, partners or a board, which builds trust and support.",
  ],
};

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
