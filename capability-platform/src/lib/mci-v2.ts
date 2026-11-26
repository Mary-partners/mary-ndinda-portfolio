// Management Capital Index, revised rubric (v2).
// 36 behaviour-anchored items, six pillars, equal item and pillar weights.
// Source: Management_Capital_Index_36_Questions.md + Scoring_and_Report.md.

export const RUBRIC_VERSION = "2.0";

export interface MciItem {
  code: string;        // stable item id, e.g. FM01
  pillar: string;      // dimension key: financial | governance | strategic | operational | founder | absorption
  order: number;       // 1-based position within the pillar
  question: string;
  anchors: [string, string, string, string, string]; // statements for scores 0..4
  evidence: string;
  action: string;      // action + completion check
  why: string;         // why it matters (shown with the action)
  essential?: boolean; // financial essential (FM01, FM02, FM03, FM06)
  eligibility?: string; // reason N/A is allowed, else undefined (N/A not offered)
}

export const PILLAR_NAMES: Record<string, string> = {
  financial: "Financial Management Capability",
  governance: "Governance and Accountability",
  strategic: "Strategic Clarity",
  operational: "Operational Systems",
  founder: "Founder and Management Capability",
  absorption: "Capital Absorption Capability",
};
export const PILLAR_ORDER = ["financial", "governance", "strategic", "operational", "founder", "absorption"];

// The founder-facing meaning of each 0-4 level (generic scale label).
export const LEVEL_LABELS = ["Not yet in place", "Used occasionally", "In use, still inconsistent", "Part of the routine", "Routinely reviewed and improved"];

