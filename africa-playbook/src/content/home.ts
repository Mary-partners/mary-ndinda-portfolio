export const hero = {
  name: "Mary Ndinda",
  headline: "Building resilient financial institutions. Turning capital into lasting enterprise value.",
  sub: "A proposed Africa investment and leadership playbook for Abler Nordic.",
};

export const thesis = {
  title: "Investment thesis",
  paragraphs: [
    "Financial-service providers that serve underserved households can compound value in a way few other businesses can. Each improvement in credit discipline, funding, governance or operating capability is applied across thousands of customers and many years of lending. The opportunity is real. So are the ways it goes wrong: growth that outruns risk management, funding that does not match the loan book's currency or tenor, and products that reach customers without helping them.",
    "I would therefore build the Africa portfolio on institution quality rather than market narrative. Country conditions decide where to look and how much aggregate exposure to accept. Whether to invest is decided at institution level, on loan-level evidence, management judgement, governance and a clear view of what must be true for the investment to work. Local currency is the structural risk in almost every case, and I would treat it as a first-order design question in every transaction, not a footnote in the model.",
    "Capital and capability work together. The investor's contribution beyond money is governance, a demanding but fair board, and technical assistance aimed at the constraint that actually binds. Responsible finance is a condition of the return, not a trade-off against it. An institution that over-indebts its customers is building a loss it has not yet recognised.",
  ],
};

export const priorities = [
  {
    n: "1",
    title: "Know the portfolio before growing it",
    text: "In the first 60 days I would review every investee, set risk-based monitoring tiers, reconcile exposure against limits and check liquidity and FX positions. New investment would follow that diagnostic, not precede it.",
    links: [
      { href: "/playbook/portfolio-management-governance", label: "Workstream 07: portfolio management" },
      { href: "/playbook/local-currency-and-fx", label: "Workstream 06: FX risk" },
    ],
  },
  {
    n: "2",
    title: "Build a qualified pipeline and a disciplined path to decision",
    text: "Origination concentrated on markets and institution types the mandate supports. Each opportunity passes explicit gates, with kill criteria at screening and a written 'what must be true' test at IC. Meetings and leads are inputs; qualified opportunities and sound decisions are the measure.",
    links: [
      { href: "/playbook/origination-and-relationships", label: "Workstream 02: origination" },
      { href: "/playbook/screening-and-diligence", label: "Workstream 03: diligence" },
    ],
  },
  {
    n: "3",
    title: "Make capital and capability work together, with a team that can carry it",
    text: "TA directed at diagnosed constraints and judged on sustained use, impact evidence that separates reach from outcomes, investor-ready evidence to support CEO and CIO fundraising, and a Nairobi team coached to make and defend good judgements.",
    links: [
      { href: "/playbook/institutional-strengthening-ta", label: "Workstream 08: strengthening and TA" },
      { href: "/playbook/nairobi-leadership-and-budget", label: "Workstream 12: leadership" },
    ],
  },
];

/** Investment lifecycle diagram on the homepage. */
export const lifecycle = [
  { label: "Allocate", ws: "01", detail: "Mandate, markets, pacing" },
  { label: "Originate", ws: "02", detail: "Qualified, mandate-fit pipeline" },
  { label: "Diligence", ws: "03", detail: "Staged, proportionate, kill criteria" },
  { label: "Model and value", ws: "04", detail: "Linked model, downside first" },
  { label: "Structure and approve", ws: "05", detail: "Instrument fit, IC, completion" },
  { label: "Manage currency", ws: "06", detail: "Exposure, hedging, escalation" },
  { label: "Govern", ws: "07", detail: "Tiers, boards, early warning" },
  { label: "Strengthen", ws: "08", detail: "Binding constraint, TA, adoption" },
  { label: "Protect customers", ws: "09", detail: "Responsible finance, outcomes" },
  { label: "Realise", ws: "11", detail: "Follow-on, refinance, exit" },
];

export const twoMinuteRoute = [
  { href: "#thesis", label: "Investment thesis", time: "40 sec" },
  { href: "#priorities", label: "Three priorities", time: "40 sec" },
  { href: "/first-year", label: "First 90 days at a glance", time: "20 sec" },
  { href: "/evidence", label: "Experience and evidence, stated candidly", time: "20 sec" },
];

export const leadershipNote =
  "The role combines hands-on investing with leading a small team and contributing to firm-wide decisions in Oslo. I have written this playbook as I would expect to be held to it: decisions explained, owners named, gates explicit and assumptions open to challenge. It describes how I would do the work. It is not a substitute for an investment track record, and the evidence page says so plainly.";
