/**
 * Content drawn from the DBA thesis drafts:
 *  - Chapter One: Introduction (completed 25 August 2026)
 *  - Chapter Two: Literature Review (formal submission draft, November 2026)
 *
 * Everything here is a literature-based argument or a provisional design
 * decision, not an empirical result. The empirical findings will come from
 * the Kenya–South Africa study (Chapters Four and Five).
 */

export const CHAPTERS = [
  {
    id: "chapter-one",
    number: "One",
    title: "Introduction",
    status: "Completed",
    date: "August 2026",
    summary:
      "Establishes the practical and scholarly problem: African SMEs are diagnosed and supported through a finance-first lens, even though their ability to benefit from finance may depend on management capabilities that are not consistently measured.",
  },
  {
    id: "chapter-two",
    number: "Two",
    title: "Literature Review",
    status: "Formal submission draft",
    date: "November 2026",
    summary:
      "Compares the finance-constraint and capability-based explanations of SME growth across a 64-article evidence base, refines the construct and its six dimensions, sets Kenya and South Africa as the comparative markets, and builds the conceptual model that Chapter Three will test.",
  },
] as const;

/** The headline argument, in one sentence each. */
export const THESIS_IN_BRIEF = {
  problem:
    "Despite the recognised financing gap facing African SMEs, there is no widely accepted, multidimensional diagnostic for how an SME's financial management, governance, strategy, operations and managerial capability jointly shape its investment readiness, its ability to absorb capital, and its growth.",
  claim:
    "Finance and management capability are complements, not substitutes: the value of funding depends partly on the organisational conditions through which it is selected, allocated, monitored and renewed.",
  aim: "To examine the role of management capital in African SME growth by developing and empirically testing a Management Capital Index that predicts investment readiness, capital absorption capability and sustainable business growth.",
  mainQuestion:
    "To what extent does management capital influence investment readiness, capital absorption capability and sustainable growth among African SMEs?",
};

/** The figures Chapter One uses to frame the problem. */
export const CONTEXT_FIGURES = [
  { value: "90%+", label: "of firms worldwide are MSMEs", source: "IFC, 2025" },
  { value: "~70%", label: "of global employment is in MSMEs", source: "IFC, 2025" },
  { value: "US$5.7tn", label: "formal MSME finance gap (US$8tn incl. informal)", source: "IFC, 2025" },
  { value: "US$331bn", label: "MSME funding gap in Sub-Saharan Africa", source: "IFC, 2025" },
];

export interface KeyFinding {
  n: number;
  title: string;
  body: string;
  evidence: string;
  source: "Chapter One" | "Chapter Two" | "Chapters One & Two";
}

