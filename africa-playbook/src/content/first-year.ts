import type { Phase } from "./types";

export const firstYearIntro =
  "This roadmap sequences the twelve workstreams across the first year. The order is deliberate. I would understand the mandate, the portfolio and the team before proposing changes, and advance new transactions only when they pass the gates set out in the playbook. Owners are roles, and the actual authorities would be confirmed in week one. Outcome targets depend on baselines I do not yet have, so they are stated as process standards or as targets to be set once the baseline is known.";

export const phases: Phase[] = [
  {
    id: "days-1-30",
    label: "Days 1–30",
    window: "Understand",
    intent:
      "Confirm authority and mandate, review the portfolio, pipeline and model quality, meet the team and shared functions, understand the facilities, deal with any urgent risk and test my own assumptions.",
    deliverables: [
      {
        deliverable: "Authority and mandate note",
        dependencies: "CEO, CIO, legal; delegation-of-authority and fund documents",
        owner: "Director of Africa",
        evidence: "Signed-off delegation matrix; fund constraint sheets (WS01)",
        acceptance: "CIO confirms the note matches actual authority; every fund with Africa exposure has a constraint sheet reviewed by legal.",
        workstreams: ["01", "05", "12"],
      },
      {
        deliverable: "Urgent-risk scan",
        dependencies: "Latest portfolio reports, covenant data, FX positions, investee management",
        owner: "Director of Africa with investment professionals",
        evidence: "Covenant register, liquidity and FX exposure snapshot",
        acceptance: "Every investee checked for covenant breach, liquidity under 3 months' cover, unhedged FX mismatch or open consumer-protection issues. Any found are escalated within 48 hours.",
        workstreams: ["06", "07", "09"],
      },
      {
        deliverable: "Pipeline and model quality review",
        dependencies: "CRM, live models, IC papers from the last 12–24 months",
        owner: "Director of Africa",
        evidence: "Review notes per live deal; model-review checklist (WS04)",
        acceptance: "Each live opportunity tagged continue, pause or stop with a reason; any model issue that would change an IC view is raised with the CIO.",
        workstreams: ["02", "03", "04"],
      },
      {
        deliverable: "Listening programme",
        dependencies: "Team, Oslo functions (risk, legal, impact/ESG, TA, finance), selected investee CEOs",
        owner: "Director of Africa",
        evidence: "Meeting log with themes and follow-ups, shared with the team",
        acceptance: "One-to-ones with every team member and each shared-function lead; at least the higher-tier investees met.",
        workstreams: ["07", "08", "12"],
      },
      {
        deliverable: "Facility and TA briefing",
        dependencies: "TA team; FX facility documentation",
        owner: "Director of Africa",
        evidence: "Summary of eligibility, capacity, process and timelines",
        acceptance: "Team can state accurately what each facility can and cannot do, and for whom.",
        workstreams: ["06", "08"],
      },
      {
        deliverable: "Assumption log",
        dependencies: "All of the above",
        owner: "Director of Africa",
        evidence: "This playbook's assumptions marked confirmed, changed or rejected",
        acceptance: "Shared with the CIO; every assumption has a status.",
        workstreams: ["01", "12"],
      },
    ],
  },
  {
    id: "days-31-60",
    label: "Days 31–60",
    window: "Agree",
    intent:
      "Agree market priorities and capital pacing, put proportionate monitoring in place, qualify origination, scope diligence and TA priorities, and set the team's operating rhythm.",
    deliverables: [
      {
        deliverable: "Market prioritisation and pacing paper",
        dependencies: "Constraint sheets, exposure data, CIO",
        owner: "Director of Africa (recommends); CIO (decides)",
        evidence: "Prioritisation matrix with cited evidence; first capital-allocation memo",
        acceptance: "CIO agrees coverage levels; no market is ranked on incomplete evidence.",
        workstreams: ["01"],
      },
      {
        deliverable: "Portfolio monitoring tiers",
        dependencies: "Portfolio diagnostic; risk function",
        owner: "Director of Africa",
        evidence: "Tier per investee, with triggers and reporting frequency",
        acceptance: "Every investee tiered; risk function agrees the criteria; watch-tier investees have named owners and action dates.",
        workstreams: ["07"],
      },
      {
        deliverable: "Qualified origination list",
        dependencies: "Ideal investee profiles; CRM schema",
        owner: "Investment professionals, reviewed by Director",
        evidence: "CRM entries with fit rationale and evidence quality",
        acceptance: "Each qualified opportunity has a fit rationale, conflicts check and next action; unqualified contacts are not counted as pipeline.",
        workstreams: ["02"],
      },
      {
        deliverable: "Diligence and TA scoping",
        dependencies: "Specialist teams; TA team; investee management",
        owner: "Director of Africa",
        evidence: "Diligence scope per live deal; TA priorities based on a diagnosed binding constraint",
        acceptance: "No TA concept proceeds without a baseline and an investee owner; diligence scopes are proportionate to the instrument.",
        workstreams: ["03", "08"],
      },
      {
        deliverable: "Team operating rhythm",
        dependencies: "Team; Oslo calendar",
        owner: "Director of Africa",
        evidence: "Meeting calendar, templates, decision log",
        acceptance: "Weekly pipeline and portfolio meetings running; decision log in use; Oslo alignment slots agreed.",
        workstreams: ["12"],
      },
    ],
  },
  {
    id: "days-61-90",
    label: "Days 61–90",
    window: "Commit",
    intent:
      "Present an Africa operating plan, portfolio actions, a qualified pipeline and resource needs. Advance transactions only if they pass the gates. Prepare substantiated material to support fundraising.",
    deliverables: [
      {
        deliverable: "Africa operating plan",
        dependencies: "Days 1–60 outputs; CIO and CEO",
        owner: "Director of Africa (recommends); Management Committee / CIO (decide)",
        evidence: "Plan document with priorities, resource needs and risks",
        acceptance: "Plan reviewed by the CIO and CEO; disagreements recorded with how they were resolved.",
        workstreams: ["01", "12"],
      },
      {
        deliverable: "Portfolio action plan",
        dependencies: "Monitoring tiers; investee management; boards",
        owner: "Director of Africa",
        evidence: "Action per watch-tier investee; value-creation priorities for others",
        acceptance: "Each action has an owner, date, cost and measurable milestone agreed with management.",
        workstreams: ["07", "08", "11"],
      },
      {
        deliverable: "Transactions at gate",
        dependencies: "Live pipeline; IC calendar",
        owner: "Director of Africa (recommends); IC (decides)",
        evidence: "Screening memos, diligence findings, IC papers",
        acceptance: "Any deal presented has passed every prior gate. There is no deployment target for this window.",
        workstreams: ["03", "04", "05"],
      },
      {
        deliverable: "Fundraising support pack (Africa)",
        dependencies: "CEO/CIO fundraising plan; portfolio data; compliance review",
        owner: "Director of Africa (contributes); CEO/CIO (lead)",
        evidence: "Regional narrative, case studies and pipeline description, each fact sourced and dated",
        acceptance: "Every performance figure follows the track-record protocol (WS10); compliance sign-off obtained.",
        workstreams: ["10"],
      },
      {
        deliverable: "Resource request",
        dependencies: "Capacity plan; budget",
        owner: "Director of Africa",
        evidence: "Capacity model; budget draft",
        acceptance: "Any request is tied to a capacity gap and has a cost and alternative.",
        workstreams: ["12"],
      },
    ],
  },
  {
    id: "months-4-6",
    label: "Months 4–6",
    window: "Execute",
    intent:
      "Execute approved priorities, test whether TA is being adopted, and review the market and instrument hypotheses and team capacity.",
    deliverables: [
      {
        deliverable: "Approved priorities in delivery",
        dependencies: "Operating plan approval",
        owner: "Director of Africa",
        evidence: "Monthly tracker against plan milestones",
        acceptance: "Milestones tracked monthly; slippage explained with a recovery step or a request to re-plan.",
        workstreams: ["01", "02", "07"],
      },
      {
        deliverable: "TA adoption review",
        dependencies: "TA team; investee data",
        owner: "Director of Africa with TA lead",
        evidence: "Adoption and early outcome data against baseline",
        acceptance: "Each live TA project assessed against its stop or redesign triggers.",
        workstreams: ["08", "09"],
      },
      {
        deliverable: "Hypothesis review",
        dependencies: "Pipeline data; CIO",
        owner: "Director of Africa",
        evidence: "Funnel conversion, decline reasons, instrument demand",
        acceptance: "Market and instrument hypotheses confirmed or changed in writing, with the evidence.",
        workstreams: ["01", "02", "05"],
      },
    ],
  },
  {
    id: "months-7-12",
    label: "Months 7–12",
    window: "Reassess",
    intent:
      "Reassess allocation, evaluate portfolio outcomes and the quality of deployment, strengthen refinancing and exit readiness, and set the agenda for the next year.",
    deliverables: [
      {
        deliverable: "Allocation reassessment",
        dependencies: "Quarterly memos; fund data",
        owner: "Director of Africa (recommends); CIO (decides)",
        evidence: "Annual re-scoring; exposure trends",
        acceptance: "Priorities for year two agreed; changes explained.",
        workstreams: ["01"],
      },
      {
        deliverable: "Deployment-quality review",
        dependencies: "Closed deals; post-close handovers",
        owner: "Director of Africa",
        evidence: "Each deal reviewed against its investment thesis and first monitoring data",
        acceptance: "Any early divergence from thesis is documented with a response.",
        workstreams: ["03", "05", "07"],
      },
      {
        deliverable: "Exit and refinancing readiness",
        dependencies: "Fund life; investee plans",
        owner: "Director of Africa",
        evidence: "Exit-readiness checklist per position",
        acceptance: "Each position has a current exit or repayment route and a date for reviewing it.",
        workstreams: ["11"],
      },
      {
        deliverable: "Year-two agenda",
        dependencies: "All workstreams; Management Committee",
        owner: "Director of Africa",
        evidence: "Agenda with targets set against the baselines now established",
        acceptance: "Targets are baseline-based and agreed with the CIO and CEO.",
        workstreams: ["12"],
      },
    ],
  },
];

