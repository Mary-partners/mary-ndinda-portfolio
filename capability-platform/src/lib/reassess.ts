import { prisma } from "./prisma";

// A founder completes the diagnostic, then reassesses on a fixed cadence so we
// can track progress over time rather than re-scoring the same moment twice.
export const REASSESS_WINDOW_DAYS = 90;

export interface ReassessGate {
  hasAssessment: boolean;
  canStart: boolean; // true for a first assessment, or once the window has elapsed
  nextEligibleAt: Date | null;
  lastAt: Date | null;
}

// Pure computation from the last finalized date (reused where we already hold it).
export function reassessFrom(lastAt: Date | null | undefined): ReassessGate {
  if (!lastAt) return { hasAssessment: false, canStart: true, nextEligibleAt: null, lastAt: null };
  const nextEligibleAt = new Date(lastAt.getTime() + REASSESS_WINDOW_DAYS * 24 * 60 * 60 * 1000);
  return { hasAssessment: true, canStart: Date.now() >= nextEligibleAt.getTime(), nextEligibleAt, lastAt };
}

// Server-side gate: looks up the company's most recent finalized assessment.
export async function getReassessGate(companyId: string): Promise<ReassessGate> {
  const last = await prisma.assessment.findFirst({
    where: { companyId, status: "finalized" },
    orderBy: { finalizedAt: "desc" },
    select: { finalizedAt: true },
  });
  return reassessFrom(last?.finalizedAt ?? null);
}
