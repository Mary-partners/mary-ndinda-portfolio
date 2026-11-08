import type { Workstream } from "../types";

export const ws02: Workstream = {
  number: "02",
  slug: "origination-and-relationships",
  title: "Proprietary origination and relationship development",
  shortTitle: "Origination",
  category: "investment",
  tagline:
    "A relationship-led sourcing system that produces fewer, better-qualified opportunities and records why others were declined.",
  summary:
    "I would define who we want to finance before deciding where to look: clear investee profiles by business model, customer segment, maturity and financing need. Sourcing would combine inbound, proprietary and partner channels, tracked in a CRM that records evidence quality and stage age, not just meeting counts. Meetings are inputs; the measure is qualified opportunities that reach the Investment Committee in good shape, and a decline process that leaves the relationship intact.",
  outcome: {
    intended:
      "A steady, mandate-fit pipeline in which most opportunities reaching screening are genuinely investable, the team knows how each one was sourced and by whom, and declined parties understand why.",
    why:
      "Deal flow in African financial inclusion is often relationship-driven and lumpy. Relying on inbound requests and adviser-led processes tends to bring competitive pricing, compressed diligence windows and institutions that have already been declined elsewhere. Proprietary relationships built over time give earlier access, better information and the chance to shape the investment. They also take time, so the effort has to be directed by the strategy in Workstream 01 rather than by whoever calls first.",
  },
  establishFirst: {
    data: [
      "The existing pipeline and CRM records: every live, paused and declined opportunity in Africa over the last two to three years, with source, stage reached and decline reason.",
      "Current investees' own networks: co-investors, lenders, peer institutions and associations they work with.",
      "Prior conversion data, if recorded: how many mapped institutions became qualified opportunities, IC submissions and closings, and how long each stage took.",
      "Fund eligibility and the coverage plan from Workstream 01, so profiles and channels match what can actually be financed.",
    ],
    conversations: [
      "CIO and existing Africa team: which relationships are already owned and by whom, so I do not duplicate or disrupt them.",
      "Compliance: conflicts procedure, gifts and hospitality rules, and how to handle confidential information received during sourcing.",
      "Investee management teams: what they value in an investor beyond capital, and what made them choose or reject previous investors.",
      "Co-investors and development finance institutions active in the region: where they see gaps, and where co-investment is realistic.",
    ],
    constraints: [
      "Contact with regulators is for understanding market structure and rules, not for seeking favourable treatment; I would agree the protocol with legal first.",
      "Activity targets are planning hypotheses until we know the base conversion rates; they are not deployment commitments.",
      "Relationship ownership and confidentiality rules may differ between Nairobi and Oslo; I would confirm them during onboarding.",
    ],
  },
  method: [
    {
      title: "Write investee profiles before building lists",
      detail:
        "I would agree three to five profiles with the CIO, each describing business model, customer segment, maturity, typical financing need and the instrument that fits. A profile tells the team what to ignore as much as what to pursue. For example, a pre-revenue fintech seeking equity may be interesting but outside the profile if the fund needs institutions with a funded loan book and audited history.",
    },
    {
      title: "Map the universe in priority markets",
      detail:
        "For each active-coverage market, the team would map licensed and relevant unlicensed institutions using regulator registers, association membership, rating reports and co-investor knowledge. Each institution gets a profile fit and a first view of financing need. This creates a denominator, so we can see what share of the relevant market we actually know.",
    },
    {
      title: "Assign relationship owners and channels",
      detail:
        "Every mapped institution of interest has one named relationship owner. Channels are recorded separately: inbound (approaches to us), proprietary (we initiated through our own mapping or network) and partner-sourced (co-investors, advisers, associations, investees). The distinction matters because conversion, pricing and diligence access usually differ by channel, and I would want to know which channels produce investable deals rather than simply more meetings.",
    },
    {
      title: "Run conflicts and integrity checks early",
      detail:
        "Before substantive information is exchanged, the opportunity is checked for conflicts (existing investee competitors, personal relationships, adviser roles) and given a basic integrity screen. Doing this before a non-disclosure agreement and data exchange avoids having to unwind a process later.",
    },
    {
      title: "Qualify with evidence, not enthusiasm",
      detail:
        "An opportunity becomes 'qualified' only when it meets the profile, has a credible financing need that fits an instrument we offer, fits concentration headroom, and has passed initial conflicts and integrity checks. The CRM records evidence quality for each of these (documented, management-stated, or assumed), so a deal that looks good on assumptions is visibly different from one that looks good on documents.",
    },
    {
      title: "Decline well and learn from it",
      detail:
        "Most mapped institutions will not become investments. Each decline gets a reason code and, where appropriate, honest feedback to management and a re-contact date. Over time the reason codes tell us whether our profiles are wrong, our pricing is uncompetitive, or particular channels are producing poor fit. Institutions declined today on maturity grounds can become good investments in two years if the relationship is kept.",
    },
  ],
  deliverables: [
    { name: "Investee profiles", description: "Three to five agreed profiles with fit criteria and examples of what is out of scope." },
    { name: "Market maps", description: "Mapped institutions per active-coverage market with profile fit, need and relationship owner." },
    { name: "CRM schema and hygiene rules", description: "Fields, stage definitions, evidence-quality codes and update rules; template below." },
    { name: "Monthly pipeline funnel", description: "Conversion and time-in-stage by channel and market, reviewed in the pipeline meeting." },
    { name: "Decline-feedback log", description: "Reason codes, feedback given and re-contact dates." },
  ],
  templates: [
    {
      kind: "table",
      caption: "Pipeline CRM schema with example record",
      evidence: "illustrative",
      columns: ["Field", "Definition", "Example (fictional)"],
      rows: [
        ["Institution", "Legal name and group, if any", "Illustrative FSP A"],
        ["Institution type", "Deposit-taking MFI, non-deposit lender, SACCO, bank, fintech, insurer, leasing, other", "Deposit-taking microfinance institution"],
        ["Market", "Country of licence and main operations", "Country A"],
        ["Source channel", "Inbound / proprietary / partner-sourced, plus specific source", "Partner-sourced: co-investor in another investee"],
        ["Relationship owner", "One named team member", "Investment Associate 1"],
        ["Instrument sought", "Equity, senior debt, subordinated debt, mezzanine", "Minority equity, with possible subordinated debt later"],
        ["Indicative size", "Range in USD and LCU, with date", "USD4–6m (LCU400–600m at 100), as of discussion date"],
        ["Profile fit", "Which profile, and fit score 1–3", "Profile 1, fit 3"],
        ["Evidence quality", "Documented / management-stated / assumed, per key fit test", "Need: documented; asset quality: management-stated; governance: assumed"],
        ["Conflicts check", "Not started / clear / issue logged", "Clear (date, reviewer)"],
        ["Stage", "Mapped, contacted, qualified, screening, diligence, IC, closing, closed, declined, paused", "Qualified"],
        ["Stage age", "Days in current stage", "21"],
        ["Next action", "Specific action, owner and date", "Request 24-month loan-level extract and audited accounts; Associate 1; by Friday"],
        ["Decline reason", "Coded reason if declined", "n/a"],
      ],
      note: "Field list is a proposal and would be adapted to the firm's existing CRM rather than replacing it.",
    },
    {
      kind: "table",
      caption: "Ideal investee profiles (proposed starting point)",
      evidence: "proposed",
      columns: ["Profile", "Business model", "Customer segment", "Maturity", "Typical need and instrument"],
      rows: [
        ["1. Growth-stage deposit-taker", "Licensed MFI or small bank funding loans with deposits and wholesale borrowing", "Low-income households and micro-enterprises", "Profitable, audited, 5+ years operating", "Minority equity for capital adequacy and growth"],
        ["2. Specialist non-deposit lender", "Lender to MSMEs, agriculture or asset finance, funded by wholesale debt", "Smallholders, MSMEs, informal traders", "Break-even or profitable, credible loan-level data", "Senior or subordinated debt, ideally local currency"],
        ["3. Inclusive fintech with a balance sheet or partner bank", "Digital lending, payments or savings with clear revenue model", "Underserved retail and small businesses", "Revenue-generating, unit economics demonstrable", "Equity or mezzanine; debt only once credit history exists"],
        ["4. Inclusive insurer or other FSP", "Micro-insurance, leasing or other inclusion-oriented services", "Low-income households", "Regulated and operating at scale", "Equity, case-by-case, subject to mandate"],
      ],
      note: "Profiles are hypotheses to agree with the CIO against actual fund eligibility.",
    },
  ],
  extras: [
    {
      id: "funnel",
      title: "Pipeline funnel, conversion and time in stage",
      after: "method",
      evidence: "illustrative",
      blocks: [
        {
          kind: "flow",
          caption: "Proposed funnel stages",
          evidence: "proposed",
          steps: [
            { label: "Mapped", detail: "Known institution that fits a profile" },
            { label: "Contacted", detail: "Relationship opened by owner" },
            { label: "Qualified", detail: "Fit, need, headroom and conflicts confirmed" },
            { label: "Screening", detail: "Screening memo prepared" },
            { label: "Diligence", detail: "Approved to spend diligence budget" },
            { label: "IC submission", detail: "Full investment paper" },
          ],
        },
        {
          kind: "table",
          caption: "Example annual funnel for one market (fictional)",
          evidence: "illustrative",
          columns: ["Stage", "Count", "Conversion from previous stage", "Median days in stage", "Review trigger (proposed)"],
          rows: [
            ["Mapped", "60", "n/a", "n/a", "Map refreshed annually"],
            ["Contacted", "30", "50%", "45", "Over 90 days without a next action"],
            ["Qualified", "12", "40%", "30", "Over 60 days without screening decision"],
            ["Screening", "6", "50%", "21", "Over 30 days"],
            ["Diligence", "3", "50%", "75", "Over 120 days, or scope creep"],
            ["IC submission", "2", "67%", "n/a", "n/a"],
          ],
          note: "Conversion = count ÷ previous stage count (30/60 = 50%, 12/30 = 40%, 6/12 = 50%, 3/6 = 50%, 2/3 = 67%). Numbers are fictional and illustrate the measurement, not a target.",
        },
        {
          kind: "callout",
          tone: "note",
          title: "Coverage activity targets are planning hypotheses",
          text: "As a starting hypothesis, each investment professional might hold 8–12 active relationships in priority markets and add 2–3 qualified opportunities per quarter. I would replace these with observed rates after two quarters. They describe effort, not expected deployment, and would never be used to pull an opportunity through a gate.",
          evidence: "proposed",
        },
      ],
    },
    {
      id: "conflicts-and-declines",
      title: "Conflicts check and decline-feedback loop",
      after: "deliverables",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Conflicts and decline procedure",
          evidence: "proposed",
          columns: ["Step", "Owner", "Evidence kept", "What changes as a result"],
          rows: [
            ["Conflicts screen before NDA", "Relationship owner, reviewed by compliance", "Checklist: competing investees, personal ties, adviser roles, prior declines", "Opportunity paused or ring-fenced if a conflict exists"],
            ["Integrity pre-screen", "Investment professional", "Ownership summary, adverse media and sanctions search", "Escalated to compliance on any hit before further contact"],
            ["Decline decision", "Director of Africa", "Reason code and short rationale in CRM", "Recorded for quarterly pattern review"],
            ["Feedback to management", "Relationship owner", "Date and summary of feedback given", "Relationship kept; re-contact date set where relevant"],
            ["Quarterly pattern review", "Director of Africa with team", "Decline reasons by channel and market", "Profiles, pricing or channel effort adjusted; changes reported to CIO"],
          ],
        },
      ],
    },
  ],
  ownership: {
    lead: [
      "Senior relationships with investee boards, shareholders, co-investors and associations in priority markets.",
      "Agreeing investee profiles and qualification standards with the CIO.",
      "Decline decisions and the quarterly review of what the funnel is telling us.",
    ],
    delegate: [
      "Market mapping, CRM maintenance and first-contact relationships to investment professionals, each owning named institutions.",
      "Preparation of funnel data for the monthly pipeline meeting.",
    ],
    recommend: [
      "Changes to investee profiles or channel priorities to the CIO.",
      "Co-investment and syndication approaches to the CIO before any commitment is signalled.",
    ],
    escalate: [
      "Any conflict, integrity or sanctions concern to compliance immediately.",
      "Any request from a prospective investee or partner for assurances on terms or timing that we cannot give.",
    ],
    dependencies: [
      { party: "CIO", need: "Agreement of profiles and qualification standard." },
      { party: "Compliance and legal", need: "Conflicts procedure, NDA templates and contact protocols." },
      { party: "Impact/ESG", need: "Early exclusion-list and responsible-finance screen." },
      { party: "Investee management", need: "Introductions and honest market intelligence." },
    ],
  },
  gates: [
    {
      gate: "Contacted to qualified",
      proceedIf: "Profile fit is documented, financing need fits an available instrument, concentration headroom exists and conflicts are clear.",
      deferOrDeclineIf: "Fit rests only on assumptions; the need is for an instrument we cannot provide; a conflict is unresolved; or the institution appears on an exclusion list.",
    },
    {
      gate: "Qualified to screening",
      proceedIf: "Management will share basic financial and portfolio data, and the opportunity merits a screening memo against current pipeline priorities.",
      deferOrDeclineIf: "Data access is refused, the timetable is set by a competitive process we cannot diligence properly, or the team lacks capacity without compromising portfolio work.",
    },
  ],
  cadence: [
    "Weekly: pipeline meeting reviews stage movements, next actions and stuck opportunities.",
    "Monthly: funnel conversion and time-in-stage by channel and market.",
    "Quarterly: decline-reason review and profile or channel adjustments, reported to the CIO.",
  ],
  kpis: [
    {
      name: "Qualified opportunities",
      definition: "Opportunities meeting all qualification criteria with documented evidence.",
      source: "CRM",
      owner: "Investment professionals",
      frequency: "Monthly",
      threshold: "Planning hypothesis: 2–3 per professional per quarter, reviewed after two quarters",
    },
    {
      name: "Qualified-to-IC conversion",
      definition: "IC submissions ÷ qualified opportunities over trailing 12 months, by channel.",
      source: "CRM",
      owner: "Director of Africa",
      frequency: "Quarterly",
      threshold: "No target; a sharp fall triggers a review of qualification standards",
    },
    {
      name: "Stale opportunities",
      definition: "Share of opportunities exceeding the stage-age review trigger.",
      source: "CRM",
      owner: "Relationship owners",
      frequency: "Weekly",
      threshold: "Proposed: under 20% of the active pipeline",
    },
    {
      name: "Proprietary share",
      definition: "Share of qualified opportunities from proprietary or partner channels rather than adviser-led auctions.",
      source: "CRM",
      owner: "Director of Africa",
      frequency: "Quarterly",
      threshold: "Tracked, not targeted, until baseline is known",
    },
  ],
  risks: [
    {
      risk: "Meeting volume is mistaken for progress.",
      tradeoff: "Activity metrics are easy to measure; quality is not.",
      mitigation: "Report qualified opportunities and conversion, not meetings. Evidence-quality codes make weak qualification visible.",
    },
    {
      risk: "Relationships become personal rather than institutional.",
      tradeoff: "Strong personal trust versus continuity if staff leave.",
      mitigation: "Named owners with a second team member on each key relationship; CRM notes kept current.",
    },
    {
      risk: "Partner-sourced deals carry hidden conflicts or pressure to follow a lead investor's view.",
      tradeoff: "Co-investment efficiency versus independent judgement.",
      mitigation: "Conflicts screen before NDA; our own diligence scope agreed regardless of the lead's work.",
    },
  ],
  timeline: {
    first90:
      "Existing pipeline cleaned and re-coded; investee profiles agreed; market maps started for active-coverage markets; CRM schema and stage definitions agreed; first funnel report.",
    months4to12:
      "Maps complete for priority markets; at least two quarters of funnel data to replace planning hypotheses with observed rates; decline review in use; qualified pipeline visibly aligned to the coverage plan.",
  },
  success: {
    looksLike:
      "The team can show, for each priority market, who we know, what stage each relationship is at and why. Opportunities reach screening with documented fit, and declined institutions would still take our call.",
    assumptions: [
      "An existing CRM or pipeline record can be adapted rather than rebuilt.",
      "Investee profiles agreed with the CIO reflect actual fund eligibility.",
      "Team capacity allows relationship work alongside portfolio oversight.",
    ],
  },
  keywords: ["deal flow", "sourcing", "pipeline", "CRM", "co-investors", "funnel", "conversion", "conflicts", "decline feedback"],
};
