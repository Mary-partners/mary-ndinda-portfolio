import { PrismaClient } from "@prisma/client";
import { FRAMEWORK_CONTENT } from "../src/lib/framework-content";
import { DIMENSION_META } from "../src/lib/constants";
import { computeScores, type ScoringResponse } from "../src/lib/scoring";

const prisma = new PrismaClient();

const clamp = (n: number, lo = 0, hi = 4) => Math.max(lo, Math.min(hi, n));
const daysAgo = (n: number) => new Date(Date.now() - n * 86400000);

// Deterministic per-question variation around a dimension target.
const VAR = [0, 0, 1, -1, 0, 1, -1];
function qScore(target: number, i: number): number {
  const base = Math.round(target);
  const frac = Math.abs(target - base);
  return clamp(base + (frac > 0.25 ? VAR[i % VAR.length] : 0));
}

// Dimension order: strategic, financial, operational, performance, people, commercial, governance, learning
type Profile = Record<string, number>;

interface CompanySeed {
  legalName: string;
  tradingName?: string;
  country: string;
  region?: string;
  sector: string;
  subsector?: string;
  yearEstablished: number;
  businessModel: string;
  stage: "Micro" | "Small" | "Medium";
  employees: number;
  founderName: string;
  scenarioTag: string;
  advisor: number; // index into advisors
  profile: Profile;
  evidenceVerifiedRatio: number; // 0..1 share of responses marked verified
  constraints: { type: string; severity: string; note: string }[];
  kpis: Record<string, { baseline: number | null; actual: number | null; target: number | null; status?: string; unit: string; name: string; cat: string }>;
  founder: {
    objectiveType: string;
    vision: string;
    growthLimiter: string;
    topPriorities: string;
  };
  revenue?: number | null;
}

