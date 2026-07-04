import type { ResearchSource } from "../types";

export const LIBRARY_THEMES: string[] = [
  "All",
  "SME finance gap",
  "MSME finance",
  "Management practices",
  "Business practices",
  "Digital MSME banking",
  "African management capability",
];

export const RESEARCH_SOURCES: ResearchSource[] = [
  {
    id: "src-1",
    title: "SME Finance",
    author: "World Bank",
    year: "Ongoing",
    theme: "SME finance gap",
    summary:
      "SMEs are central to economies and employment but face major financing constraints.",
    whyItMatters: "Establishes the dominant access-to-finance narrative.",
    url: "https://www.worldbank.org/en/topic/smefinance",
    createdAt: "2026-02-01",
  },
  {
    id: "src-2",
    title: "MSME Finance Gap",
    author: "International Finance Corporation (IFC)",
    year: "2017",
    theme: "MSME finance",
    summary:
      "Documents the scale of the MSME financing gap in emerging markets.",
    whyItMatters:
      "Supports the case that SME finance remains a major development priority.",
    url: "https://www.ifc.org/en/insights-reports/2010/msme-finance-gap",
    createdAt: "2026-02-01",
  },
  {
    id: "src-3",
    title:
      "Why Do Management Practices Differ Across Firms and Countries?",
    author: "Nicholas Bloom & John Van Reenen",
    year: "2010",
    theme: "Management practices",
    summary:
      "Shows that management practices are associated with firm productivity and performance.",
    whyItMatters:
      "Supports the argument that management capability is a real driver of firm outcomes.",
    url: "https://www.aeaweb.org/articles?id=10.1257/jep.24.1.203",
    createdAt: "2026-02-01",
  },
  {
    id: "src-4",
    title: "Business Practices in Small Firms in Developing Countries",
    author: "David McKenzie & Christopher Woodruff",
    year: "2017",
    theme: "Business practices",
    summary:
      "Measures business practices such as marketing, stock-keeping, record-keeping, and financial planning.",
    whyItMatters: "Provides a foundation for measuring management capital.",
    url: "https://www.nber.org/papers/w21505",
    createdAt: "2026-02-01",
  },
  {
    id: "src-5",
    title: "MSME Banking in the Digital Era",
    author: "International Finance Corporation (IFC)",
    year: "2022",
    theme: "Digital MSME banking",
    summary:
      "Explores how banks can serve MSMEs using digital tools and advanced lending strategies.",
    whyItMatters:
      "Shows opportunity to combine SME finance with better diagnostics.",
    createdAt: "2026-02-01",
  },
  {
    id: "src-6",
    title: "Poor Management and African Development",
    author: "CEPR / PEDL",
    year: "2019",
    theme: "African management capability",
    summary:
      "Discusses the role of management skills in African productivity and development.",
    whyItMatters:
      "Supports the research gap around management practices in African contexts.",
    createdAt: "2026-02-01",
  },
];
