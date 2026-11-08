import type { Workstream } from "../types";

export const ws11: Workstream = {
  number: "11",
  slug: "follow-ons-recoveries-exits",
  title: "Refinancing, follow-ons, recoveries and exits",
  shortTitle: "Follow-ons & exits",
  category: "portfolio",
  alsoIn: ["capital"],
  tagline:
    "Planning the way out at entry, testing every follow-on, and recognising losses rather than funding them.",
  summary:
    "I would start exit planning at entry and review it each year against fund life, liquidity needs, regulatory approvals and realistic market depth. Each follow-on request would be tested as if it were a new investment, including the question of whether it funds a credible turnaround or postpones recognition of a loss. Distressed situations would follow a defined escalation path. I would treat contractual protections as only as strong as their enforceability and the counterparty's capacity to honour them.",
  outcome: {
    intended:
      "Every Africa investment has a documented, regularly reviewed exit or repayment route; follow-on decisions are made against explicit tests; and distressed situations are escalated early with options assessed rather than drift.",
    why:
      "In African financial-services markets, exit routes can be thin: few listed comparables, a limited number of strategic buyers, regulatory approval for change of control, and FX that erodes USD proceeds. If exit is considered only late in fund life, the fund may be forced to sell at a poor time or to an unsuitable buyer. Follow-ons are where concentration and sunk-cost bias most often build, so they need the same discipline as new deals.",
  },
  establishFirst: {
    data: [
      "Fund life, extension options and remaining investment period for each vehicle with Africa exposure.",
      "For each investee: instrument, maturity, exit rights (tag, drag, put, IPO rights), security, covenants and the documented exit thesis at entry.",
      "Latest valuations and the valuation policy, including how illiquidity and FX are reflected.",
      "Any pending follow-on requests, restructurings or watch-list cases.",
      "Regulatory requirements for transfers of shareholdings in regulated institutions in each relevant market, as advised by legal.",
    ],
    conversations: [
      "CIO and IC: appetite for follow-ons, approach to fund extensions and any secondary-sale considerations at fund level.",
      "Legal: enforceability of exit rights, security and guarantees in each jurisdiction, and practical timelines for enforcement.",
      "Investee boards and co-shareholders: their own horizons and intentions, which shape realistic exit routes.",
      "Finance: valuation and impairment processes, so loss recognition follows policy rather than negotiation.",
    ],
    constraints: [
      "Contractual protections such as puts or guarantees are subject to enforceability, local law and the counterparty's ability to pay; I would not treat them as certain value.",
      "Exit decisions, follow-ons and restructurings above defined thresholds are IC decisions.",
      "Mission and customer considerations at exit are weighed within the firm's policy; the firm's power to bind a buyer is limited.",
    ],
  },
  method: [
    {
      title: "Document the exit thesis at entry",
      detail:
        "Each IC paper would include the most likely exit or repayment route, two alternatives, the conditions each requires (scale, profitability, regulatory approval, buyer universe) and the timing against fund life. This makes the entry decision honest about liquidity and gives a baseline to review against.",
    },
    {
      title: "Review exit readiness annually",
      detail:
        "Each year, and at any major change, I would score exit readiness using the checklist below and update the expected route and timing. A widening gap between the expected exit date and fund life is escalated early, when options are still available.",
    },
    {
      title: "Compare routes on realistic evidence",
      detail:
        "For each position I would compare strategic sale, secondary sale to another investor, management or shareholder buyout where financially feasible, refinancing or scheduled repayment for debt, and restructuring where needed. The comparison uses realistic buyer universes, regulatory timelines and FX, not headline multiples.",
    },
    {
      title: "Test every follow-on as a new decision",
      detail:
        "A follow-on request is assessed against seven tests: is the original thesis still valid; what exactly will the funds be used for; what is the incremental return on the new money (not the blended position); what is the downside if it fails; what does it do to concentration; what alternatives exist (other investors, debt, slower growth); and does governance improve or at least hold? Prior investment is not a reason to invest more.",
    },
    {
      title: "Distinguish turnaround from delay",
      detail:
        "Funding a credible turnaround requires a specific plan, a capable management team or a change of management, milestones that can be verified within months, and a realistic path to repayment or value. If the request mainly covers losses or liquidity with no change in the drivers, it postpones recognition of a loss. I would say so explicitly in the recommendation and ensure valuation reflects reality.",
    },
    {
      title: "Escalate distress early and follow a defined path",
      detail:
        "When early-warning triggers from Workstream 07 indicate distress, I would follow the escalation path below: verify, stabilise, assess options, decide at IC, execute, and record lessons. Customer protection remains a constraint throughout, especially in restructurings of deposit-taking or lending institutions.",
    },
  ],
  deliverables: [
    { name: "Exit thesis section in each IC paper", description: "Primary route, alternatives, conditions and timing against fund life." },
    { name: "Annual exit-readiness review", description: "Checklist score, updated route and timing, actions (template below)." },
    { name: "Follow-on assessment memo", description: "Seven-test assessment with incremental-return analysis and recommendation." },
    { name: "Distressed-investment escalation path", description: "Defined steps, owners and decision points." },
  ],
  templates: [
    {
      kind: "table",
      caption: "Exit-readiness checklist for Illustrative FSP A (fictional)",
      evidence: "illustrative",
      columns: ["Item", "Status", "Evidence", "Action / owner"],
      rows: [
        ["Audited accounts, unqualified, last 3 years", "Ready", "Signed audit reports", "None"],
        ["Loan-book data reconciles to audited statements", "Partly ready", "Reconciliation shows 1.2% unexplained difference", "Investee CFO to resolve before next audit"],
        ["Governance: independent directors, functioning committees", "Ready", "Board and committee minutes", "None"],
        ["Regulatory approval route for change of control understood", "Not ready", "No legal memo yet", "Legal counsel memo; investment professional to commission"],
        ["Exit rights documented and enforceable", "Partly ready", "Tag and drag rights; put option enforceability uncertain", "Legal review of put enforceability"],
        ["Credible buyer universe identified", "Partly ready", "Three strategic and two financial candidates mapped", "Director of Africa to refresh annually"],
        ["Management succession and retention", "Not ready", "CEO is key person; no successor identified", "Board nomination committee; nominee director to raise"],
        ["Data room maintained by investee", "Not ready", "None", "Investee to build with TA support if eligible"],
        ["Tax and FX implications of exit assessed", "Partly ready", "Tax note from entry; FX not updated", "Finance and tax adviser update"],
        ["Customer and mission considerations documented", "Ready", "Impact review", "Impact team to update at exit"],
      ],
      note: "Fictional example. Status labels are text, not colour. Readiness informs timing; it does not decide the exit.",
    },
    {
      kind: "table",
      caption: "Exit and repayment route comparison (illustrative considerations)",
      evidence: "proposed",
      columns: ["Route", "When it fits", "Key dependencies", "Main risks"],
      rows: [
        ["Strategic sale", "Investee is attractive to a bank, insurer, telecom or regional FSP group", "Buyer appetite, regulatory change-of-control approval, price in USD after FX", "Few buyers; long approval; buyer may change customer focus"],
        ["Secondary sale to another investor", "Investee is growing but not ready for strategic sale; fund life is ending", "Secondary investor appetite for minority stakes in the market", "Discount to valuation; limited buyer pool"],
        ["Management or shareholder buyout", "Management or existing shareholders can finance the purchase", "Financing availability without overburdening the institution", "Price below fair value; leverage risk; conflicts"],
        ["Refinancing (debt)", "Investee can access cheaper or local funding at maturity", "Lender appetite, interest rates, local-currency liquidity", "Refinancing gap if markets tighten"],
        ["Scheduled repayment (debt)", "Cash generation supports amortisation", "Liquidity, FX availability for USD repayment", "Transfer or convertibility restrictions"],
        ["Restructuring", "Investee cannot meet obligations but has a viable core", "Creditor coordination, regulator engagement, management capacity", "Loss crystallisation; customer harm if poorly managed"],
        ["Put option / contractual exit", "Agreed at entry as a fallback", "Enforceability and counterparty's ability to pay", "Unenforceable or uncollectable when most needed"],
      ],
    },
  ],
  extras: [
    {
      id: "follow-on-tests",
      title: "Follow-on allocation tests: worked example",
      after: "method",
      evidence: "illustrative",
      blocks: [
        {
          kind: "table",
          caption: "Follow-on request from Illustrative FSP A: USD1.5m equity to fund branch expansion (fictional)",
          evidence: "illustrative",
          columns: ["Test", "Finding", "Assessment"],
          rows: [
            ["Thesis validity", "Core thesis (rural SME lending with strong collections) holding; PAR30 stable", "Pass"],
            ["Use of funds", "Six new branches; plan specifies cost and breakeven per branch", "Pass, subject to branch-economics evidence from existing branches"],
            ["Incremental return", "New money modelled at 1.4x MOIC base, 0.9x downside on the incremental capital alone", "Marginal; depends on branch breakeven assumption"],
            ["Downside", "If expansion fails, capital adequacy falls toward regulatory minimum", "Concern; requires staged funding"],
            ["Concentration", "Position would reach 92% of single-name limit", "Concern; leaves little room for future support"],
            ["Alternatives", "Local-currency debt available for part of the need; co-investor interest", "Explore before committing full amount"],
            ["Governance", "Board strong; branch-expansion committee proposed", "Pass"],
          ],
          note:
            "Illustrative recommendation: approve in two tranches, the second conditional on the first three branches reaching agreed milestones, and invite a co-investor to reduce concentration. Figures are fictional.",
        },
        {
          kind: "callout",
          tone: "risk",
          title: "Turnaround or postponed loss?",
          text:
            "If the same investee instead requested funds to cover operating losses, with no change in management, pricing or credit process, I would recommend against, ensure the valuation reflected the position and focus on recovery options. Supporting the request would increase the fund's exposure without changing the outcome.",
        },
      ],
    },
    {
      id: "distress-path",
      title: "Distressed-investment escalation path",
      after: "gates",
      evidence: "proposed",
      blocks: [
        {
          kind: "flow",
          caption: "Proposed escalation path (authorities to be confirmed during onboarding)",
          evidence: "proposed",
          steps: [
            { label: "Trigger", detail: "Early-warning indicator or covenant breach from monitoring" },
            { label: "Verify", detail: "Validate data, liquidity position and causes within days" },
            { label: "Escalate", detail: "Inform CIO; move to high-risk tier; inform risk and legal" },
            { label: "Stabilise", detail: "Liquidity plan, management engagement, customer protection" },
            { label: "Options", detail: "Recapitalisation, merger, sale, restructuring, orderly wind-down" },
            { label: "IC decision", detail: "Recommendation with downside and recovery analysis" },
            { label: "Execute and learn", detail: "Implement, update valuation, record lessons" },
          ],
        },
        {
          kind: "p",
          text:
            "Throughout, I would coordinate with other lenders and shareholders, keep the regulator's role in view for licensed institutions, and avoid actions that harm depositors or borrowers, such as abrupt withdrawal of funding that forces disorderly collections. Recovery expectations would be based on enforceable rights and realistic asset values, not on the face value of security.",
        },
      ],
    },
  ],
  ownership: {
    lead: [
      "Exit thesis at entry and annual exit-readiness reviews for Africa investments.",
      "Follow-on assessments and recommendations.",
      "Coordination of distressed situations within the agreed escalation path.",
    ],
    delegate: [
      "Readiness data gathering and buyer mapping to investment professionals.",
      "Legal enforceability reviews to legal counsel; valuation updates to finance under policy.",
    ],
    recommend: [
      "Exit timing, route and terms to IC.",
      "Follow-on amounts, structure and conditions to IC.",
      "Restructuring options to IC, with legal and risk input.",
    ],
    escalate: [
      "Any investee entering the high-risk tier, to the CIO immediately.",
      "Any expected exit date beyond fund life, to the CIO and fund management.",
      "Any request to defer impairment or valuation changes, to finance and the CIO.",
    ],
    dependencies: [
      { party: "Investment Committee", need: "Decisions on exits, follow-ons and restructurings." },
      { party: "Legal", need: "Enforceability of rights, regulatory approvals and restructuring mechanics." },
      { party: "Finance / valuation", need: "Valuation and impairment under policy." },
      { party: "Risk", need: "Concentration and downside assessment." },
      { party: "Investee boards and co-investors", need: "Coordination on exit and restructuring." },
    ],
  },
  gates: [
    {
      gate: "Follow-on approval",
      proceedIf: "All seven tests are passed or concerns have specific mitigants such as tranching or co-investment.",
      deferOrDeclineIf: "Thesis invalidated, funds cover losses without changes in drivers, concentration limit breached, or governance weakening.",
    },
    {
      gate: "Exit execution",
      proceedIf: "Route and price are supported by evidence; regulatory approvals obtainable; customer considerations assessed.",
      deferOrDeclineIf: "Price materially below fair value with time remaining in fund life; buyer raises serious integrity or customer-protection concerns.",
    },
    {
      gate: "Restructuring agreement",
      proceedIf: "Credible plan with viable core business; creditor and regulator alignment; customer protection maintained.",
      deferOrDeclineIf: "No viable core; restructuring only defers loss; terms would harm customers or depositors.",
    },
  ],
  cadence: [
    "Annual: exit-readiness review per investee, summarised for the CIO.",
    "Quarterly: debt maturities and refinancing risk in the portfolio review.",
    "Per request: follow-on assessment memo within agreed timelines.",
    "Event-driven: distress escalation path.",
  ],
  kpis: [
    {
      name: "Exit thesis coverage",
      definition: "Share of Africa investments with a documented, reviewed exit or repayment route.",
      source: "IC papers; annual review",
      owner: "Director of Africa",
      frequency: "Annual",
      threshold: "Proposed: 100%",
    },
    {
      name: "Exit timing gap",
      definition: "Positions whose expected exit date is beyond remaining fund life.",
      source: "Exit-readiness reviews; fund documents",
      owner: "Director of Africa",
      frequency: "Annual",
      threshold: "Proposed: any case escalated to the CIO",
    },
    {
      name: "Follow-on discipline",
      definition: "Share of follow-on approvals with a completed seven-test memo and incremental-return analysis.",
      source: "IC records",
      owner: "Director of Africa",
      frequency: "Per decision",
      threshold: "Proposed: 100%",
    },
    {
      name: "Debt refinancing risk",
      definition: "Share of debt maturities in the next 12 months without an identified repayment or refinancing source.",
      source: "Investee liquidity plans",
      owner: "Investment professional per investee",
      frequency: "Quarterly",
      threshold: "Proposed: flag any unidentified source six months before maturity",
    },
  ],
  risks: [
    {
      risk: "Sunk-cost bias drives follow-ons into failing positions.",
      tradeoff: "Supporting investees through difficulty versus protecting the fund.",
      mitigation: "Seven-test memo; incremental-return analysis; independent challenge at IC.",
    },
    {
      risk: "Exit planned too late, forcing a sale at the end of fund life.",
      tradeoff: "Holding for value growth versus liquidity certainty.",
      mitigation: "Exit thesis at entry; annual readiness review; early escalation of timing gaps.",
    },
    {
      risk: "Over-reliance on contractual protections that prove unenforceable.",
      tradeoff: "Negotiating protections versus pricing risk realistically.",
      mitigation: "Legal enforceability review; valuation does not assume full value of protections.",
    },
  ],
  timeline: {
    first90:
      "Exit thesis and readiness status reviewed for each Africa investment; maturities and refinancing risks listed; any pending follow-ons assessed under the seven tests; distress escalation path agreed with the CIO.",
    months4to12:
      "Annual readiness reviews complete; exit timing gaps escalated with options; follow-on and exit recommendations made to IC on documented evidence; lessons from any restructurings recorded.",
  },
  success: {
    looksLike:
      "No Africa position reaches the end of fund life without a planned route, follow-on decisions are visibly disciplined, and distressed situations are identified and escalated while options remain.",
    assumptions: [
      "Fund documents and exit rights are accessible for review.",
      "Legal can provide enforceability views per jurisdiction.",
      "IC supports tranching and conditions on follow-ons.",
    ],
  },
  keywords: ["exit", "divestment", "secondary", "MBO", "trade sale", "restructuring", "workout", "recovery", "refinancing", "follow-on", "put option", "drag along", "tag along"],
};