const COMPANIES: CompanySeed[] = [
  {
    legalName: "Baus Taka Enterprise Ltd",
    tradingName: "Baus Taka",
    country: "Kenya",
    region: "Nairobi",
    sector: "Waste management",
    subsector: "Collection & recycling",
    yearEstablished: 2019,
    businessModel: "Subscription waste collection + recyclables resale",
    stage: "Small",
    employees: 34,
    founderName: "Daniel Mwangi",
    scenarioTag: "Strong sales, weak financial controls",
    advisor: 0,
    profile: { strategic: 2.5, financial: 1, operational: 2, performance: 1.5, people: 2, commercial: 3, governance: 1.5, learning: 2 },
    evidenceVerifiedRatio: 0.15,
    constraints: [{ type: "WorkingCapital", severity: "medium", note: "Receivables stretch cash during growth months." }],
    kpis: {
      revenue: { baseline: 9800000, actual: 14200000, target: 16000000, unit: "KES", name: "Annual revenue", cat: "financial" },
      gross_margin: { baseline: 38, actual: 41, target: 45, unit: "%", name: "Gross margin", cat: "financial" },
      cash_runway: { baseline: 1.2, actual: 0.9, target: 3, unit: "months", name: "Cash runway", cat: "financial" },
      retention: { baseline: 72, actual: 81, target: 85, unit: "%", name: "Customer retention", cat: "commercial" },
    },
    founder: {
      objectiveType: "Growth",
      vision: "Become the default waste partner for estates and SMEs across Nairobi within three years.",
      growthLimiter: "Cash runs out during expansion because we cannot see it coming.",
      topPriorities: "Grow routes, hire supervisors, fix cash visibility.",
    },
    revenue: 14200000,
  },
  {
    legalName: "AquaGrid Technologies Ltd",
    tradingName: "AquaGrid",
    country: "Uganda",
    region: "Kampala",
    sector: "Aquaculture technology",
    subsector: "IoT pond monitoring",
    yearEstablished: 2020,
    businessModel: "Hardware + SaaS for fish farmers",
    stage: "Small",
    employees: 28,
    founderName: "Patience Nabirye",
    scenarioTag: "Strong systems, unprofitable business model",
    advisor: 1,
    profile: { strategic: 3, financial: 3, operational: 3.5, performance: 3, people: 3, commercial: 2, governance: 3, learning: 3 },
    evidenceVerifiedRatio: 0.4,
    constraints: [
      { type: "BusinessModel", severity: "high", note: "Unit economics negative; hardware subsidises SaaS with no clear path to margin." },
      { type: "MarketDemand", severity: "medium", note: "Addressable farmers with ability to pay is narrower than assumed." },
    ],
    kpis: {
      revenue: { baseline: 210000000, actual: 240000000, target: 300000000, unit: "UGX", name: "Annual revenue", cat: "financial" },
      operating_margin: { baseline: -18, actual: -12, target: 5, unit: "%", name: "Operating margin", cat: "financial" },
      cac: { baseline: 320, actual: 290, target: 180, unit: "USD", name: "Customer acquisition cost", cat: "commercial" },
      delivery_reliability: { baseline: 88, actual: 94, target: 95, unit: "%", name: "Delivery reliability", cat: "operational" },
    },
    founder: {
      objectiveType: "Investment",
      vision: "Raise a Series A and scale across East Africa's aquaculture belt.",
      growthLimiter: "We run excellent operations but lose money on every unit.",
      topPriorities: "Fix unit economics, re-price SaaS, reduce hardware cost.",
    },
    revenue: 240000000,
  },
  {
    legalName: "FarmFeed Millers Ltd",
    tradingName: "FarmFeed",
    country: "Tanzania",
    region: "Arusha",
    sector: "Feed manufacturing",
    subsector: "Poultry & aqua feed",
    yearEstablished: 2016,
    businessModel: "B2B feed manufacturing and distribution",
    stage: "Medium",
    employees: 76,
    founderName: "Joseph Massawe",
    scenarioTag: "Sufficient finance, poor operational discipline",
    advisor: 0,
    profile: { strategic: 2.5, financial: 3, operational: 1.5, performance: 2, people: 2.5, commercial: 2.5, governance: 2.5, learning: 2 },
    evidenceVerifiedRatio: 0.25,
    constraints: [{ type: "Infrastructure", severity: "medium", note: "Power interruptions disrupt milling schedules." }],
    kpis: {
      revenue: { baseline: 1800000000, actual: 1950000000, target: 2200000000, unit: "TZS", name: "Annual revenue", cat: "financial" },
      waste: { baseline: 9, actual: 11, target: 4, unit: "%", name: "Production waste", cat: "operational" },
      capacity_util: { baseline: 58, actual: 55, target: 80, unit: "%", name: "Capacity utilisation", cat: "operational" },
      defects: { baseline: 6, actual: 7, target: 2, unit: "%", name: "Quality defects", cat: "operational" },
    },
    founder: {
      objectiveType: "Growth",
      vision: "Double milling volume and win regional distributors.",
      growthLimiter: "We have orders and capital but production is inconsistent and wasteful.",
      topPriorities: "Stabilise production, cut waste, reliable scheduling.",
    },
    revenue: 1950000000,
  },
  {
    legalName: "Shamba Harvest Processing Ltd",
    tradingName: "Shamba Harvest",
    country: "Kenya",
    region: "Nakuru",
    sector: "Agricultural processing",
    subsector: "Grain & pulses",
    yearEstablished: 2017,
    businessModel: "Buy, process and sell packaged staples",
    stage: "Small",
    employees: 41,
    founderName: "Grace Wambui",
    scenarioTag: "Weak delegation, excessive founder dependence",
    advisor: 2,
    profile: { strategic: 3, financial: 2.5, operational: 2.5, performance: 2, people: 2, commercial: 2.5, governance: 1, learning: 2 },
    evidenceVerifiedRatio: 0.2,
    constraints: [],
    kpis: {
      revenue: { baseline: 22000000, actual: 25500000, target: 32000000, unit: "KES", name: "Annual revenue", cat: "financial" },
      employee_turnover: { baseline: 28, actual: 31, target: 15, unit: "%", name: "Employee turnover", cat: "people" },
      gross_margin: { baseline: 24, actual: 26, target: 30, unit: "%", name: "Gross margin", cat: "financial" },
    },
    founder: {
      objectiveType: "Growth",
      vision: "A branded staples business trusted across the Rift Valley.",
      growthLimiter: "Nothing moves without me; I approve every decision.",
      topPriorities: "Delegate, build a management layer, document authority.",
    },
    revenue: 25500000,
  },
  {
    legalName: "ColdLink Logistics Ltd",
    tradingName: "ColdLink",
    country: "Ghana",
    region: "Accra",
    sector: "Cold chain logistics",
    subsector: "Refrigerated transport",
    yearEstablished: 2018,
    businessModel: "Temperature-controlled logistics for food & pharma",
    stage: "Medium",
    employees: 63,
    founderName: "Kwame Asare",
    scenarioTag: "Strong management team, restricted working capital",
    advisor: 1,
    profile: { strategic: 3.5, financial: 3, operational: 3.5, performance: 3.5, people: 3, commercial: 3, governance: 3, learning: 3 },
    evidenceVerifiedRatio: 0.45,
    constraints: [{ type: "WorkingCapital", severity: "high", note: "Growth constrained by financing of fleet and fuel, not by management." }],
    kpis: {
      revenue: { baseline: 5200000, actual: 6100000, target: 8000000, unit: "GHS", name: "Annual revenue", cat: "financial" },
      operating_margin: { baseline: 11, actual: 13, target: 16, unit: "%", name: "Operating margin", cat: "financial" },
      working_capital: { baseline: -400000, actual: -650000, target: 200000, unit: "GHS", name: "Working capital", cat: "financial" },
      delivery_reliability: { baseline: 92, actual: 96, target: 98, unit: "%", name: "Delivery reliability", cat: "operational" },
    },
    founder: {
      objectiveType: "Expansion",
      vision: "The cold chain backbone for West African food and pharma.",
      growthLimiter: "We are well run but cannot finance the next trucks.",
      topPriorities: "Secure working capital, win pharma contracts, expand fleet.",
    },
    revenue: 6100000,
  },
  {
    legalName: "RecycloPlast Industries Ltd",
    tradingName: "RecycloPlast",
    country: "Nigeria",
    region: "Lagos",
    sector: "Recycling",
    subsector: "Plastics reprocessing",
    yearEstablished: 2015,
    businessModel: "Collect, reprocess and sell recycled polymer",
    stage: "Medium",
    employees: 120,
    founderName: "Chidinma Okeke",
    scenarioTag: "Successful implementation and sustained adoption",
    advisor: 2,
    profile: { strategic: 3.5, financial: 3.5, operational: 3.5, performance: 4, people: 3, commercial: 3.5, governance: 3.5, learning: 3.5 },
    evidenceVerifiedRatio: 0.75,
    constraints: [],
    kpis: {
      revenue: { baseline: 480000000, actual: 640000000, target: 700000000, unit: "NGN", name: "Annual revenue", cat: "financial" },
      operating_margin: { baseline: 8, actual: 15, target: 16, unit: "%", name: "Operating margin", cat: "financial" },
      capacity_util: { baseline: 64, actual: 86, target: 85, unit: "%", name: "Capacity utilisation", cat: "operational" },
      staff_productivity: { baseline: 3.1, actual: 4.2, target: 4, unit: "t/person/mo", name: "Staff productivity", cat: "people" },
    },
    founder: {
      objectiveType: "Growth",
      vision: "West Africa's most trusted recycled-polymer supplier.",
      growthLimiter: "Our main gaps are now capital for a second line, not management.",
      topPriorities: "Second production line, export certification, retain talent.",
    },
    revenue: 640000000,
  },
  {
    legalName: "Nuru Consumer Goods Ltd",
    tradingName: "Nuru",
    country: "Kenya",
    region: "Mombasa",
    sector: "Consumer products",
    subsector: "Home & personal care",
    yearEstablished: 2019,
    businessModel: "Manufacture and distribute FMCG under own brand",
    stage: "Small",
    employees: 38,
    founderName: "Aisha Hassan",
    scenarioTag: "Many training sessions, no verified implementation",
    advisor: 0,
    profile: { strategic: 2, financial: 1.5, operational: 2, performance: 1.5, people: 2, commercial: 2.5, governance: 2, learning: 2 },
    evidenceVerifiedRatio: 0.0,
    constraints: [{ type: "MarketDemand", severity: "medium", note: "Shelf competition from established brands." }],
    kpis: {
      revenue: { baseline: 16000000, actual: 16500000, target: 24000000, unit: "KES", name: "Annual revenue", cat: "financial" },
      gross_margin: { baseline: 29, actual: 28, target: 36, unit: "%", name: "Gross margin", cat: "financial" },
      retention: { baseline: 55, actual: 54, target: 70, unit: "%", name: "Customer retention", cat: "commercial" },
    },
    founder: {
      objectiveType: "Growth",
      vision: "A household FMCG brand along the coast.",
      growthLimiter: "We attend every training but little actually changes inside the business.",
      topPriorities: "Actually implement financial routines, distribution, pricing.",
    },
    revenue: 16500000,
  },
  {
    legalName: "TerraClime Solutions Ltd",
    tradingName: "TerraClime",
    country: "South Africa",
    region: "Cape Town",
    sector: "Climate technology",
    subsector: "Solar cold storage",
    yearEstablished: 2021,
    businessModel: "Lease solar-powered cold rooms to agri-traders",
    stage: "Small",
    employees: 22,
    founderName: "Sipho Dlamini",
    scenarioTag: "Missing or unreliable evidence",
    advisor: 1,
    profile: { strategic: 2.5, financial: 2, operational: 2.5, performance: 2, people: 2.5, commercial: 2.5, governance: 2, learning: 2.5 },
    evidenceVerifiedRatio: 0.05,
    constraints: [{ type: "InvestmentCapital", severity: "high", note: "Capex-heavy model needs asset finance." }],
    kpis: {
      revenue: { baseline: null, actual: 3200000, target: 5000000, unit: "ZAR", name: "Annual revenue", cat: "financial", status: "estimated" },
      operating_margin: { baseline: null, actual: null, target: 10, unit: "%", name: "Operating margin", cat: "financial", status: "unavailable" },
      utilisation: { baseline: 40, actual: 52, target: 75, unit: "%", name: "Cold-room utilisation", cat: "operational" },
    },
    founder: {
      objectiveType: "Investment",
      vision: "Decentralised solar cold storage across rural markets.",
      growthLimiter: "We cannot prove our numbers to funders.",
      topPriorities: "Clean up records, install reporting, raise asset finance.",
    },
    revenue: 3200000,
  },
  {
    legalName: "LedgerLeap Technologies Ltd",
    tradingName: "LedgerLeap",
    country: "Kenya",
    region: "Nairobi",
    sector: "B2B software",
    subsector: "SME accounting tools",
    yearEstablished: 2022,
    businessModel: "SaaS subscriptions for SME bookkeeping",
    stage: "Micro",
    employees: 9,
    founderName: "Brian Otieno",
    scenarioTag: "Early-stage, lean, uneven practices",
    advisor: 2,
    profile: { strategic: 2.5, financial: 3, operational: 2, performance: 2.5, people: 1.5, commercial: 2, governance: 1.5, learning: 3 },
    evidenceVerifiedRatio: 0.2,
    constraints: [{ type: "MarketDemand", severity: "medium", note: "Early product-market fit; churn still high." }],
    kpis: {
      revenue: { baseline: 2400000, actual: 4100000, target: 8000000, unit: "KES", name: "Annual revenue (ARR)", cat: "financial" },
      churn: { baseline: 9, actual: 7, target: 3, unit: "%/mo", name: "Monthly churn", cat: "commercial" },
      conversion: { baseline: 4, actual: 6, target: 10, unit: "%", name: "Trial conversion", cat: "commercial" },
    },
    founder: {
      objectiveType: "Growth",
      vision: "The default books app for African micro-businesses.",
      growthLimiter: "Churn and a thin team stretched across everything.",
      topPriorities: "Reduce churn, hire, build repeatable sales.",
    },
    revenue: 4100000,
  },
  {
    legalName: "Mandazi Foods Distribution Ltd",
    tradingName: "Mandazi Foods",
    country: "Uganda",
    region: "Jinja",
    sector: "Food distribution",
    subsector: "Baked goods wholesale",
    yearEstablished: 2020,
    businessModel: "Wholesale distribution of baked goods to kiosks",
    stage: "Micro",
    employees: 7,
    founderName: "Esther Nakato",
    scenarioTag: "Survival stage, low across the board",
    advisor: 0,
    profile: { strategic: 1.5, financial: 1, operational: 1.5, performance: 1, people: 1.5, commercial: 2, governance: 1, learning: 1.5 },
    evidenceVerifiedRatio: 0.0,
    constraints: [
      { type: "WorkingCapital", severity: "high", note: "Daily cash shortfalls limit stock purchases." },
      { type: "SkilledLabour", severity: "medium", note: "No one with financial skills in the team." },
    ],
    kpis: {
      revenue: { baseline: 48000000, actual: 51000000, target: 70000000, unit: "UGX", name: "Annual revenue", cat: "financial" },
      gross_margin: { baseline: 14, actual: 13, target: 20, unit: "%", name: "Gross margin", cat: "financial" },
    },
    founder: {
      objectiveType: "Survival",
      vision: "A stable income and a second delivery route.",
      growthLimiter: "Cash runs out before I can restock.",
      topPriorities: "Stabilise cash, basic records, reliable supply.",
    },
    revenue: 51000000,
  },
];

