import { img, type ImageAsset, type ImageKey } from "./images";

export type Category = "Audit & Assurance" | "Tax & Regulatory" | "Advisory";

export type InsightBlock = { heading?: string; paragraphs: string[] };

export type Insight = {
  slug: string;
  category: Category;
  title: string;
  excerpt: string;
  date: string;
  readTime: string;
  author: string;
  cover: number;
  featured?: boolean;
  body: InsightBlock[];
  takeaways: string[];
};

export const categories: Category[] = [
  "Audit & Assurance",
  "Tax & Regulatory",
  "Advisory",
];

export const insights: Insight[] = [
  {
    slug: "etims-electronic-invoicing-tax-deductions",
    category: "Tax & Regulatory",
    title:
      "eTIMS Is Now the Price of a Deduction: What Every Kenyan Business Should Do",
    excerpt:
      "Since January 2024, only eTIMS compliant invoices support a corporate tax deduction. Here is how to make sure your expenses still count.",
    date: "2026-06-18",
    readTime: "6 min read",
    author: "CPA Kennedy Mdawida",
    cover: 1,
    featured: true,
    body: [
      {
        paragraphs: [
          "For years, a supplier invoice and a bank payment were enough to claim a business expense against corporate tax. That is no longer the case. From 1 January 2024, the Kenya Revenue Authority recognises only invoices generated through the electronic Tax Invoice Management System, known as eTIMS, as valid support for an income tax deduction.",
          "The rule is broader than many owners realise. It applies to all businesses, not only those registered for VAT. If a supplier cannot issue you an eTIMS invoice, the amount you paid them may be disallowed when your corporate tax is assessed, which quietly raises your effective tax rate.",
        ],
      },
      {
        heading: "Why this matters more than it looks",
        paragraphs: [
          "A disallowed expense is not a timing difference you recover later. It is a permanent increase in taxable profit. A business running on thin margins can find that a handful of non compliant suppliers turns a modest profit into a larger tax bill than the cash position can comfortably meet.",
          "The KRA also holds a penalty for failing to onboard when required to do so. The figure was set at KES 100,000 in the relevant amendment, but the larger cost is almost always the lost deductions, not the fine itself.",
        ],
      },
      {
        heading: "A practical response",
        paragraphs: [
          "Start with a supplier audit. List your recurring vendors and confirm which of them can issue eTIMS invoices today. For the ones that cannot, decide whether to help them onboard, switch suppliers, or accept the tax cost with eyes open.",
          "Next, tie eTIMS status into your accounts payable process so that a non compliant invoice is flagged before it is paid, not discovered at year end. Small businesses can use the KRA online portal or the eTIMS mobile and web applications rather than a full system integration.",
          "Finally, treat the transition as a chance to clean up your records. Businesses that get their invoicing in order also tend to find their VAT, withholding tax, and management reporting improve at the same time.",
        ],
      },
    ],
    takeaways: [
      "Only eTIMS invoices support a corporate tax deduction from January 2024.",
      "The rule applies to every business, VAT registered or not.",
      "Run a supplier audit and flag non compliant invoices before payment.",
    ],
  },
  {
    slug: "tax-laws-amendment-act-2024-board-briefing",
    category: "Tax & Regulatory",
    title:
      "Reading the Tax Laws (Amendment) Act 2024: A Board Level Briefing",
    excerpt:
      "Signed in December 2024, the Act reshaped several rules that touch software payments, minimum tax, and filing deadlines. Here is what boards need to track.",
    date: "2026-05-30",
    readTime: "7 min read",
    author: "Mdawida LLP Tax Team",
    cover: 2,
    featured: true,
    body: [
      {
        paragraphs: [
          "After a turbulent budget season, Kenya moved much of its revenue agenda into the Tax Laws (Amendment) Act 2024, which was signed into law on 11 December 2024 and took effect on 27 December 2024. For directors, the value is in knowing which changes alter the numbers and which alter the calendar.",
        ],
      },
      {
        heading: "Software payments and withholding tax",
        paragraphs: [
          "The definition of royalty was widened to capture payments for software, including licences, development, training, maintenance, and support. For any business that pays overseas vendors for software, this raises a direct question about withholding tax that did not always arise before.",
          "Boards should ask management for a list of cross border software and technology payments and a clear position on how each is treated. The cost of getting this wrong tends to surface in a later KRA review, with interest and penalties attached.",
        ],
      },
      {
        heading: "Minimum tax for large groups",
        paragraphs: [
          "A new minimum top up tax targets members of large multinational groups, in line with the global move toward a floor on effective tax rates. If a group sits above the international turnover threshold and its effective rate in Kenya falls below the minimum, a top up may apply.",
          "Most owner managed businesses are outside this net, but subsidiaries of international groups should confirm their position early rather than assume it.",
        ],
      },
      {
        heading: "The quieter administrative changes",
        paragraphs: [
          "Some of the most useful changes are procedural. Where a deadline is stated in days, weekends and public holidays can be excluded from the count, which gives a little more room than the old reading allowed. It is a small point, but it removes a common source of avoidable late filing penalties.",
        ],
      },
    ],
    takeaways: [
      "The Act took effect on 27 December 2024.",
      "Software payments now sit more clearly inside the royalty and withholding tax net.",
      "Subsidiaries of large international groups should test their minimum tax position.",
    ],
  },
  {
    slug: "pillar-two-minimum-top-up-tax-kenya",
    category: "Tax & Regulatory",
    title:
      "The Minimum Top-Up Tax: How the Global 15 Percent Floor Reaches Kenya",
    excerpt:
      "Large multinational groups now face a minimum effective tax rate. We explain who is caught and what to prepare.",
    date: "2026-05-12",
    readTime: "6 min read",
    author: "Mdawida LLP Tax Team",
    cover: 3,
    body: [
      {
        paragraphs: [
          "The international project to set a floor under corporate tax has arrived in East Africa. Kenya introduced a minimum top up tax aimed at members of large multinational groups, following the global model that targets groups with consolidated annual turnover above 750 million euros.",
        ],
      },
      {
        heading: "Who is in scope",
        paragraphs: [
          "The measure is designed for the largest groups, not for local SMEs. If a Kenyan company belongs to a group that crosses the international turnover threshold, and the group's effective tax rate in Kenya falls below 15 percent, a top up can be charged to bring it up to the floor.",
          "This most often affects subsidiaries and permanent establishments of global businesses that benefited from incentives or allowances which pushed their local effective rate below the minimum.",
        ],
      },
      {
        heading: "What to prepare",
        paragraphs: [
          "The starting point is data. Groups need reliable figures for covered taxes and qualifying income on a jurisdiction by jurisdiction basis, which is a heavier reporting exercise than a single company return. The country by country reporting framework already in force gives a useful base to build from.",
          "We advise affected groups to run the effective rate calculation early, model the potential top up, and agree with the parent who files what and where. The worst outcome is discovering a liability during an audit, with no supporting computation on hand.",
        ],
      },
    ],
    takeaways: [
      "The floor targets groups above 750 million euros in turnover.",
      "A top up applies where the local effective rate falls below 15 percent.",
      "Reliable jurisdiction level data is the practical bottleneck.",
    ],
  },
  {
    slug: "transfer-pricing-documentation-east-africa",
    category: "Tax & Regulatory",
    title:
      "Transfer Pricing in East Africa: Getting Your Documentation Right",
    excerpt:
      "Related party transactions attract close attention from revenue authorities. Sound documentation is your first line of defence.",
    date: "2026-04-22",
    readTime: "8 min read",
    author: "Mdawida LLP Tax Team",
    cover: 4,
    body: [
      {
        paragraphs: [
          "Any business that trades with a related party across a border needs to price those dealings as if they were between independent parties. In Kenya, this arm's length principle is anchored in Section 18(3) of the Income Tax Act and supported by transfer pricing rules that continue to move closer to global standards.",
        ],
      },
      {
        heading: "The three tier documentation model",
        paragraphs: [
          "Following the international framework known as BEPS Action 13, large groups are expected to hold a Master File describing the group as a whole, a Local File covering the Kenyan entity's specific transactions, and, above a size threshold, a Country by Country report. Kenya introduced the rules for these filings through earlier finance legislation.",
          "For a mid sized group, the Local File is usually the document that decides an audit. It should set out the related party transactions, the functions and risks of each party, the pricing method chosen, and a benchmarking analysis that supports the result.",
        ],
      },
      {
        heading: "Common weaknesses we see",
        paragraphs: [
          "The most frequent problem is documentation prepared after the fact, describing a policy the business never actually followed. A file that does not match the ledger invites challenge rather than closing it.",
          "The second is management fees and intra group services with no evidence that a real service was rendered or that an independent party would have paid for it. These are among the first items a reviewer tests.",
          "Getting ahead of both means writing your policy before the year, pricing transactions to it during the year, and refreshing the benchmarking before you file. Documentation is cheaper than a dispute.",
        ],
      },
    ],
    takeaways: [
      "Price related party dealings as if the parties were independent.",
      "Master File, Local File, and Country by Country reporting form the model.",
      "Documentation must match what actually happened in the ledger.",
    ],
  },
  {
    slug: "ifrs-18-preparation-2026",
    category: "Audit & Assurance",
    title: "IFRS 18 Lands in 2027, So the Real Work Starts in 2026",
    excerpt:
      "The biggest change to financial statement presentation in a generation is close. Preparers who wait until 2027 will already be behind.",
    date: "2026-06-02",
    readTime: "7 min read",
    author: "CPA Kennedy Mdawida",
    cover: 5,
    featured: true,
    body: [
      {
        paragraphs: [
          "IFRS 18 replaces the long serving IAS 1 and takes effect for annual periods beginning on or after 1 January 2027. It is the most significant redesign of the income statement in years, and because it applies retrospectively, most businesses need to be ready during 2026 rather than in the year of adoption.",
        ],
      },
      {
        heading: "What actually changes",
        paragraphs: [
          "Income and expenses are classified into defined categories covering operating, investing, financing, income taxes, and discontinued operations. The statement of profit or loss then presents two new required subtotals: operating profit, and profit before financing and income taxes.",
          "For the first time, management defined performance measures, the adjusted figures that businesses like to present alongside statutory results, are brought into the audited financial statements and subjected to audit procedures. Numbers that used to live in an investor deck now sit inside the accounts.",
        ],
      },
      {
        heading: "Why 2026 is the deadline that matters",
        paragraphs: [
          "Retrospective application means a company with a calendar year end must present 2026 as a comparative when it reports under IFRS 18 in 2027. In practice, the systems and mappings need to be capturing information the new way through 2026, not reconstructed afterward.",
          "We recommend three steps this year: map your current line items into the new categories, agree which performance measures you will disclose and how you will define them, and check that your reporting system can produce the new subtotals cleanly. Boards and audit committees should see a readiness plan well before the 2027 reporting cycle begins.",
        ],
      },
    ],
    takeaways: [
      "IFRS 18 applies from 1 January 2027 and replaces IAS 1.",
      "Two new subtotals and defined income categories reshape the income statement.",
      "Retrospective application makes 2026 the year to prepare.",
    ],
  },
  {
    slug: "ifrs-for-smes-access-to-capital",
    category: "Audit & Assurance",
    title: "IFRS for SMEs: Turning Clean Books into Access to Capital",
    excerpt:
      "Credible financial statements are often what stands between a growing business and its next round of funding.",
    date: "2026-03-28",
    readTime: "6 min read",
    author: "Mdawida LLP Assurance Team",
    cover: 6,
    body: [
      {
        paragraphs: [
          "Lenders and investors do not fund a story. They fund a set of numbers they can trust. For many growing businesses in the region, the gap between where they are and where the capital is comes down to the quality of their financial statements, and the standard those statements are built on.",
        ],
      },
      {
        heading: "Why a lighter standard still carries weight",
        paragraphs: [
          "IFRS for SMEs is a proportionate version of full IFRS, designed for businesses without public accountability. It gives a smaller company a recognised, consistent basis of reporting without the full disclosure burden that listed entities carry. To a bank or an investor, statements prepared and reviewed against a real standard signal a business that can be diligenced.",
        ],
      },
      {
        heading: "From compliance to credibility",
        paragraphs: [
          "The businesses that raise well tend to share a few habits. They close their books monthly rather than once a year. They separate owner transactions from company transactions cleanly. They keep a fixed asset register that ties to the balance sheet. None of this is complicated, but together it turns a set of accounts into a document a financier can rely on.",
          "An assurance engagement, whether a full audit or a review, adds an independent voice to those numbers. That independent comfort is often the difference between a term sheet and a polite decline.",
        ],
      },
    ],
    takeaways: [
      "IFRS for SMEs gives smaller businesses a recognised reporting basis.",
      "Monthly closes and clean records make a company diligenceable.",
      "Independent assurance turns accounts into a document financiers trust.",
    ],
  },
  {
    slug: "internal-audit-before-you-scale",
    category: "Audit & Assurance",
    title:
      "Internal Audit for Growing Businesses: Build the Controls Before You Scale",
    excerpt:
      "Fraud and leakage rarely announce themselves. A right sized internal audit function finds the gaps while they are still small.",
    date: "2026-02-18",
    readTime: "5 min read",
    author: "Mdawida LLP Assurance Team",
    cover: 7,
    body: [
      {
        paragraphs: [
          "Founders often think of internal audit as something only large corporates need. In our experience, the opposite is true. The most damaging control failures happen in businesses that grew faster than their processes, where one trusted person holds too many keys and no one is checking the locks.",
        ],
      },
      {
        heading: "What a right sized function looks like",
        paragraphs: [
          "Internal audit does not require a large department. For a growing business it can be a focused programme that tests the areas where money moves: procurement, payroll, cash handling, and inventory. The aim is to confirm that the controls the business believes it has are actually operating.",
          "Segregation of duties is usually the first gap. When the person who approves a payment is also the person who records it and reconciles the bank, the door is open. Simple changes to who does what can close most of the everyday risk.",
        ],
      },
      {
        heading: "The payoff",
        paragraphs: [
          "Beyond catching leakage, a working internal audit function makes a business easier to sell, easier to finance, and easier to run. Investors read a strong control environment as lower risk, and that reads directly into value.",
        ],
      },
    ],
    takeaways: [
      "Control failures cluster in businesses that outgrew their processes.",
      "Focus testing on procurement, payroll, cash, and inventory.",
      "Segregation of duties closes most everyday risk.",
    ],
  },
  {
    slug: "kenya-sacco-governance-after-kuscco",
    category: "Audit & Assurance",
    title:
      "After the KUSCCO Shock: Rebuilding Trust and Tightening SACCO Governance",
    excerpt:
      "Kenya's SACCOs hold savings for millions of members. Recent events have made strong governance and clean assurance a matter of survival.",
    date: "2026-01-24",
    readTime: "7 min read",
    author: "CPA Kennedy Mdawida",
    cover: 8,
    body: [
      {
        paragraphs: [
          "Kenya's cooperative movement is enormous. By the end of 2024, regulated SACCOs held combined assets above one trillion shillings and served close to seven million members. That scale makes governance in the sector a public interest question, not just an internal one.",
        ],
      },
      {
        heading: "A sector under pressure",
        paragraphs: [
          "Confidence took a hit as governance failures at an apex body came to light, and the wider sector felt the reputational weight. At the same time, non performing loans edged up, driven in part by distress among borrowers in agriculture and informal trade. Both trends point to the same need: sharper oversight and more honest reporting.",
          "The regulator has responded by tightening requirements. Deposit taking SACCOs are now expected to register with the Financial Reporting Centre and meet anti money laundering obligations in full, and non withdrawable deposit taking SACCOs have been brought more firmly into the supervisory net.",
        ],
      },
      {
        heading: "What boards should do now",
        paragraphs: [
          "SACCO boards should treat the external audit as more than a compliance ritual. That means a real review of loan classification and provisioning, a hard look at related party lending, and clear reporting of anti money laundering compliance to the board itself.",
          "Members reward institutions that are transparent about risk. In a sector rebuilding trust, clean, well explained financial statements are among the most valuable assets a SACCO can hold.",
        ],
      },
    ],
    takeaways: [
      "Regulated SACCOs held over one trillion shillings in assets by end of 2024.",
      "Anti money laundering registration and reporting are now central duties.",
      "Honest loan classification and provisioning rebuild member trust.",
    ],
  },
  {
    slug: "investment-readiness-capital-gap",
    category: "Advisory",
    title:
      "Closing the Capital Gap: Why Investment Readiness Beats a Better Pitch",
    excerpt:
      "The finance gap for African SMEs runs into hundreds of billions of dollars. The businesses that close it are the ones that are ready to absorb capital.",
    date: "2026-06-10",
    readTime: "7 min read",
    author: "CPA Kennedy Mdawida",
    cover: 9,
    featured: true,
    body: [
      {
        paragraphs: [
          "The financing gap facing small and medium businesses across sub Saharan Africa is estimated in the region of 331 billion dollars, and only about one in five African SMEs accesses formal finance. In Kenya, where SMEs make up the vast majority of businesses, owners routinely face borrowing costs that can climb toward the top of the range, sometimes near 40 percent.",
          "It is tempting to read this as purely a supply problem, that there is simply not enough capital. Our experience points elsewhere. A great deal of capital is looking for a home. What is scarce is the number of businesses ready to receive it.",
        ],
      },
      {
        heading: "The absorption problem",
        paragraphs: [
          "Investment readiness is the capability to take money in and turn it into growth without breaking. A business can have a strong market and still be unready, because its records will not survive due diligence, its governance is thin, or it has no financial model that a funder can test.",
          "This is what we call the difference between financial capital and management capital. Money is the first; the strategic, operational, and governance capability to use money well is the second. The second is usually the binding constraint.",
        ],
      },
      {
        heading: "Getting ready in practice",
        paragraphs: [
          "Readiness work is unglamorous and decisive. It means clean, standards based financial statements with a track record. It means a financial model that ties to those statements and forecasts the use of funds. It means a simple governance structure, a clear cap table, and tax affairs that are in order.",
          "Vehicles such as SME focused debt funds are being built to channel capital into the region's businesses, but they still need investable companies at the other end. The firms that prepare, well before they raise, are the ones that convert interest into funding.",
        ],
      },
    ],
    takeaways: [
      "The SME finance gap is a readiness problem as much as a supply problem.",
      "Management capital, not just money, is the binding constraint on growth.",
      "Clean statements, a tested model, and sound governance win funding.",
    ],
  },
  {
    slug: "virtual-cfo-scaling-business",
    category: "Advisory",
    title: "The Case for a Virtual CFO in a Scaling Business",
    excerpt:
      "Most growing businesses need senior financial leadership long before they can justify a full time chief financial officer.",
    date: "2026-04-08",
    readTime: "5 min read",
    author: "Mdawida LLP Advisory Team",
    cover: 10,
    body: [
      {
        paragraphs: [
          "There is an awkward stage in the life of a growing business. It has outgrown a bookkeeper, but it cannot yet justify the salary of an experienced chief financial officer. In that gap, the founder ends up doing the finance leadership job badly, at the expense of the work only the founder can do.",
        ],
      },
      {
        heading: "What a virtual CFO brings",
        paragraphs: [
          "A virtual CFO gives a business senior financial leadership on a fractional basis. That covers the work that a bookkeeper cannot: cash flow forecasting, pricing and margin analysis, board reporting, lender and investor relationships, and the discipline of a monthly close that people trust.",
          "Because the role is fractional, a business gets the judgement of a seasoned finance leader at a fraction of the cost, and can scale the engagement up as it grows toward a full time hire.",
        ],
      },
      {
        heading: "When it pays for itself",
        paragraphs: [
          "The clearest return shows up around a financing event. A virtual CFO who has already built the model, cleaned the numbers, and prepared the data room turns a stressful raise into a managed process, and often improves the terms the business is offered.",
        ],
      },
    ],
    takeaways: [
      "Fractional finance leadership fits the gap between bookkeeper and full CFO.",
      "The role covers forecasting, board reporting, and funder relationships.",
      "The return is clearest around a financing or transaction event.",
    ],
  },
  {
    slug: "financing-agribusiness-east-africa",
    category: "Advisory",
    title:
      "Financing Agribusiness in East Africa: From Grant Dependence to Bankability",
    excerpt:
      "Agribusiness sits at the centre of the region's economy, yet many players remain locked out of commercial finance. The path runs through better numbers.",
    date: "2026-03-06",
    readTime: "6 min read",
    author: "Mdawida LLP Advisory Team",
    cover: 11,
    body: [
      {
        paragraphs: [
          "Agriculture and its value chains employ a large share of the region's people and carry much of its export earnings. Yet many agribusinesses live from grant to grant and season to season, unable to reach the commercial finance that would let them invest and grow. Challenge funds and donor programmes help, but they are not a substitute for bankability.",
        ],
      },
      {
        heading: "Why lenders hesitate",
        paragraphs: [
          "Agribusiness carries real risk: seasonality, weather, price swings, and thin records. A lender looking at a business with no reliable financial statements and no separation between farm and household finances has little to underwrite. The risk may be manageable, but it cannot be seen.",
        ],
      },
      {
        heading: "Building toward bankable",
        paragraphs: [
          "The work of becoming bankable is the same work that makes a business better run. It means recording production and costs properly, separating the business from the owner, and producing financial statements that a lender or an off taker can rely on. It means a cash flow forecast that reflects the real crop calendar rather than a smooth line.",
          "Grants, when they come, are best used to build this capability rather than to plug a recurring hole. An agribusiness that uses a challenge fund to install proper systems and reporting can graduate to commercial finance, while one that uses it only for working capital tends to come back for the next grant.",
        ],
      },
    ],
    takeaways: [
      "Grant dependence is a symptom of missing financial infrastructure.",
      "Seasonality and thin records are what make lenders hesitate.",
      "Use grant funding to build the systems that unlock commercial finance.",
    ],
  },
  {
    slug: "pbo-act-ngo-finance-playbook",
    category: "Advisory",
    title:
      "The PBO Act and the End of Easy Donor Money: A Finance Playbook for NGOs",
    excerpt:
      "New regulation and tighter donor budgets are reshaping the sector. Financial resilience is now a survival skill, not a nice to have.",
    date: "2026-02-04",
    readTime: "7 min read",
    author: "CPA Kennedy Mdawida",
    cover: 12,
    body: [
      {
        paragraphs: [
          "Two forces are hitting Kenya's non governmental sector at once. The Public Benefit Organizations Act came into force in 2024, replacing the older coordination framework and bringing clearer governance, financial reporting, and registration requirements under a dedicated regulator. At the same time, donor budgets have tightened sharply, with large cuts to development funding forcing many organisations to rethink how they survive.",
        ],
      },
      {
        heading: "What the PBO Act asks of finance teams",
        paragraphs: [
          "The Act raises the bar on governance and financial accountability. Organisations are expected to align their governance structures, financial reporting, and registration with the new requirements within the transition window. For finance teams, that means stronger internal controls, cleaner reporting, and reporting frameworks such as IPSAS where public and donor accountability applies.",
        ],
      },
      {
        heading: "Building financial resilience",
        paragraphs: [
          "The organisations that come through this period tend to do three things. They diversify their funding rather than depending on a single donor, so that one cut does not become a crisis. They build reserves and a real cost recovery model, so that core operations are not hostage to project timelines. And they invest in the reporting quality that keeps existing funders confident and opens doors to new ones.",
          "Assurance has a role here too. A clean audit and transparent reporting are increasingly what separate the organisations donors continue to trust from those they quietly move on from.",
        ],
      },
    ],
    takeaways: [
      "The PBO Act raises governance and financial reporting expectations.",
      "Donor funding cuts make diversification and reserves essential.",
      "Strong reporting and a clean audit protect donor confidence.",
    ],
  },
];