export const KEY_FINDINGS: KeyFinding[] = [
  {
    n: 1,
    title: "The finance gap is real, but a gap is not a diagnosis",
    body: "A financing gap measures unmet demand in aggregate. A binding constraint is whatever most directly stops a particular firm moving up. Two firms reporting the same need for working capital can face very different constraints, and the same financial response can produce very different outcomes.",
    evidence:
      "IFC (2025) puts the formal MSME finance gap at about US$5.7 trillion, and at about US$331 billion in Sub-Saharan Africa. Across 4,000+ firms in 54 countries, some of the obstacles managers rated highest did not predict growth (Beck et al., 2005).",
    source: "Chapters One & Two",
  },
  {
    n: 2,
    title: "Management practices matter, and they can be changed",
    body: "Management quality is not just a description of successful firms. Changing practices can change outcomes, and even simple, observable routines in very small firms predict performance and survival.",
    evidence:
      "Introducing structured practices raised first-year productivity by about 17% in Indian textile plants (Bloom et al.). A 26-practice measure predicted sales, profits and survival in seven countries including Kenya, Ghana and Nigeria (McKenzie & Woodruff).",
    source: "Chapters One & Two",
  },
  {
    n: 3,
    title: "Money and management are complements, not rivals",
    body: "Management capability cannot compensate indefinitely for missing capital, and capital cannot reliably compensate for weak systems. A well-managed firm may still be rationed; a well-financed firm may still destroy value.",
    evidence:
      "Across 10,888 firms in 30 African countries, firms without credit constraints grew faster (Fowowe, 2017), yet that evidence cannot explain why similarly financed firms perform differently. Entrepreneurial orientation's effect on performance also depends on access to capital (Wiklund & Shepherd).",
    source: "Chapter Two",
  },
  {
    n: 4,
    title: "Receiving capital and absorbing it are two different events",
    body: "The capital experiments reject two simple positions: that finance alone reliably creates growth, and that weak results prove finance doesn't matter. Their disagreements point to the moderators a management-capital study can measure.",
    evidence:
      "High but unequal returns to grants in Sri Lanka (de Mel et al.); in-kind support stayed in the firm while cash leaked in Ghana (Fafchamps et al.); no sustained gains for Ghanaian tailors (Karlan et al.); strong growth among Nigerian grant winners selected for ambition (McKenzie, 2017).",
    source: "Chapter Two",
  },
  {
    n: 5,
    title: "The moment after the money arrives is the blind spot",
    body: "New liquidity widens the choice set and loosens the discipline of scarcity. Hiring, branding, premises and marketing can run ahead of demand and controls, and owner withdrawals or unbudgeted spending can leak value. Most studies measure sales or profit at follow-up and never reconstruct these decisions.",
    evidence:
      "The study therefore separates three stages: deployment readiness (plan and controls before funding), deployment behaviour (what managers actually do), and realised absorption (whether spending becomes productive capacity).",
    source: "Chapter Two",
  },
  {
    n: 6,
    title: "Training attendance is not capability",
    body: "Knowledge transfer is not organisational adoption. Training works modestly on average, and how it is delivered matters as much as what it teaches. The index must measure routines that remain in use after a programme ends.",
    evidence:
      "Conventional training raises profits and sales by about 5–10% on average (McKenzie, 2021). Simple rules of thumb beat formal accounting training (Drexler et al.); personal-initiative training beat traditional training in Togo (Campos et al.).",
    source: "Chapter Two",
  },
  {
    n: 7,
    title: "Measure what managers do, not which documents they hold",
    body: "A weak item asks whether a budget exists. A strong item asks how it is prepared, how often actuals are compared with it, who sees it, and what happened at the last material variance. Proportionality matters: practices should give decision-useful control at the firm's current size and stage.",
    evidence:
      "Adapts the behaviourally anchored logic of the World Management Survey, while extending it to finance, governance, strategy and capital deployment, which the WMS deliberately covers less.",
    source: "Chapter Two",
  },
  {
    n: 8,
    title: "Context is a design requirement, not a footnote",
    body: "Africa is not one business environment. Informality, infrastructure, owner concentration and financing channels change how a practice shows up. Kenya and South Africa are compared as distinct markets, and neither stands in for the continent.",
    evidence:
      "In a four-wave panel of 646 Kampala firms, a trusted stand-in manager and backup resources helped firms recover from disruptions (Kundu et al., 2024). Only 3 Kenya-specific and 3 South Africa-specific studies exist in the current evidence base.",
    source: "Chapter Two",
  },
  {
    n: 9,
    title: "A diagnostic, not a gatekeeper",
    body: "A single score can hide a serious weakness behind a strong pillar, and an unvalidated index could disadvantage younger, informal, rural or women-owned firms if it rewards prior access to formal institutions. The index should also be able to show when a capable firm is simply underfinanced.",
    evidence:
      "Dimension-level profiles come before any composite score. Use in lending or investment decisions would first need external validation, fairness testing, appeal mechanisms and recalibration.",
    source: "Chapters One & Two",
  },
];

/** Where the evidence agrees and where it splits (Chapter Two, section 2.7.11). */
export const CONVERGENCE = [
  "Smaller firms face material financing constraints.",
  "Observable management practices are associated with performance and can sometimes be changed through intervention.",
  "Capital and management interventions produce heterogeneous effects.",
  "Context, selection, instrument design and baseline capability influence outcomes.",
];

