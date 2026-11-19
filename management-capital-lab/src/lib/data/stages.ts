/**
 * Growth stages for the Management Capital Index.
 *
 * Chapter Two's position (sections 2.2.3, 2.3.4, 2.4.6 and 2.4.24): the six
 * capabilities form a stable core at every size, but what they look like in
 * practice changes as a business grows. A five-person retailer and a
 * 200-person manufacturer both need decision-useful financial information;
 * they just produce it differently. The index therefore measures the
 * *function* a practice performs, proportionate to the firm's stage, rather
 * than rewarding formality for its own sake ("minimum effective formalisation").
 *
 * The stages and size cues below are indicative design choices for the
 * qualitative stage of the research. Formal employment and turnover bands for
 * Kenya and South Africa will be set in Chapter Three.
 */

export type StageKey = "early" | "growing" | "scaling";

export interface Stage {
  key: StageKey;
  name: string;
  tagline: string;
  /** Typical signs a business is at this stage. */
  signs: string[];
  /** Indicative headcount cue; complexity matters more than size. */
  sizeCue: string;
  /** Finance typically sought at this stage. */
  typicalFinance: string[];
  /** The central management question at this stage. */
  centralQuestion: string;
}

export const STAGES: Stage[] = [
  {
    key: "early",
    name: "Early-stage",
    tagline: "Establishing the business",
    signs: [
      "The owner makes most decisions and does much of the delivery",
      "Trading steadily, but systems are mostly informal",
      "Household and business finances are easily mixed",
    ],
    sizeCue: "Often fewer than 10 people",
    typicalFinance: [
      "Own savings, family, savings groups",
      "Mobile or digital credit, microloans",
      "Small working-capital loans and grants",
    ],
    centralQuestion: "Can the business see its own numbers clearly enough to survive and earn its first formal finance?",
  },
  {
    key: "growing",
    name: "Growing",
    tagline: "Expanding beyond the founder",
    signs: [
      "Proven demand and rising revenue",
      "A team with its first managers or supervisors",
      "More customers, sites or products than the founder can personally oversee",
    ],
    sizeCue: "Often around 10–50 people",
    typicalFinance: [
      "Bank overdrafts and term loans",
      "Asset, invoice and trade finance",
      "First angel, impact or growth investor",
    ],
    centralQuestion: "Can the business keep control, quality and cash discipline as it grows faster than the founder can personally manage?",
  },
  {
    key: "scaling",
    name: "Scaling",
    tagline: "Building an institution",
    signs: [
      "A management layer runs day-to-day operations",
      "Several sites, markets or product lines",
      "Boards, investors, lenders and regulators to answer to",
    ],
    sizeCue: "Often 50+ people or several sites",
    typicalFinance: [
      "Institutional equity and DFI finance",
      "Large term debt and syndicated facilities",
      "Export and supply-chain finance",
    ],
    centralQuestion: "Can the organisation govern, report on and allocate large amounts of capital across a complex business?",
  },
];

export const STAGE_BY_KEY: Record<StageKey, Stage> = Object.fromEntries(
  STAGES.map((s) => [s.key, s])
) as Record<StageKey, Stage>;

export interface PillarStage {
  /** A few words for the stage matrix. */
  focus: string;
  /** What good practice looks like at this stage. */
  looksLike: string;
  /** Behaviourally anchored diagnostic questions for this stage. */
  questions: string[];
  /** The gap most commonly seen at this stage. */
  watchFor: string;
}