async function main() {
  console.log("Resetting demo data…");
  // Clean (order respects FKs via cascade where set)
  await prisma.auditLog.deleteMany();
  await prisma.notification.deleteMany();
  await prisma.evidenceReview.deleteMany();
  await prisma.evidence.deleteMany();
  await prisma.task.deleteMany();
  await prisma.milestone.deleteMany();
  await prisma.improvementPlan.deleteMany();
  await prisma.advisorySession.deleteMany();
  await prisma.companyKpi.deleteMany();
  await prisma.kpiDefinition.deleteMany();
  await prisma.constraintFlag.deleteMany();
  await prisma.dimensionScore.deleteMany();
  await prisma.response.deleteMany();
  await prisma.assessment.deleteMany();
  await prisma.founderProfile.deleteMany();
  await prisma.company.deleteMany();
  await prisma.question.deleteMany();
  await prisma.dimension.deleteMany();
  await prisma.framework.deleteMany();
  await prisma.programme.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.user.deleteMany();
  await prisma.organisation.deleteMany();

  // Organisations
  const fund = await prisma.organisation.create({
    data: { name: "Azure Impact Fund", type: "Fund / DFI", country: "Kenya", description: "Impact fund supporting African SME growth through capital and enterprise support." },
  });
  const accel = await prisma.organisation.create({
    data: { name: "Sahel Accelerator", type: "Accelerator", country: "Ghana", description: "A separate tenant used to demonstrate strict organisation isolation." },
  });

  // Users
  const admin = await prisma.user.create({ data: { name: "Amina Yusuf", email: "admin@demo.mcl", role: "ADMIN", isPlatformAdmin: true, title: "Platform Administrator" } });
  const pm = await prisma.user.create({ data: { name: "Peter Njoroge", email: "pm@demo.mcl", role: "PROGRAM_MANAGER", title: "Programme Manager" } });
  const reviewer = await prisma.user.create({ data: { name: "Lydia Mensah", email: "reviewer@demo.mcl", role: "REVIEWER", title: "Independent Reviewer" } });
  const founder = await prisma.user.create({ data: { name: "Daniel Mwangi", email: "founder@demo.mcl", role: "FOUNDER", title: "Founder — Baus Taka" } });
  const advisors = await Promise.all(
    [
      { name: "Faith Kamau", email: "advisor1@demo.mcl" },
      { name: "Tunde Bello", email: "advisor2@demo.mcl" },
      { name: "Naomi Achieng", email: "advisor3@demo.mcl" },
    ].map((a) => prisma.user.create({ data: { ...a, role: "ADVISOR", title: "Enterprise Advisor" } }))
  );

  // Memberships (fund org)
  const members: { user: string; role: string }[] = [
    { user: admin.id, role: "ADMIN" },
    { user: pm.id, role: "PROGRAM_MANAGER" },
    { user: reviewer.id, role: "REVIEWER" },
    { user: founder.id, role: "FOUNDER" },
    ...advisors.map((a) => ({ user: a.id, role: "ADVISOR" })),
  ];
  for (const m of members) {
    await prisma.membership.create({ data: { userId: m.user, orgId: fund.id, role: m.role } });
  }
  // Admin also in the second org to demonstrate multi-org
  await prisma.membership.create({ data: { userId: admin.id, orgId: accel.id, role: "ADMIN" } });

  // Framework + dimensions + questions
  const framework = await prisma.framework.create({
    data: { name: "MCL SME Capability Framework", version: "1.0", isDefault: true, orgId: null },
  });
  const dimRecords: Record<string, { id: string; weight: number }> = {};
  const questionRecords: { id: string; dimensionId: string; weight: number; dimKey: string; order: number }[] = [];
  for (let i = 0; i < DIMENSION_META.length; i++) {
    const meta = DIMENSION_META[i];
    const dim = await prisma.dimension.create({
      data: { frameworkId: framework.id, key: meta.key, name: meta.name, description: meta.description, weight: 1, order: i + 1 },
    });
    dimRecords[meta.key] = { id: dim.id, weight: 1 };
    const content = FRAMEWORK_CONTENT.find((c) => c.key === meta.key)!;
    for (let q = 0; q < content.questions.length; q++) {
      const sq = content.questions[q];
      const question = await prisma.question.create({
        data: { dimensionId: dim.id, text: sq.text, helpText: sq.helpText, weight: sq.weight ?? 1, order: q + 1, appliesTo: sq.appliesTo },
      });
      questionRecords.push({ id: question.id, dimensionId: dim.id, weight: sq.weight ?? 1, dimKey: meta.key, order: q + 1 });
    }
  }

  // Programme
  const programme = await prisma.programme.create({
    data: {
      orgId: fund.id,
      name: "SME Capability Accelerator 2026",
      fundingPartner: "Azure Impact Fund + Development Partner",
      startDate: daysAgo(210),
      endDate: new Date(Date.now() + 180 * 86400000),
      objectives: "Strengthen management capability and track implementation across 60 enterprises.",
      sectorCoverage: "Agri, manufacturing, logistics, recycling, consumer, software",
      geography: "East & West Africa",
      targetEnterprises: 60,
      budget: 2500000,
      reportingCadence: "Quarterly",
      frameworkVersion: "1.0",
      status: "Active",
    },
  });

  // KPI definitions (dedup by key across companies)
  const kpiDefs = new Map<string, { name: string; unit: string; category: string; higherIsBetter: boolean }>();
  const LOWER_IS_BETTER = new Set(["cac", "waste", "defects", "employee_turnover", "churn", "working_capital"]);
  for (const c of COMPANIES) {
    for (const [key, k] of Object.entries(c.kpis)) {
      if (!kpiDefs.has(key)) kpiDefs.set(key, { name: k.name, unit: k.unit, category: k.cat, higherIsBetter: !LOWER_IS_BETTER.has(key) });
    }
  }
  for (const [key, def] of kpiDefs) {
    await prisma.kpiDefinition.create({ data: { key, ...def } });
  }

  // Companies
  for (const c of COMPANIES) {
    const advisor = advisors[c.advisor];
    const company = await prisma.company.create({
      data: {
        orgId: fund.id,
        programmeId: programme.id,
        legalName: c.legalName,
        tradingName: c.tradingName,
        country: c.country,
        region: c.region,
        sector: c.sector,
        subsector: c.subsector,
        yearEstablished: c.yearEstablished,
        businessModel: c.businessModel,
        stage: c.stage,
        employees: c.employees,
        founderName: c.founderName,
        advisorId: advisor.id,
        scenarioTag: c.scenarioTag,
        founderProfile: {
          create: {
            objectiveType: c.founder.objectiveType,
            threeYearVision: c.founder.vision,
            growthLimiter: c.founder.growthLimiter,
            topPriorities: c.founder.topPriorities,
          },
        },
      },
    });

    // Constraints
    for (const con of c.constraints) {
      await prisma.constraintFlag.create({ data: { companyId: company.id, type: con.type, severity: con.severity, note: con.note } });
    }

    // KPIs
    for (const [key, k] of Object.entries(c.kpis)) {
      await prisma.companyKpi.create({
        data: { companyId: company.id, kpiKey: key, period: "2026 YTD", actual: k.actual, target: k.target, baseline: k.baseline, dataStatus: k.status ?? "actual" },
      });
    }

    // Baseline assessment (finalized snapshot)
    const assessment = await prisma.assessment.create({
      data: {
        companyId: company.id,
        frameworkId: framework.id,
        frameworkVersion: "1.0",
        type: "baseline",
        assessorRole: "ADVISOR",
        status: "finalized",
        isBaseline: true,
        createdById: advisor.id,
        createdAt: daysAgo(160),
        finalizedAt: daysAgo(158),
        label: "Baseline diagnostic",
      },
    });

    // Responses
    const scoringResponses: ScoringResponse[] = [];
    let idx = 0;
    for (const q of questionRecords) {
      const target = c.profile[q.dimKey] ?? 2;
      const score = qScore(target, q.order);
      const verified = Math.random() < c.evidenceVerifiedRatio; // deterministic enough for demo coverage
      const evidenceStatus = verified ? "verified" : score >= 2 ? "claimed" : "none";
      await prisma.response.create({
        data: {
          assessmentId: assessment.id,
          questionId: q.id,
          score,
          applicable: true,
          evidenceStatus,
          confidence: score >= 3 ? "high" : score >= 2 ? "medium" : "low",
        },
      });
      scoringResponses.push({ questionId: q.id, score, applicable: true, evidenceStatus });
      idx++;
    }

    // Compute + persist scores
    const dims = Object.entries(dimRecords).map(([key, d]) => ({ id: d.id, key, weight: d.weight }));
    const qs = questionRecords.map((q) => ({ id: q.id, dimensionId: q.dimensionId, weight: q.weight }));
    const result = computeScores(dims, qs, scoringResponses);
    for (const ds of result.dimensions) {
      await prisma.dimensionScore.create({
        data: { assessmentId: assessment.id, dimensionId: ds.dimensionId, score: ds.score ?? 0, applicableCount: ds.applicableCount },
      });
    }
    await prisma.assessment.update({
      where: { id: assessment.id },
      data: { overallScore: result.overall, completeness: result.completeness, evidenceCoverage: result.evidenceCoverage },
    });

    // Improvement plans — three priorities derived from weakest dimensions
    const weakest = [...result.dimensions]
      .filter((d) => d.score !== null)
      .sort((a, b) => (a.score ?? 0) - (b.score ?? 0))
      .slice(0, 3);
    let pIndex = 1;
    for (const w of weakest) {
      const dimName = DIMENSION_META.find((d) => d.key === w.key)?.name ?? w.key;
      const baseline = w.score ?? 0;
      const target = Math.min(4, Math.round(baseline) + 1 + (baseline < 1.5 ? 0 : 0));
      // Scenario-driven status variety
      let status = "In progress";
      let milestoneStatuses = ["Verified", "In progress", "Not started"];
      if (c.scenarioTag.includes("sustained")) { status = "Verified"; milestoneStatuses = ["Verified", "Verified", "Verified"]; }
      else if (c.scenarioTag.includes("no verified")) { status = "Evidence submitted"; milestoneStatuses = ["Evidence submitted", "Not started", "Not started"]; }
      else if (c.scenarioTag.includes("Survival")) { status = "Not started"; milestoneStatuses = ["Not started", "Not started", "Not started"]; }

      const plan = await prisma.improvementPlan.create({
        data: {
          companyId: company.id,
          dimensionKey: w.key,
          title: `Strengthen ${dimName.toLowerCase()}`,
          weakness: `${dimName} is the ${pIndex === 1 ? "most" : pIndex === 2 ? "second-most" : "third-most"} material capability gap at baseline (score ${baseline.toFixed(2)}).`,
          rootCause: planRootCause(w.key),
          intervention: planIntervention(w.key),
          baselineScore: baseline,
          targetScore: target,
          ownerName: c.founderName,
          advisorName: advisor.name,
          startDate: daysAgo(150 - pIndex * 10),
          dueDate: new Date(Date.now() + (60 + pIndex * 20) * 86400000),
          costEstimate: 1500 * pIndex,
          priority: pIndex,
          status,
          successCriteria: planSuccess(w.key),
        },
      });

      // Milestones
      const ms = planMilestones(w.key);
      for (let m = 0; m < ms.length; m++) {
        const st = milestoneStatuses[m] ?? "Not started";
        await prisma.milestone.create({
          data: {
            planId: plan.id,
            title: ms[m],
            status: st,
            order: m + 1,
            dueDate: new Date(Date.now() + (20 + m * 20) * 86400000),
            verifiedAt: st === "Verified" ? daysAgo(30 - m * 5) : null,
          },
        });
      }
      // A couple of tasks
      await prisma.task.create({ data: { planId: plan.id, title: ms[0], ownerName: c.founderName, status: milestoneStatuses[0] === "Verified" ? "Verified" : "In progress", order: 1 } });

      // Evidence for first plan (metadata only)
      if (pIndex === 1) {
        const evStatus = c.scenarioTag.includes("sustained") ? "Verified" : c.scenarioTag.includes("no verified") ? "Submitted" : c.scenarioTag.includes("unreliable") ? "More info required" : "Under review";
        const ev = await prisma.evidence.create({
          data: {
            companyId: company.id,
            planId: plan.id,
            name: evidenceName(w.key),
            type: evidenceType(w.key),
            submittedBy: c.founderName,
            period: "2026 Q2",
            status: evStatus,
          },
        });
        if (evStatus === "Verified") {
          await prisma.evidenceReview.create({ data: { evidenceId: ev.id, reviewerId: reviewer.id, decision: "verified", comment: "Consistent with three operating cycles of records." } });
        } else if (evStatus === "More info required") {
          await prisma.evidenceReview.create({ data: { evidenceId: ev.id, reviewerId: reviewer.id, decision: "more_info", comment: "Records do not reconcile to bank statements; please resubmit." } });
        }
      }
      pIndex++;
    }

    // One advisory session (check-in)
    await prisma.advisorySession.create({
      data: {
        companyId: company.id,
        advisorId: advisor.id,
        date: daysAgo(40),
        durationMins: 75,
        participants: `${c.founderName}, operations lead`,
        priorityProblem: weakest[0] ? `Address ${DIMENSION_META.find((d) => d.key === weakest[0].key)?.name}` : "Review priorities",
        observations: `Reviewed baseline results for ${c.tradingName ?? c.legalName}. ${c.scenarioTag}.`,
        decisions: "Confirmed three priority interventions and owners.",
        actions: "Founder to prepare first evidence pack before next review.",
        nextReviewDate: new Date(Date.now() + 20 * 86400000),
      },
    });

    await prisma.auditLog.create({
      data: { userId: advisor.id, orgId: fund.id, entity: "Company", entityId: company.id, action: "seed.baseline", detail: `Baseline assessment finalised (overall ${result.overall?.toFixed(2)}).` },
    });
  }

  // A follow-up (reassessment) for the success-story company to show movement over time
  const recyclo = await prisma.company.findFirst({ where: { legalName: "RecycloPlast Industries Ltd" } });
  if (recyclo) {
    const dims = Object.entries(dimRecords).map(([key, d]) => ({ id: d.id, key, weight: d.weight }));
    const qs = questionRecords.map((q) => ({ id: q.id, dimensionId: q.dimensionId, weight: q.weight }));
    const followup = await prisma.assessment.create({
      data: { companyId: recyclo.id, frameworkId: framework.id, frameworkVersion: "1.0", type: "followup", assessorRole: "ADVISOR", status: "finalized", isBaseline: false, createdById: advisors[2].id, createdAt: daysAgo(20), finalizedAt: daysAgo(18), label: "Follow-up reassessment" },
    });
    const responses: ScoringResponse[] = [];
    for (const q of questionRecords) {
      const target = Math.min(4, (COMPANIES.find((c) => c.legalName === "RecycloPlast Industries Ltd")!.profile[q.dimKey] ?? 3) + 0.3);
      const score = qScore(target, q.order);
      const evidenceStatus = Math.random() < 0.8 ? "verified" : "claimed";
      await prisma.response.create({ data: { assessmentId: followup.id, questionId: q.id, score, applicable: true, evidenceStatus, confidence: "high" } });
      responses.push({ questionId: q.id, score, applicable: true, evidenceStatus });
    }
    const r = computeScores(dims, qs, responses);
    for (const ds of r.dimensions) await prisma.dimensionScore.create({ data: { assessmentId: followup.id, dimensionId: ds.dimensionId, score: ds.score ?? 0, applicableCount: ds.applicableCount } });
    await prisma.assessment.update({ where: { id: followup.id }, data: { overallScore: r.overall, completeness: r.completeness, evidenceCoverage: r.evidenceCoverage } });
  }

  // A notification for the programme manager
  await prisma.notification.create({ data: { userId: pm.id, title: "Evidence awaiting verification", body: "Several enterprises have submitted implementation evidence pending review." } });

  console.log("Seed complete:", {
    organisations: 2,
    users: await prisma.user.count(),
    companies: await prisma.company.count(),
    assessments: await prisma.assessment.count(),
    plans: await prisma.improvementPlan.count(),
  });
}

