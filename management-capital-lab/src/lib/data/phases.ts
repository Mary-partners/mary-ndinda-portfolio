import type { ResearchPhase } from "../types";

/**
 * The research journey follows the thesis structure set out in Chapter One
 * (section 1.19) and the exploratory sequential mixed-methods design refined
 * in Chapter Two (section 2.6.8): qualitative construct development first,
 * then instrument testing, then the main Kenya–South Africa survey, then
 * explanatory follow-up.
 */
export const RESEARCH_PHASES: ResearchPhase[] = [
  {
    id: "phase-1",
    phase: 1,
    title: "Topic Approval and Chapter One",
    status: "Completed",
    milestone: "Chapter One (Introduction) completed · August 2026",
    description:
      "Research topic approved and public lab launched. Chapter One defines the diagnosis gap, the six-dimension management-capital construct, seven objectives, seven research questions and six provisional hypotheses.",
    href: "/findings#chapter-one",
    order: 1,
  },
  {
    id: "phase-2",
    phase: 2,
    title: "Literature Review (Chapter Two)",
    status: "Submitted",
    milestone: "Formal submission draft · November 2026",
    description:
      "Critical review of 64 verified articles across theory, management practices, capital-use experiments, SME finance, human capital, strategy, governance, absorptive capacity and African SME evidence. Kenya and South Africa confirmed as the comparative markets.",
    href: "/findings#chapter-two",
    order: 2,
  },
  {
    id: "phase-3",
    phase: 3,
    title: "Framework Design",
    status: "In Progress",
    milestone: "Conceptual model and hypotheses drafted",
    description:
      "The conceptual model, hypotheses H1–H6 and measurement proposition MP1 are set. Next: turning the six provisional dimensions into a construct map and behaviourally anchored items, keeping deployment readiness separate from realised absorption.",
    href: "/framework",
    order: 3,
  },
  {
    id: "phase-4",
    phase: 4,
    title: "Research Design and Ethics (Chapter Three)",
    status: "Upcoming",
    description:
      "Final sampling, country and sector boundaries, data collection, analysis plan, validity and reliability safeguards, ethics and data protection for the Kenya–South Africa study.",
    order: 4,
  },
  {
    id: "phase-5",
    phase: 5,
    title: "Stakeholder Contributions",
    status: "Open",
    description:
      "Collecting insights from founders, banks, advisors, investors, researchers and ESOs. Public post-its inform language and candidate indicators; they are kept separate from formal study data.",
    order: 5,
  },
  {
    id: "phase-6",
    phase: 6,
    title: "Qualitative Construct Development",
    status: "Upcoming",
    description:
      "Interviews with founders, capital providers, accountants, advisers and ESOs in Kenya and South Africa, including what actually happens to capital after it arrives.",
    order: 6,
  },
  {
    id: "phase-7",
    phase: 7,
    title: "Instrument Testing and Diagnostic Prototype",
    status: "Upcoming",
    description:
      "Expert review, cognitive interviews and a pilot of the Management Capital Index questionnaire, followed by the first diagnostic prototype.",
    order: 7,
  },
  {
    id: "phase-8",
    phase: 8,
    title: "Main Survey and Validation",
    status: "Upcoming",
    description:
      "A main survey of roughly 600 SMEs across Kenya and South Africa: factor structure, reliability, measurement invariance across countries, and tests of the hypothesised pathways.",
    order: 8,
  },
  {
    id: "phase-9",
    phase: 9,
    title: "Findings and Publications",
    status: "Upcoming",
    description:
      "Explanatory follow-up interviews, then the findings chapters, practical recommendations, tools and publications.",
    order: 9,
  },
];

export const RESEARCH_PROGRESS = 25; // percent

export const RESEARCH_PROGRESS_NOTE =
  "Chapters One and Two are drafted. Next: the framework's construct map and the Chapter Three research design.";

export const CURRENT_FOCUS = {
  title: "What I'm working on now",
  body: "Chapter Two is in. I'm now turning its conceptual model into the Chapter Three research design for Kenya and South Africa, and building the construct map that keeps capital-deployment readiness (before funding) separate from realised capital absorption (after funding). In parallel, I'm growing the literature base from 64 towards 80 articles, prioritising Kenya- and South Africa-specific studies, investor readiness and post-funding behaviour.",
  updated: "2026-11-12",
};