/** Keyed by pillar slug (see pillars.ts). */
export const PILLAR_STAGES: Record<string, Record<StageKey, PillarStage>> = {
  "financial-management-capability": {
    early: {
      focus: "Separate money; know margins and cash",
      looksLike:
        "Business and personal money are kept apart, every sale and cost is recorded, and the owner knows the margin on what they sell and the cash position for the next few weeks.",
      questions: [
        "Is business money kept separate from personal or household money, every time?",
        "Could you show last month's total sales and costs today, from records rather than memory?",
        "Do you know the gross margin on your main products or services?",
        "Can you see a cash shortfall coming a few weeks before it hits?",
      ],
      watchFor: "Profits look fine on paper, but cash keeps running short because stock and customer credit absorb it.",
    },
    growing: {
      focus: "Monthly accounts, budget review, 13-week cash",
      looksLike:
        "Monthly management accounts arrive soon after month-end, are compared with a budget and used to make decisions. Working capital (stock, debtors, creditors) is actively managed.",
      questions: [
        "Are monthly management accounts ready within about three weeks of month-end, and who reviews them?",
        "When results differ materially from budget, what happens next? Describe the last time.",
        "Do you run a rolling 13-week cash forecast and track debtor and creditor days?",
        "Do you know profitability by product, customer or branch, and has it changed a decision in the last quarter?",
      ],
      watchFor: "Revenue grows faster than cash: debtors and stock swell, and the business borrows short-term to fund growth.",
    },
    scaling: {
      focus: "Finance function, audit, scenario forecasting",
      looksLike:
        "A finance function led by someone other than the founder produces timely, reconciled, audit-ready reporting. Forecasts test scenarios, and major investments are reviewed against the returns expected.",
      questions: [
        "Is there a finance lead or CFO-level role, and are the accounts audited annually?",
        "Do you maintain scenario-based forecasts and track headroom on loan covenants?",
        "Do major investments (a new site, product or market) go through a business case and a post-investment review?",
        "Can you produce consolidated reporting across entities, sites or currencies on time?",
      ],
      watchFor: "Reporting lags the business: consolidation, currency exposure and covenants are tracked manually or late.",
    },
  },
  "governance-and-accountability": {
    early: {
      focus: "Clear ownership; someone to challenge you",
      looksLike:
        "Ownership is documented, the owner has someone outside the day-to-day who challenges their thinking, and significant spending gets a second look.",
      questions: [
        "Is ownership of the business clearly documented (registration, shareholding or partnership terms)?",
        "Is there someone outside the day-to-day, such as a mentor, peer group or adviser, who regularly challenges your decisions?",
        "Is there a simple rule for who can approve spending above a set amount, and is it followed?",
      ],
      watchFor: "All decisions and bank access sit with one person; the business would stop if they were unavailable.",
    },
    growing: {
      focus: "Delegated authority, advisory board, controls",
      looksLike:
        "Decision rights and approval limits are written down and delegated. An advisory board or external advisers review real numbers regularly, duties are separated, and someone can step in for the founder.",
      questions: [
        "Are approval limits written down, and can managers approve within them without the founder?",
        "Does an advisory board or external adviser meet at least quarterly with real financial information in front of them?",
        "Are duties separated, so the person who approves a payment is not the person who makes it?",
        "If you were away for a month, who would run the business and sign payments?",
      ],
      watchFor: "The founder becomes the bottleneck: every decision waits for them, and controls are informal workarounds.",
    },
    scaling: {
      focus: "Independent board, risk and audit, succession",
      looksLike:
        "A board with independent members oversees strategy, risk and executive performance. Internal controls are reviewed, conflicts of interest are disclosed, and succession is planned.",
      questions: [
        "Does a board with at least one independent member oversee strategy, risk and executive performance?",
        "Is there a risk register and a regular review of internal controls, with findings followed up?",
        "Are related-party transactions and conflicts of interest disclosed and approved?",
        "Is there a succession plan for the chief executive and other key roles?",
      ],
      watchFor: "Governance is ceremonial: board papers are late or unread, and investor protections exist only on paper.",
    },
  },
  "strategic-clarity": {
    early: {
      focus: "Know the customer and the margin per sale",
      looksLike:
        "The owner can describe the target customer, why they buy, and what one sale earns after direct costs, and has tested the price with real customers.",
      questions: [
        "Can you describe your main customer and why they choose you over the alternatives?",
        "Do you know what a typical sale earns you after direct costs?",
        "Have you tested or reviewed your prices with real customers in the last six months?",
      ],
      watchFor: "Selling to 'everyone', and accepting every order regardless of its margin.",
    },
    growing: {
      focus: "Few priorities, customer evidence, use of funds",
      looksLike:
        "A short written plan sets a few priorities with milestones and owners, grounded in customer evidence. Any new capital has a clear purpose and sequence, and the business turns down opportunities that don't fit.",
      questions: [
        "Do you have three to five written priorities for the year, each with milestones and an owner?",
        "How do you collect customer evidence (retention, complaints, feedback), and what changed because of it recently?",
        "Can you show what new capital would fund, in what order, and what it should return?",
        "What opportunity did you turn down in the last year because it did not fit the plan?",
      ],
      watchFor: "Diversifying into adjacent products or markets because cash or demand allows it, not because the strategy calls for it.",
    },
    scaling: {
      focus: "Board-reviewed strategy, scenarios, portfolio choices",
      looksLike:
        "Strategy is reviewed formally using market and competitor data, major commitments are tested against scenarios, and resources move between business lines on evidence.",
      questions: [
        "Is strategy reviewed at least annually with the board, using market and competitor data?",
        "Do you test scenarios (demand, currency, input costs) before committing to major investments?",
        "Do you compare returns across product lines, markets or sites and reallocate resources accordingly?",
        "Is there a clear long-term financing strategy that fits the growth plan?",
      ],
      watchFor: "Too many fronts at once: new markets, products and acquisitions stretch management attention.",
    },
  },
  "operational-systems": {
    early: {
      focus: "Simple checklists; track stock and orders",
      looksLike:
        "Core tasks are written down simply, stock, orders and deliveries are tracked, and quality problems are fixed at the cause rather than repeated.",
      questions: [
        "Could someone else complete your core tasks using simple written steps or checklists?",
        "Do you track stock, orders and deliveries in a book, spreadsheet or app?",
        "When a complaint or quality problem happens, is the underlying cause fixed?",
      ],
      watchFor: "Everything lives in the owner's head and phone.",
    },
    growing: {
      focus: "SOPs, KPI reviews, connected systems, back-ups",
      looksLike:
        "Standard procedures and a small set of KPIs let teams deliver without the founder. Sales, stock and finance systems are connected, and there are back-ups for key suppliers, power or equipment.",
      questions: [
        "Do teams review a small set of KPIs weekly or monthly, and act when targets are missed?",
        "Are standard procedures documented for core processes and used to train new staff?",
        "Do your sales, inventory and finance systems connect, or is data re-keyed by hand?",
        "Do you have back-ups for key suppliers, power or equipment?",
      ],
      watchFor: "Volume outgrows the systems: errors, stock-outs and late deliveries rise with every new customer or site.",
    },
    scaling: {
      focus: "Standardised across sites, quality systems, capacity planning",
      looksLike:
        "Processes are standardised and audited across sites, quality or certification systems are in place, capacity is planned well ahead, and improvement is continuous.",
      questions: [
        "Are processes standardised and checked across sites, shifts or product lines?",
        "Do you plan capacity (people, equipment, working capital) at least 12 months ahead?",
        "Is there a recognised quality, safety or certification system in place?",
        "How are improvement ideas captured and rolled out across the organisation?",
      ],
      watchFor: "Each site or unit works differently, and quality depends on the local manager.",
    },
  },
  "founder-and-management-capability": {
    early: {
      focus: "Decide with numbers; seek advice; build trust",
      looksLike:
        "The owner looks at the numbers before big decisions, acts on advice and evidence, keeps commitments, and has at least one person they trust to run things in their absence.",
      questions: [
        "Do you look at your numbers before making significant decisions?",
        "When did you last change a decision because of advice or new evidence?",
        "Is there someone you trust to run the business for a week if you are unavailable?",
      ],
      watchFor: "Decisions by instinct alone, and advice sought only in a crisis.",
    },
    growing: {
      focus: "A management team with real authority",
      looksLike:
        "Functions such as sales, operations and finance are led by people other than the founder, with real authority, clear roles and targets. Specialists are hired ahead of need.",
      questions: [
        "Which functions are led by someone other than the founder, with real authority to decide?",
        "Do managers have written roles, targets and regular performance conversations?",
        "Have you hired specialists (for example in finance or operations) ahead of need rather than after a crisis?",
        "Does the leadership team regularly review what went wrong and what it learned?",
      ],
      watchFor: "The founder still does the jobs they hired others for, and good managers leave because they can't decide anything.",
    },
    scaling: {
      focus: "Executive team, incentives, leadership pipeline",
      looksLike:
        "An experienced executive team with complementary skills owns results. Incentives reward long-term performance, future leaders are being developed, and the founder's role has been deliberately redefined.",
      questions: [
        "Does an executive team with complementary skills meet regularly and own results?",
        "Are incentives linked to measurable performance and long-term value?",
        "Are future managers being developed, so that key roles can be filled from within?",
        "Has the founder's role been deliberately redefined as the business has grown?",
      ],
      watchFor: "Dependence at the top: the business still turns on one or two individuals.",
    },
  },
  "capital-absorption-capability": {
    early: {
      focus: "Know what the money is for; track it",
      looksLike:
        "Before borrowing, the owner can say exactly what the money will buy and when, matches the type and term of finance to that use, and tracks spending against the plan.",
      questions: [
        "Before borrowing, can you list exactly what the money will buy and when?",
        "Is the type and term of finance matched to its use (for example, short-term loans for stock rather than equipment)?",
        "After receiving funds, do you track spending against what you planned?",
      ],
      watchFor: "Short-term or mobile credit used for long-term needs, and loan money mixed with household spending.",
    },
    growing: {
      focus: "Staged use-of-funds plan; milestones; reporting",
      looksLike:
        "A staged use-of-funds plan with owners, milestones, approval limits and a working-capital buffer exists before the money lands, and actual use is reported to funders.",
      questions: [
        "Is there a staged use-of-funds plan with owners, milestones and a working-capital buffer?",
        "Are hires, marketing and premises tied to milestones rather than brought forward when cash arrives?",
        "Could you report to a funder on actual versus planned use within a month of being asked?",
        "After your last financing, where did actual spending depart from the plan, and why?",
      ],
      watchFor: "Money lands and hiring, branding or premises run ahead of demand and controls.",
    },
    scaling: {
      focus: "Board-approved deployment, post-investment review",
      looksLike:
        "Capital raising and allocation are governed: deployments are board-approved against a business case, outcomes are reviewed afterwards, multiple funders' reporting and covenants are met on schedule, and the capital structure is planned.",
      questions: [
        "Are major capital deployments approved by the board against a business case?",
        "Do you review outcomes against the original business case after each major investment?",
        "Do you meet investor reporting, covenants and multiple funders' requirements on schedule?",
        "Is your mix of debt and equity, currency and tenor planned rather than opportunistic?",
      ],
      watchFor: "Several funders with different conditions, and reporting and covenants managed reactively.",
    },
  },
};

export const STAGE_PRINCIPLE =
  "The six capabilities stay the same at every stage. What changes is what good looks like: a five-person retailer and a 200-person manufacturer both need decision-useful financial information, but they produce it very differently. The index judges each business against what is proportionate for its stage, not against a start-up checklist or a corporate rulebook.";
