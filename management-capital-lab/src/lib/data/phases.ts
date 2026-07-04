import type { ResearchPhase } from "../types";

export const RESEARCH_PHASES: ResearchPhase[] = [
  {
    id: "phase-1",
    phase: 1,
    title: "Topic Approval",
    status: "Completed",
    description: "Research topic approved and public lab launched.",
    order: 1,
  },
  {
    id: "phase-2",
    phase: 2,
    title: "Literature Review",
    status: "In Progress",
    description:
      "Reviewing SME finance, management practices, investment readiness, and capital absorption literature.",
    order: 2,
  },
  {
    id: "phase-3",
    phase: 3,
    title: "Framework Design",
    status: "In Progress",
    description:
      "Defining the Management Capital Index dimensions, indicators, and scoring logic.",
    order: 3,
  },
  {
    id: "phase-4",
    phase: 4,
    title: "Stakeholder Contributions",
    status: "Open",
    description:
      "Collecting insights from founders, banks, advisors, investors, researchers, and ESOs.",
    order: 4,
  },
  {
    id: "phase-5",
    phase: 5,
    title: "Diagnostic Prototype",
    status: "Upcoming",
    description:
      "Building and testing the first version of the Management Capital diagnostic tool.",
    order: 5,
  },
  {
    id: "phase-6",
    phase: 6,
    title: "Interviews and Case Studies",
    status: "Upcoming",
    description:
      "Conducting interviews and developing anonymized SME case studies.",
    order: 6,
  },
  {
    id: "phase-7",
    phase: 7,
    title: "Analysis and Validation",
    status: "Upcoming",
    description:
      "Testing whether management capital predicts investment readiness and growth outcomes.",
    order: 7,
  },
  {
    id: "phase-8",
    phase: 8,
    title: "Findings and Publications",
    status: "Upcoming",
    description:
      "Publishing research insights, reports, articles, tools, and practical recommendations.",
    order: 8,
  },
];

export const RESEARCH_PROGRESS = 18; // percent

export const CURRENT_FOCUS = {
  title: "What I'm working on now",
  body: "Mapping the indicator set for the Financial Management Capability and Capital Absorption pillars, and reconciling them against the business-practices literature. In parallel, I'm gathering practitioner post-its on what 'investment-ready' really means beyond a pitch deck.",
  updated: "2026-06-30",
};
