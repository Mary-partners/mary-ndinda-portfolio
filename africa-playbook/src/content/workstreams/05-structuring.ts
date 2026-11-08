import type { Workstream } from "../types";

export const ws05: Workstream = {
  number: "05",
  slug: "structuring-ic-completion",
  title: "Structuring, Investment Committee, negotiation and completion",
  shortTitle: "Structuring & IC",
  category: "investment",
  tagline:
    "Choosing the instrument that fits the institution, recommending terms clearly, and closing with every condition evidenced.",
  summary:
    "I would choose between equity, senior debt, subordinated debt and mezzanine based on the institution's cash generation, how the instrument is treated for regulatory capital, and what the mandate allows, not on what is fastest to document. Terms would be recommended to the IC with the reasoning and the alternatives considered; approval is the IC's. From IC to funding I would run a written sequence of negotiation, documentation and conditions precedent, each with a named role owner and evidence, and hand the investment to portfolio management with a clear record of what was agreed and why.",
  outcome: {
    intended:
      "Investments structured so that the instrument suits the institution and protects the fund, approved through the proper process, and closed with every condition met and documented.",
    why:
      "The wrong instrument can harm both parties: hard-currency senior debt can strain an institution earning in local currency, while equity in an institution that cannot distribute cash may never return capital. Completion is where diligence findings become enforceable protections, and where mistakes in conditions precedent or KYC become permanent.",
  },
  establishFirst: {
    data: [
      "The firm's approval sequence, delegated authorities, IC terms of reference and standard term sheets.",
      "Mandate permissions by instrument, including limits on subordinated or convertible instruments.",
      "Regulatory treatment of each instrument in the investee's market (e.g. whether subordinated debt counts as tier 2 capital, and conditions).",
      "Legal panel arrangements and typical completion timelines in each market.",
    ],
    conversations: [
      "CIO and IC secretary: what the IC expects in a paper and what it typically conditions approvals on.",
      "Legal counsel: enforceability of security and shareholder protections in each jurisdiction.",
      "Compliance: AML/KYC, beneficial ownership, sanctions and source-of-funds procedures and who signs off.",
      "Portfolio and finance colleagues: what they need at handover to monitor the investment.",
    ],
    constraints: [
      "The approval sequence below is a proposal until confirmed against the firm's actual governance.",
      "I can recommend terms and negotiate within an IC mandate; I cannot agree terms outside it.",
      "No timeline to funding can be promised without a live, eligible pipeline and completed diligence.",
    ],
  },
  method: [
    {
      title: "Select the instrument from the institution's economics",
      detail:
        "I would start from three questions: how much cash does the institution generate and in what currency; what does it need the capital for (growth, regulatory capital, funding diversification); and how is each instrument treated by its regulator. A deposit-taker short of core capital needs equity. A profitable lender with good capital but concentrated funding may be better served by local-currency senior debt. Subordinated debt or mezzanine can bridge the two where regulatory treatment is favourable.",
    },
    {
      title: "Draft terms that match the diligence findings",
      detail:
        "Each significant red flag from Workstream 03 should map to a term: a covenant, a condition precedent, a reserved matter, an information right, or a price adjustment. If a finding has no corresponding protection, either it is accepted explicitly or the structure is incomplete.",
    },
    {
      title: "Recommend to the IC with alternatives",
      detail:
        "The IC paper sets out the recommended structure, the alternatives considered and why they were rejected, key terms and walk-away positions. I would be explicit about which terms are essential and which are negotiable. The IC approves; I execute within the approval.",
    },
    {
      title: "Negotiate within the mandate",
      detail:
        "Negotiation proceeds within the IC-approved envelope. If the counterparty requires a change outside it, I would return to the IC rather than stretch the mandate. I would keep a negotiation log of positions taken and concessions, so the final terms can be traced back to the approval.",
    },
    {
      title: "Close with evidenced conditions precedent",
      detail:
        "Every condition precedent has a named role owner, the evidence required and its status. Funding is released only when legal confirms all CPs are satisfied or formally waived by someone with authority to waive them. KYC, beneficial ownership, sanctions and source-of-funds checks are refreshed close to funding.",
    },
    {
      title: "Hand over to portfolio management",
      detail:
        "A handover pack sets out key terms, covenants and reporting obligations, open diligence items, the value-creation hypotheses and the first 100-day monitoring plan, so portfolio oversight (Workstream 07) begins on day one.",
    },
  ],
  deliverables: [
    { name: "Instrument-selection matrix", description: "Comparison of instruments for the specific institution; template below." },
    { name: "Term-sheet comparison", description: "Recommended and alternative terms side by side." },
    { name: "IC paper and approval record", description: "Recommendation, alternatives, conditions and walk-away positions." },
    { name: "Conditions-precedent checklist", description: "Owner, evidence and status for every CP." },
    { name: "Post-close handover pack", description: "Terms, covenants, open items and the 100-day monitoring plan." },
  ],
  templates: [
    {
      kind: "table",
      caption: "Instrument-selection matrix (proposed criteria)",
      evidence: "proposed",
      columns: ["Consideration", "Equity", "Senior debt", "Subordinated debt", "Mezzanine"],
      rows: [
        ["Best fit when", "Core capital needed; long-term partnership", "Stable cash generation; funding diversification", "Capital need where tier 2 treatment is allowed", "Growth funding with return upside; equity not yet appropriate"],
        ["Return source", "Dividends and exit value", "Interest and fees", "Higher interest and fees", "Interest plus equity-linked upside"],
        ["Regulatory capital treatment", "Core capital", "None; counts as funding", "May count as tier 2, subject to conditions", "Depends on terms; often treated as debt"],
        ["Cash demand on institution", "Low until distributions", "High: scheduled interest and principal", "Medium: interest, deferred principal", "Medium to high"],
        ["Downside position", "Last in priority", "First among lenders, if secured", "Behind senior lenders", "Behind senior; may have conversion rights"],
        ["Governance influence", "Board seat and reserved matters", "Covenants and information rights", "Covenants; limited governance", "Covenants; possibly observer seat"],
        ["Exit route", "Sale of stake; needs a buyer", "Repayment", "Repayment, sometimes call option", "Repayment or conversion and sale"],
        ["Main risk to investee", "Dilution; investor influence", "FX and refinancing if hard currency", "Cost of capital", "Complexity and cost"],
      ],
    },
    {
      kind: "table",
      caption: "Illustrative term-sheet comparison for Institution B (fictional)",
      evidence: "illustrative",
      columns: ["Term", "Senior loan (recommended)", "Subordinated loan (alternative)", "Minority equity (alternative)"],
      rows: [
        ["Amount", "LCU300m (USD3.0m at 100)", "LCU300m", "USD3.0m for 15%"],
        ["Pricing", "Fixed 17% LCU, 1% fee", "Fixed 20% LCU, 1.5% fee", "Implied P/B 1.2x"],
        ["Tenor", "4 years", "7 years", "Expected hold 5–7 years"],
        ["Amortisation", "Equal semi-annual after 12-month grace", "Bullet, callable after year 5", "n/a"],
        ["Security", "Pledge of loan receivables, coverage 1.2x", "Unsecured", "n/a"],
        ["Priority", "Pari passu with other senior lenders", "Subordinated to all senior debt", "Ordinary shares"],
        ["Governance", "None", "Observer seat", "One board seat; reserved matters"],
        ["Information rights", "Monthly portfolio report, quarterly accounts", "Same", "Same plus board papers"],
        ["Financial covenants", "PAR30 below 6%; capital ratio 2pp above minimum; open FX position limit", "Capital ratio 2pp above minimum", "None; reserved matters instead"],
        ["Exit / repayment", "Scheduled repayment", "Repayment or call", "Tag-along, drag-along, put option (enforceability to confirm)"],
      ],
      note: "Fictional. Terms would reflect diligence findings, market practice and IC approval.",
    },
  ],
  extras: [
    {
      id: "approval-sequence",
      title: "Proposed approval and completion sequence",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "flow",
          caption: "From screening to post-close handover (to be confirmed against firm governance)",
          evidence: "proposed",
          steps: [
            { label: "Screening approval", detail: "Diligence budget approved" },
            { label: "Diligence sign-off", detail: "Specialist reports and red-flag register complete" },
            { label: "Investment Committee", detail: "Approve, approve with conditions, or decline" },
            { label: "Negotiation", detail: "Within IC-approved envelope" },
            { label: "Documentation", detail: "Legal agreements drafted and reviewed" },
            { label: "Conditions precedent", detail: "Each evidenced or formally waived" },
            { label: "Funding", detail: "Final KYC and sanctions refresh" },
            { label: "Handover", detail: "Portfolio monitoring begins" },
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "Recommending is not approving",
          text: "I would recommend terms, negotiate within the approved envelope and confirm CPs are met. Approval of the investment, of material changes to terms and of CP waivers rests with the IC or whoever holds that authority under the firm's governance.",
          evidence: "proposed",
        },
      ],
    },
    {
      id: "integrity-checks",
      title: "Integrity, AML/KYC and sanctions",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "list",
          items: [
            "Beneficial ownership traced to natural persons above the firm's threshold, with documentary evidence.",
            "Sanctions and politically exposed person screening on the institution, directors, significant shareholders and key counterparties, refreshed before funding.",
            "Source-of-funds review for co-investors and any new shareholders entering at the same time.",
            "Conflicts register updated for the deal team, nominee directors and advisers.",
            "Local legal review of enforceability of security, shareholder rights and exit mechanisms; I would not rely on assumptions about enforceability across jurisdictions.",
          ],
        },
      ],
    },
    {
      id: "cp-checklist",
      title: "Conditions-precedent checklist",
      after: "deliverables",
      evidence: "illustrative",
      blocks: [
        {
          kind: "table",
          caption: "CP checklist for Institution B senior loan (fictional)",
          evidence: "illustrative",
          columns: ["Condition precedent", "Owner (role)", "Evidence required", "Status / open item"],
          rows: [
            ["Signed facility agreement and security documents", "Legal counsel", "Executed documents", "Complete"],
            ["Board resolution approving borrowing", "Investee company secretary", "Certified resolution", "Complete"],
            ["Regulator no-objection, if required", "Investee CEO; legal counsel to confirm requirement", "Regulator letter or legal opinion that none is needed", "Open: legal opinion awaited"],
            ["KYC and beneficial ownership", "Compliance", "Completed KYC file signed off", "Complete; refresh within 30 days of funding"],
            ["Sanctions screening", "Compliance", "Screening record", "To refresh before funding"],
            ["Revised loan officer incentive scheme", "Investee HR head; Director of Africa to review", "Board-approved policy", "Open: draft received"],
            ["Security perfection (registration of pledge)", "Legal counsel", "Registration certificate", "Open"],
            ["Legal opinions (capacity and enforceability)", "Legal counsel", "Signed opinions", "Open"],
            ["No material adverse change certificate", "Investee CFO", "Signed certificate dated at funding", "Due at funding"],
            ["Funding approval", "Authorised signatory per firm policy", "Signed funding request", "After all above complete"],
          ],
          note: "Funding is released only when legal confirms each CP is met or formally waived by an authorised person.",
        },
      ],
    },
  ],
  ownership: {
    lead: [
      "Instrument selection and term recommendation for Africa transactions.",
      "Negotiation within the IC-approved envelope.",
      "Coordination of the completion process and the handover pack.",
    ],
    delegate: [
      "CP tracking and document management to an investment professional.",
      "Drafting of term sheets from firm templates, with my review.",
    ],
    recommend: [
      "Structure, terms and walk-away positions to the IC.",
      "Any CP waiver to the person with authority to grant it, with reasons.",
    ],
    escalate: [
      "Counterparty demands outside the IC envelope, back to the IC.",
      "Any KYC, sanctions or source-of-funds concern to compliance before funding.",
    ],
    dependencies: [
      { party: "Investment Committee", need: "Approval of investment and of material term changes." },
      { party: "Legal counsel", need: "Documentation, enforceability, CP confirmation." },
      { party: "Compliance", need: "KYC, beneficial ownership, sanctions and source-of-funds sign-off." },
      { party: "Risk", need: "Review of structure against risk limits." },
      { party: "Investee management", need: "Timely satisfaction of CPs." },
    ],
  },
  gates: [
    {
      gate: "IC submission",
      proceedIf: "Diligence signed off, every material red flag mapped to a term or explicitly accepted, model reviewed.",
      deferOrDeclineIf: "Instrument does not fit the institution's cash generation or currency; regulatory treatment unconfirmed; integrity issues open.",
    },
    {
      gate: "Signing",
      proceedIf: "Negotiated terms are within the IC approval; legal review complete.",
      deferOrDeclineIf: "Counterparty requires terms outside the envelope (return to IC); enforceability concerns unresolved.",
    },
    {
      gate: "Funding",
      proceedIf: "All CPs evidenced or properly waived; KYC and sanctions refreshed; no material adverse change.",
      deferOrDeclineIf: "Any CP outstanding without authorised waiver; new adverse information.",
    },
  ],
  cadence: [
    "Weekly during negotiation and completion: CP status review.",
    "Per IC: paper submitted on the IC timetable with model and term sheet.",
    "Post-close: handover meeting within two weeks of funding.",
  ],
  kpis: [
    {
      name: "Red flags mapped to protections",
      definition: "Share of material red flags with a corresponding term, CP or explicit acceptance in the IC paper.",
      source: "IC paper; red-flag register",
      owner: "Director of Africa",
      frequency: "Per deal",
      threshold: "Proposed: 100%",
    },
    {
      name: "IC to funding time",
      definition: "Days from IC approval to first disbursement.",
      source: "Deal records",
      owner: "Investment professional",
      frequency: "Per deal",
      threshold: "Tracked to identify bottlenecks; no target until baseline known",
    },
    {
      name: "CP waivers",
      definition: "Number of CPs waived rather than satisfied, with authority recorded.",
      source: "CP checklist",
      owner: "Legal counsel",
      frequency: "Per deal",
      threshold: "Every waiver documented with reasons",
    },
  ],
  risks: [
    {
      risk: "Deal momentum pushes acceptance of weaker terms late in negotiation.",
      tradeoff: "Closing the deal versus protecting the fund.",
      mitigation: "Walk-away positions set at IC; changes outside the envelope go back to the IC.",
    },
    {
      risk: "Hard-currency debt shifts FX risk to an institution, and potentially its customers, that cannot bear it.",
      tradeoff: "Simpler structuring versus responsible risk allocation.",
      mitigation: "Local-currency options and FX analysis (Workstream 06) considered before hard-currency debt is recommended.",
    },
    {
      risk: "Protections that look strong on paper are unenforceable locally.",
      tradeoff: "Standard templates versus jurisdiction-specific drafting.",
      mitigation: "Local legal review of enforceability; reliance placed on information rights and relationship as well as remedies.",
    },
  ],
  timeline: {
    first90:
      "Approval sequence and delegated authorities confirmed; instrument matrix and CP checklist adopted; any IC-stage deals reviewed against the gates. Transactions advance only if they pass.",
    months4to12:
      "All new transactions follow the documented sequence; handover packs in use; review of completion bottlenecks with legal.",
  },
  success: {
    looksLike:
      "Each investment's structure can be explained from the institution's economics and diligence findings. IC approvals are executed without unapproved drift, and closings happen with no unresolved CPs.",
    assumptions: [
      "The firm's approval sequence is close to the proposed sequence, or can be mapped to it.",
      "Local legal counsel is available in each active market.",
      "Investees can satisfy CPs within reasonable timeframes.",
    ],
  },
  keywords: ["term sheet", "covenants", "mezzanine", "subordinated debt", "tier 2", "conditions precedent", "KYC", "sanctions", "negotiation", "Investment Committee"],
};