export const processStandards: { standard: string; measure: string }[] = [
  { standard: "Every investee tiered and reviewed", measure: "100% within 60 days (proposed)" },
  { standard: "Urgent issues escalated", measure: "Within 48 hours of identification (proposed)" },
  { standard: "Screening memo before material diligence spend", measure: "Every opportunity (proposed)" },
  { standard: "IC papers with an explicit 'what must be true' section and disconfirming tests", measure: "Every paper (proposed)" },
  { standard: "Board papers reviewed before meetings with written questions", measure: "Every board where the firm has a seat (proposed)" },
  { standard: "Decision log updated", measure: "Weekly (proposed)" },
];

export const baselineTargets: { area: string; baselineNeeded: string; howTargetSet: string }[] = [
  { area: "Deployment", baselineNeeded: "Fund headroom, pipeline quality and investment period", howTargetSet: "Agreed with the CIO after the day-60 pacing paper. No figure is proposed here." },
  { area: "Portfolio risk", baselineNeeded: "Current tiers, covenant status and asset-quality trends", howTargetSet: "Target the movement of watch-tier investees once each has an agreed plan." },
  { area: "TA outcomes", baselineNeeded: "Operational baseline per project", howTargetSet: "Set in each concept note against its own baseline." },
  { area: "Impact and customer outcomes", baselineNeeded: "The firm's framework and current data", howTargetSet: "Aligned to the existing framework, not invented in parallel." },
  { area: "Fundraising support", baselineNeeded: "CEO/CIO fundraising plan", howTargetSet: "Defined as deliverables and responsiveness, not commitments." },
];