function planRootCause(key: string): string {
  const map: Record<string, string> = {
    financial: "No routine for producing and reviewing monthly financial information.",
    operational: "Processes are undocumented and problems are patched rather than investigated.",
    performance: "KPIs are not consistently reviewed and actions are not followed up.",
    governance: "Authority is concentrated in the founder with few defined limits.",
    people: "Roles and accountability are unclear; key-person dependency is high.",
    strategic: "Priorities are not translated into clear responsibilities.",
    commercial: "Pricing and customer profitability are not analysed.",
    learning: "Lessons are not captured or acted upon systematically.",
  };
  return map[key] ?? "Capability gap identified at baseline.";
}
function planIntervention(key: string): string {
  const map: Record<string, string> = {
    financial: "Implement monthly management accounts and a 13-week cash-flow forecast with assigned ownership.",
    operational: "Document critical processes and establish a root-cause review for recurring problems.",
    performance: "Define a core KPI set, a monthly review cadence and named corrective actions.",
    governance: "Introduce expenditure approval limits, a management meeting and basic separation of duties.",
    people: "Clarify role ownership for critical functions and introduce simple performance reviews.",
    strategic: "Run a priorities workshop and cascade responsibilities to the team.",
    commercial: "Analyse customer/product margins and introduce a deliberate pricing basis.",
    learning: "Introduce a lightweight retrospective and improvement log.",
  };
  return map[key] ?? "Design a targeted management improvement intervention.";
}
function planSuccess(key: string): string {
  const map: Record<string, string> = {
    financial: "Monthly accounts produced on time and cash forecast updated weekly for three consecutive cycles.",
    operational: "Documented processes in use and one completed improvement with measured effect.",
    performance: "KPIs reviewed monthly with corrective actions assigned and verified complete.",
    governance: "Approval limits respected and management meetings recorded for three cycles.",
    people: "Every critical function has an accountable owner and reviews are held.",
    strategic: "Priorities documented and reflected in team responsibilities.",
    commercial: "Pricing decisions evidenced by margin analysis.",
    learning: "Improvement log maintained with evidence of acted-upon lessons.",
  };
  return map[key] ?? "Evidence of adoption across multiple operating cycles.";
}
function planMilestones(key: string): string[] {
  const map: Record<string, string[]> = {
    financial: ["Reconcile historical transactions & set opening balances", "Produce first monthly management accounts", "Establish 13-week cash-flow forecast & review meeting"],
    operational: ["Map & document critical processes", "Stand up root-cause review", "Complete first measured improvement"],
    performance: ["Agree core KPI set", "Run first monthly performance review", "Verify corrective actions completed"],
    governance: ["Define approval limits", "Start recorded management meeting", "Introduce separation of duties"],
    people: ["Assign owners to critical functions", "Introduce performance review", "Document succession for key roles"],
    strategic: ["Run priorities workshop", "Cascade responsibilities", "Review progress against priorities"],
    commercial: ["Analyse customer/product margins", "Set pricing basis", "Act on unprofitable lines"],
    learning: ["Introduce retrospective cadence", "Start improvement log", "Review acted-upon lessons"],
  };
  return map[key] ?? ["Define intervention", "Implement", "Verify adoption"];
}
function evidenceName(key: string): string {
  const map: Record<string, string> = {
    financial: "June management accounts & cash-flow forecast",
    operational: "Process map & improvement record",
    performance: "KPI review pack & action log",
    governance: "Management meeting minutes & approval matrix",
    people: "Org structure & performance review records",
    strategic: "Priorities & responsibilities document",
    commercial: "Margin analysis & pricing note",
    learning: "Improvement log extract",
  };
  return map[key] ?? "Implementation evidence pack";
}
function evidenceType(key: string): string {
  return key === "financial" ? "AccountingReport" : key === "governance" ? "Minutes" : key === "operational" ? "PDF" : "PDF";
}

main()
  .then(async () => { await prisma.$disconnect(); })
  .catch(async (e) => { console.error(e); await prisma.$disconnect(); process.exit(1); });