export const DISAGREEMENT = [
  "Some capital grants generate high returns; others produce little sustained change.",
  "Some training improves profit; some mainly changes knowledge or practices.",
  "Consulting can improve systems without improving long-run profit.",
  "The relative importance of money and capability, and how long effects last.",
];

export const MISSING_LAYER =
  "These disagreements don't invalidate the research streams. They expose the missing explanatory layer: which firms have, or develop, the capability to convert an intervention into continuing performance, under what conditions, and through which decisions.";

/** Conceptual model (Chapter Two, Figure 2.1). */
export const MODEL_PATHWAY = [
  { key: "mc", label: "Management capital", note: "Six provisional dimensions" },
  { key: "ir", label: "Investment readiness", note: "Credible, provider-specific preparedness" },
  { key: "af", label: "Access to finance", note: "Usable amount, form, term and cost" },
  { key: "ra", label: "Realised capital absorption", note: "What happens after funds arrive" },
  { key: "sg", label: "Sustainable growth", note: "Growth without losing liquidity or control" },
] as const;

/** Hypothesis labels on each arrow of the main pathway. */
export const MODEL_LINKS = ["H1", "H4", "H5", "H5"] as const;

export const MODEL_EXTRA_PATHS = [
  {
    from: "Management capital",
    to: "Realised capital absorption",
    label: "H2",
    note: "Stronger management capital, better conversion of capital into productive capacity.",
  },
  {
    from: "Management capital",
    to: "Sustainable growth",
    label: "H3",
    note: "A direct effect, even without external finance, through better use of internal resources.",
  },
  {
    from: "Management capital",
    to: "Access to finance → growth",
    label: "H6",
    note: "Moderation: the return to finance is higher where management capital is stronger.",
  },
];

export const MODEL_CONTROLS = [
  "Country (Kenya / South Africa)",
  "Sector",
  "Firm size",
  "Firm age",
  "Ownership",
  "Formality",
  "Prior financing",
  "Shock exposure",
];

/** The six provisional dimensions as named after Chapter Two. */
export const DIMENSIONS = [
  "Financial management capability",
  "Governance and accountability",
  "Strategic clarity and market orientation",
  "Operational systems and process discipline",
  "Founder and management-team capability",
  "Capital deployment and absorption capability",
];

export interface Hypothesis {
  id: string;
  text: string;
  /** How the wording changed between Chapter One and Chapter Two, if it did. */
  change?: string;
}

export const HYPOTHESES: Hypothesis[] = [
  { id: "H1", text: "Management capital is positively associated with SME investment readiness." },
  {
    id: "H2",
    text: "Management capital is positively associated with realised capital absorption.",
    change: "Chapter One: “capital absorption capability”. Now focused on realised (post-funding) absorption.",
  },
  { id: "H3", text: "Management capital is positively associated with sustainable SME growth." },
  {
    id: "H4",
    text: "Investment readiness is positively associated with meaningful access to finance.",
    change: "“Meaningful” access: usable amount, form, timing and cost, not just holding a loan.",
  },
  {
    id: "H5",
    text: "Realised capital absorption mediates the relationship between access to finance and sustainable SME growth.",
  },
  {
    id: "H6",
    text: "Management capital positively moderates the relationship between access to finance and sustainable SME growth, so the relationship is stronger at higher levels of management capital.",
  },
  {
    id: "MP1",
    text: "A model that distinguishes capital-deployment routines from realised capital absorption will show better conceptual and empirical discriminant validity than one that combines them in a single construct.",
    change: "New measurement proposition added in Chapter Two, assessed before H2 and H5 are interpreted.",
  },
];

export const OBJECTIVES = [
  "Identify and define the dimensions and observable indicators of management capital relevant to SMEs in the African context.",
  "Develop and validate a multidimensional Management Capital Index for assessing SME management capability.",
  "Examine the relationship between management capital and SME investment readiness.",
  "Analyse the relationship between management capital and an SME's ability to absorb and deploy external capital productively.",
  "Assess the direct and indirect relationships among management capital, access to finance, capital absorption and sustainable growth.",
  "Determine whether the index can classify SMEs by their readiness for finance and their priority advisory-support needs.",
  "Develop evidence-based recommendations for founders, financial institutions, investors, ESOs, development partners and policymakers.",
];

