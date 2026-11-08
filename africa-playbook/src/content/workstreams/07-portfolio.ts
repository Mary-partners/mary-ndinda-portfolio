import type { Workstream } from "../types";

export const ws07: Workstream = {
  number: "07",
  slug: "portfolio-management-governance",
  title: "Active portfolio management and governance",
  shortTitle: "Portfolio & governance",
  category: "portfolio",
  tagline:
    "Spend oversight in proportion to risk, agree value-creation plans with management, and act early when signals turn.",
  summary:
    "I would start with a diagnostic of every Africa investee and place each in a risk-based monitoring tier, so the team's attention follows risk rather than habit. For each institution I would agree a value-creation plan with management: named owners, costs, timing and measurable milestones, overseen by the board. Covenants, liquidity, capital, audit findings, related parties and succession would be tracked in one register with early-warning triggers. The aim is investor oversight that strengthens management, not replaces it.",
  outcome: {
    intended:
      "Every investee has a current risk tier, an agreed value-creation plan and a covenant and early-warning record. Problems are identified while options remain, and responses are documented and proportionate.",
    why:
      "In financial-institution investing, value is usually created or lost after closing. Asset quality, liquidity and governance can change quickly, and small regional teams cannot watch everything closely. Tiered oversight focuses scarce time where it matters, and early escalation preserves choices that disappear once a liquidity squeeze or a capital breach becomes public.",
  },
  establishFirst: {
    data: [
      "Investment agreements, shareholder agreements and loan agreements for each position: reserved matters, information rights, board rights, covenants and remedies.",
      "Latest board packs, management accounts, audited statements, regulatory returns and auditor management letters.",
      "Current covenant compliance certificates and any waivers granted, with reasons.",
      "Existing value-creation or business plans, TA engagements and prior portfolio reviews.",
      "Who currently represents the firm on each board, and their mandate, time commitment and any conflicts declared.",
    ],
    conversations: [
      "Each investee CEO and CFO: their priorities, their concerns, and what they want from an investor.",
      "Current nominee directors and portfolio owners: history, relationships and open issues.",
      "CIO and risk: existing watch lists, risk-rating method and escalation expectations.",
      "Legal: nominee-director duties and the firm's policy on board representation, conflicts and indemnities.",
      "TA and impact/ESG teams: open projects, monitoring findings and customer-protection concerns.",
    ],
    constraints: [
      "Board and voting rights differ by investment; oversight must stay within contractual rights.",
      "Nominee directors owe duties to the company under local law; firm instructions cannot override those duties.",
      "Risk-rating methodology and watch-list decisions may sit with the CIO or risk; I would confirm during onboarding.",
    ],
  },
  method: [
    {
      title: "Run a portfolio diagnostic in the first 60 days",
      detail:
        "For each investee I would review asset quality trends, liquidity and funding, capital, profitability, governance, audit findings and customer outcomes against the original investment thesis. The question is whether the thesis still holds and what has changed. I would present findings to the CIO in a consistent format so positions can be compared, without treating any finding as a judgement on prior decisions.",
    },
    {
      title: "Tier oversight by risk",
      detail:
        "Each investee is placed in one of three tiers (below), which sets meeting frequency, data requested and team time. Tiers are reviewed monthly. Moving an investee up a tier is a signal to act, not a criticism of management.",
    },
    {
      title: "Agree value-creation plans with management",
      detail:
        "I would work with each CEO to agree three to five priorities that matter most to enterprise value and customer outcomes, such as reducing funding concentration, improving collections, strengthening risk management or preparing for a capital raise. Each has a named management owner, cost, timing and a measurable milestone. The board oversees progress. Management owns delivery. Plans that management does not believe in are rarely delivered.",
    },
    {
      title: "Make board work count",
      detail:
        "I would ask for board papers that lead with decisions, risks and exceptions, with covenant, liquidity, capital and asset-quality dashboards in a consistent format. Reserved matters (budget, senior appointments, related-party transactions, major borrowings, strategic changes) would be tracked so none are approved by omission.",
    },
    {
      title: "Track covenants and early warnings in one register",
      detail:
        "A single register records each covenant, its definition, current value, headroom and trend, alongside early-warning indicators: rising arrears, funding concentration, falling liquidity, audit qualifications, key-person departures and complaint spikes. Agreed triggers start the escalation flow.",
    },
    {
      title: "Respond proportionately when signals turn",
      detail:
        "When a trigger is hit, I would validate the data first, then assess liquidity, engage management, evaluate options with the CIO and protect customers throughout. The worked example below shows the sequence. The investor's role is to ask, support, challenge and, if needed, use contractual rights. Running the institution remains management's job.",
    },
  ],
  deliverables: [
    { name: "Portfolio diagnostic", description: "Consistent review of every Africa investee against its thesis, presented to the CIO." },
    { name: "Monitoring tier assignments", description: "Tier, rationale and oversight intensity for each investee, reviewed monthly." },
    { name: "Value-creation plans", description: "Three to five agreed priorities per investee, with owners, cost, timing and milestones." },
    { name: "Covenant and early-warning register", description: "Single register with headroom, trends and triggers. Template below." },
    { name: "Quarterly portfolio review pack", description: "Standard agenda and dashboards for internal review." },
  ],
  templates: [
    {
      kind: "table",
      caption: "Covenant and early-warning register (illustrative, quarter-end, fictional)",
      evidence: "illustrative",
      columns: ["Investee", "Covenant / indicator", "Definition", "Limit", "Current", "Prior quarter", "Headroom", "Status and action"],
      rows: [
        ["Illustrative FSP A", "PAR30", "Loans >30 days past due ÷ gross loan portfolio", "≤ 6.0%", "5.4%", "4.1%", "0.6 pts", "Amber: trend rising; data validation requested"],
        ["Illustrative FSP A", "Liquidity ratio", "Liquid assets ÷ liabilities due in 90 days", "≥ 100%", "104%", "121%", "4 pts", "Amber: refinancing due in 5 months"],
        ["Illustrative FSP A", "Capital adequacy", "Regulatory capital ÷ risk-weighted assets", "≥ 15.0%", "18.2%", "18.9%", "3.2 pts", "Green"],
        ["Illustrative FSP B", "Funding concentration", "Largest lender ÷ total borrowings", "≤ 30%", "27%", "25%", "3 pts", "Green: watch at next renewal"],
        ["Illustrative FSP B", "Audit findings", "Open high-priority auditor findings", "0 overdue", "1 overdue", "0", "Breached", "Amber: remediation date agreed with board"],
        ["Illustrative FSP C", "Key-person", "CEO or CFO departure", "Notify within 10 days", "CFO resigned", "n/a", "n/a", "Amber: succession plan requested"],
      ],
      note: "Fictional values. Covenant definitions and limits are set by each agreement and local regulation; regulatory definitions take precedence.",
    },
    {
      kind: "table",
      caption: "Value-creation plan for Illustrative FSP A (fictional)",
      evidence: "illustrative",
      columns: ["Priority", "Management owner", "Board oversight", "Cost and funding", "Timing", "Measurable milestone"],
      rows: [
        ["Diversify funding away from two lenders", "CFO", "Finance and risk committee", "Internal; advisory fee if needed", "12 months", "Largest lender below 25% of borrowings"],
        ["Strengthen early-stage collections", "Head of credit", "Risk committee", "Investee budget", "6 months", "PAR30 back below 4.5% on validated data"],
        ["Upgrade loan-origination workflow", "COO", "Board", "Co-funded; potentially TA-eligible (to verify)", "9 months", "Median turnaround and error rate improved (see Workstream 08)"],
        ["Board succession", "Chair", "Nominations committee", "Search fee", "12 months", "Independent director with risk background appointed"],
      ],
    },
  ],
  ownership: {
    lead: [
      "Portfolio diagnostic, tiering and quarterly portfolio review for Africa.",
      "Relationship with investee CEOs on strategy and value creation.",
      "Board representation where I am appointed as nominee, within my duties to the company.",
    ],
    delegate: [
      "Monthly data collection, register updates and first-line analysis to investment professionals, each owning named investees.",
      "Board-pack review for Tier 1 investees to the investment professional, with my review of exceptions.",
    ],
    recommend: [
      "Tier changes, waivers, covenant resets and use of contractual remedies to the CIO or IC.",
      "Follow-on support or restructuring options (Workstream 11).",
    ],
    escalate: [
      "Any Tier 3 classification, covenant breach or liquidity concern, to the CIO within 48 hours.",
      "Integrity, fraud or serious customer-harm concerns, to the CIO, legal and impact/ESG immediately.",
    ],
    dependencies: [
      { party: "CIO and IC", need: "Decisions on waivers, remedies and support." },
      { party: "Legal", need: "Nominee-director guidance, conflicts and contractual rights." },
      { party: "Risk", need: "Risk-rating method and watch-list alignment." },
      { party: "Impact/ESG", need: "Customer-protection monitoring and incident response." },
      { party: "TA team", need: "Support for agreed capability priorities." },
      { party: "Investee management and boards", need: "Accurate data, ownership of plans, delivery." },
    ],
  },
  gates: [
    {
      gate: "Investee moves to Tier 3 (intensive)",
      proceedIf: "A trigger is validated and the CIO is informed with a response plan.",
      deferOrDeclineIf: "Data is unvalidated. Validate first, but within days, not weeks.",
    },
    {
      gate: "Covenant waiver recommended",
      proceedIf: "The cause is understood, a credible remediation plan exists and the waiver preserves the fund's position.",
      deferOrDeclineIf: "The breach reflects a deeper problem the waiver would hide, or management cannot explain it.",
    },
    {
      gate: "Exercising contractual remedies",
      proceedIf: "Engagement has failed, legal confirms enforceability, and the CIO/IC approves.",
      deferOrDeclineIf: "Remedies would worsen the institution's position or harm customers more than they protect the fund.",
    },
  ],
  cadence: [
    "Weekly: portfolio items in the team meeting (exceptions only).",
    "Monthly: register update and tier review.",
    "Quarterly: portfolio review with the CIO; investee board meetings.",
    "Annually: value-creation plan refresh with each CEO.",
  ],
  kpis: [
    {
      name: "Register timeliness",
      definition: "Share of investees with register updated from validated data within 30 days of period-end.",
      source: "Covenant register",
      owner: "Investment professionals",
      frequency: "Monthly",
      threshold: "Proposed: 100% for Tier 2 and 3",
    },
    {
      name: "Value-creation milestones met",
      definition: "Milestones achieved on time ÷ milestones due, across all plans.",
      source: "Value-creation plans; board minutes",
      owner: "Director of Africa",
      frequency: "Quarterly",
      threshold: "Proposed: review any plan below 50% with the CEO",
    },
    {
      name: "Early-warning lead time",
      definition: "Time between first trigger on the register and any covenant breach or support request.",
      source: "Register history",
      owner: "Director of Africa",
      frequency: "Annually",
      threshold: "Proposed: aim for at least one quarter of warning",
    },
    {
      name: "Board-pack quality",
      definition: "Share of board packs received at least 7 days before the meeting with the standard dashboard.",
      source: "Board records",
      owner: "Nominee director",
      frequency: "Quarterly",
      threshold: "Proposed: 90%",
    },
  ],
  risks: [
    {
      risk: "Oversight becomes interference, undermining management accountability.",
      tradeoff: "Closer involvement versus clear accountability.",
      mitigation: "Act through the board and agreed plans; distinguish asking and challenging from directing operations.",
    },
    {
      risk: "Tiering leaves stable investees under-watched until a sudden shock.",
      tradeoff: "Team capacity versus coverage.",
      mitigation: "Minimum data for all tiers; automatic triggers lift tier regardless of judgement.",
    },
    {
      risk: "Nominee directors face conflicts between fund interests and duties to the company.",
      tradeoff: "Fund protection versus fiduciary duty.",
      mitigation: "Legal guidance, conflict declarations, recusal where needed; firm decisions made by the firm, not the nominee.",
    },
  ],
  timeline: {
    first90:
      "Diagnostic completed for every Africa investee; tiers agreed with the CIO; register live; value-creation priorities discussed with each CEO; first quarterly portfolio review held.",
    months4to12:
      "Value-creation plans agreed and tracked; register maintained monthly; tier moves acted on; annual plan refresh; lessons fed into screening criteria (Workstream 03).",
  },
  success: {
    looksLike:
      "Investee CEOs see the firm as a demanding but useful shareholder. The CIO learns of problems from the register, not from surprises. Interventions are timely, documented and proportionate, and customers are protected when institutions come under stress.",
    assumptions: [
      "Investees provide timely data under existing information rights.",
      "Nominee arrangements and duties are confirmed with legal during onboarding.",
      "Team capacity allows Tier 3 intensity for at least one or two investees at once.",
    ],
  },
  extras: [
    {
      id: "monitoring-tiers",
      title: "Risk-based monitoring tiers",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Proposed monitoring tiers and oversight intensity",
          evidence: "proposed",
          columns: ["Tier", "Typical profile", "Data", "Engagement", "Team time"],
          rows: [
            ["Tier 1: Standard", "Performing, covenants with comfortable headroom, stable funding", "Quarterly accounts and dashboard", "Quarterly board; semi-annual CEO meeting", "Low"],
            ["Tier 2: Watch", "Rising arrears, narrowing headroom, funding renewal due, key-person change", "Monthly dashboard; specific data requests", "Monthly CEO/CFO call; board follow-up", "Medium"],
            ["Tier 3: Intensive", "Validated breach or near-breach, liquidity stress, integrity concern", "Weekly liquidity and collections data", "Weekly engagement; CIO and risk involved", "High"],
          ],
        },
      ],
    },
    {
      id: "early-warning-flow",
      title: "Early-warning escalation flow",
      after: "gates",
      evidence: "proposed",
      blocks: [
        {
          kind: "flow",
          caption: "From signal to decision",
          evidence: "proposed",
          steps: [
            { label: "Signal", detail: "Register trigger or qualitative concern" },
            { label: "Validate", detail: "Reconcile data with investee; within 5 working days" },
            { label: "Assess", detail: "Liquidity, capital, customer impact" },
            { label: "Engage", detail: "Management and board; agree plan" },
            { label: "Escalate", detail: "CIO, risk, legal, impact/ESG as relevant" },
            { label: "Decide and record", detail: "Waiver, support, remedies or monitoring" },
          ],
        },
      ],
    },
    {
      id: "arrears-example",
      title: "Worked example: rising arrears with near-term funding pressure",
      after: "gates",
      evidence: "illustrative",
      blocks: [
        {
          kind: "callout",
          tone: "example",
          title: "Situation (fictional)",
          text: "Illustrative FSP A reports PAR30 rising from 4.1% to 5.4% in one quarter against a 6.0% covenant. A USD 3m equivalent loan from a commercial lender matures in five months, and that lender has signalled reduced appetite. The liquidity ratio has fallen from 121% to 104%.",
          evidence: "illustrative",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Validate the data (week 1). I would ask the investment professional to reconcile PAR figures to the loan-level file. That means checking for restructured loans reported as current, branch concentration, write-off timing and any change in definitions. If the rise is concentrated in one product or region, that changes the response.",
            "Assess liquidity (week 1–2). I would request a 13-week cash-flow forecast with a downside collections case, and a list of funding sources and their realistic renewal probability. The question is whether the institution can meet obligations and keep lending to good customers through the maturity.",
            "Engage management (week 2). I would meet the CEO and CFO to understand causes and their plan: collections actions, slower disbursement where needed, funding alternatives, and communication with the regulator if required. I would offer support and ask hard questions, but leave the plan to management.",
            "Evaluate recovery options with the CIO (week 2–3). Options include an extension with the existing lender, new lenders, a bridge or follow-on from the fund (Workstream 11 tests apply), a covenant waiver with conditions, or a capital raise. Each is assessed for its effect on the institution, the fund and customers.",
            "Escalate (within 48 hours of validation). I would move the investee to Tier 3, inform the CIO and risk with a written note, and involve legal if remedies or waivers are in scope.",
            "Protect customers throughout. Collections must stay fair. I would ask impact/ESG to review collection practices and complaint trends, because pressure to recover arrears quickly can lead to harmful practices. Customers in genuine difficulty should have access to responsible restructuring.",
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "What I would not do",
          text: "I would not instruct staff, approve individual loans, or take over management decisions. If management cannot lead the response, the right step is a board-level conversation about leadership, not investor substitution.",
          evidence: "proposed",
        },
      ],
    },
    {
      id: "board-governance",
      title: "Board papers, reserved matters and nominee-director duties",
      after: "deliverables",
      evidence: "proposed",
      blocks: [
        {
          kind: "p",
          text: "A nominee director is usually a director of the investee with full duties to that company, not a representative obliged to follow the investor's instructions. In general terms, duties typically include acting in the company's interests, exercising independent judgement and care, avoiding or declaring conflicts, and keeping board information confidential. This is a general description, not country-specific legal advice. Actual duties, indemnities and permitted information-sharing must be confirmed with legal for each jurisdiction and agreement.",
        },
        {
          kind: "table",
          caption: "Quarterly portfolio review agenda (proposed)",
          evidence: "proposed",
          columns: ["Item", "Content", "Time"],
          rows: [
            ["1. Exceptions first", "Tier changes, triggers, breaches, integrity or customer issues", "30 min"],
            ["2. Register review", "Covenants, liquidity, capital, asset quality across all investees", "20 min"],
            ["3. Value-creation progress", "Milestones met and missed, with reasons", "20 min"],
            ["4. Reserved matters and board items", "Decisions coming to boards in the next quarter", "15 min"],
            ["5. FX and funding", "Exposure dashboard, refinancing calendar (Workstream 06)", "15 min"],
            ["6. Decisions and owners", "Agreed actions with named owners and dates", "10 min"],
          ],
        },
        {
          kind: "list",
          items: [
            "Reserved matters I would track: annual budget, senior appointments and remuneration, related-party transactions, new borrowing above agreed thresholds, changes to strategy or licence, dividend policy, and issuance of new shares.",
            "Board papers I would ask for: a one-page decision summary, standard dashboards for asset quality, liquidity, capital and funding, audit and compliance findings with remediation dates, and customer-outcome indicators.",
            "Conflicts: I would declare any conflict, recuse where needed, and keep firm decisions on waivers or remedies with the firm's decision-makers rather than the nominee.",
          ],
        },
      ],
    },
  ],
  keywords: ["monitoring", "board", "nominee director", "covenant", "watch list", "value creation", "arrears", "PAR30", "liquidity", "reserved matters"],
};
