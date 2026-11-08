import type { Workstream } from "../types";

export const ws01: Workstream = {
  number: "01",
  slug: "strategy-and-capital-allocation",
  title: "Africa strategy and capital allocation",
  shortTitle: "Strategy & allocation",
  category: "capital",
  alsoIn: ["investment"],
  tagline:
    "A mandate-led way to decide where to spend attention and capital, and to show the trade-offs each quarter.",
  summary:
    "I would start from what each fund can actually do (eligibility, available capital, concentration limits, investment period and return requirements) before forming any view on markets. Markets and sectors would be ranked with a transparent weighted matrix, but no score can override a hard-stop screen. Each quarter I would put a short capital-allocation memo to the CIO showing exposure, follow-on reserves, pacing and downside liquidity, so allocation decisions are made deliberately rather than by whichever deal arrives first.",
  outcome: {
    intended:
      "An agreed, evidence-based view of where the Africa team should spend its origination effort and how much capital it can responsibly deploy, refreshed each quarter and traceable to the fund mandates.",
    why:
      "A small regional team cannot cover a continent. Without an explicit allocation logic, pipeline follows relationships and inbound flow, concentration builds unnoticed, and follow-on reserves get consumed by new deals. A written, mandate-led process lets the CIO and Investment Committee see the trade-offs before they are locked in, and gives the team a defensible reason to say no.",
  },
  establishFirst: {
    data: [
      "Fund documents for each vehicle with Africa exposure: eligible geographies, eligible institution types, instrument permissions, single-name, country and currency concentration limits, investment and follow-on periods, and any exclusion list.",
      "Current portfolio exposure by fund, country, currency, instrument and investee, at cost and at latest valuation, with the date of each figure.",
      "Committed but undrawn amounts, approved-not-closed transactions and indicative follow-on needs flagged by investees.",
      "The firm's existing market views, prior country papers and any deals declined for market reasons, so I build on institutional memory rather than restart it.",
      "Team capacity: how many live transactions and portfolio companies each investment professional can carry well, and which specialist functions are shared with Oslo.",
    ],
    conversations: [
      "CIO: return expectations, risk appetite, and how Africa fits the firm-wide portfolio construction.",
      "CEO and fundraising leads: what investors were told about Africa deployment and themes, so the strategy does not contradict commitments made to limited partners.",
      "Risk and legal: sanctions, licensing and foreign-ownership constraints by market; any markets already ruled out and why.",
      "Impact/ESG and TA teams: where the themes and TA capacity are strongest, and where responsible-finance concerns would weigh against expansion.",
      "The Nairobi team and current investees: what they observe about competition, regulation and funding conditions that does not appear in desk research.",
    ],
    constraints: [
      "Allocation percentages are a CIO and Investment Committee decision informed by fund data I do not yet have; I would not propose numbers before seeing it.",
      "Some markets may be excluded by mandate, regulation or sanctions regardless of attractiveness.",
      "Fund V's actual Africa allocation, theme weightings and investor side letters must be reviewed; public descriptions are not a substitute.",
    ],
  },
  method: [
    {
      title: "Map the mandate before the market",
      detail:
        "I would build a one-page constraint sheet per fund: where it may invest, in what, how much per name and per country, until when, and at what return. This turns the question from 'which markets are attractive?' into 'which attractive options can this fund actually take?', and it surfaces conflicts early, for example a strong pipeline in a market where the fund is already near its country limit.",
    },
    {
      title: "Apply hard-stop screens first",
      detail:
        "Before scoring, each candidate market passes or fails a short list of non-negotiable screens: mandate eligibility, sanctions and legal restrictions, a viable regulatory route for a foreign minority investor in the relevant institution type, and the ability to repatriate capital. A market that fails a screen is not ranked at all. This prevents the common error of letting a high score argue for an exception.",
    },
    {
      title: "Score the remaining markets transparently",
      detail:
        "I would use a weighted matrix (below, and as an editable tool in the Decision Lab) covering market depth and investable institutions, regulatory clarity, financial exclusion, competitive intensity, FX and convertibility, exit routes, deployment feasibility from Nairobi, macro risk and the consumer-protection environment. Weights are set with the CIO and sum to 100. Each score must cite its evidence and its date; a criterion without evidence is recorded as missing, and the market is shown as incomplete rather than quietly scored zero.",
    },
    {
      title: "Separate country risk from investee risk",
      detail:
        "A difficult market can contain an excellent institution, and a strong market can contain a weak one. Country scores decide where to look and how much aggregate exposure to accept; they do not approve investments. Investee-level diligence (Workstream 03) decides whether to invest. I would keep the two visibly separate in IC papers so that a country view never substitutes for institution-level evidence.",
    },
    {
      title: "Translate priorities into coverage, not targets",
      detail:
        "The output is a coverage plan: which markets and segments get active origination, which get opportunistic review, and which are monitored only. I would avoid deployment targets per market until pipeline quality and fund data justify them, because targets set in advance tend to pull marginal deals through.",
    },
    {
      title: "Report allocation quarterly and revisit triggers",
      detail:
        "Each quarter I would send a short memo showing exposure against limits, follow-on reserve, pacing against the investment period, downside liquidity and concentration implications of the live pipeline. The memo also lists what new evidence would change priorities, for example a regulatory change, an FX regime shift, or a sustained loss of deal flow in a priority market.",
    },
  ],
  deliverables: [
    {
      name: "Fund constraint sheets",
      description: "One page per fund with Africa exposure: eligibility, limits, periods, returns, exclusions. Reviewed by legal and the CIO.",
    },
    {
      name: "Market prioritisation matrix",
      description: "Weighted scoring with hard-stop screens, evidence citations and dates; editable version in the Decision Lab.",
    },
    {
      name: "Coverage plan",
      description: "Active, opportunistic and monitor-only markets and segments, with the reasoning and the evidence that would change it.",
    },
    {
      name: "Quarterly capital-allocation memo",
      description: "Two to three pages to the CIO; template below.",
    },
  ],
  templates: [
    {
      kind: "table",
      caption: "Market prioritisation matrix (illustrative weights and scores, 1–5 scale)",
      evidence: "illustrative",
      columns: ["Criterion", "Weight", "Kenya", "Uganda", "Tanzania", "Ghana", "Côte d'Ivoire"],
      rows: [
        ["Hard-stop screens (mandate, sanctions, regulatory route, repatriation)", "Pass/fail", "Pass", "Pass", "Pass", "Pass", "Not yet confirmed"],
        ["Market depth and investable FSPs", "15", "4", "3", "3", "3", "3"],
        ["Regulatory clarity for minority investors", "12", "4", "3", "3", "3", "Missing"],
        ["Financial exclusion (need)", "12", "3", "4", "4", "3", "4"],
        ["Competitive intensity for capital (higher = more room)", "8", "2", "3", "3", "3", "3"],
        ["FX and convertibility", "15", "3", "3", "3", "2", "4"],
        ["Exit and refinancing routes", "10", "3", "2", "2", "3", "2"],
        ["Deployment feasibility from Nairobi", "10", "5", "4", "4", "2", "2"],
        ["Macro and sovereign risk (higher = lower risk)", "10", "3", "3", "3", "2", "3"],
        ["Consumer-protection environment", "8", "3", "3", "3", "3", "Missing"],
        ["Weighted score (out of 100)", "100", "67.8", "62.4", "62.4", "53.0", "Incomplete"],
      ],
      note:
        "Scores are placeholders for a worked example, not a market assessment, and must not be read as a view on any country. Weighted score = Σ(weight × score) ÷ 5. Côte d'Ivoire is shown as 'Incomplete' because a screen is unconfirmed and two criteria lack evidence; it is not ranked last. The candidate list is for research only and implies no approved expansion.",
    },
    {
      kind: "table",
      caption: "Quarterly capital-allocation memo: structure and example entries",
      evidence: "illustrative",
      columns: ["Section", "What it shows", "Example entry (fictional)"],
      rows: [
        ["1. Exposure vs limits", "Cost and fair value by fund, country, currency, instrument and single name, against each limit", "Country A at 78% of its country limit; largest single name at 61% of limit"],
        ["2. Follow-on reserve", "Reserved amount vs indicated follow-on needs over 24 months", "Reserve covers 1.3x indicated needs; one investee may request a capital injection in H2"],
        ["3. Pacing", "Committed and closed vs remaining investment period", "Investment period has 30 months remaining; current pace leaves room for 3–4 new positions, subject to pipeline quality"],
        ["4. Downside liquidity", "Cash needed if two largest exposures need support simultaneously", "Combined support case absorbs 40% of reserve; still within limits"],
        ["5. Pipeline concentration", "Effect on limits if all IC-stage deals close", "Two IC-stage deals in Country A would breach the country limit; sequencing or syndication required"],
        ["6. Changes to priorities", "Evidence received this quarter and its effect", "New capital-adequacy rule in Country B raises equity need for deposit-takers; moved to active coverage"],
        ["7. Decisions requested", "What the CIO is asked to decide", "Confirm whether to syndicate part of Deal X to stay within limits"],
      ],
      note: "All figures fictional. Real limits and reserves would come from fund documents and the latest valuation.",
    },
  ],
  ownership: {
    lead: [
      "Building the market evidence base and the prioritisation matrix for Africa.",
      "Drafting the coverage plan and the quarterly capital-allocation memo.",
      "Keeping the Nairobi team's origination effort aligned to agreed priorities.",
    ],
    delegate: [
      "Data collection for market scoring and exposure reporting to investment professionals, with a named owner per market.",
      "Exposure reconciliation against fund administration records to the finance or fund operations function.",
    ],
    recommend: [
      "Market priorities, coverage levels and criterion weights to the CIO.",
      "Any proposed change to country or sector exposure appetite to the Investment Committee.",
    ],
    escalate: [
      "Any pipeline that would breach a concentration limit, to the CIO before further work.",
      "Any sign that a market has become restricted (sanctions, licensing, capital controls), to risk and legal immediately.",
    ],
    dependencies: [
      { party: "CIO", need: "Return targets, risk appetite and final say on priorities and weights." },
      { party: "Investment Committee", need: "Approval of material changes to market or sector appetite." },
      { party: "Legal and risk", need: "Mandate interpretation, sanctions and regulatory route per market." },
      { party: "Fund operations / finance", need: "Exposure and reserve data reconciled to fund records." },
      { party: "Impact/ESG", need: "Theme alignment and responsible-finance environment inputs." },
    ],
  },
  gates: [
    {
      gate: "Market enters active coverage",
      proceedIf: "All hard-stop screens pass, evidence exists for every criterion, and the CIO agrees coverage is affordable given team capacity.",
      deferOrDeclineIf: "Any screen fails or is unconfirmed; the regulatory route for a minority foreign investor is unclear; or the team cannot cover it without weakening portfolio oversight.",
    },
    {
      gate: "Pipeline deal proceeds past screening in a priority market",
      proceedIf: "The deal fits within remaining concentration headroom, including other IC-stage deals.",
      deferOrDeclineIf: "Closing it would breach a limit and no syndication or sequencing solution is agreed in advance.",
    },
    {
      gate: "Follow-on reserve released for new investment",
      proceedIf: "Indicated follow-on needs are covered under a downside case and the CIO approves the release.",
      deferOrDeclineIf: "Any investee is on watch or high-risk tier with a plausible capital need.",
    },
  ],
  cadence: [
    "Monthly: exposure and pipeline concentration check within the team pipeline meeting.",
    "Quarterly: capital-allocation memo to the CIO; priorities refreshed if triggers met.",
    "Annually: full market re-scoring with updated evidence, aligned to firm strategy planning.",
  ],
  kpis: [
    {
      name: "Exposure headroom",
      definition: "Remaining capacity under each country, currency and single-name limit, including IC-stage pipeline.",
      source: "Fund administration records; pipeline CRM",
      owner: "Director of Africa (prepared by investment professional)",
      frequency: "Monthly",
      threshold: "Flag to CIO at 80% of any limit",
    },
    {
      name: "Follow-on reserve coverage",
      definition: "Reserve ÷ follow-on needs indicated or modelled over 24 months under a downside case.",
      source: "Portfolio models; investee business plans",
      owner: "Director of Africa",
      frequency: "Quarterly",
      threshold: "Below 1.0x triggers review before new commitments",
    },
    {
      name: "Pipeline share in priority markets",
      definition: "Share of qualified opportunities from active-coverage markets.",
      source: "Pipeline CRM",
      owner: "Investment professionals",
      frequency: "Quarterly",
      threshold: "Planning hypothesis only; reviewed rather than targeted",
    },
    {
      name: "Evidence completeness",
      definition: "Share of matrix criteria with cited, dated evidence less than 12 months old.",
      source: "Market evidence file",
      owner: "Investment professional per market",
      frequency: "Quarterly",
      threshold: "100% for active-coverage markets",
    },
  ],
  risks: [
    {
      risk: "The matrix becomes a false-precision exercise that legitimises a predetermined answer.",
      tradeoff: "Simplicity versus rigour; more criteria do not mean better judgement.",
      mitigation: "Few criteria, cited evidence, visible 'Incomplete' status, and a written narrative alongside the score. Scores inform debate; the CIO decides.",
    },
    {
      risk: "Concentration builds through follow-ons and currency correlation even when single-name limits look fine.",
      tradeoff: "Supporting strong investees versus diversification.",
      mitigation: "Report currency and correlated-market exposure, not only country; include follow-on scenarios in the memo.",
    },
    {
      risk: "Expansion to new markets stretches a small team and weakens oversight of the existing portfolio.",
      tradeoff: "Growth of pipeline versus quality of oversight.",
      mitigation: "Coverage tied to capacity planning (Workstream 12); new active markets added only when portfolio tiers allow.",
    },
  ],
  timeline: {
    first90:
      "Fund constraint sheets confirmed with legal; current exposure reconciled; first prioritisation matrix discussed with the CIO; draft coverage plan; first capital-allocation memo using actual data.",
    months4to12:
      "Coverage plan in use and reflected in pipeline composition; two further quarterly memos; at least one evidence-driven change or confirmation of priorities; matrix re-scored for annual planning.",
  },
  success: {
    looksLike:
      "The CIO and IC can see, at any time, where Africa capital is committed, what headroom remains and why the team is spending effort where it is. Deals are rarely declined late for concentration reasons because conflicts are visible at screening.",
    assumptions: [
      "Fund documents and exposure data are available and reconcilable during onboarding.",
      "The CIO wants a regional allocation input rather than receiving allocation as a fixed instruction.",
      "Team capacity can support at least the current market footprint while the plan is built.",
    ],
  },
  keywords: ["market selection", "concentration", "pacing", "follow-on reserve", "mandate", "hard stop", "weighting", "country risk"],
};
