import type { Workstream } from "../types";

export const ws12: Workstream = {
  number: "12",
  slug: "nairobi-leadership-and-budget",
  title: "Nairobi leadership, budget and Management Committee contribution",
  shortTitle: "Leadership & budget",
  category: "leadership",
  tagline:
    "A small regional team organised around clear ownership, honest capacity planning and good judgement.",
  summary:
    "I would design the Nairobi office around a director and two investment professionals, supported by shared specialist teams in the firm, rather than assuming separate departments locally. Work would be divided by clear ownership of investees and pipeline, with capacity planned explicitly so that portfolio oversight is not sacrificed to new deals. I would build a cadence of meetings, coaching and Oslo alignment that develops judgement, and contribute to firm-wide policy and culture through the Management Committee without claiming authority I do not hold.",
  outcome: {
    intended:
      "A Nairobi team that knows who owns what, operates within a realistic workload, produces high-quality analysis and decisions, manages its budget transparently and is well connected to the rest of the firm.",
    why:
      "In a small team, every person's capacity and judgement matters. Overload shows up as thin diligence and missed portfolio warnings. Unclear ownership causes duplication or gaps. Weak links to Oslo create misaligned decisions. Good leadership in this context is mostly about clarity, honest prioritisation and developing people's judgement.",
  },
  establishFirst: {
    data: [
      "Current team roles, responsibilities, tenure and development plans.",
      "Current workload: investees, pipeline deals and other responsibilities per person.",
      "Office budget for the current and prior year, with actuals and the firm's expense policy.",
      "Delegation of authority, decision rights and escalation paths for the role.",
      "Management Committee terms of reference and meeting rhythm.",
    ],
    conversations: [
      "Each team member: their work, strengths, development goals and what helps or hinders them.",
      "CEO and CIO: expectations of the role, the Management Committee and the Nairobi office.",
      "Shared function leads in Oslo (legal, risk, finance, impact, TA, HR): how they work with Nairobi and where friction exists.",
      "Peers leading other regions: what works in their offices and how cross-regional learning happens.",
    ],
    constraints: [
      "Actual authorities, budget levels and hiring decisions are set by the firm; I would confirm them during onboarding.",
      "Shared specialist teams have firm-wide priorities; Nairobi requests must be planned rather than assumed.",
      "Kenyan employment law and the firm's HR policies govern performance and people decisions.",
    ],
  },
  method: [
    {
      title: "Listen before reorganising",
      detail:
        "In the first weeks I would meet each team member and shared-function lead, understand current work and review recent memos and decisions. Changes would follow understanding, not precede it, because the existing setup may reflect good reasons I cannot yet see.",
    },
    {
      title: "Assign clear ownership",
      detail:
        "Each investee and each live pipeline opportunity would have a named lead and a named second, so knowledge is shared and absence does not create gaps. I would personally lead the most complex transactions and high-risk portfolio cases, while giving investment professionals full ownership of others with review.",
    },
    {
      title: "Plan capacity explicitly",
      detail:
        "Using the workload table below, I would estimate the effort each investee and transaction requires by tier and stage, compare it with available time, and agree with the CIO what the team can take on. When capacity is exceeded, the choice is explicit: defer new origination, bring in external support, or seek additional resource, rather than letting quality slip silently.",
    },
    {
      title: "Use external specialists by criteria",
      detail:
        "External advisers would be engaged where specialist expertise is required (legal, tax, forensic, IT security, actuarial), where independence is needed, where volume exceeds internal capacity temporarily, or where local knowledge in a new market is needed. Costs would be allocated correctly between office, fund and investee budgets under policy.",
    },
    {
      title: "Develop judgement through practice",
      detail:
        "I would coach through real work: reviewing memos for the clarity of the investment question and evidence, encouraging constructive challenge in pipeline meetings, asking team members to present to IC with support, and giving specific, timely feedback. Succession would be planned so that each role has someone developing toward it.",
    },
    {
      title: "Contribute firm-wide",
      detail:
        "On the Management Committee I would bring the African market and portfolio perspective to firm-wide policy, risk, culture and strategy, share lessons across regions and support collective decisions, while recognising that decisions are collective and authorities are defined by the firm.",
    },
  ],
  deliverables: [
    { name: "Team responsibility map", description: "Named lead and second for every investee and pipeline opportunity." },
    { name: "Capacity plan", description: "Workload estimate by tier and stage versus available time (template below)." },
    { name: "Office operating rhythm", description: "Meeting cadence, decision log and escalation paths." },
    { name: "Regional office budget", description: "Structure, cost drivers and controls, with clear separation of office, fund and investee costs." },
    { name: "Development plans", description: "Individual goals, coaching focus and succession considerations per team member." },
  ],
  templates: [
    {
      kind: "table",
      caption: "Capacity planning: illustrative workload model for a director and two investment professionals",
      evidence: "illustrative",
      columns: ["Work item", "Effort assumption (days per quarter)", "Count", "Total days", "Lead"],
      rows: [
        ["Portfolio: standard tier investee", "6", "5", "30", "Investment professionals"],
        ["Portfolio: watch tier investee", "12", "2", "24", "Investment professional, director review"],
        ["Portfolio: high-risk tier investee", "25", "1", "25", "Director"],
        ["Transaction in screening", "4", "4", "16", "Investment professionals"],
        ["Transaction in diligence", "30", "2", "60", "Lead + second"],
        ["Transaction in documentation and closing", "15", "1", "15", "Director with legal"],
        ["Origination and relationship coverage", "20", "1", "20", "All"],
        ["Reporting, fundraising support, firm-wide", "25", "1", "25", "Director"],
        ["Total required", "", "", "215", ""],
        ["Available (3 people × ~55 productive days per quarter)", "", "", "165", ""],
        ["Gap", "", "", "-50", "Decision required"],
      ],
      note:
        "Effort assumptions and counts are fictional and would be calibrated to actual experience. In this example the team is over capacity by roughly 50 days per quarter, so I would propose to the CIO deferring one diligence, using an external adviser for part of the work, or requesting temporary support.",
    },
    {
      kind: "table",
      caption: "Proposed division of responsibilities (illustrative)",
      evidence: "proposed",
      columns: ["Activity", "Director", "Investment professionals", "Shared specialist teams"],
      rows: [
        ["Origination", "Senior relationships, market priorities", "Coverage of assigned markets, first meetings", "Impact and TA input on fit"],
        ["Modelling", "Review and challenge", "Build and maintain models", "Finance review of methodology"],
        ["Diligence", "Lead complex deals, key judgement calls", "Execute workstreams, coordinate advisers", "Legal, risk, ESG, tax specialists"],
        ["Portfolio", "High-risk cases, board-level engagement", "Monitoring, covenant tracking, reporting", "Valuation, TA delivery"],
        ["Reporting", "Quarterly memo, IC papers sign-off", "Draft papers, data collection", "Fund operations reconciliation"],
      ],
    },
  ],
  extras: [
    {
      id: "operating-rhythm",
      title: "Operating rhythm and Oslo alignment",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Proposed meeting cadence",
          evidence: "proposed",
          columns: ["Meeting", "Frequency", "Purpose", "Output"],
          rows: [
            ["Pipeline meeting", "Weekly", "Review stage movement, decide next steps, kill or advance", "Updated CRM, decisions logged"],
            ["Portfolio meeting", "Weekly (short), monthly (full)", "Early warnings, covenant status, action follow-up", "Tier changes, escalations"],
            ["One-to-ones", "Fortnightly", "Workload, development, feedback", "Agreed actions"],
            ["Transaction reviews", "At each gate", "Challenge the investment case before submission", "Go / no-go recommendation"],
            ["Budget check", "Monthly", "Actuals vs budget, upcoming commitments", "Variance notes"],
            ["Strategy review", "Quarterly", "Allocation, priorities, capacity", "Capital-allocation memo input"],
            ["Oslo alignment", "Monthly with CIO; quarterly with shared-function leads", "Align on pipeline, portfolio, risk and priorities", "Shared action list"],
          ],
        },
        {
          kind: "list",
          items: [
            "Decision log: every material decision (advance, decline, escalate, budget variance) recorded with date, rationale, decision maker and evidence, so the team and Oslo can see why things happened.",
            "Escalation paths: documented per decision type, aligned to the firm's delegation of authority, with no decisions taken unilaterally beyond confirmed authority.",
            "Coaching focus: memo quality (is the question clear, is the evidence sufficient, are risks honest), constructive challenge in meetings, presenting to IC, and managing investee relationships with candour.",
          ],
        },
      ],
    },
    {
      id: "budget",
      title: "Regional office budget structure",
      after: "deliverables",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Budget categories, cost drivers and controls (no amounts until actual data is reviewed)",
          evidence: "proposed",
          columns: ["Category", "Cost drivers", "Borne by", "Controls"],
          rows: [
            ["Personnel", "Headcount, grades, benefits, training", "Office / management company", "HR policy; annual budget approval"],
            ["Travel", "Markets covered, portfolio visits, Oslo alignment", "Office; deal-specific travel may be fund or deal cost under policy", "Travel plan tied to coverage and portfolio tiers; monthly review"],
            ["Diligence and advisers", "Number and complexity of transactions", "Typically fund or transaction cost, per fund documents", "Engagement letters with caps; approval thresholds"],
            ["Portfolio support", "TA, specialist reviews", "TA facility or investee co-funding where eligible", "TA team process; investee co-funding agreements"],
            ["Systems", "CRM, data, security, licences", "Office or firm-wide shared cost", "Firm IT policy"],
            ["Office operations", "Rent, utilities, administration", "Office", "Annual budget; monthly variance check"],
            ["Contingency", "Unplanned travel, urgent specialist advice", "Office", "Use requires director approval and logging"],
          ],
          note:
            "Distinguishing office, fund and investee costs follows the fund documents and the firm's expense policy, which I would review before setting the budget.",
        },
      ],
    },
  ],
  ownership: {
    lead: [
      "Team structure, responsibility assignments, capacity planning and day-to-day management of the Nairobi office.",
      "Coaching, feedback and development of team members.",
      "Office budget preparation and monitoring within approved limits.",
    ],
    delegate: [
      "Ownership of assigned investees and pipeline opportunities to investment professionals, with review.",
      "Office administration to the office or operations support function.",
    ],
    recommend: [
      "Hiring, resourcing changes and budget to the CEO and CIO.",
      "Firm-wide policy improvements to the Management Committee.",
    ],
    escalate: [
      "Capacity gaps that affect portfolio oversight, to the CIO.",
      "Material budget variances, to the CEO or CFO as policy requires.",
      "Conduct or performance issues, to HR in line with policy.",
    ],
    dependencies: [
      { party: "CEO", need: "Role expectations, Management Committee participation, budget approval." },
      { party: "CIO", need: "Investment priorities, capacity decisions, alignment cadence." },
      { party: "HR", need: "Hiring, performance management and development frameworks." },
      { party: "Shared specialist teams", need: "Planned support for transactions and portfolio." },
      { party: "Finance", need: "Budget processes and cost allocation rules." },
    ],
  },
  gates: [
    {
      gate: "New transaction accepted into diligence",
      proceedIf: "Capacity plan shows available time without weakening portfolio oversight, or external support is agreed.",
      deferOrDeclineIf: "Team is over capacity and high-risk portfolio cases need attention.",
    },
    {
      gate: "External adviser engaged",
      proceedIf: "Criteria met (expertise, independence, volume, local knowledge), cost allocation confirmed, approval obtained.",
      deferOrDeclineIf: "Work can be done internally to adequate quality; cost allocation unclear.",
    },
    {
      gate: "Budget commitment",
      proceedIf: "Within approved budget and authority.",
      deferOrDeclineIf: "Exceeds budget or authority without approval.",
    },
  ],
  cadence: [
    "Weekly: pipeline and portfolio meetings.",
    "Fortnightly: one-to-ones.",
    "Monthly: budget check; CIO alignment.",
    "Quarterly: strategy review; shared-function alignment; capacity plan refresh.",
    "Annually: performance reviews and development plans.",
  ],
  kpis: [
    {
      name: "Capacity utilisation",
      definition: "Required days ÷ available days per quarter from the capacity model.",
      source: "Capacity plan",
      owner: "Director of Africa",
      frequency: "Quarterly",
      threshold: "Proposed: above 100% triggers a resourcing decision with the CIO",
    },
    {
      name: "Memo quality",
      definition: "Share of IC submissions returned for missing or unclear evidence.",
      source: "IC feedback log",
      owner: "Director of Africa",
      frequency: "Quarterly",
      threshold: "Proposed: track trend; discuss any return in one-to-ones",
    },
    {
      name: "Budget variance",
      definition: "Actual vs budget by category.",
      source: "Finance reports",
      owner: "Director of Africa",
      frequency: "Monthly",
      threshold: "Proposed: variances above an agreed percentage explained in writing",
    },
    {
      name: "Development progress",
      definition: "Share of agreed development actions completed per team member.",
      source: "Development plans",
      owner: "Director of Africa with HR",
      frequency: "Semi-annual",
      threshold: "Reviewed, not targeted",
    },
  ],
  risks: [
    {
      risk: "Director becomes a bottleneck by retaining too much work.",
      tradeoff: "Control and quality versus team development and throughput.",
      mitigation: "Clear delegation with review; lead-and-second model; coaching to build confidence.",
    },
    {
      risk: "Distance from Oslo leads to misalignment.",
      tradeoff: "Local autonomy versus firm-wide consistency.",
      mitigation: "Structured alignment cadence; decision log; early sharing of issues.",
    },
    {
      risk: "Small team vulnerable to departures.",
      tradeoff: "Specialisation versus resilience.",
      mitigation: "Lead-and-second ownership; documentation; succession planning.",
    },
  ],
  timeline: {
    first90:
      "Meetings with each team member and shared-function lead; responsibility map and capacity plan drafted; operating rhythm agreed; budget reviewed with finance; development conversations started.",
    months4to12:
      "Operating rhythm embedded; capacity reviewed quarterly with resourcing decisions made explicitly; development plans in place; at least one cross-regional learning contribution; first annual reviews completed.",
  },
  success: {
    looksLike:
      "Team members know what they own, workload is visible and managed, memos improve in clarity, Oslo has no surprises from Nairobi, and the budget is predictable and well controlled.",
    assumptions: [
      "The team is a director and two investment professionals, with shared specialist support, as described in the role context.",
      "Authorities and budget processes can be confirmed during onboarding.",
      "Shared functions can commit planned support for Nairobi transactions and portfolio.",
    ],
  },
  keywords: ["team", "people", "coaching", "management committee", "budget", "Oslo", "capacity", "delegation", "culture", "succession", "office"],
};
