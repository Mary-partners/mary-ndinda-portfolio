import type { Workstream } from "../types";

export const ws06: Workstream = {
  number: "06",
  slug: "local-currency-and-fx",
  title: "Local-currency financing and FX risk",
  shortTitle: "Local currency & FX",
  category: "capital",
  alsoIn: ["investment", "portfolio"],
  tagline:
    "Know where every currency sits, price the protection honestly, and decide in advance who carries the residual risk.",
  summary:
    "I would map currency at every level, from investee assets and liabilities to fund reporting, capital calls and distributions, before choosing any protection. Translation, transaction, liquidity, convertibility and transfer risk need different responses, so I would assess them separately. I would compare local-currency funding, natural matching, hedging, structured protections and any facility support on cost, tenor, counterparty and residual exposure. No instrument removes currency risk, and I would not let unaffordable FX exposure pass to low-income customers.",
  outcome: {
    intended:
      "For every Africa position, a documented view of currency exposure at investee and fund level. Each position has an agreed protection approach with known cost and known residual risk, and treasury escalation triggers are agreed before they are needed.",
    why:
      "For a USD- or EUR-reporting investor in African financial institutions, currency movement can outweigh operating performance. The decision-lab case shows how 20% cumulative depreciation turns a reasonable local-currency outcome into a modest dollar return. For a lender whose borrowers earn in local currency, hard-currency debt can damage the institution and, through it, its customers. Getting currency right protects the fund's returns, the investee's solvency and customer welfare.",
  },
  establishFirst: {
    data: [
      "Currency of each investee's loan book, deposits, borrowings, equity and operating costs, with maturity buckets for assets and liabilities.",
      "Open FX position of each investee against its regulatory limit, and any existing hedges with tenor, counterparty, cost and collateral terms.",
      "Fund reporting and functional currencies, currency of capital calls and distributions, and how unrealised FX movements flow into reported NAV.",
      "History of local-currency moves, central-bank interventions, parallel-market spreads and any past episodes of delayed transfer for each relevant market.",
      "Terms of any FX facility the firm or its investees can access: eligibility, capacity, pricing, tenor, currencies and the process to draw on it. I would verify these directly rather than assume availability.",
    ],
    conversations: [
      "CIO and finance: how FX is reflected in fund return targets, valuations and reporting to investors.",
      "Risk: the firm's FX risk appetite, approved hedge counterparties and any limits on unhedged exposure.",
      "Treasury and finance teams at investees: how they manage their open position today, what hedges they can obtain and at what cost.",
      "Facility managers or providers, through the appropriate internal owner: current eligibility, capacity and pricing.",
      "Legal: how currency-of-payment, indemnity and convertibility clauses are drafted and how enforceable they are in each market.",
    ],
    constraints: [
      "Hedging policy and counterparty approval belong to the CIO, risk and finance functions. I would recommend, not set, them.",
      "Facility support is subject to the provider's own eligibility, capacity and terms, which may change.",
      "Investee FX positions are governed by local prudential rules. Fund-side preferences cannot override them.",
    ],
  },
  method: [
    {
      title: "Build the currency map for each position",
      detail:
        "I would record, for each investee, which currency its assets, liabilities, revenues and costs are in, and how fund cash flows in and out. The purpose is to find mismatches: a lender with local-currency loans funded by USD borrowing carries transaction and solvency risk; an equity investment in a fully local-currency institution carries translation risk to the fund. Each needs a different answer.",
    },
    {
      title: "Separate the five risk types",
      detail:
        "I would assess translation, transaction, liquidity, convertibility and transfer risk separately. Depreciation hurts reported value. A sudden mismatch can break covenants. Lack of FX liquidity can delay repayment. Capital controls can block conversion entirely. A hedge addresses only some of these, so naming each one stops a hedge from being presented as complete protection.",
    },
    {
      title: "Choose the protection that fits the exposure",
      detail:
        "For debt to investees with local-currency assets, I would first consider lending in local currency, priced to include the cost of protection. Natural matching comes next where the investee has hard-currency assets or revenues. Hedging is appropriate where a market and counterparty exist at affordable cost and suitable tenor. Structured protections, such as FX-linked pricing bands or cost-sharing, help only if their enforceability and effect on the investee are understood. Facility support is potentially relevant, subject to verified eligibility, capacity and terms. For equity, I would price expected depreciation into the return case rather than assume hedging.",
    },
    {
      title: "Price and size the residual",
      detail:
        "Every approach leaves residual exposure, from basis mismatch, tenor gaps, counterparty failure, collateral calls or unhedgeable events. I would quantify that residual under a downside and a stress depreciation case and show it in the IC paper. The question for the committee is whether the expected return compensates for what remains, not whether the risk has gone.",
    },
    {
      title: "Protect customers from inappropriate transfer",
      detail:
        "I would not support structures where an investee passes hard-currency exposure to low-income borrowers through FX-indexed loans they cannot understand or afford. Where an investee proposes this, I would raise it as a responsible-finance issue with the impact/ESG team before IC.",
    },
    {
      title: "Monitor and escalate",
      detail:
        "A monthly exposure dashboard would track open positions, hedge cover, cost and covenant headroom. Agreed triggers, set out in the escalation flow below, would move a position from routine monitoring to treasury review and, if needed, to the CIO and risk.",
    },
  ],
  deliverables: [
    {
      name: "Currency map per position",
      description: "Currency of investee assets, liabilities, revenues and costs, and of fund cash flows, with identified mismatches.",
    },
    {
      name: "FX section for IC papers",
      description: "Separate treatment of the five risk types, chosen protection, cost, residual exposure and downside/stress effect on returns.",
    },
    {
      name: "Monthly FX exposure dashboard",
      description: "Africa-wide view of open positions, hedge cover, cost and covenant headroom. Template below.",
    },
    {
      name: "Treasury escalation protocol",
      description: "Agreed triggers, owners and response times, aligned to firm risk policy.",
    },
  ],
  templates: [
    {
      kind: "table",
      caption: "FX exposure dashboard (illustrative, month-end, fictional positions)",
      evidence: "illustrative",
      columns: [
        "Position",
        "Instrument / currency",
        "Exposure (USD m)",
        "Hedge cover",
        "Annual hedge cost",
        "LCU move YTD",
        "Investee open position vs limit",
        "Status",
      ],
      rows: [
        ["Illustrative FSP A", "Equity / LCU", "5.0", "None (priced into return case)", "n/a", "-9%", "Within limit (6% of capital vs 10% limit)", "Monitor: depreciation tracking base case"],
        ["Illustrative FSP B", "Senior loan / LCU", "4.0", "100% via cross-currency swap", "7.5% p.a.", "-4%", "Within limit", "Routine"],
        ["Illustrative FSP C", "Senior loan / USD", "3.0", "Investee holds 40% USD assets", "n/a", "-15%", "Close to limit (9% vs 10%)", "Treasury review: trigger 2 met"],
        ["Illustrative FSP D", "Subordinated loan / LCU", "2.0", "50% hedged; 3-year hedge on 5-year loan", "6.0% p.a.", "-2%", "Within limit", "Watch: tenor gap from year 4"],
        ["Total / summary", "", "14.0", "Hedged or matched: 6.2 (44%)", "", "", "", "One position in treasury review"],
      ],
      note:
        "Fictional figures. Hedged or matched = FSP B 4.0 + FSP C 40% of 3.0 (1.2) + FSP D 50% of 2.0 (1.0) = 6.2. Equity in A is unhedged by design. Real dashboards would use fund administration data and investee treasury reports.",
    },
  ],
  ownership: {
    lead: [
      "Building the currency map and FX analysis for each Africa position and IC paper.",
      "Engaging investee management on their FX position and protection options.",
      "Preparing the monthly exposure dashboard and calling escalation triggers.",
    ],
    delegate: [
      "Data collection and dashboard updates to an investment professional.",
      "Hedge quotes and documentation to finance or treasury, through approved counterparties.",
    ],
    recommend: [
      "Protection approach and pricing per transaction to the IC.",
      "Changes to FX risk appetite or hedging policy to the CIO and risk.",
      "Use of any facility support, after the eligibility and terms are confirmed.",
    ],
    escalate: [
      "Breach or near-breach of an investee's open-position limit, or an FX-linked covenant, to the CIO and risk.",
      "Convertibility or transfer restrictions in any market, to the CIO, risk, legal and finance immediately.",
      "Any proposal to pass FX risk to low-income customers, to impact/ESG before IC.",
    ],
    dependencies: [
      { party: "CIO", need: "Return expectations net of FX and approval of protection approach." },
      { party: "Risk", need: "FX risk appetite, counterparty limits and stress scenarios." },
      { party: "Finance / fund operations", need: "Hedge execution, collateral management, NAV treatment." },
      { party: "Legal", need: "Currency, indemnity and convertibility clauses and their enforceability." },
      { party: "Facility providers (via internal owner)", need: "Verified eligibility, capacity and pricing." },
      { party: "Investee management", need: "Accurate FX position data and agreed mitigation plans." },
    ],
  },
  gates: [
    {
      gate: "FX approach accepted for IC submission",
      proceedIf:
        "All five risk types are assessed, the protection cost is in the pricing or return case, and the residual exposure under stress is shown and within appetite.",
      deferOrDeclineIf:
        "The investee's debt service depends on a hedge that cannot be obtained at affordable cost or tenor; or the return case only works if depreciation is assumed away.",
    },
    {
      gate: "Hard-currency lending to an investee with local-currency assets",
      proceedIf:
        "The investee holds matching hard-currency assets or a verified hedge, and the stressed open position stays within its regulatory limit.",
      deferOrDeclineIf:
        "The mismatch would be borne unhedged by the investee or passed to customers who cannot bear it.",
    },
    {
      gate: "Reliance on facility support",
      proceedIf: "Eligibility, capacity, pricing and process have been confirmed in writing for this transaction.",
      deferOrDeclineIf: "Facility support is assumed but unconfirmed. Without it, the deal must stand on its own or wait.",
    },
  ],
  cadence: [
    "Monthly: FX exposure dashboard reviewed in the portfolio meeting.",
    "Quarterly: FX section in the capital-allocation memo (Workstream 01) and stress update.",
    "Event-driven: treasury review within five working days of any trigger.",
  ],
  kpis: [
    {
      name: "Protected share of debt exposure",
      definition: "Share of Africa debt exposure that is local-currency funded, naturally matched or hedged, by USD amount.",
      source: "Dashboard; fund administration",
      owner: "Director of Africa",
      frequency: "Monthly",
      threshold: "Proposed: report every position below full protection with a written rationale",
    },
    {
      name: "Investee open-position headroom",
      definition: "Gap between each investee's open FX position and its regulatory or covenant limit.",
      source: "Investee treasury reports",
      owner: "Investment professional",
      frequency: "Monthly",
      threshold: "Proposed: treasury review when within 20% of the limit",
    },
    {
      name: "All-in protection cost",
      definition: "Annualised hedge and facility cost as a share of the instrument's yield.",
      source: "Hedge confirmations; pricing models",
      owner: "Finance with Director of Africa",
      frequency: "Quarterly",
      threshold: "Proposed: IC visibility if cost exceeds half of gross yield",
    },
    {
      name: "FX effect on equity returns",
      definition: "Difference between local-currency and USD MOIC for each equity position at latest valuation.",
      source: "Valuation models",
      owner: "Director of Africa",
      frequency: "Quarterly",
      threshold: "No threshold; reported for decision-making",
    },
  ],
  risks: [
    {
      risk: "Hedge cost makes local-currency lending unaffordable, pushing investees toward hard-currency debt.",
      tradeoff: "Affordability for the investee versus protection for the fund.",
      mitigation: "Compare all-in local-currency cost with the investee's stressed mismatch loss; consider partial hedging, shorter tenor or facility support where verified.",
    },
    {
      risk: "Tenor or basis mismatch leaves an unhedged tail.",
      tradeoff: "Longer hedges are costlier or unavailable.",
      mitigation: "Show the tail in IC papers; plan roll-over; match amortisation to hedge tenor where possible.",
    },
    {
      risk: "Counterparty or collateral stress under a sharp move.",
      tradeoff: "Cheaper counterparties may be weaker.",
      mitigation: "Use risk-approved counterparties; model collateral calls in fund liquidity planning.",
    },
    {
      risk: "Convertibility or transfer restrictions delay distributions regardless of hedging.",
      tradeoff: "Higher-return markets often carry this risk.",
      mitigation: "Price it in market prioritisation (Workstream 01); keep it visible; plan longer timelines for exits.",
    },
  ],
  timeline: {
    first90:
      "Currency map completed for every Africa position; first monthly dashboard; facility eligibility and terms verified with the internal owner; escalation triggers agreed with risk and finance.",
    months4to12:
      "FX analysis standardised in all IC papers; dashboard used monthly; at least one review of protection cost versus realised currency moves; lessons fed into pricing and market prioritisation.",
  },
  success: {
    looksLike:
      "No currency surprise reaches the CIO without having been on the dashboard first. IC members can see, for every deal, what currency risk remains and what it costs to reduce. No investee is pushed into a mismatch it cannot carry, and no customer is given currency risk they cannot bear.",
    assumptions: [
      "Investees can provide reliable monthly FX position data.",
      "Approved hedge counterparties exist for the main currencies at usable tenors.",
      "Facility terms are accessible to the Africa team through an internal owner.",
    ],
  },
  extras: [
    {
      id: "currency-map",
      title: "Where currency sits: the full chain",
      after: "before-acting",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Currency map from customer to fund investor (generic structure)",
          evidence: "proposed",
          columns: ["Level", "Typical currency", "Question I would ask", "Why it matters"],
          rows: [
            ["Investee assets (loan book, liquidity)", "Mostly local currency", "What share is in hard currency, and at what tenor?", "Determines natural matching capacity"],
            ["Investee liabilities (deposits, borrowings)", "Local deposits; mixed borrowings", "How much hard-currency debt is unhedged?", "Mismatch drives transaction and solvency risk"],
            ["Investee equity and earnings", "Local currency", "How sensitive are earnings and capital to depreciation?", "Drives translation risk for equity holders"],
            ["Fund investment and reporting", "Fund reporting currency", "How does unrealised FX flow into NAV?", "Affects reported performance and investor reporting"],
            ["Capital calls", "Fund currency", "When are calls timed against investee drawdowns?", "Idle cash and conversion timing risk"],
            ["Distributions and repayments", "Converted from local currency", "Can the investee obtain and transfer hard currency on time?", "Liquidity, convertibility and transfer risk"],
          ],
        },
      ],
    },
    {
      id: "five-risks",
      title: "Five currency risks, treated separately",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Currency risk types and the response each one needs",
          evidence: "proposed",
          columns: ["Risk", "What it is", "Who feels it", "Typical response", "What the response does not solve"],
          rows: [
            ["Translation", "Value of local-currency assets falls in reporting currency", "Fund (equity, LCU debt)", "Price depreciation into returns; partial hedge where affordable", "Does not change the investee's economics"],
            ["Transaction", "Cash flows in one currency, obligations in another", "Investee with hard-currency debt; fund on repayments", "Local-currency lending, matching, hedging", "Hedges leave basis and tenor gaps"],
            ["Liquidity", "Hard currency unavailable in the market when needed", "Investee and fund at repayment or exit", "Timing buffers, earlier conversion, longer exit planning", "Cannot create liquidity that does not exist"],
            ["Convertibility", "Legal or practical barrier to converting local currency", "Fund at repayment, dividend or exit", "Market prioritisation, political-risk cover where available", "Hedges may fail to settle"],
            ["Transfer", "Converted funds cannot leave the country", "Fund", "Contractual protections, onshore holding, patience", "Enforcement depends on authorities and counterparties"],
          ],
        },
      ],
    },
    {
      id: "protection-options",
      title: "Comparing protection options",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Protection options compared on cost, fit and residual risk",
          evidence: "proposed",
          columns: ["Option", "Best fit", "Cost", "Tenor / basis", "Counterparty and collateral", "Residual exposure"],
          rows: [
            ["Local-currency funding", "Debt to lenders with local-currency books", "Built into LCU pricing; fund bears FX", "Matches investee", "None at investee; fund-level if hedged", "Fund carries translation and transfer risk unless hedged"],
            ["Natural matching", "Investees with hard-currency assets or revenues", "Low", "Depends on asset tenor", "None", "Mismatch if assets run off faster than debt"],
            ["Hedging (forwards, swaps)", "Liquid currencies with approved counterparties", "Often high; tracks interest differentials", "Often shorter than loan; basis risk", "Counterparty credit; collateral calls", "Tenor tail, basis, counterparty failure"],
            ["Structured protections", "Negotiated cost-sharing or pricing bands", "Varies", "Contract-defined", "Investee capacity to pay", "Enforceability; may shift stress to investee"],
            ["Facility support", "Potentially relevant, subject to verified eligibility, capacity and terms", "Facility pricing", "Facility-defined", "Facility provider", "Capacity limits; does not remove all currency risk"],
          ],
          note: "Generic comparison. Actual costs and availability vary by currency, tenor and counterparty and must be quoted per transaction.",
        },
        {
          kind: "callout",
          tone: "risk",
          title: "Customer protection",
          text: "I would treat any plan to pass hard-currency exposure to low-income borrowers, for example USD-indexed micro-loans, as a responsible-finance issue requiring impact/ESG review before IC. Unaffordable FX exposure for vulnerable customers is not an acceptable way to make a deal work.",
          evidence: "proposed",
        },
      ],
    },
    {
      id: "treasury-escalation",
      title: "Treasury escalation flow",
      after: "gates",
      evidence: "proposed",
      blocks: [
        {
          kind: "flow",
          caption: "Proposed treasury escalation, to be aligned with firm risk policy",
          evidence: "proposed",
          steps: [
            { label: "Trigger detected", detail: "LCU move beyond the downside case, open position within 20% of limit, hedge roll failure or transfer delay" },
            { label: "Validate", detail: "Investment professional confirms data with investee within 2 working days" },
            { label: "Treasury review", detail: "Director of Africa, finance and investee CFO assess options within 5 working days" },
            { label: "Escalate", detail: "CIO and risk informed with options, costs and recommended action" },
            { label: "Act and record", detail: "Approved action executed; dashboard and IC record updated" },
          ],
        },
      ],
    },
  ],
  keywords: ["foreign exchange", "currency risk", "hedging", "cross-currency swap", "convertibility", "transfer risk", "open position", "local currency lending", "depreciation"],
};
