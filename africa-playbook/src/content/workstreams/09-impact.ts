import type { Workstream } from "../types";

export const ws09: Workstream = {
  number: "09",
  slug: "impact-esg-responsible-finance",
  title: "Impact, ESG and responsible finance",
  shortTitle: "Impact & responsible finance",
  category: "portfolio",
  alsoIn: ["investment"],
  tagline:
    "Customer outcomes and responsible-finance standards treated as investment conditions, from screening to exit.",
  summary:
    "I would treat impact, ESG and customer protection as part of the investment case rather than a parallel reporting exercise. That means screening for them, diligencing them with the same rigour as credit quality, writing them into agreements, monitoring them alongside financial covenants and considering them at exit. I would align to the firm's actual impact framework once I have reviewed it, distinguish access from beneficial use, and be clear that a serious consumer-protection failure can pause deployment even when the financial case is attractive.",
  outcome: {
    intended:
      "Every Africa investment has a documented impact thesis, a proportionate responsible-finance diligence record, agreed contractual commitments and a small set of outcome measures with honest limitations, all consistent with the firm's framework.",
    why:
      "For an investor backing financial-service providers that serve underserved households, harm to customers is both an ethical failure and an investment risk: over-indebtedness becomes credit losses, unfair collections become regulatory and reputational events, and data breaches erode trust. Equally, investors and the firm need credible evidence of what the capital achieves. Counting customers reached is not the same as showing they are better off, and conflating the two weakens the firm's credibility with investors who scrutinise impact claims.",
  },
  establishFirst: {
    data: [
      "The firm's impact framework, theory of change, exclusion list, ESG policy and any reporting commitments to investors, including the impact themes described for Fund V.",
      "Existing impact and ESG data collected from Africa investees: indicators, definitions, collection methods, frequency and known data-quality issues.",
      "Investment agreement templates: what impact, ESG and customer-protection undertakings are standard, and what reporting rights exist.",
      "Any regulatory classification or disclosure obligations of the funds, as interpreted by legal and compliance, rather than assumed.",
      "Current incident log or grievance records across the Africa portfolio, if maintained.",
    ],
    conversations: [
      "Head of impact/ESG: framework, priorities, where data is strongest and weakest, and how decisions on ESG matters are taken.",
      "TA team: which customer-outcome and responsible-finance improvements TA has supported, and what has worked.",
      "Legal and compliance: disclosure obligations, contractual remedies for ESG breaches, and any sustainable-finance classification of the funds.",
      "Investee management, risk and customer-service leads: how complaints, collections and pricing disclosure actually work in practice.",
      "Where appropriate, consumer-protection or industry bodies in priority markets, to understand local standards and emerging concerns.",
    ],
    constraints: [
      "I would not claim certification, alignment with any external standard or a regulatory classification for the funds unless legal and impact colleagues confirm it.",
      "Impact methodology choices belong to the firm's impact function; my role is to apply them in Africa and raise where they need adaptation.",
      "Outcome measurement must be proportionate to investee size and capacity; demanding surveys from a small lender can consume the resources meant for customers.",
    ],
  },
  method: [
    {
      title: "Write the impact thesis at screening",
      detail:
        "For each opportunity I would state, in two or three sentences, who the customers are, what financial service they lack, what the investment enables and what plausible outcome change follows. If I cannot write that thesis credibly, the opportunity is likely outside the mandate or not yet understood, and screening stops there rather than leaving impact to be retrofitted in the IC paper.",
    },
    {
      title: "Diligence responsible finance as a credit issue",
      detail:
        "I would examine pricing transparency, affordability assessment, collections practices, complaints handling, data protection, product suitability and staff incentives with the same seriousness as loan-book quality. These are linked: aggressive growth incentives without affordability checks typically appear first as rising restructurings and complaints, and later as write-offs. Findings feed the red-flag register in Workstream 03.",
    },
    {
      title: "Translate findings into the agreement",
      detail:
        "Material findings become conditions precedent, covenants or time-bound action plans with owners and evidence requirements. I would distinguish non-negotiable items (exclusion list, no abusive collections, data protection basics) from improvement commitments, so investees understand where there is flexibility and where there is none.",
    },
    {
      title: "Monitor a small, honest scorecard",
      detail:
        "Rather than a long indicator list, I would agree a few outcome and responsible-finance measures per investee that fit the firm's framework, with definitions, sources, disaggregation and limitations recorded. Reach indicators stay, but are labelled as reach. Outcome measures are used only where the methodology supports them. Data is reviewed with financial results, not in a separate annual cycle.",
    },
    {
      title: "Treat incidents as decision points",
      detail:
        "A serious consumer-protection incident triggers a defined process: verify facts, require remediation for affected customers, assess root cause and decide whether further disbursement or new investment should pause. I would make this explicit to IC so that the response is not negotiated case by case under commercial pressure.",
    },
    {
      title: "Consider impact durability at exit",
      detail:
        "Exit planning (Workstream 11) includes how a buyer or refinancer is likely to treat customers and mission. I would document this consideration and its weight, recognising that the firm's ability to bind a buyer is limited and that the decision rests with IC.",
    },
  ],
  deliverables: [
    { name: "Impact thesis note", description: "Half a page per opportunity at screening, updated at IC." },
    { name: "Responsible-finance diligence checklist", description: "Proportionate to institution type; findings feed the red-flag register and agreement terms." },
    { name: "Investee outcome scorecard", description: "Five to eight measures with definitions, sources, disaggregation, baseline and limitations (template below)." },
    { name: "ESG action plan", description: "Time-bound actions with owners, evidence and cost, attached to the investment agreement." },
    { name: "Incident protocol", description: "Escalation, remediation and pause criteria for serious consumer-protection or ESG events." },
  ],
  templates: [
    {
      kind: "table",
      caption: "Investee outcome scorecard for a fictional lender (Illustrative FSP A)",
      evidence: "illustrative",
      columns: ["Measure", "Definition", "Source", "Disaggregation", "Baseline (fictional)", "Frequency", "Limitations"],
      rows: [
        ["First-time formal credit access", "Share of new borrowers with no prior record at the credit bureau at first loan", "Credit bureau check at onboarding; MIS", "Gender, rural/urban, product", "41% of new borrowers (FY base year)", "Quarterly", "Bureau coverage gaps overstate first-time access; informal borrowing not visible"],
        ["Repayment stress", "Share of active borrowers restructured or with more than one rescheduling in 12 months", "MIS loan-level data", "Product, branch, loan cycle", "3.8% of active borrowers", "Monthly", "Restructuring policy changes break comparability; needs policy log"],
        ["Over-indebtedness indicator", "Share of new loans where total reported debt service exceeds the institution's affordability threshold", "Credit assessment records; bureau", "Product, gender", "6.2% of new loans exceeded threshold", "Quarterly", "Relies on reported income; threshold must be validated, not assumed"],
        ["Complaint resolution", "Share of complaints resolved within the internal service standard; repeat-complaint rate", "Complaints log", "Channel, category, gender", "72% within 10 working days", "Monthly", "Under-reporting where channels are weak; low volumes may signal poor access, not satisfaction"],
        ["Pricing transparency", "Share of sampled loan files with the total cost of credit disclosed before signing in the regulator's prescribed format", "File review sample by internal audit", "Product", "88% of 50-file sample", "Semi-annual", "Sample-based; disclosure does not prove comprehension"],
        ["Customer resilience (pilot)", "Self-reported ability to meet a defined emergency expense without distress borrowing", "Short phone survey, random sample of active borrowers", "Gender, rural/urban", "To be established in pilot", "Annual", "Self-report bias; no counterfactual; not attributable to the investment"],
        ["Climate-related lending (only if methodology agreed)", "Outstanding portfolio in products meeting the firm's agreed eligibility definition", "MIS with product tagging", "Product, region", "Not reported until definition agreed", "Semi-annual", "Tagging quality; does not measure emission or resilience outcomes"],
      ],
      note:
        "All values are fictional. Measures would be selected to fit the firm's actual framework and the investee's capacity. Reach and access measures are reported as such; none of these measures on its own establishes attributable impact.",
    },
  ],
  ownership: {
    lead: [
      "Ensuring every Africa opportunity has an impact thesis and proportionate responsible-finance diligence before IC.",
      "Raising customer-protection findings with investee management and boards.",
      "Including ESG and impact status in portfolio reviews alongside financial performance.",
    ],
    delegate: [
      "Scorecard data collection and first-line review to the investment professional covering the investee, with impact/ESG review.",
      "Specialist assessments (environmental, social, data protection) to the impact/ESG team or qualified advisers.",
    ],
    recommend: [
      "ESG conditions, covenants and action plans to IC.",
      "Pausing or resuming disbursement after an incident to the CIO and IC.",
      "Adaptations of the framework for African market realities to the head of impact.",
    ],
    escalate: [
      "Any serious incident affecting customers (abusive collections, data breach, misleading pricing, discrimination) to the CIO and head of impact within one working day of becoming aware.",
      "Any exclusion-list breach to legal and the CIO immediately.",
    ],
    dependencies: [
      { party: "Impact/ESG team", need: "Framework, methodology, indicator definitions and specialist review." },
      { party: "TA team", need: "Support for responsible-finance and customer-outcome improvements where eligible." },
      { party: "Legal and compliance", need: "Disclosure obligations, contractual remedies and any regulatory classification." },
      { party: "Investee management", need: "Data, honest reporting of incidents and ownership of action plans." },
      { party: "Investment Committee", need: "Decisions on conditions, pauses and waivers." },
    ],
  },
  extras: [
    {
      id: "lifecycle",
      title: "Where impact and ESG enter the investment lifecycle",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "flow",
          caption: "Proposed integration points (subject to the firm's existing framework)",
          evidence: "proposed",
          steps: [
            { label: "Screening", detail: "Exclusion list, mandate and theme fit, impact thesis drafted" },
            { label: "Diligence", detail: "Responsible-finance review, ESG risk categorisation, baseline data" },
            { label: "Agreement", detail: "Conditions precedent, covenants, action plan, reporting rights" },
            { label: "Monitoring", detail: "Scorecard with financials, incident protocol, board engagement" },
            { label: "Exit", detail: "Buyer considerations, mission durability, final outcome review" },
          ],
        },
        {
          kind: "table",
          caption: "Responsible-finance coverage: what I would look for and how",
          evidence: "proposed",
          columns: ["Area", "Key question", "Evidence I would seek"],
          rows: [
            ["Affordability", "Is repayment capacity assessed, not just collateral or guarantor?", "Credit policy, sample of credit files, debt-service thresholds in use"],
            ["Transparent pricing", "Do customers see the total cost of credit before committing?", "Disclosure documents, regulator format compliance, mystery-shopping results if available"],
            ["Fair collections", "Are collection practices respectful and free of harassment or public shaming?", "Collections policy, agent scripts and incentives, complaints by category, third-party agency contracts"],
            ["Over-indebtedness", "Is multiple borrowing checked and growth pressure controlled?", "Bureau usage, loan-cycle size jumps, restructuring trends, staff incentive design"],
            ["Complaints", "Can customers complain easily and get resolution?", "Channels, log completeness, resolution times, root-cause reporting to the board"],
            ["Client data protection", "Is personal data collected, stored and shared lawfully and securely?", "Data-protection registration where required, access controls, third-party data sharing, breach history"],
            ["Gender", "Are women served on fair terms, and are outcomes tracked by gender?", "Disaggregated portfolio and pricing data, product design, staff composition"],
            ["Exclusion risk", "Do digital channels, documentation rules or pricing exclude the intended segment?", "Onboarding rejection reasons, channel usage by segment, accessibility"],
            ["Climate", "Is climate exposure of the loan book understood, and are any climate claims evidenced?", "Sector and geographic concentration, product eligibility definitions, no unsupported claims"],
            ["Governance", "Does the board receive and act on customer-protection information?", "Board papers, risk committee minutes, internal audit scope"],
          ],
        },
        {
          kind: "callout",
          tone: "note",
          title: "Access, use and outcomes are different claims",
          text:
            "Access means a customer can obtain a service. Beneficial use means they use it in a way that serves them. Outcomes are changes in their circumstances. Attribution is the share of that change caused by the investment rather than by other factors. I would report each at the level the evidence supports and avoid presenting cumulative reach or portfolio-wide customer counts as attributable impact.",
        },
      ],
    },
    {
      id: "incident-case",
      title: "Illustrative case: a consumer-protection incident pauses deployment",
      after: "gates",
      evidence: "illustrative",
      blocks: [
        {
          kind: "p",
          text:
            "Illustrative FSP A is a fictional digital lender in its second year in the portfolio. Its financial results are ahead of plan, return on equity is rising and management requests the second tranche of an agreed facility to fund growth. In the same month, a local media report and a cluster of complaints describe collection agents contacting borrowers' family members and employers and sharing debt information publicly.",
        },
        {
          kind: "list",
          ordered: true,
          items: [
            "Verify: I would ask management for the complaints log, collection-agency contracts and call samples within days, and ask the impact/ESG team to review independently. Media reports are a trigger, not a finding.",
            "Contain: pending verification, I would recommend that the second-tranche disbursement be deferred, explaining to management that this is a protocol, not a judgement.",
            "Assess: suppose review confirms that a third-party agency used prohibited practices on several hundred accounts, incentivised by recovery-based fees, and that the board had not received complaint data by category.",
            "Remediate: the investor's requests would be suspension of the agency, customer remediation where harm occurred, a revised collections policy and incentive structure, board-level complaints reporting and, where required, notification to the regulator by the investee.",
            "Decide: I would recommend to IC that disbursement resumes only once remediation is evidenced (not promised) and a follow-up review confirms changed practice, even though the financial case for the tranche is strong.",
            "Learn: the collections and data-sharing checks in diligence would be strengthened for other digital lenders in the pipeline.",
          ],
        },
        {
          kind: "callout",
          tone: "gate",
          title: "Why returns do not override this gate",
          text:
            "Harmful collections create regulatory, reputational and eventually credit risk, but the principal reason is that the firm's purpose is to improve customers' financial lives. If an attractive return depends on practices that harm those customers, the return is not consistent with the mandate.",
          evidence: "proposed",
        },
      ],
    },
  ],
  gates: [
    {
      gate: "Screening",
      proceedIf: "No exclusion-list conflict, a credible impact thesis can be written, and the business model does not depend on practices inconsistent with customer protection.",
      deferOrDeclineIf: "Exclusion-list conflict; pricing or product design that appears structurally unaffordable for the target segment; refusal to share complaints or collections information.",
    },
    {
      gate: "IC approval",
      proceedIf: "Responsible-finance diligence complete, material findings have agreed remedies in the term sheet, baseline data available or a plan to collect it.",
      deferOrDeclineIf: "Unremediated abusive collections, serious data-protection failings, or management unwilling to commit to an action plan.",
    },
    {
      gate: "Each disbursement or follow-on",
      proceedIf: "No open serious incident; ESG action plan milestones met or formally re-agreed.",
      deferOrDeclineIf: "Open serious incident without evidenced remediation; repeated missed action-plan milestones without credible explanation.",
    },
  ],
  cadence: [
    "Monthly: complaints and repayment-stress indicators reviewed with portfolio financials for watch-tier investees.",
    "Quarterly: scorecard review per investee; action-plan status in the portfolio review.",
    "Annually: outcome and ESG review per investee, feeding firm-wide impact reporting under the firm's methodology.",
    "Event-driven: incident protocol on any serious customer-protection or ESG event.",
  ],
  kpis: [
    {
      name: "Responsible-finance diligence completion",
      definition: "Share of IC submissions with the agreed responsible-finance checklist completed and reviewed by impact/ESG.",
      source: "IC papers; diligence tracker",
      owner: "Director of Africa",
      frequency: "Per IC submission",
      threshold: "Proposed: 100%; no submission without it",
    },
    {
      name: "ESG action-plan delivery",
      definition: "Share of action-plan milestones due in the period that were evidenced as complete.",
      source: "Action-plan tracker; investee evidence",
      owner: "Investment professional per investee",
      frequency: "Quarterly",
      threshold: "Proposed: below 75% triggers a management discussion",
    },
    {
      name: "Incident response time",
      definition: "Working days from awareness of a serious incident to escalation to CIO and head of impact.",
      source: "Incident log",
      owner: "Director of Africa",
      frequency: "Per incident",
      threshold: "Proposed: within one working day",
    },
    {
      name: "Scorecard data completeness",
      definition: "Share of agreed measures reported on time with definitions unchanged or change documented.",
      source: "Investee reporting",
      owner: "Investment professional, with impact/ESG",
      frequency: "Quarterly",
      threshold: "Proposed: 90% for core measures",
    },
  ],
  risks: [
    {
      risk: "Indicator overload: investees spend effort reporting rather than improving.",
      tradeoff: "Comprehensiveness versus usefulness and cost to the investee.",
      mitigation: "Small scorecard tied to the impact thesis and business decisions; drop measures nobody uses.",
    },
    {
      risk: "Overclaiming: reach or cumulative customer counts presented as impact.",
      tradeoff: "Compelling narrative for investors versus credibility under scrutiny.",
      mitigation: "Label reach as reach, state limitations, and agree claim language with the impact team before external use.",
    },
    {
      risk: "Commercial pressure softens the response to an incident.",
      tradeoff: "Deployment pace and relationship versus customer protection.",
      mitigation: "Pre-agreed incident protocol with IC; pause criteria written into agreements.",
    },
    {
      risk: "Imposing standards that do not fit local regulation or institution size.",
      tradeoff: "Consistency versus proportionality.",
      mitigation: "Map to local regulatory definitions; scale requirements by institution type and size; use TA where improvement needs support.",
    },
  ],
  timeline: {
    first90:
      "Framework and existing data reviewed with the impact team; current Africa investee scorecards and action plans assessed for completeness; incident protocol confirmed or proposed; responsible-finance checklist agreed for pipeline use.",
    months4to12:
      "Every new IC submission includes the agreed impact and responsible-finance work; scorecards refined for each investee; at least one customer-outcome pilot designed with an investee and the impact team where methodology supports it; ESG status integrated into quarterly portfolio reviews.",
  },
  success: {
    looksLike:
      "Impact claims about Africa investments can withstand investor diligence because each one is defined, sourced and appropriately limited. Customer-protection risks are found in diligence rather than in the press, and when incidents occur the response is fast, consistent and documented.",
    assumptions: [
      "The firm's impact framework allows proportionate, investee-specific scorecards within a common core.",
      "Investees can provide loan-level and complaints data at reasonable cost.",
      "IC supports pause criteria based on customer protection irrespective of returns.",
    ],
  },
  keywords: ["ESG", "customer protection", "client protection", "over-indebtedness", "collections", "complaints", "data protection", "gender", "climate", "outcomes", "attribution", "SFDR", "theory of change"],
};
