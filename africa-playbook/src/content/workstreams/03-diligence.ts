import type { Workstream } from "../types";

export const ws03: Workstream = {
  number: "03",
  slug: "screening-and-diligence",
  title: "Screening, diligence and investment judgement",
  shortTitle: "Screening & diligence",
  category: "investment",
  tagline:
    "Staged diligence scaled to the instrument, organised around what must be true for the investment to work.",
  summary:
    "I would run diligence in stages: a short screening memo with explicit kill criteria, then a targeted data request, then specialist reviews scoped to the instrument and institution type. For lenders the core is loan-level data reconciled to audited statements; for fintechs it is the gap between activity and net revenue. Every finding goes into a red-flag register with an evidence-confidence rating, and the IC paper is built around one question: what must be true for this investment to work, and which tests could prove it wrong?",
  outcome: {
    intended:
      "Investment decisions based on tested evidence, with diligence effort proportionate to the risk and size of the commitment, and a clear record of what was checked, what was not, and why.",
    why:
      "Financial-service providers are opaque in specific ways: portfolio quality can be flattered by restructuring and definitions, growth can be bought with incentives that store up losses, and digital activity can look like revenue. Diligence that follows a generic checklist will miss these. Diligence that is not staged wastes money and management time on deals that should have been stopped at screening.",
  },
  establishFirst: {
    data: [
      "The firm's existing diligence templates, IC paper format and specialist panel (legal, tax, audit, IT, ESG), so I extend them rather than replace them.",
      "Prior diligence files and post-investment reviews: which issues were found after closing that diligence missed.",
      "The applicable regulatory definitions in each market for arrears, restructuring, provisioning and capital adequacy.",
      "The diligence budget and who approves spend at each stage.",
    ],
    conversations: [
      "CIO: risk appetite and the issues the IC most often challenges.",
      "Risk, legal and compliance: integrity and AML/KYC standards, beneficial-ownership thresholds and sanctions procedure.",
      "Impact/ESG: the exclusion list, consumer-protection standards and the ESG diligence scope already in use.",
      "TA team: what institutional weaknesses could be addressed after investment, so diligence distinguishes fixable gaps from fundamental ones.",
    ],
    constraints: [
      "Approval to move between stages and to spend diligence budget sits with whoever holds that authority; I would confirm it during onboarding.",
      "Some specialist reviews (legal, tax, integrity) are mandatory regardless of deal size; I would not trim them to save time.",
      "Regulator-appropriate definitions vary; management definitions must be reconciled, not adopted.",
    ],
  },
  method: [
    {
      title: "Screen in a short memo with kill criteria",
      detail:
        "A two to three page screening memo states the thesis, the instrument, the key risks and, explicitly, the kill criteria: findings that would stop the deal regardless of other merits. Writing kill criteria before diligence starts protects against sunk-cost reasoning later. The memo asks for a decision to spend diligence budget, not for investment approval.",
    },
    {
      title: "Request data in priority order",
      detail:
        "The first request covers what is needed to test the kill criteria and the central hypotheses: audited accounts, management accounts, regulatory returns, a loan-level extract and governance documents. Wider requests follow only if the first round holds up. This respects management's time and gets to a no faster.",
    },
    {
      title: "Scope specialist reviews to the instrument",
      detail:
        "An equity stake needs deeper work on governance, management, strategy and exit than a short-tenor senior loan, which concentrates on cash generation, security and covenants. I would agree scope with each specialist in writing, including what is excluded, so gaps are visible to the IC.",
    },
    {
      title: "Rebuild key metrics from source data",
      detail:
        "For lenders I would have the team rebuild portfolio-at-risk, vintage performance and write-offs from the loan-level extract, then reconcile to management reports, regulatory returns and the audited accounts. Differences are not automatically red flags, but each must be explained. For fintechs the equivalent step is reconciling reported users and transactions to net revenue in the accounts.",
    },
    {
      title: "Test the investment hypotheses",
      detail:
        "Each central hypothesis gets a test and a statement of what evidence would disprove it. Findings are logged in a red-flag register with an evidence-confidence rating (verified, corroborated, management-stated, unverified). A finding rated unverified cannot be relied on in the IC paper without saying so.",
    },
    {
      title: "Write the IC paper around what must be true",
      detail:
        "The paper leads with the few things that must be true, the tests applied, the result and the residual uncertainty. It states which red flags are resolved, which are mitigated by structure (Workstream 05) and which remain. A recommendation to proceed with open issues is legitimate if the issues are named; a paper that hides them is not.",
    },
  ],
  deliverables: [
    { name: "Screening memo", description: "Thesis, instrument, key risks, kill criteria and diligence budget request." },
    { name: "Staged data request", description: "Priority-ordered request list tied to kill criteria and hypotheses." },
    { name: "Specialist scope letters", description: "Written scope and exclusions for legal, tax, audit, IT/cyber, integrity and ESG reviews." },
    { name: "Red-flag register", description: "Findings with evidence confidence, implication and action; template below." },
    { name: "Hypothesis test table", description: "What must be true, test applied, disproving evidence, result." },
  ],
  templates: [
    {
      kind: "table",
      caption: "Staged diligence plan",
      evidence: "proposed",
      columns: ["Stage", "Purpose", "Typical scope", "Output", "Decision requested"],
      rows: [
        ["0. Qualification", "Confirm fit and conflicts", "Profile fit, headroom, conflicts, integrity pre-screen", "CRM record", "Proceed to screening"],
        ["1. Screening", "Test whether the deal deserves diligence spend", "Public and supplied financials, regulatory status, management meeting", "Screening memo with kill criteria", "Approve diligence budget"],
        ["2. Core diligence", "Test kill criteria and central hypotheses", "Loan-level data, reconciliations, governance, management, site visit", "Interim findings and red-flag register", "Continue, re-scope or stop"],
        ["3. Specialist reviews", "Close legal, tax, integrity, IT, ESG questions", "Scoped by instrument and institution type", "Specialist reports", "Proceed to IC"],
        ["4. IC", "Investment decision", "Full paper, model, term sheet", "IC paper", "Approve, approve with conditions, or decline"],
      ],
    },
    {
      kind: "table",
      caption: "Red-flag register for Illustrative FSP A (fictional)",
      evidence: "illustrative",
      columns: ["Finding", "Evidence", "Confidence", "Implication", "Action and owner"],
      rows: [
        ["PAR30 rebuilt from loan tape is 7.8% vs 5.1% in management report", "Loan-level extract; management report", "Verified", "Management report excludes restructured loans", "Restate on regulatory definition; adjust model base case. Associate 1"],
        ["14% of portfolio restructured in last 12 months", "Loan tape restructuring flag", "Corroborated", "Asset quality may be weaker than headline arrears suggest", "Vintage analysis of restructured loans; discuss policy with CRO. Director"],
        ["Two directors connected to the largest borrower group", "Board register; company search", "Corroborated", "Related-party exposure and governance risk", "Legal review of related-party limits; condition on reduction. Legal counsel"],
        ["Loan officer bonuses based on disbursement volume only", "HR policy document", "Verified", "Incentive to grow at expense of quality", "Require revised incentive scheme as covenant. Director with management"],
        ["Top three lenders provide 62% of borrowings", "Funding schedule", "Management-stated", "Refinancing concentration", "Obtain facility agreements and maturity profile. Associate 2"],
        ["Complaints log shows rising collections complaints", "Complaints register", "Unverified", "Possible unfair collection practices", "ESG review and customer interviews before IC. ESG specialist"],
      ],
      note: "Fictional institution and figures. Confidence scale: verified (we reproduced it from source), corroborated (two independent sources), management-stated (single management source), unverified.",
    },
  ],
  extras: [
    {
      id: "lender-diagnostics",
      title: "Lender diagnostics",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "What I would examine in a lending institution",
          evidence: "proposed",
          columns: ["Area", "What to test", "Why it matters", "Common distortion"],
          rows: [
            ["Loan-level data quality", "Completeness, duplicates, reconciliation of balances to the general ledger", "All other analysis depends on it", "Extract excludes written-off or restructured loans"],
            ["PAR30 / PAR90", "Rebuild on regulatory definition, including restructured loans; compare to management figure", "Leading indicator of losses", "Definitions reset arrears on restructuring or partial payment"],
            ["Vintage curves", "Cumulative default or loss by disbursement cohort", "Shows whether newer loans perform worse", "Rapid growth makes portfolio-level ratios look better than cohorts"],
            ["Restructurings", "Volume, criteria, repeat restructurings and their performance", "Can hide credit losses", "Restructured loans reported as current"],
            ["Write-offs and recoveries", "Write-off policy, timing and recovery rates", "Determines true credit cost", "Delayed write-offs flatter PAR and profit"],
            ["Provisioning", "Coverage vs arrears, compliance with regulatory and IFRS 9 requirements", "Affects capital and profit", "Under-provisioning before a capital raise"],
            ["Collections", "Process, staffing, use of agents, customer treatment", "Recovery capacity and consumer protection", "Aggressive collections producing short-term results"],
            ["Related-party exposure", "Loans to insiders and connected parties vs limits", "Governance and concentration risk", "Exposures split across entities"],
            ["Funding and liquidity", "Concentration, maturity profile, covenants in lender agreements, deposit stability", "Refinancing risk", "Cross-default clauses not disclosed"],
            ["Capital adequacy", "Ratios on regulatory basis, headroom under growth plan", "Determines equity need and dividend capacity", "Growth plan breaches minimum capital"],
            ["Growth incentives", "Staff incentives and targets", "Quality of future book", "Volume-only bonuses"],
          ],
          note: "I would reconcile management metrics to audited statements and regulatory returns and record every unexplained difference in the red-flag register.",
        },
      ],
    },
    {
      id: "fintech-diagnostics",
      title: "Fintech diagnostics",
      after: "method",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Distinguishing activity from economics in a fintech",
          evidence: "proposed",
          columns: ["Reported metric", "Question to ask", "Evidence to obtain"],
          rows: [
            ["Registered users", "How many are active on a defined basis, e.g. one transaction in 30 days?", "User-level activity data"],
            ["Transaction volume", "What share becomes revenue, after partner and float costs?", "Revenue by product reconciled to accounts"],
            ["Gross revenue", "What is net revenue after pass-through costs, incentives and credit losses?", "Management accounts, audited accounts"],
            ["Customer acquisition", "What is fully loaded acquisition cost by channel?", "Marketing and agent cost data by cohort"],
            ["Retention", "How do cohorts behave after 3, 6 and 12 months?", "Cohort retention tables"],
            ["Contribution", "Is each customer cohort contribution-positive, and when?", "Cohort contribution analysis"],
            ["Fraud and complaints", "What are fraud losses and complaint rates, and how are they handled?", "Fraud log, complaints register, resolution times"],
          ],
        },
      ],
    },
    {
      id: "what-must-be-true",
      title: "What must be true, and what could disprove it",
      after: "deliverables",
      evidence: "illustrative",
      blocks: [
        {
          kind: "table",
          caption: "Hypothesis test table for Illustrative FSP A (fictional)",
          evidence: "illustrative",
          columns: ["What must be true", "Test applied", "Evidence that would disprove it", "Result"],
          rows: [
            ["Asset quality is stable on a regulatory definition", "Rebuild PAR30/PAR90 and vintage curves from loan tape", "Rising loss rates in recent cohorts", "Partly disproved: PAR30 higher than reported; recent cohorts weaker"],
            ["Growth can be funded without breaching capital minimums", "Capital projection under growth plan and downside", "Ratio falls below minimum before year 3", "Holds only with the proposed equity injection"],
            ["Management can operate at twice current scale", "Interviews, systems review, references", "Key-person dependency, MIS cannot scale", "Open: MIS upgrade required; TA candidate"],
            ["Customers are treated fairly", "Pricing review, complaints, customer interviews", "Hidden fees, abusive collections", "Open pending ESG review"],
            ["An exit route exists within fund life", "Buyer universe, regulatory approvals for transfer", "No credible buyer class; transfer restrictions", "Plausible: strategic and DFI buyers active"],
          ],
          note: "Where a central hypothesis is disproved or open, the IC paper must say so and either show how structure mitigates it or recommend deferral.",
        },
        {
          kind: "callout",
          tone: "gate",
          title: "Kill criteria example",
          text: "Any one of these would stop the deal: evidence of material fraud or misreported financials; an unresolvable integrity or sanctions concern; abusive collection practices that management will not change; or a capital shortfall that the proposed investment cannot cure.",
          evidence: "proposed",
        },
      ],
    },
  ],
  ownership: {
    lead: [
      "Screening memos, kill criteria and the hypothesis framework for each deal.",
      "Management assessment and the overall judgement in the IC paper.",
      "Deciding when to stop or re-scope diligence, within my delegated authority.",
    ],
    delegate: [
      "Data analysis, loan-tape rebuilds and reconciliations to investment professionals, with my review of method and results.",
      "Management of specialist advisers day to day, within agreed scope letters.",
    ],
    recommend: [
      "Diligence budget and specialist scope to whoever approves spend.",
      "The investment recommendation to the IC, including open issues and conditions.",
    ],
    escalate: [
      "Integrity, AML, sanctions or fraud concerns to compliance and the CIO immediately.",
      "Any finding that a kill criterion is met, even if the deal team still favours it.",
    ],
    dependencies: [
      { party: "Legal", need: "Legal and regulatory diligence, ownership and licence review." },
      { party: "Risk and compliance", need: "Integrity, AML/KYC, beneficial ownership and sanctions." },
      { party: "ESG/impact", need: "Consumer-protection, environmental and social review." },
      { party: "Investee management", need: "Timely, complete data and access to staff and customers." },
      { party: "Investment Committee", need: "Decision; may require additional work." },
    ],
  },
  gates: [
    {
      gate: "Screening to core diligence",
      proceedIf: "Thesis fits the profile and mandate, kill criteria are defined and none is already triggered, and diligence budget is approved.",
      deferOrDeclineIf: "Data access is refused, a kill criterion is likely met, or the timetable does not allow proper diligence.",
    },
    {
      gate: "Core diligence to specialist reviews",
      proceedIf: "Rebuilt metrics are reconciled or differences explained; central hypotheses are holding.",
      deferOrDeclineIf: "Material unexplained reconciliation differences; a central hypothesis disproved without a structural mitigant.",
    },
    {
      gate: "Specialist reviews to IC",
      proceedIf: "Specialist reports received; all red flags rated and either resolved, mitigated or explicitly accepted.",
      deferOrDeclineIf: "Integrity or legal findings unresolved; consumer-protection concerns unaddressed; any open item that would change the recommendation.",
    },
  ],
  cadence: [
    "Weekly during live diligence: deal team review of findings and the red-flag register.",
    "At each stage gate: short decision note to the approver.",
    "Post-closing (12 months): diligence look-back comparing findings with actual performance.",
  ],
  kpis: [
    {
      name: "Reconciliation completeness",
      definition: "Share of key metrics (PAR, write-offs, capital, revenue) reconciled to audited or regulatory figures.",
      source: "Diligence workpapers",
      owner: "Investment professional on deal",
      frequency: "Per deal",
      threshold: "Proposed: 100% before IC, or explicitly disclosed exceptions",
    },
    {
      name: "Diligence cost per stage",
      definition: "External spend by stage vs approved budget.",
      source: "Finance records",
      owner: "Director of Africa",
      frequency: "Per deal",
      threshold: "Variance over 20% requires re-approval",
    },
    {
      name: "Post-close surprises",
      definition: "Material issues identified within 12 months of closing that diligence did not record.",
      source: "Portfolio reviews; look-back",
      owner: "Director of Africa",
      frequency: "Annually",
      threshold: "Each one reviewed for lessons; no numeric target",
    },
  ],
  risks: [
    {
      risk: "Diligence becomes confirmation of a deal the team already wants.",
      tradeoff: "Deal momentum and relationships versus independence.",
      mitigation: "Kill criteria written before diligence; red-flag register reviewed by someone outside the deal team.",
    },
    {
      risk: "Over-diligence of small deals consumes capacity.",
      tradeoff: "Thoroughness versus team time and management goodwill.",
      mitigation: "Scope proportionate to instrument and size; mandatory reviews protected, others scaled.",
    },
    {
      risk: "Management data is incomplete or inconsistent.",
      tradeoff: "Rejecting otherwise good institutions with weak MIS versus relying on weak data.",
      mitigation: "Treat data quality as a finding; consider structure and TA where gaps are fixable and not concealing losses.",
    },
  ],
  timeline: {
    first90:
      "Existing templates reviewed and extended; screening memo and red-flag register formats agreed; lender and fintech diagnostic checklists in use on live opportunities that pass screening.",
    months4to12:
      "Staged approach applied to all new opportunities; first diligence look-back on any recent closings; specialist panel scope templates refined.",
  },
  success: {
    looksLike:
      "IC papers state clearly what was tested and what remains uncertain. Deals that should fail are stopped at screening or early diligence, at low cost, and post-closing surprises are rare and documented.",
    assumptions: [
      "Loan-level data can be obtained from prospective investees at an appropriate stage.",
      "Specialist advisers with relevant market experience are available.",
      "The IC welcomes papers that disclose open issues.",
    ],
  },
  keywords: ["due diligence", "PAR30", "PAR90", "vintage", "provisioning", "red flags", "kill criteria", "fintech", "loan tape", "AML", "KYC"],
};