export const SUPPORTING_QUESTIONS = [
  "What dimensions and indicators constitute management capital in the African SME context?",
  "To what extent does the proposed six-dimensional structure provide a reliable and valid measure of management capital?",
  "How does management capital influence SME investment readiness?",
  "To what extent does management capital influence an SME's ability to absorb and deploy external capital productively?",
  "What relationships exist among management capital, access to finance, capital absorption and sustainable growth?",
  "Can a Management Capital Index produce meaningful readiness profiles that distinguish finance needs from advisory-support needs?",
  "How can founders, funders and ESOs use management-capital diagnostics in financing and capability-development decisions?",
];

/** Theoretical lenses (Chapter One 1.12, Chapter Two 2.5). */
export const THEORIES = [
  {
    name: "Resource-based view",
    role: "Principal lens",
    cite: "Barney, 1991",
    explains:
      "Why accumulated managerial systems create lasting performance differences between firms in the same market, and why fungible finance alone is not enough.",
    caution: "Can turn circular if valuable resources are inferred from success, so dimensions are defined before outcomes are tested.",
  },
  {
    name: "Dynamic capabilities",
    role: "Principal lens",
    cite: "Teece, Pisano & Shuen, 1997; Teece, 2007",
    explains:
      "Sensing, seizing and reconfiguring: why management capital matters most during growth and disruption, when routines must change.",
    caution: "Becomes unfalsifiable if every effective action is labelled 'dynamic', so the study measures antecedent routines instead.",
  },
  {
    name: "Information asymmetry and signalling",
    role: "Supporting lens",
    cite: "Stiglitz & Weiss, 1981; Spence, 1973",
    explains:
      "How internal quality becomes legible to funders: reliable accounts, governance and credible plans act as signals that lower uncertainty.",
    caution: "May overstate how far disclosure can fix structural exclusion, discrimination or unsuitable products.",
  },
  {
    name: "Absorptive capacity",
    role: "Used by analogy",
    cite: "Cohen & Levinthal, 1990; Zahra & George, 2002",
    explains:
      "The staged logic of acquisition, assimilation, transformation and exploitation: acquiring a resource does not guarantee its use.",
    caution: "Built for knowledge, not money, so it informs the logic of capital absorption without redefining it.",
  },
];

/** Construct boundaries (Chapter Two, section 2.3.9): a temporal and causal sequence. */
export const CONSTRUCT_BOUNDARIES = [
  { term: "Management capital", def: "The underlying organisational capability: managerial knowledge, decision routines, governance arrangements and systems through which an SME converts resources into accountable, adaptable performance." },
  { term: "Investment readiness", def: "Preparedness to engage credibly with a capital provider. It is provider-specific: a bank, an equity investor and a grant-maker each look for different evidence." },
  { term: "Access to finance", def: "The realised financing event and its terms: funds in an amount, form, timeframe and cost usable for the intended purpose." },
  { term: "Deployment readiness", def: "Before funds arrive: a sequenced, governed use-of-funds plan with responsibilities, milestones, approval limits and monitoring." },
  { term: "Realised absorption", def: "After receipt: whether funds became intended productive capacity while keeping accountability, liquidity and learning. Not the same as spending speed." },
  { term: "Sustainable growth", def: "Expansion in sales, jobs, assets or reach that doesn't erode liquidity, profitability, governance, control or the ability to adapt." },
];