export const deliveryRisks: { risk: string; response: string }[] = [
  { risk: "Authority or mandate is narrower than assumed", response: "Re-scope the plan to what the role can decide; route the rest as recommendations." },
  { risk: "Data needed for the diagnostic is incomplete or unreliable", response: "Validate the most decision-critical data first; extend the timeline rather than act on weak data." },
  { risk: "An urgent portfolio issue absorbs the team", response: "Pause lower-priority origination explicitly, tell the CIO what is deferred, and reset dates." },
  { risk: "Shared specialist teams have limited capacity", response: "Agree priority slots early; use the external-specialist criteria for overflow within budget." },
  { risk: "My own experience gaps slow decisions", response: "Use senior review deliberately on early transactions and record lessons in the decision log." },
];

export const stabilisationScenario = {
  title: "If the portfolio needs more stabilisation than new investment",
  intro:
    "The diagnostic might show that several investees need closer attention. I would not treat that as a failure of the plan. It would change the plan, and I would say so early.",
  changes: [
    "Reweight team time towards portfolio work and agree with the CIO which origination is paused, rather than letting it drift.",
    "Move affected investees to a higher monitoring tier with weekly liquidity and asset-quality tracking.",
    "Bring forward Workstream 11 tests: credible turnaround or postponed loss recognition, follow-on discipline and recovery options.",
    "Use TA only where it addresses the binding constraint, and not as a substitute for capital or governance decisions.",
    "Keep fundraising messaging accurate: describe the portfolio position honestly with the CEO and CIO.",
    "Report to the IC and Management Committee monthly until the position is stable.",
  ],
};
