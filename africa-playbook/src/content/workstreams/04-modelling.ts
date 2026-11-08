import type { Workstream } from "../types";

export const ws04: Workstream = {
  number: "04",
  slug: "modelling-valuation-downside",
  title: "Modelling, valuation and downside protection",
  shortTitle: "Modelling & valuation",
  category: "investment",
  alsoIn: ["capital"],
  tagline:
    "A linked model built for regulated financial institutions, valuation from several angles, and returns tested under stress.",
  summary:
    "I would require a linked earnings, balance sheet and cash-flow model that treats the loan book, funding and regulatory capital as the drivers they are, rather than applying generic SME cash-flow logic. Valuation would be triangulated across price-to-book, price-to-earnings, dividend-based methods and transaction evidence, with a clear statement of when each method does not apply. Returns would be shown in base, downside and stress cases in US dollars after FX, dilution and costs, and the IC paper would separate accounting profit from cash we can actually receive.",
  outcome: {
    intended:
      "Models and valuations the IC can rely on: internally consistent, driven by the right variables, transparent about assumptions, and showing how the investment performs when things go wrong.",
    why:
      "In a financial institution, profit, capital and liquidity are tightly linked. Growth consumes capital; credit losses hit profit and capital at once; funding costs move with the market. A model that projects profit without capital constraints will overstate dividend capacity and understate equity needs. In local-currency investments, a strong LCU result can still be a weak USD return, so FX has to be in the model, not added afterwards.",
  },
  establishFirst: {
    data: [
      "The firm's standard model templates and IC return metrics (gross or net, USD or LCU, required hurdle rates by instrument).",
      "Investee historical financials (at least three years audited), regulatory returns and management accounts.",
      "Regulatory capital and liquidity rules for the institution type in each market.",
      "Market data: FX history and forward points where available, sovereign yields, comparable listed valuations and transaction evidence.",
    ],
    conversations: [
      "CIO: preferred valuation conventions, hurdle rates and how downside cases are expected to be defined.",
      "Finance or fund valuation team: valuation policy for portfolio reporting, so entry valuation is consistent with later fair-value marks.",
      "Treasury or FX facility contacts: realistic hedging assumptions and costs.",
      "Investee CFO: business-plan assumptions and the evidence behind them.",
    ],
    constraints: [
      "Hurdle rates and target returns are set by the firm; I would apply them, not set them.",
      "Comparable and transaction data in frontier markets is thin and must be adjusted, not used mechanically.",
      "Model outputs inform judgement; they do not override mandate, integrity or customer-protection gates.",
    ],
  },
  method: [
    {
      title: "Build or review a linked three-statement model",
      detail:
        "The model starts with the loan book: disbursements, repayments, arrears migration, write-offs and yield. These drive interest income and credit cost. Funding (deposits, borrowings, equity) is sized to the balance sheet, and its cost drives interest expense. Regulatory capital and liquidity are calculated each period, and the model flags any breach. Cash flow is derived, not assumed. This is the structure that shows whether a growth plan is fundable.",
    },
    {
      title: "Stress the drivers that matter",
      detail:
        "I would run downside and stress cases that move credit losses, funding costs, deposit or borrowing outflows, operating expenses, FX and capital requirements together, because in practice they move together. The question each case answers is specific: how much capital would the institution need, could it still service its debt, and what would our investment be worth?",
    },
    {
      title: "Triangulate valuation",
      detail:
        "For a profitable deposit-taker, price-to-book (adjusted for return on equity and asset quality) is often the anchor, cross-checked by price-to-earnings and a dividend discount model where distributions are realistic. For a growth fintech, earnings multiples may be meaningless and revenue or transaction evidence becomes more relevant, with heavier adjustment. I would show the range, explain the weighting, and state the entry price implied by each method.",
    },
    {
      title: "Calculate returns in the fund's currency",
      detail:
        "Equity returns are shown as MOIC and IRR in USD, after transaction costs, expected dilution, follow-on needs, exit costs and FX. Debt returns are shown as all-in yield including fees, alongside debt service coverage under each case. I would separate realised cash (dividends, interest, repayments) from paper value.",
    },
    {
      title: "Separate accounting profit from distributable cash",
      detail:
        "Reported profit can be largely retained by regulatory capital needs, restricted by dividend rules or tied up in non-cash items. I would show, year by year, how much of the institution's profit could actually be distributed, and our share in USD, so the IC does not mistake earnings for liquidity.",
    },
    {
      title: "Review the model before it goes to IC",
      detail:
        "A second team member reviews every model against a checklist (below) before the IC paper is finalised. This is a basic control. It also builds modelling discipline across the team.",
    },
  ],
  deliverables: [
    { name: "Linked FSP model", description: "Earnings, balance sheet, cash flow, loan book, funding and regulatory capital with base, downside and stress cases." },
    { name: "Valuation triangulation", description: "Methods, inputs, adjustments, implied entry price range and weighting rationale." },
    { name: "Returns summary", description: "Equity MOIC/IRR and debt yield/coverage by case, in USD, after costs and FX." },
    { name: "Model-review checklist", description: "Completed and signed by the reviewer before IC." },
    { name: "IC decision table", description: "One-page summary of returns, risks and the gates that apply; example below." },
  ],
  templates: [
    {
      kind: "table",
      caption: "Equity returns for Illustrative FSP A under three cases (fictional)",
      evidence: "illustrative",
      columns: ["Input or output", "Base", "Downside", "Stress"],
      rows: [
        ["Entry investment (USD)", "5.0m", "5.0m", "5.0m"],
        ["Ownership", "25%", "25%", "25%"],
        ["Exit-year net income (LCU)", "400m", "300m", "150m"],
        ["Exit P/E", "8.0x", "6.0x", "5.0x"],
        ["Equity value at exit (LCU)", "3,200m", "1,800m", "750m"],
        ["Exit costs", "2%", "3%", "4%"],
        ["Cumulative LCU depreciation", "20%", "35%", "60%"],
        ["Exit FX (LCU per USD, from 100)", "120", "135", "160"],
        ["Holding period", "5 years", "6 years", "7 years"],
        ["Proceeds (USD)", "6.533m", "3.233m", "1.125m"],
        ["MOIC", "1.307x", "0.647x", "0.225x"],
        ["Annualised return", "5.50%", "-7.0%", "-19.2%"],
      ],
      note: "Proceeds = equity value × ownership × (1 − exit costs) ÷ exit FX. Base: 3,200 × 25% × 98% ÷ 120 = 6.533. Annualised return = MOIC^(1/years) − 1, valid only for a single outflow and single inflow; it is not a general IRR. No dividends, dilution, taxes or fees are included. The same base case can be edited in the Decision Lab.",
    },
    {
      kind: "table",
      caption: "Compact IC decision table (fictional)",
      evidence: "illustrative",
      columns: ["Item", "Equity option", "Senior debt option"],
      rows: [
        ["Instrument", "USD5.0m for 25% minority stake", "USD3.0m senior loan, 4 years, 9.0% fixed, 1.0% fee, bullet"],
        ["Base return", "1.307x MOIC, 5.50% annualised", "9.31% all-in yield"],
        ["Downside return", "0.647x, -7.0%", "9.22% if extended two years at same coupon, no fee"],
        ["Stress return", "0.225x, -19.2%", "-6.7% if interest stops in year 3 and 60% is recovered in year 4"],
        ["Main driver of loss", "FX and multiple compression", "Credit loss and FX on the institution's ability to service USD debt"],
        ["Hurdle comparison", "Below the fund's hurdle in base case (to be confirmed)", "Compare to fund debt hurdle and FX cost"],
        ["Open red flags", "PAR understated; related-party exposure", "Same; plus funding concentration"],
        ["Gates that apply", "Integrity, mandate, customer protection: no override", "Same"],
        ["Recommendation framing", "Not recommended at this price; revisit valuation or structure", "Proceed to term sheet only if FX risk to the borrower is addressed"],
      ],
      note: "Debt yields computed as IRR of cash flows: −0.99 at drawdown (after 1% fee), 0.09 annual coupons, 1.00 principal at maturity. Base IRR 9.31%. Fictional and not investment guidance.",
    },
  ],
  extras: [
    {
      id: "model-specification",
      title: "Linked model specification",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Minimum structure of an FSP model",
          evidence: "proposed",
          columns: ["Module", "Key drivers", "Links to", "Typical error to avoid"],
          rows: [
            ["Loan book", "Disbursements, tenor, repayment, yield, arrears migration, write-offs", "Interest income, credit cost, risk-weighted assets", "Flat yield and flat PAR regardless of growth"],
            ["Funding", "Deposits, wholesale borrowing, equity; maturity and pricing", "Interest expense, liquidity, FX exposure", "Funding plugged at a constant cost"],
            ["Earnings", "Net interest income, fees, credit cost, operating expenses, tax", "Retained earnings, dividend capacity", "Operating costs growing slower than the branch network"],
            ["Balance sheet", "Assets, liabilities, equity", "Capital ratios", "Balance sheet that does not balance without a plug"],
            ["Regulatory capital", "Capital definition, risk weights, minimum ratios and buffers", "Equity need, dividend restriction", "Ignoring capital needed to fund growth"],
            ["Liquidity", "Liquid assets, deposit run-off, maturities", "Stress survival period", "No deposit stress"],
            ["FX", "Currency of assets, liabilities and investor flows", "USD returns, open position", "Converting results at today's rate"],
            ["Returns", "Entry, follow-ons, dividends, exit; fees and costs", "IC metrics", "Ignoring dilution and transaction costs"],
          ],
          note: "Generic SME cash-flow logic (EBITDA-based debt capacity, working capital cycles) does not transfer to regulated FSPs without modification, because lending assets and funding are the business itself.",
        },
      ],
    },
    {
      id: "valuation-triangulation",
      title: "Valuation triangulation",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Valuation methods and when they are unsuitable",
          evidence: "proposed",
          columns: ["Method", "Best used for", "Key adjustment", "Unsuitable when"],
          rows: [
            ["Price-to-book (P/B)", "Profitable, regulated lenders and deposit-takers", "Return on equity vs cost of equity; asset quality; provisioning adequacy", "Book value is unreliable (under-provisioning) or the business is asset-light"],
            ["Price-to-earnings (P/E)", "Stable, profitable institutions", "Normalise credit cost and one-offs; growth", "Earnings are negative, volatile or depressed by investment"],
            ["Dividend discount / DCF to equity", "Institutions with realistic distribution capacity", "Capital retention needs; cost of equity including country risk", "Distributions are implausible for many years, or inputs are highly uncertain"],
            ["Transaction evidence", "Cross-check against recent deals", "Market, size, growth, asset quality, control vs minority, date", "Few comparable deals; terms not disclosed; different market conditions"],
            ["Revenue or user multiples", "Early fintechs without stable earnings", "Contribution margin, retention, net revenue", "Used as a substitute for unit economics"],
          ],
        },
        {
          kind: "table",
          caption: "Entry price cross-check for Illustrative FSP A (fictional)",
          evidence: "illustrative",
          columns: ["Measure", "Value", "Calculation"],
          rows: [
            ["Implied post-money equity value", "USD20.0m (LCU2,000m at 100)", "USD5.0m ÷ 25%"],
            ["Book equity post-money", "LCU1,600m", "Assumed, after adjusting provisions"],
            ["Implied entry P/B", "1.25x", "2,000 ÷ 1,600"],
            ["Current net income", "LCU200m", "Assumed, normalised"],
            ["Implied entry P/E", "10.0x", "2,000 ÷ 200"],
            ["Net income growth to year 5", "14.9% a year", "(400 ÷ 200)^(1/5) − 1"],
            ["Exit P/E vs entry", "8.0x vs 10.0x", "Multiple compression assumed in base case"],
          ],
        },
      ],
    },
    {
      id: "profit-vs-cash",
      title: "Accounting profit versus distributable cash",
      after: "deliverables",
      evidence: "illustrative",
      blocks: [
        {
          kind: "table",
          caption: "Year-5 distributable cash bridge for Illustrative FSP A (fictional)",
          evidence: "illustrative",
          columns: ["Line", "LCU m", "Note"],
          rows: [
            ["Reported net income", "400", "As in base case"],
            ["Less: capital retained to support loan growth", "-220", "To keep capital ratio above minimum plus buffer"],
            ["Less: non-cash and unrealised gains", "-30", "e.g. revaluation gains"],
            ["Maximum distributable", "150", "Subject to regulator and board approval"],
            ["Our 25% share (LCU)", "37.5", "150 × 25%"],
            ["Our share in USD at 120", "0.31m", "37.5 ÷ 120 = 0.3125"],
          ],
          note: "Interim dividends are excluded from the simple Decision Lab calculator and would require a multi-cash-flow IRR in a full model.",
        },
        {
          kind: "table",
          caption: "Model-review checklist",
          evidence: "proposed",
          columns: ["Check", "Reviewer confirms"],
          rows: [
            ["Balance sheet balances every period without a plug", "Yes / No / Exception noted"],
            ["Historical years reconcile to audited accounts", "Yes / No / Exception noted"],
            ["Loan book drives income and credit cost", "Yes / No / Exception noted"],
            ["Regulatory capital and liquidity calculated and breaches flagged", "Yes / No / Exception noted"],
            ["FX applied period by period to investor flows", "Yes / No / Exception noted"],
            ["Dilution, transaction costs, follow-ons and exit costs included", "Yes / No / Exception noted"],
            ["Downside and stress cases move correlated drivers together", "Yes / No / Exception noted"],
            ["Key assumptions sourced and dated", "Yes / No / Exception noted"],
            ["Outputs in IC paper match the model", "Yes / No / Exception noted"],
          ],
        },
        {
          kind: "table",
          caption: "Effect of items the simple calculator excludes (fictional, base case)",
          evidence: "illustrative",
          columns: ["Adjustment", "Proceeds (USD)", "MOIC", "Annualised"],
          rows: [
            ["Base case as calculated", "6.533m", "1.307x", "5.50%"],
            ["No LCU depreciation (FX flat at 100)", "7.840m", "1.568x", "9.41%"],
            ["Diluted to 22% by a round we do not join", "5.749m", "1.150x", "2.83%"],
            ["Entry transaction costs of USD0.1m added to outlay", "6.533m", "1.281x on 5.1m", "5.08%"],
          ],
          note: "FX drag in the base case is 7.840 − 6.533 = USD1.307m. Dilution: 6.533 × 22/25 = 5.749.",
        },
      ],
    },
  ],
  ownership: {
    lead: [
      "Model structure, key assumptions and case design for each transaction.",
      "Valuation judgement and the returns narrative in the IC paper.",
    ],
    delegate: [
      "Model build and updates to investment professionals.",
      "Independent model review to a team member not on the deal, or to a shared-function colleague.",
    ],
    recommend: [
      "Entry valuation range and pricing to the IC.",
      "Case definitions to the CIO where firm conventions do not already set them.",
    ],
    escalate: [
      "Any model showing a regulatory capital or liquidity breach in the base case.",
      "Any case where a return clears the hurdle only because of an assumption I cannot evidence.",
    ],
    dependencies: [
      { party: "CIO", need: "Hurdle rates, return conventions and case definitions." },
      { party: "Finance / valuation", need: "Consistency with the fund valuation policy." },
      { party: "Treasury / FX facility", need: "Realistic FX and hedging assumptions." },
      { party: "Investee CFO", need: "Business plan and supporting data." },
    ],
  },
  gates: [
    {
      gate: "Model ready for IC",
      proceedIf: "Review checklist complete with no unresolved exceptions; historical years reconcile; all three cases presented.",
      deferOrDeclineIf: "Model does not balance or reconcile; capital breach unaddressed; FX not modelled.",
    },
    {
      gate: "Valuation supports recommendation",
      proceedIf: "Entry price sits within the triangulated range and base-case return meets the hurdle on evidenced assumptions.",
      deferOrDeclineIf: "Price is supported only by one method or by unevidenced growth; downside loss is not acceptable for the fund's risk appetite.",
    },
  ],
  cadence: [
    "Per transaction: model built during core diligence, reviewed before IC.",
    "Annually per equity investee: model refreshed with actuals and valuation reviewed.",
    "Quarterly: FX and key-driver sensitivities refreshed for portfolio reporting.",
  ],
  kpis: [
    {
      name: "Model review completion",
      definition: "Share of IC submissions with a completed, signed model-review checklist.",
      source: "IC files",
      owner: "Director of Africa",
      frequency: "Per IC",
      threshold: "Proposed: 100%",
    },
    {
      name: "Forecast accuracy",
      definition: "Actual vs underwritten net income, PAR and capital ratio after 12 and 24 months.",
      source: "Investee reporting; original model",
      owner: "Investment professional",
      frequency: "Annually",
      threshold: "Variance over 25% triggers a look-back on assumptions",
    },
    {
      name: "Distributable cash vs plan",
      definition: "Dividends or interest received vs underwritten amounts.",
      source: "Fund records",
      owner: "Director of Africa",
      frequency: "Annually",
      threshold: "Shortfall triggers portfolio review",
    },
  ],
  risks: [
    {
      risk: "Precision in the model hides uncertainty in the inputs.",
      tradeoff: "Detail versus transparency.",
      mitigation: "Few, sourced drivers; ranges and cases presented, not single numbers.",
    },
    {
      risk: "FX is treated as a sensitivity rather than a core driver.",
      tradeoff: "Simplicity versus realism.",
      mitigation: "FX path modelled in base case; returns shown with and without depreciation.",
    },
    {
      risk: "Comparable valuations from other markets are applied without adjustment.",
      tradeoff: "Having some evidence versus having relevant evidence.",
      mitigation: "Explicit adjustments for market, asset quality, size and minority status; transaction dates shown.",
    },
  ],
  timeline: {
    first90:
      "Existing model templates reviewed against the FSP specification; review checklist introduced; models for any IC-stage deals reviewed.",
    months4to12:
      "Template enhancements agreed with the CIO; forecast-accuracy look-back for recent investments; team modelling standards embedded through review.",
  },
  success: {
    looksLike:
      "The IC sees consistent, reviewed models that show downside clearly and in USD. Valuation debates are about evidence and judgement, not about errors.",
    assumptions: [
      "The firm's templates can be extended to the specification without disrupting fund reporting.",
      "Sufficient historical data is available from investees.",
      "FX and comparable data can be obtained at reasonable cost.",
    ],
  },
  keywords: ["financial model", "valuation", "P/B", "P/E", "DCF", "dividend discount", "MOIC", "IRR", "yield", "stress test", "capital adequacy", "dilution"],
};
