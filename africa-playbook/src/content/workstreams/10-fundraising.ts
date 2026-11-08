import type { Workstream } from "../types";

export const ws10: Workstream = {
  number: "10",
  slug: "fundraising-and-partnerships",
  title: "Fundraising, investor diligence and partnerships",
  shortTitle: "Fundraising & partners",
  category: "capital",
  tagline:
    "Supporting CEO- and CIO-led fundraising with a substantiated Africa narrative, clean evidence and disciplined co-investment.",
  summary:
    "Fundraising is led by the CEO and CIO; the Africa director's contribution is a regional investment narrative that investors can test, a pipeline and portfolio evidence base that survives due diligence, and co-investment opportunities governed by clear allocation and conflicts principles. I would segment prospective capital by mandate and compatibility rather than assumed appetite, keep indicative interest, commitments and cash received strictly separate, and present track record with explicit basis, currency and as-of date.",
  outcome: {
    intended:
      "Investors and co-investors evaluating the firm find a credible, well-evidenced account of the Africa strategy, pipeline and portfolio, and the firm's fundraising leaders can draw on Africa materials without re-verifying them.",
    why:
      "Limited partners in impact and development finance carry out detailed diligence on regional strategy, deal flow and track record. Inconsistent figures, optimistic pipeline descriptions or blurred performance definitions damage credibility across the whole firm, not just the Africa team. Co-investment, done well, extends the firm's reach and risk-sharing; done poorly, it creates conflicts and allocation disputes.",
  },
  establishFirst: {
    data: [
      "Current fundraising plan, target investor segments and materials, owned by the CEO and CIO.",
      "Existing data room structure, DDQ responses and the firm's approved track-record presentation and methodology.",
      "Any investor reporting commitments and side-letter terms that affect Africa (for example, reporting frequency, exclusion lists, co-investment rights).",
      "Co-investment and syndication history and the firm's allocation policy, if one exists.",
    ],
    conversations: [
      "CEO and CIO: what role they want the Africa director to play in investor meetings, and what messages are already established.",
      "Investor relations or fundraising lead, if separate: materials, processes and recurring investor questions about Africa.",
      "Finance and fund operations: source of truth for performance figures and how they are calculated.",
      "Legal and compliance: rules on investor communications, marketing and confidentiality of investee information.",
      "Impact/ESG: approved impact claims and how they should be described externally.",
    ],
    constraints: [
      "I would not represent personal investor relationships or fundraising results I cannot evidence; relationship ownership sits with whoever the firm designates.",
      "Performance figures must come from the firm's approved methodology and finance function, not be recalculated regionally.",
      "Investee information shared with prospective investors requires confidentiality controls and, where relevant, investee consent.",
    ],
  },
  method: [
    {
      title: "Build the Africa narrative from evidence",
      detail:
        "I would draft a short regional investment narrative: why these markets and institution types, what the firm brings beyond capital, how risks such as FX and governance are managed, and what the portfolio shows so far. Each claim would map to a source in the data room. Statements that cannot yet be evidenced are removed or reframed as intentions.",
    },
    {
      title: "Substantiate the pipeline",
      detail:
        "Investors ask about deal flow. I would present pipeline by stage using the definitions in Workstream 02, with counts and indicative sizes only for qualified opportunities, and with a clear statement that pipeline is not a deployment forecast. Names of prospective investees would not be disclosed without consent.",
    },
    {
      title: "Segment capital by compatibility",
      detail:
        "With the CEO and CIO, I would help segment prospective investors and co-investors by mandate fit (geography, instrument, return expectations, impact requirements, ticket size, governance requirements) rather than by assumptions about appetite. This tells the firm where Africa evidence matters most and where the Africa strategy may not fit a prospect's constraints.",
    },
    {
      title: "Prepare the evidence protocol",
      detail:
        "For any performance data used in Africa materials, I would follow a protocol: state whether figures are gross or net, realised or unrealised, at fund or investment level, in which currency and as of which date, and reconcile to the finance function's records. Case studies would follow the same rules and the impact team's claim guidance.",
    },
    {
      title: "Support meetings and diligence",
      detail:
        "In investor meetings I would cover regional strategy, pipeline quality, portfolio oversight and country risks, and answer diligence questions within an agreed response process. I would keep a record of questions asked so recurring ones can be answered once, well, in the data room.",
    },
    {
      title: "Govern co-investment and syndication",
      detail:
        "Where an opportunity is larger than the fund's appetite or limits, I would propose syndication early and transparently, following written allocation and conflicts principles. Co-investors receive the same core information, the firm's fund interests come first where policy requires, and conflicts are logged and cleared by compliance.",
    },
  ],
  deliverables: [
    { name: "Africa investment narrative", description: "Two to four pages with every claim mapped to evidence." },
    { name: "Prospect qualification template", description: "Mandate and compatibility screen for investors and co-investors (template below)." },
    { name: "Relationship plan", description: "For priority prospects: owner, objective, next substantive step and evidence the prospect needs." },
    { name: "Africa section of the data room", description: "Indexed documents with owners and refresh dates." },
    { name: "Track-record evidence protocol", description: "Rules for presenting performance and case studies." },
    { name: "Syndication principles", description: "Allocation, information, conflicts and execution responsibilities." },
  ],
  templates: [
    {
      kind: "table",
      caption: "Prospect qualification template (fictional prospects)",
      evidence: "illustrative",
      columns: ["Field", "Prospect Alpha (fictional DFI)", "Prospect Beta (fictional foundation)", "Prospect Gamma (fictional pension fund)"],
      rows: [
        ["Mandate geography", "Sub-Saharan Africa and South Asia", "East Africa only", "Global emerging markets"],
        ["Instrument fit", "Equity and mezzanine via funds", "Grants and first-loss only", "Fund LP commitments"],
        ["Return expectation", "Market-rate, risk-adjusted", "Concessional acceptable", "Net return hurdle set by investment policy"],
        ["Impact requirements", "Theory of change and annual outcome report", "Gender-focused outcomes", "Exclusion list and ESG reporting"],
        ["Ticket size vs fund", "Compatible", "Small; possibly TA co-funding rather than fund capital", "Compatible if fund meets minimum size"],
        ["Governance requirements", "Advisory committee seat", "Grant reporting", "Standard LPA terms"],
        ["Compatibility assessment", "High: fits fund", "Partial: TA partnership, not fund LP", "Conditional: depends on fund size and track record"],
        ["Relationship owner", "CEO", "Head of TA", "CEO with CIO"],
        ["Africa director role", "Regional strategy and pipeline evidence", "TA programme design input", "Country-risk and portfolio-oversight session"],
        ["Next substantive step", "Data-room access and pipeline review call", "Concept note for joint TA facility", "Await fund size confirmation before diligence"],
        ["Stage", "Diligence", "Exploratory", "Qualified"],
      ],
      note:
        "Prospects are fictional. Real prospect records would be maintained by the fundraising lead; the Africa director contributes compatibility input and regional evidence.",
    },
    {
      kind: "table",
      caption: "Fundraising stage definitions: what counts and what does not",
      evidence: "proposed",
      columns: ["Stage", "Definition", "Evidence required", "Must not be reported as"],
      rows: [
        ["Identified", "Mandate appears compatible on public or shared information", "Qualification record", "Interest"],
        ["Engaged", "Substantive meeting held; prospect has reviewed materials", "Meeting note with next step", "Pipeline commitment"],
        ["Indicative interest", "Prospect states intention to consider an amount, non-binding", "Written or minuted statement", "Commitment"],
        ["Diligence", "Prospect has begun formal due diligence", "DDQ received, data-room access", "Commitment"],
        ["Approved", "Prospect's internal approval obtained", "Written confirmation", "Signed commitment"],
        ["Signed commitment", "Subscription or side letter executed", "Executed documents", "Cash received"],
        ["Cash received", "Capital called and received", "Fund administrator confirmation", "Not applicable"],
      ],
      note: "Proposed definitions for internal consistency; the firm's fundraising function owns the official pipeline.",
    },
  ],
  extras: [
    {
      id: "data-room",
      title: "Investor DDQ and data-room index: Africa section",
      after: "deliverables",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Proposed Africa data-room index",
          evidence: "proposed",
          columns: ["Folder", "Contents", "Owner", "Refresh"],
          rows: [
            ["1. Regional strategy", "Investment narrative, market prioritisation summary, coverage plan", "Director of Africa", "Semi-annual"],
            ["2. Pipeline", "Stage summary using standard definitions, anonymised where needed", "Director of Africa", "Quarterly"],
            ["3. Portfolio", "Investee summaries, monitoring tiers, governance arrangements", "Investment professionals", "Quarterly"],
            ["4. Performance", "Approved track-record tables per protocol", "Finance / fund operations", "Per reporting period"],
            ["5. Risk", "Country-risk notes, FX exposure summary, risk framework", "Director of Africa with risk", "Semi-annual"],
            ["6. Impact and ESG", "Framework, Africa scorecard summary, case studies", "Impact/ESG team", "Annual"],
            ["7. TA", "Approach, Africa examples with outcome evidence", "TA team", "Annual"],
            ["8. Team and office", "Nairobi team structure, roles, decision process", "Director of Africa", "On change"],
            ["9. Policies", "Investment, conflicts, valuation, ESG, AML/KYC policies", "Legal and compliance", "On change"],
          ],
        },
        {
          kind: "table",
          caption: "Track-record evidence protocol",
          evidence: "proposed",
          columns: ["Dimension", "Rule"],
          rows: [
            ["Gross or net", "State explicitly; never mix in one table. Net figures follow the firm's approved fee and carry methodology."],
            ["Realised or unrealised", "Separate realised proceeds from unrealised valuations; state valuation basis and date for unrealised."],
            ["Fund or investment level", "Label whether a figure is fund performance or a single investment's performance."],
            ["Currency", "State reporting currency and whether local-currency results are translated at spot or historical rates."],
            ["As-of date", "Every figure carries its as-of date; superseded figures are removed, not left alongside."],
            ["Attribution", "Distinguish deals led by current team members from firm-level history; no personal claims without evidence."],
            ["Selection", "Case studies note how they were chosen and include at least one that did not go to plan, where appropriate."],
            ["Reconciliation", "All figures reconciled to finance records and signed off before release."],
          ],
        },
      ],
    },
    {
      id: "syndication",
      title: "Syndication governance and allocation principles",
      after: "ownership",
      evidence: "proposed",
      blocks: [
        {
          kind: "list",
          items: [
            "Allocation: when an opportunity exceeds the fund's appetite, the allocation between the fund, other firm vehicles and external co-investors follows the firm's written policy; where none exists, I would propose one for compliance and CIO approval before the first syndicated deal.",
            "Information parity: co-investors invited to the same deal receive the same core diligence information; anything withheld is for legal or confidentiality reasons and is recorded.",
            "Conflicts: any situation where firm vehicles, staff or co-investors have different interests (different instruments, entry prices or exit horizons) is logged and cleared by compliance before terms are offered.",
            "Lead responsibilities: if the firm leads, it owns diligence coordination, documentation and post-close monitoring arrangements, and agrees cost-sharing upfront.",
            "Follow-on and exit: rights and obligations for follow-ons and exits are agreed at entry so co-investors are not surprised later.",
            "No implied commitments: inviting a co-investor to review a deal does not imply allocation until documented.",
          ],
        },
      ],
    },
  ],
  ownership: {
    lead: [
      "Africa investment narrative, pipeline evidence and regional sections of the data room.",
      "Regional content in investor meetings when asked by the CEO or CIO.",
      "Co-investment opportunity identification and preparation within agreed principles.",
    ],
    delegate: [
      "Data-room document maintenance to investment professionals, each owning named folders.",
      "Performance figure preparation to finance and fund operations.",
    ],
    recommend: [
      "Syndication structures and allocation proposals to the CIO.",
      "Investor-segment priorities from an Africa perspective to the CEO.",
    ],
    escalate: [
      "Any investor request for information that may breach investee confidentiality or the firm's marketing rules, to compliance.",
      "Any inconsistency found between external materials and finance records, to the CIO and finance before further use.",
    ],
    dependencies: [
      { party: "CEO and CIO", need: "Fundraising strategy, relationship ownership and approval of messages." },
      { party: "Finance / fund operations", need: "Approved performance figures and methodology." },
      { party: "Legal and compliance", need: "Marketing rules, confidentiality and conflicts clearance." },
      { party: "Impact/ESG and TA teams", need: "Approved impact and TA evidence for external use." },
    ],
  },
  gates: [
    {
      gate: "Material used externally",
      proceedIf: "Every figure is sourced, dated, reconciled and approved under the evidence protocol.",
      deferOrDeclineIf: "Any figure unreconciled, basis unclear (gross/net, realised/unrealised) or investee consent missing.",
    },
    {
      gate: "Co-investor invited to a deal",
      proceedIf: "Allocation principles applied, conflicts cleared, confidentiality agreement in place.",
      deferOrDeclineIf: "Conflict unresolved; allocation unclear; investee has not agreed to disclosure.",
    },
    {
      gate: "Pipeline described to investors",
      proceedIf: "Only qualified opportunities counted under standard stage definitions.",
      deferOrDeclineIf: "Pressure to include unqualified opportunities or present pipeline as forecast deployment.",
    },
  ],
  cadence: [
    "Weekly during active fundraising: coordination with CEO/CIO on investor questions and meetings.",
    "Quarterly: Africa data-room refresh and narrative review.",
    "Per transaction: syndication decision documented at screening if size or limits require it.",
  ],
  kpis: [
    {
      name: "Data-room currency",
      definition: "Share of Africa data-room documents within their refresh date.",
      source: "Data-room index",
      owner: "Director of Africa",
      frequency: "Monthly during fundraising",
      threshold: "Proposed: 100% for strategy, pipeline and performance folders",
    },
    {
      name: "Diligence response time",
      definition: "Working days to answer Africa-related investor questions with approved content.",
      source: "Question log",
      owner: "Director of Africa",
      frequency: "Per request",
      threshold: "Proposed: within the timeline agreed with the fundraising lead",
    },
    {
      name: "Evidence exceptions",
      definition: "Number of figures found inconsistent or unsupported after release.",
      source: "Finance and compliance review",
      owner: "Director of Africa with finance",
      frequency: "Quarterly",
      threshold: "Proposed: zero; any exception reviewed",
    },
    {
      name: "Syndication conversion",
      definition: "Share of co-investment invitations that progress to a documented allocation.",
      source: "Syndication log",
      owner: "Director of Africa",
      frequency: "Annual",
      threshold: "Monitored, not targeted",
    },
  ],
  risks: [
    {
      risk: "Overstated pipeline or performance damages credibility with investors.",
      tradeoff: "Attractive story versus defensible story.",
      mitigation: "Evidence protocol, stage definitions and finance sign-off before release.",
    },
    {
      risk: "Fundraising support crowds out portfolio oversight and deal execution.",
      tradeoff: "Firm-wide capital needs versus regional delivery.",
      mitigation: "Agree time allocation with the CEO; reusable materials; delegate document upkeep.",
    },
    {
      risk: "Syndication creates conflicts between firm vehicles or co-investors.",
      tradeoff: "Larger deals and shared risk versus complexity.",
      mitigation: "Written allocation and conflicts principles cleared by compliance before use.",
    },
  ],
  timeline: {
    first90:
      "Fundraising role agreed with CEO and CIO; Africa narrative drafted with evidence map; Africa data-room section audited and gaps listed; evidence protocol agreed with finance; syndication principles reviewed or proposed.",
    months4to12:
      "Africa materials in use and maintained on schedule; recurring investor questions answered in the data room; at least one co-investment opportunity assessed under the agreed principles where pipeline allows.",
  },
  success: {
    looksLike:
      "The CEO and CIO can put Africa material in front of any prospective investor without re-checking it, investor diligence on Africa raises few surprises, and co-investors trust the firm's allocation process.",
    assumptions: [
      "The firm wants the Africa director involved in fundraising at a regional-evidence level.",
      "Finance can provide approved performance figures on a timely basis.",
      "Investees will consent to anonymised or named case studies where appropriate.",
    ],
  },
  keywords: ["LP", "limited partners", "DDQ", "data room", "co-investment", "syndication", "track record", "capital raising", "investor relations", "allocation policy"],
};