/** Eight consolidated gaps (Chapter Two, 2.7.7) with objective traceability (2.7.9). */
export const RESEARCH_GAPS = [
  { gap: "Conceptual and measurement", what: "No integrated, validated construct joins financial management, governance, strategy, operations, team capability and deployment readiness.", objective: "Objectives 1 & 2", response: "Define the construct from literature and stakeholder evidence, then develop and validate a multidimensional index." },
  { gap: "Investment readiness", what: "Readiness is often reduced to preparing investor documents.", objective: "Objective 3", response: "Test whether management capital explains substantive readiness beyond the production of investor documents." },
  { gap: "Post-capital behaviour", what: "Little evidence on how funding changes judgement and allocation: premature hiring, marketing surges, bonuses, leakage, deviation from plan.", objective: "Objective 4", response: "Separate deployment readiness from realised absorption and reconstruct decisions after a material financing event." },
  { gap: "Temporal", what: "Readiness, receipt, spending and growth are collapsed into one observation.", objective: "Objectives 4 & 5", response: "Use financing-event histories, time anchors and follow-up interviews to restore the sequence." },
  { gap: "Relational and causal pathway", what: "Direct, mediated and moderated links are rarely modelled together.", objective: "Objective 5", response: "Estimate direct, indirect and moderated relationships while preserving causal modesty." },
  { gap: "Geographic and contextual", what: "Influential evidence comes from high-income economies or single developing-country samples.", objective: "Objectives 1–7", response: "Compare Kenya and South Africa, test measurement equivalence and interpret country-specific differences." },
  { gap: "Stakeholder", what: "Investor judgements and entrepreneur accounts are seldom examined together.", objective: "Objectives 1–6", response: "Include founders, capital providers and ESOs, and treat their disagreement as data." },
  { gap: "Practical use and fairness", what: "Diagnostics are fragmented and their high-stakes use is under-governed; imported indicators may penalise smaller, informal, women-owned or rural firms.", objective: "Objectives 6 & 7", response: "Report dimension profiles, test fairness and invariance, and state safeguards against exclusionary use." },
];

export const MARKETS = [
  {
    country: "Kenya",
    points: [
      "A comparatively developed entrepreneurial and financial ecosystem with a large informal and micro-enterprise base.",
      "Mobile money, digital credit, banks, savings groups, development finance and equity coexist, so financial inclusion ≠ access to suitable growth capital.",
      "The 2025 World Bank Enterprise Survey adds management-practice modules for formal firms; FinAccess data covers the very small and informal end.",
    ],
  },
  {
    country: "South Africa",
    points: [
      "Deeper formal financial markets and corporate infrastructure, alongside a large informal and township economy shaped by persistent inequality.",
      "High owner-level financial inclusion does not necessarily translate into business-purpose finance, records or productive capital use.",
      "Formal registration is not a proxy for management quality; it is treated as context, not a dimension of the index.",
    ],
  },
];

export const COMPARISON_LOGIC =
  "The comparison is not designed to rank one country above the other. It tests whether a common structure holds across two markets with different institutional depth, financing channels and informality. Measurement invariance is tested before any pooled comparison, and Kenya does not stand in for East Africa, nor South Africa for Southern Africa.";

/** Five design principles for the index (Chapter Two, 2.5.3). */
export const DESIGN_PRINCIPLES = [
  { title: "Practices in use", body: "Measure what managers do, not only knowledge or document possession." },
  { title: "Frequency and decision relevance", body: "Response options capture how often, how consistently, and whether information changes decisions." },
  { title: "Triangulated evidence", body: "Where practical, check self-reports against records, observation or a second respondent." },
  { title: "Profiles before scores", body: "Report dimension-level profiles before any overall score is considered." },
  { title: "Fairness and invariance", body: "Test equivalence across country, size, sector, gender and formality." },
];

/** The exploratory sequential mixed-methods design (Chapter One 1.13, Chapter Two 2.6.8). */
export const METHOD_SEQUENCE = [
  { step: "Qualitative construct development", detail: "Interviews with founders, capital providers, accountants, advisers and ESOs in both countries refine language and test whether the six dimensions are meaningful." },
  { step: "Expert review and cognitive interviews", detail: "Check content validity and how respondents actually interpret terms like 'budget' or 'governance'." },
  { step: "Pilot", detail: "Identify weak items, ceiling effects and items that only make sense for large firms." },
  { step: "Main survey (≈600 SMEs)", detail: "Factor structure, reliability, measurement invariance across Kenya and South Africa, and tests of H1–H6." },
  { step: "Explanatory follow-up", detail: "Interviews on outliers and contradictory cases, and on where actual use of funds departed from plan." },
];