export const MCI_ITEMS: MciItem[] = [
  // Financial Management Capability
  { code: "FM01", pillar: "financial", order: 1, essential: true, eligibility: "No financial activity yet",
    question: "Over the last three completed months, how regularly did you match your financial records to your business bank, mobile-money or cash balances?",
    anchors: ["No matching done.", "Checked a balance when a problem came up.", "Some months or accounts matched, or differences left unexplained.", "Matched all active accounts at each month-end and explained differences.", "Also tracked recurring differences and changed how they arise or are detected."],
    evidence: "Reconciliation, statements and cash counts.",
    action: "Reconcile each active account for two consecutive months and log adjustments.",
    why: "Reconciled balances give you a reliable starting point for decisions." },
  { code: "FM02", pillar: "financial", order: 2, essential: true,
    question: "How do you keep business money identifiable when you pay for things personally or take money out of the business?",
    anchors: ["Business and personal transactions cannot be distinguished.", "Reconstruct them when needed.", "Separate records or payment channels exist, with some transfers or withdrawals unrecorded.", "Business money is kept separately and personal transfers or drawings are recorded each month.", "The separation and transfer records are reviewed, and a recurring exception was fixed."],
    evidence: "Statements, owner drawings log or separate cash ledger.",
    action: "Set up a separate business payment channel or cash ledger and record all owner movements in the next two closes.",
    why: "Separating money makes business costs and owner transfers visible." },
  { code: "FM03", pillar: "financial", order: 3, essential: true,
    question: "In the last four completed weeks, how often did you update a plan for the cash expected in and out over the next eight weeks?",
    anchors: ["No forward cash plan.", "Estimated cash when a payment or shortfall came up.", "A forward plan exists, with missed updates or material flows omitted.", "Updated weekly with material receipts, payments and expected closing cash.", "Compared forecasts with actual cash and changed an assumption or acted on a projected gap."],
    evidence: "Dated cash plan and decision note.",
    action: "Create an eight-week rolling cash plan and complete four dated weekly updates.",
    why: "A weekly forecast reveals cash gaps early enough to act." },
  { code: "FM04", pillar: "financial", order: 4,
    question: "In the last three completed months, how often did you compare actual financial results with a budget or target?",
    anchors: ["No comparison.", "Looked at numbers when something went wrong.", "A plan and actuals were compared at least once, with gaps in cadence or follow-up.", "Compared each month, explained material differences and assigned the next action when needed.", "Checked a prior action's result and adjusted the plan or review process."],
    evidence: "Budget comparison, management accounts or review notes.",
    action: "Complete two monthly reviews with material variances, named actions and due dates.",
    why: "Comparing plan with actuals shows where to adjust before gaps grow." },
  { code: "FM05", pillar: "financial", order: 5,
    question: "When did you last calculate what you keep from a sale after its direct costs? For pre-revenue firms, use the proposed offer and current cost estimates.",
    anchors: ["No calculation.", "Used rough estimates for an isolated sale or offer.", "Calculated direct costs for some main offers, with important costs missing or figures stale.", "Used current prices and material direct costs for the main offers and refreshed them when inputs changed.", "Checked estimates against actual or independently tested costs and used the result to adjust a decision."],
    evidence: "Costing worksheet, supplier quote or actual job costs.",
    action: "Cost the main offers with current figures and record a pricing or cost decision.",
    why: "Knowing the margin on each offer protects pricing and profit." },
  { code: "FM06", pillar: "financial", order: 6, essential: true, eligibility: "No amounts due in either direction",
    question: "In the past four completed weeks, how did you keep track of money due to the business and payments coming due? Include credit invoices, suppliers, taxes and loans where relevant.",
    anchors: ["No list of due amounts.", "Checked when chased or when cash ran short.", "Some due items tracked or the list updated irregularly.", "Reviewed relevant amounts, due dates and overdue items weekly and assigned follow-up where needed.", "Checked follow-up outcomes and improved collections or payment planning."],
    evidence: "Due-date register, aged listings or reminders and collection notes.",
    action: "Maintain the due-date register and record four weekly checks and follow-ups.",
    why: "A due-date register makes it easier to collect on time and plan payments." },

  // Governance and Accountability
  { code: "GA01", pillar: "governance", order: 1,
    question: "How do people know which important decisions they can make and which they need to escalate? If solo, think of what you handle versus what needs external input.",
    anchors: ["No clear boundaries.", "Worked it out case by case.", "Main responsibilities listed, with recurring uncertainty on approvals.", "Decision boundaries are clear and used in recent examples.", "A recurring decision delay or overlap was reviewed and authority was updated."],
    evidence: "Decision list and dated examples.",
    action: "Write down the top decision rights and test them on two real decisions.",
    why: "Clear decision rights stop delays and overlaps." },
  { code: "GA02", pillar: "governance", order: 2, eligibility: "No material commitment in the last 12 months",
    question: "What check happened before your most recent material business payment or commitment? Use the last 12 months.",
    anchors: ["No check.", "Checked informally or only after paying.", "A basic check exists and is sometimes missed.", "Above a set threshold, checked the request against a quote, invoice or agreed terms before committing and recorded approval.", "Reviewed exceptions or sampled approvals and strengthened a weak check."],
    evidence: "Payment approvals and invoices.",
    action: "Define approval thresholds and document the checks on the next two applicable commitments.",
    why: "A check before committing prevents costly mistakes and misuse." },
  { code: "GA03", pillar: "governance", order: 3,
    question: "How do you control who can access sensitive business resources, such as money, stock or customer records? Focus on the most consequential resource.",
    anchors: ["Access is unrestricted or unknown.", "Changed access only after a concern.", "Access restrictions exist, with gaps in review or removal.", "Access is limited by role or need and checked periodically or when responsibilities change.", "Tested access or reviewed an exception and fixed a weakness."],
    evidence: "Access list, authorisations or key log.",
    action: "List current access, remove inappropriate access and set the next check date.",
    why: "Controlling access protects cash, stock and customer data." },
  { code: "GA04", pillar: "governance", order: 4,
    question: "When did someone last challenge an important business decision before you made it? Think of a co-founder, manager, board member or trusted adviser.",
    anchors: ["No challenge sought.", "Asked for an opinion only after a concern.", "Sought input on some decisions, with little follow-through.", "Significant decisions are regularly challenged and decisions or actions are recorded.", "Followed up on earlier decisions and improved how challenge is sought or acted on."],
    evidence: "Review notes or a decision log.",
    action: "Agree who challenges significant decisions and record two decisions and follow-up dates.",
    why: "Challenge before a decision catches blind spots." },
  { code: "GA05", pillar: "governance", order: 5,
    question: "How do you track the business obligations with deadlines, such as permits, filings, contracts or staff obligations?",
    anchors: ["No record.", "Responded when reminded externally.", "Some obligations tracked, with incomplete dates or ownership.", "Current obligations have dates, an owner and a regular check before deadlines.", "Reviewed a missed or near-missed deadline and strengthened the reminder or ownership process."],
    evidence: "Compliance calendar or obligation register.",
    action: "List applicable obligations, set reminders and complete two scheduled checks.",
    why: "Tracking obligations avoids missed deadlines and penalties." },
  { code: "GA06", pillar: "governance", order: 6, eligibility: "No material escalation event in the last 12 months",
    question: "The last time a material risk or incident needed escalation, what happened? Use the last 12 months.",
    anchors: ["Neither recorded nor escalated.", "Discussed it informally or responded only after escalation.", "Recorded the issue, with ownership or closure unclear.", "Recorded, assigned and followed it through to closure or an agreed control.", "Reviewed the cause or recurrence and improved the control."],
    evidence: "Risk or incident register and closure note.",
    action: "Log the next material issue, assign it and document closure or risk acceptance.",
    why: "Escalating and closing issues stops them recurring." },

  // Strategic Clarity
  { code: "SC01", pillar: "strategic", order: 1,
    question: "How do you decide which customers to focus on?",
    anchors: ["No priority segment.", "Chose mainly by instinct or convenience.", "Named segments with limited or old evidence.", "Prioritised segments using current sales, enquiries or customer conversations.", "Rechecked the evidence and changed or confirmed a targeting decision with reasons."],
    evidence: "Sales by segment or customer notes.",
    action: "Compare evidence across key segments and document one segment to prioritise.",
    why: "Focusing on the right customers uses limited effort well." },
  { code: "SC02", pillar: "strategic", order: 2,
    question: "Before the next growth step, what have you done to test whether customers will buy?",
    anchors: ["No demand test.", "Used informal expressions of interest.", "Ran a limited test, with the buying signal or success measure unclear.", "Tested with intended buyers using a defined signal such as paid trials, orders or repeat purchases.", "Used the test result to revise, stop or broaden the next investment."],
    evidence: "Orders, trial results or customer commitments.",
    action: "Define a buying signal, run a small test and record what would justify proceeding.",
    why: "Testing demand before you invest reduces wasted spend." },
  { code: "SC03", pillar: "strategic", order: 3,
    question: "When did you last check why customers choose you or go elsewhere?",
    anchors: ["No check.", "Relied on an isolated complaint or compliment.", "Asked some customers or checked a competitor without a repeatable method.", "Periodically checked customer reasons and alternatives using recent examples.", "Used the findings to change the offer, message or sales process and checked the result."],
    evidence: "Win/loss notes or customer interview log.",
    action: "Log customer buying reasons and losses, then record a commercial decision informed by the findings.",
    why: "Knowing why customers choose you sharpens the offer." },
  { code: "SC04", pillar: "strategic", order: 4,
    question: "How are your most important priorities for the next 90 days set?",
    anchors: ["No priorities.", "Kept a mental or changing list.", "Priorities are written, with some missing owners, measures or dates.", "A short list has owners, dates and clear measures of success.", "Evaluated prior priorities and changed how priorities or targets are set."],
    evidence: "Quarterly plan or decision log.",
    action: "Put up to three priorities in one plan with owners, measures and dates.",
    why: "A few clear priorities keep the team pulling together." },
  { code: "SC05", pillar: "strategic", order: 5,
    question: "How often do you check progress against those priorities?",
    anchors: ["No check.", "Checked when prompted or when behind.", "Checked periodically, with no consistent follow-up.", "Checked on a set schedule and assigned actions for missed milestones.", "Followed up on actions and revised targets or resources based on what happened."],
    evidence: "Progress or action log.",
    action: "Run two scheduled reviews and record action owners and due dates.",
    why: "Checking progress keeps priorities on track." },
  { code: "SC06", pillar: "strategic", order: 6,
    question: "How have you checked what might limit your next meaningful growth step?",
    anchors: ["No check.", "Listed concerns informally.", "Identified likely bottlenecks with little evidence or comparison.", "Compared demand, capacity and resource constraints using available figures and identified the main bottleneck.", "Ran a test or scenario and revised the growth sequence as a result."],
    evidence: "Capacity and demand estimates or scenario comparison.",
    action: "Quantify one bottleneck and document what needs to change before expanding.",
    why: "Finding the bottleneck first makes growth deliverable." },

  // Operational Systems
  { code: "OP01", pillar: "operational", order: 1,
    question: "How consistently is the same method used for your most important repeatable task?",
    anchors: ["No stable method.", "The steps change each time or only exist in memory.", "A method exists, with frequent deviations or incomplete instruction.", "A checklist, template or clear agreed method is used on recent jobs.", "Compared outcomes and revised the method to address recurring variation."],
    evidence: "Checklist and two examples of use.",
    action: "Write a short method and test it on two jobs or operating cycles.",
    why: "A consistent method keeps quality steady as you grow." },
  { code: "OP02", pillar: "operational", order: 2, eligibility: "No work delivered or produced yet",
    question: "In the last three completed months, how did you track whether work was delivered when promised?",
    anchors: ["Delivery timing was not tracked.", "Checked timing when a customer chased.", "Tracked some orders or jobs, with gaps.", "Tracked commitments and actual delivery regularly and investigated material delays.", "Changed the delivery process and checked whether delay rates improved."],
    evidence: "Dated order or service log.",
    action: "Record promised and actual dates for the next defined batch of work and review exceptions.",
    why: "Tracking on-time delivery lets you fix slippage early." },
  { code: "OP03", pillar: "operational", order: 3, eligibility: "No work delivered or produced yet",
    question: "What check tells you the work meets your quality requirements before it reaches the customer?",
    anchors: ["No quality check.", "Checked after complaints or irregularly.", "A check exists but is inconsistently applied or recorded.", "A standard check is used at the relevant point, with failures recorded.", "Used failure data to improve the check or prevent repeat defects."],
    evidence: "Quality checklist or exception record.",
    action: "Define a pre-delivery check and use it for the next two operating cycles.",
    why: "A quality check before delivery protects your reputation." },
  { code: "OP04", pillar: "operational", order: 4,
    question: "How do you check there is enough capacity, stock or supplier availability to deliver upcoming commitments?",
    anchors: ["No forward check.", "Reacted when a resource ran out.", "Checked some resources, with irregular updates.", "Regularly compared upcoming commitments against the resource most likely to limit delivery.", "Compared planned versus actual capacity or stock and improved thresholds or scheduling."],
    evidence: "Stock report, work schedule or supplier lead-time record.",
    action: "Set a regular capacity or stock check and record two decisions or confirmations.",
    why: "Checking capacity ahead avoids letting customers down." },
  { code: "OP05", pillar: "operational", order: 5, eligibility: "No recurring issue observed",
    question: "What happened the last time the same delivery or quality problem came up again? Use the last 12 months.",
    anchors: ["No response or tracking.", "Fixed the immediate issue only.", "Looked for the cause, with prevention or follow-up incomplete.", "Identified the cause, assigned prevention and checked whether it recurred.", "Used the follow-up to revise the process or rolled the fix out where else it could recur."],
    evidence: "Complaint log, cause analysis and follow-up data.",
    action: "Trace a repeat issue, assign a preventive change and track recurrence for four weeks.",
    why: "Fixing the cause of repeat problems stops them returning." },
  { code: "OP06", pillar: "operational", order: 6,
    question: "How would priority work continue when its usual owner is unavailable?",
    anchors: ["Work would stop with no fallback.", "Relies on last-minute arrangements.", "Has a named backup or instructions that have not been used or tested.", "Has usable instructions and an alternate person, supplier or workable rescheduling arrangement that has been tested.", "Improved the fallback after a test or real disruption."],
    evidence: "Handover, backup agreement or test record.",
    action: "Document the fallback for critical work and complete one test.",
    why: "A tested fallback keeps critical work going when someone is away." },

  // Founder and Management Capability
  { code: "PM01", pillar: "founder", order: 1,
    question: "How do you agree what good work looks like with the people delivering it? If solo, use your own deliverables and checkpoints.",
    anchors: ["No defined outcomes.", "Explained expectations when issues came up.", "Some outcomes defined, with inconsistent deadlines or checks.", "Main deliverables have a clear standard, timing and an agreed check-in.", "Reviewed which expectations caused confusion and improved the way work is agreed."],
    evidence: "Work brief or personal commitments with checkpoints.",
    action: "Agree standards and checkpoints for two recurring deliverables.",
    why: "Agreeing what good looks like reduces rework." },
  { code: "PM02", pillar: "founder", order: 2, eligibility: "No new work in the last 12 months",
    question: "How do you get someone ready for new work? If solo, use your own preparation for a new task or tool.",
    anchors: ["No preparation.", "Explained or learned the essentials as problems came up.", "Some guidance or practice, with no readiness check.", "Used a defined briefing or practice step and checked readiness before relying on the work.", "Used errors or feedback to improve the briefing or practice."],
    evidence: "Onboarding checklist, trial or competency check.",
    action: "Create a short briefing and readiness check for the next new responsibility.",
    why: "Preparing people for new work prevents avoidable errors." },
  { code: "PM03", pillar: "founder", order: 3, eligibility: "No identified missed commitment in the last 12 months",
    question: "The last time agreed work fell below the expected standard, what happened? If solo, use a missed personal work commitment. Use the last 12 months.",
    anchors: ["No follow-up.", "Corrected it or discussed it once with no check back.", "Agreed an improvement but did not confirm it happened.", "Identified the gap, agreed the improvement or support, and checked progress later.", "Adjusted expectations, support or workflow after reviewing the result."],
    evidence: "Check-in and follow-up notes.",
    action: "Review one missed commitment, agree a change and check it at the next two relevant checkpoints.",
    why: "Following up on missed work turns it into improvement." },
  { code: "PM04", pillar: "founder", order: 4,
    question: "How do you build the skills the business needs next?",
    anchors: ["No skills plan or practice.", "Learned only when a problem arose.", "Identified a skill or training need without consistent practice.", "Identified priority skills and scheduled practice, coaching or training with a progress check.", "Checked whether capability improved on real work and adjusted the development plan."],
    evidence: "Skills plan, coaching or work sample.",
    action: "Select one skills gap, schedule practice and review a work sample.",
    why: "Building the next skills keeps the business capable." },
  { code: "PM05", pillar: "founder", order: 5,
    question: "How do you give someone room to make decisions about their work? If solo, how do you protect time for the founder decisions only you can make?",
    anchors: ["Work and decisions are unmanaged or all handled reactively.", "Delegated tasks without authority, or freed founder time only when overloaded.", "Set some authority or protected time, with frequent interruptions or overrides.", "Delegated outcomes with usable decision limits, or protected founder time with a regular triage routine.", "Reviewed bottlenecks and changed decision limits or what is delegated, outsourced or postponed."],
    evidence: "Delegated brief, decision record or calendar.",
    action: "Define decision limits for one responsibility or protect recurring founder decision time and check its use.",
    why: "Clear decision room frees you for the work only you can do." },
  { code: "PM06", pillar: "founder", order: 6,
    question: "How do you follow through on agreed actions from team or personal work reviews?",
    anchors: ["No tracking.", "Relied on memory or reminders after missed dates.", "Tracked some actions, or checked status irregularly.", "Actions have owners and dates and are checked for completion at a regular cadence.", "Reviewed why actions were late and improved how work is assigned or followed up."],
    evidence: "Action log and closed items.",
    action: "Track owners and dates and check completion at two successive reviews.",
    why: "Tracking agreed actions means they actually get done." },

  // Capital Absorption Capability
  { code: "GR01", pillar: "absorption", order: 1,
    question: "How do you compare ways to resource your next business improvement?",
    anchors: ["No comparison.", "Settled on the first available option.", "Listed options with little comparison of cost or capacity.", "Compared feasible options on cost, timing and constraints before choosing.", "Revisited the choice using new evidence or results and recorded what changed."],
    evidence: "Options comparison.",
    action: "Compare at least two feasible options and document the trade-off and choice.",
    why: "Comparing options finds the best use of limited resources." },
  { code: "GR02", pillar: "absorption", order: 2,
    question: "Before committing to an improvement, how do you set the resources it will use?",
    anchors: ["No estimate.", "Estimated cash or time informally.", "Listed major costs or effort, with key omissions.", "Set a usable resource budget covering cash, time and material inputs before committing.", "Used actuals or new quotes to adjust estimates or the contingency."],
    evidence: "Costed work plan or resource budget.",
    action: "Estimate costs and staff time for the next improvement and agree the available limit.",
    why: "A resource budget keeps an improvement from overrunning." },
  { code: "GR03", pillar: "absorption", order: 3,
    question: "How do you decide who is responsible for delivering an improvement and when to check progress?",
    anchors: ["No owner or milestones.", "Assigned work informally as it arose.", "Some owners or checkpoints identified, with gaps.", "Named an owner and set dated milestones before starting.", "Revised milestone or handover design after reviewing implementation experience."],
    evidence: "Milestone plan or task tracker.",
    action: "Name an owner and set dated milestones for one improvement.",
    why: "An owner and milestones keep improvements on track." },
  { code: "GR04", pillar: "absorption", order: 4, eligibility: "No improvement undertaken in the last 12 months",
    question: "During a recent improvement, how did you track the resources used against the plan? Use the last 12 months.",
    anchors: ["No tracking.", "Checked totals near the end or when funds ran short.", "Tracked some spending or time, with irregular comparisons.", "Compared actual spending or effort with plan during delivery and addressed a material variance where relevant.", "Reviewed variance patterns and improved the tracking or allocation routine."],
    evidence: "Spending or time tracker and change decision.",
    action: "Review actual versus plan at two project checkpoints and record variances.",
    why: "Tracking spend against plan catches overruns in time." },
  { code: "GR05", pillar: "absorption", order: 5,
    question: "Before starting an improvement, how do you decide what result would make it worthwhile?",
    anchors: ["No intended result.", "Set a broad intention.", "Identified a measure without a baseline, a target or a review date.", "Recorded a starting point, target and date for reviewing the outcome.", "Improved the choice of measure or target using lessons from a prior improvement."],
    evidence: "Baseline and target note.",
    action: "Record the baseline, success measure, target and review date before the next improvement starts.",
    why: "Setting the intended result lets you judge if it worked." },
  { code: "GR06", pillar: "absorption", order: 6, eligibility: "No completed improvement in the last 12 months",
    question: "After your latest completed improvement, what did you do with the results? Use the last 12 months.",
    anchors: ["No results review.", "Relied on impressions.", "Looked at some results without comparing them consistently with expectations.", "Compared results with the intended outcome and made a decision to continue, adjust or stop.", "Applied the lessons to a subsequent improvement and checked the effect."],
    evidence: "Review note and subsequent decision.",
    action: "Do a close-out review and document one decision it informs.",
    why: "Reviewing results turns one improvement into lessons for the next." },
];

