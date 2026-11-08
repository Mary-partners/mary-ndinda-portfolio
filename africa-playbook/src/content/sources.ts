import type { PublicFact, Source } from "./types";

const NOT_RECHECKED =
  "Not rechecked on 8 November 2026: the host could not be reached from the build environment. Only the context supplied with the brief is used, and it should be confirmed against the live page before circulation.";

export const sources: Source[] = [
  {
    id: "S1",
    title: "Director of Africa, Abler Nordic (role advertisement, reference A003437)",
    publisher: "Millar Cameron",
    url: "https://millarcameron.com/resource-hub/director-of-africa-abler-nordic",
    published: "Date not confirmed",
    status: "not-rechecked",
    statusNote: NOT_RECHECKED,
    usedFor: ["Role scope used to build the twelve workstreams and the coverage check in the README"],
  },
  {
    id: "S2",
    title: "About Abler Nordic: firm and funds",
    publisher: "Abler Nordic",
    url: "https://www.ablernordic.com/about/",
    published: "Undated web page",
    status: "not-rechecked",
    statusNote: NOT_RECHECKED,
    usedFor: ["General description of the firm's financial-inclusion remit"],
  },
  {
    id: "S3",
    title: "Abler Nordic launches Fund V",
    publisher: "Abler Nordic",
    url: "https://www.ablernordic.com/news/abler-nordic-launches-fund-v-/",
    published: "11 March 2025",
    status: "not-rechecked",
    statusNote: NOT_RECHECKED,
    usedFor: ["Fund V first-round commitments and the existence of five impact themes"],
  },
  {
    id: "S4",
    title: "Technical assistance: terms of reference",
    publisher: "Abler Nordic",
    url: "https://www.ablernordic.com/technical-assistance/terms-of-reference/",
    published: "Undated web page",
    status: "not-rechecked",
    statusNote: NOT_RECHECKED,
    usedFor: ["Principle that TA involves investee ownership and financial participation"],
  },
  {
    id: "S5",
    title: "Investors and facilities",
    publisher: "Abler Nordic",
    url: "https://www.ablernordic.com/partners/investors/",
    published: "Undated web page",
    status: "not-rechecked",
    statusNote: NOT_RECHECKED,
    usedFor: ["Existence of an FX facility (eligibility, capacity and terms not verified)"],
  },
  {
    id: "S6",
    title: "Annual impact report announcement",
    publisher: "Abler Nordic",
    url: "https://www.ablernordic.com/news/our-annual-impact-report-is-/",
    published: "Date not confirmed",
    status: "not-rechecked",
    statusNote: NOT_RECHECKED,
    usedFor: ["Context only. No customer or capital figures are reproduced (see 'Figures deliberately not used')"],
  },
  {
    id: "S7",
    title: "Training that builds businesses (Kenya example)",
    publisher: "Abler Nordic",
    url: "https://www.ablernordic.com/news/training-that-builds-businesses/",
    published: "Date not confirmed",
    status: "not-rechecked",
    statusNote: NOT_RECHECKED,
    usedFor: ["Context only: the firm publicly describes capability-building work with investees in Kenya"],
  },
];

/** The only public facts the site relies on. Each is dated and sourced. */
export const publicFacts: PublicFact[] = [
  {
    id: "remit",
    statement:
      "Abler Nordic backs financial-service providers that serve underserved households. Its financial-inclusion remit extends beyond microfinance.",
    source: "S2",
    asOf: "As supplied with the brief; page undated",
  },
  {
    id: "fund-v",
    statement:
      "The Fund V launch announcement described close to USD100 million in first-round commitments and five impact themes.",
    source: "S3",
    asOf: "11 March 2025",
    caveat:
      "A launch-date figure. It is not a final fund size and may have changed since. The five themes are not listed here because their wording could not be rechecked.",
  },
  {
    id: "ta",
    statement: "The firm's technical assistance approach involves investee ownership and financial participation.",
    source: "S4",
    asOf: "As supplied with the brief; page undated",
    caveat: "Eligibility, co-funding levels and procedures must be confirmed with the TA team.",
  },
  {
    id: "fx-facility",
    statement: "The firm describes an FX facility among its investor and facility partnerships.",
    source: "S5",
    asOf: "As supplied with the brief; page undated",
    caveat:
      "Eligibility, capacity, pricing and terms are not known. The playbook treats the facility as potentially relevant only, and never as a removal of currency risk.",
  },
  {
    id: "role",
    statement:
      "The role covers regional investment leadership across debt, equity and mezzanine; pipeline development; transaction execution; local-currency and FX analysis; investee oversight and growth support; firm strategy and capital mobilisation; Nairobi office leadership and Oslo alignment; and impact, ESG and technical assistance. It is described as hands-on and asks for substantial emerging-market investment and private-equity experience.",
    source: "S1",
    asOf: "As supplied with the brief; advertisement date not confirmed",
  },
];

export const figuresNotUsed: { item: string; reason: string }[] = [
  {
    item: "Customer reach, people served and capital deployed figures from impact and firm pages",
    reason:
      "The sources give different figures at different dates, and some are cumulative. Combining them, or presenting cumulative reach as impact attributable to the firm, would misstate them. None is needed to make the operating plan's argument.",
  },
  {
    item: "Fund sizes, investor names and office lists reported by secondary websites",
    reason:
      "These could not be traced to a primary source that was rechecked during the build. They are left out rather than shown unverified.",
  },
  {
    item: "The wording of the five Fund V impact themes",
    reason: "The announcement could not be rechecked, so the themes are referred to only as a set to be reviewed during onboarding.",
  },
];

export const assumptions: { area: string; assumption: string; howTested: string }[] = [
  { area: "Authority", assumption: "The Director of Africa recommends investments to an Investment Committee and does not approve them alone.", howTested: "Delegation-of-authority document in week 1." },
  { area: "Team", assumption: "A Nairobi team of the director plus two investment professionals, supported by specialist teams shared with Oslo.", howTested: "Organisation chart and role descriptions in week 1." },
  { area: "Instruments", assumption: "Funds can hold equity, senior and subordinated debt and mezzanine, subject to fund-specific limits.", howTested: "Fund documents reviewed with legal in month 1." },
  { area: "TA", assumption: "A TA team exists and TA requires investee ownership and co-funding.", howTested: "TA terms of reference and meeting with the TA lead in month 1." },
  { area: "FX facility", assumption: "An FX facility may be available to some investees on terms not yet known.", howTested: "Facility documents and eligibility criteria in month 1." },
  { area: "Impact framework", assumption: "The firm has its own impact and ESG framework, which the playbook would adopt.", howTested: "Framework documents and the impact team in month 1." },
  { area: "Portfolio", assumption: "No assumption is made about the condition of any existing investee.", howTested: "Portfolio diagnostic in days 1–60 (Workstream 07)." },
];

export const methodology: string[] = [
  "The operating plan is original. Public descriptions of the firm establish context only; they are not evidence that the firm has any particular problem, and the plan does not assume one.",
  "Every substantive statement carries one of four evidence classes, shown where it appears rather than only in the footer.",
  "Illustrative numbers are fictional and internally consistent. They demonstrate method and are not investment guidance, market views or forecasts.",
  "Candidate experience is described only in general terms until Mary approves specific wording. Unverified details are kept in an internal review checklist that is not published.",
  "Where a source could not be rechecked, it is labelled as such, and the site relies only on the context supplied with the brief.",
];