// Photography for each insight. A few pieces get a topical image; the rest
// fall back to a category-appropriate photo, varied by the cover index so
// the library does not feel repetitive.
const coverBySlug: Partial<Record<string, ImageKey>> = {
  "financing-agribusiness-east-africa": "agribusiness",
  "pbo-act-ngo-finance-playbook": "development",
  "kenya-sacco-governance-after-kuscco": "financialServices",
  "investment-readiness-capital-gap": "collaboration",
  "virtual-cfo-scaling-business": "professional",
  "transfer-pricing-documentation-east-africa": "atWork",
};

const coverByCategory: Record<Category, ImageKey[]> = {
  "Tax & Regulatory": ["analytics", "auditWork", "atWork"],
  "Audit & Assurance": ["auditWork", "meeting", "atWork"],
  Advisory: ["collaboration", "professional", "analytics"],
};

export function coverImage(insight: Insight): ImageAsset {
  const override = coverBySlug[insight.slug];
  if (override) return img[override];
  const list = coverByCategory[insight.category];
  return img[list[insight.cover % list.length]];
}

export function getInsight(slug: string): Insight | undefined {
  return insights.find((i) => i.slug === slug);
}

export function relatedInsights(current: Insight, count = 3): Insight[] {
  return insights
    .filter((i) => i.slug !== current.slug && i.category === current.category)
    .concat(insights.filter((i) => i.category !== current.category))
    .filter((i) => i.slug !== current.slug)
    .slice(0, count);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split("-").map(Number);
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  return `${months[m - 1]} ${d}, ${y}`;
}