// Lookups
export const ITEM_BY_CODE = new Map(MCI_ITEMS.map((i) => [i.code, i]));
export function itemAt(pillar: string, order: number): MciItem | undefined {
  return MCI_ITEMS.find((i) => i.pillar === pillar && i.order === order);
}
export const FINANCIAL_ESSENTIALS = MCI_ITEMS.filter((i) => i.essential).map((i) => i.code); // FM01,FM02,FM03,FM06
// Priority tie-break sequence, then remaining items in question-bank order.
export const TIEBREAK_SEQUENCE = ["FM01", "FM03", "FM06", "FM02", "OP05", "OP03", "PM03"];
export function tiebreakRank(code: string): number {
  const i = TIEBREAK_SEQUENCE.indexOf(code);
  if (i >= 0) return i;
  return TIEBREAK_SEQUENCE.length + MCI_ITEMS.findIndex((x) => x.code === code);
}

// Round half up (deterministic), for non-negative display values.
export function roundHalfUp(x: number): number {
  return Math.floor(x + 0.5);
}

export interface MciBand { label: string; blurb: string }
// Pilot bands on the unrounded 0-4 value.
export function bandV2(raw: number | null): MciBand {
  if (raw === null || Number.isNaN(raw)) return { label: "Insufficient information", blurb: "Not enough questions were answered to show a score." };
  if (raw < 0.5) return { label: "Starting out", blurb: "Few of the measured routines are in place." };
  if (raw < 1.5) return { label: "Used occasionally", blurb: "Routines are mostly used as needed." };
  if (raw < 2.5) return { label: "Developing", blurb: "Some routines are in use and consistency varies." };
  if (raw < 3.5) return { label: "Strong", blurb: "Routines are generally used regularly." };
  return { label: "Embedded", blurb: "Routines are generally established, reviewed and improved." };
}
