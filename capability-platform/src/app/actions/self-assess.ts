"use server";

import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { recomputeAssessment } from "@/lib/recompute";

export interface SelfResponse {
  questionId: string;
  score: number | null;
  applicable: boolean;
  hasEvidence: boolean;
}

// Anonymous self-assessment submission — access is the tokenised link only.
// Responses are recorded as self-reported (evidence is "claimed" at most, never
// "verified"), so they flow into analytics as maturity but add no verified
// evidence until an independent reviewer confirms it.
export async function submitSelfAssessment(token: string, founderName: string, responses: SelfResponse[]) {
  const company = await prisma.company.findUnique({ where: { inviteToken: token }, select: { id: true, founderName: true } });
  if (!company) redirect("/assess/invalid");

  const framework = await prisma.framework.findFirst({
    where: { isDefault: true },
    include: { dimensions: { include: { questions: { select: { id: true } } } } },
  });
  if (!framework) redirect("/assess/invalid");

  const validIds = new Set(framework.dimensions.flatMap((d) => d.questions.map((q) => q.id)));

  const priorFinal = await prisma.assessment.count({ where: { companyId: company.id, status: "finalized" } });

  const assessment = await prisma.assessment.create({
    data: {
      companyId: company.id,
      frameworkId: framework.id,
      frameworkVersion: framework.version,
      type: "self",
      assessorRole: "FOUNDER",
      status: "finalized",
      isBaseline: priorFinal === 0,
      label: "Founder self-assessment",
      finalizedAt: new Date(),
    },
  });

  const rows = responses
    .filter((r) => validIds.has(r.questionId))
    .filter((r) => !r.applicable || (r.score !== null && r.score !== undefined))
    .map((r) => ({
      assessmentId: assessment.id,
      questionId: r.questionId,
      score: r.applicable ? r.score : null,
      applicable: r.applicable,
      // Self-reported: never "verified". A reviewer must confirm evidence separately.
      evidenceStatus: r.applicable && r.score !== null && r.hasEvidence ? "claimed" : "none",
      confidence: "medium",
    }));
  if (rows.length) await prisma.response.createMany({ data: rows });

  await recomputeAssessment(assessment.id);

  const name = founderName.trim();
  if (name && !company.founderName) {
    await prisma.company.update({ where: { id: company.id }, data: { founderName: name } });
  }

  await prisma.auditLog.create({ data: { entity: "Assessment", entityId: assessment.id, action: "self-assessment.submit", detail: company.id } });

  redirect(`/assess/${token}/done`);
}
