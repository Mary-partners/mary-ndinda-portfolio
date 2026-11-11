"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireUser, assertCompanyAccess, can } from "@/lib/auth";
import { recomputeAssessment } from "@/lib/recompute";

async function audit(userId: string | null, orgId: string | null, entity: string, entityId: string, action: string, detail?: string) {
  await prisma.auditLog.create({ data: { userId, orgId, entity, entityId, action, detail } });
}

// Save a single response and recompute the assessment live.
export async function saveResponse(input: {
  assessmentId: string;
  questionId: string;
  score: number | null;
  applicable: boolean;
  evidenceStatus?: string;
  confidence?: string;
  rationale?: string;
}) {
  const user = await requireUser();
  if (!can(user, "assessment.edit")) throw new Error("FORBIDDEN");
  const assessment = await prisma.assessment.findUnique({ where: { id: input.assessmentId }, select: { companyId: true, status: true } });
  if (!assessment) throw new Error("NOT_FOUND");
  await assertCompanyAccess(assessment.companyId, user);
  if (assessment.status === "finalized") throw new Error("Assessment is finalised and immutable. Create a reassessment to make changes.");

  await prisma.response.upsert({
    where: { assessmentId_questionId: { assessmentId: input.assessmentId, questionId: input.questionId } },
    create: {
      assessmentId: input.assessmentId,
      questionId: input.questionId,
      score: input.score,
      applicable: input.applicable,
      evidenceStatus: input.evidenceStatus ?? "none",
      confidence: input.confidence,
      rationale: input.rationale,
    },
    update: {
      score: input.score,
      applicable: input.applicable,
      evidenceStatus: input.evidenceStatus,
      confidence: input.confidence,
      rationale: input.rationale,
    },
  });

  const result = await recomputeAssessment(input.assessmentId);
  await audit(user.id, user.activeOrgId, "Assessment", input.assessmentId, "response.save", `q=${input.questionId} score=${input.score}`);
  revalidatePath(`/portfolio/${assessment.companyId}`);
  return { overall: result.overall, completeness: result.completeness };
}

// Create a new draft reassessment, copying current responses from the latest finalized assessment.
export async function createReassessment(companyId: string) {
  const user = await requireUser();
  if (!can(user, "assessment.edit")) throw new Error("FORBIDDEN");
  await assertCompanyAccess(companyId, user);

  const framework = await prisma.framework.findFirst({ where: { isDefault: true } });
  if (!framework) throw new Error("No default framework");

  const latest = await prisma.assessment.findFirst({
    where: { companyId, status: "finalized" },
    orderBy: { finalizedAt: "desc" },
    include: { responses: true },
  });

  const draft = await prisma.assessment.create({
    data: {
      companyId,
      frameworkId: framework.id,
      frameworkVersion: framework.version,
      type: "followup",
      assessorRole: user.activeRole,
      status: "draft",
      isBaseline: false,
      createdById: user.id,
      label: "Reassessment",
      responses: latest
        ? {
            create: latest.responses.map((r) => ({
              questionId: r.questionId,
              score: r.score,
              applicable: r.applicable,
              evidenceStatus: r.evidenceStatus,
              confidence: r.confidence,
            })),
          }
        : undefined,
    },
  });
  if (latest) await recomputeAssessment(draft.id);
  await audit(user.id, user.activeOrgId, "Assessment", draft.id, "reassessment.create", `company=${companyId}`);
  revalidatePath(`/portfolio/${companyId}`);
  return draft.id;
}

// Form-friendly: start (or resume) a reassessment and go to the diagnostic.
export async function startReassessment(companyId: string) {
  const existingDraft = await prisma.assessment.findFirst({ where: { companyId, status: "draft" }, select: { id: true } });
  const id = existingDraft?.id ?? (await createReassessment(companyId));
  redirect(`/portfolio/${companyId}/diagnostic?assessment=${id}`);
}

export async function finalizeAssessment(assessmentId: string) {
  const user = await requireUser();
  if (!can(user, "assessment.finalize")) throw new Error("FORBIDDEN");
  const a = await prisma.assessment.findUnique({ where: { id: assessmentId }, select: { companyId: true, status: true } });
  if (!a) throw new Error("NOT_FOUND");
  await assertCompanyAccess(a.companyId, user);
  if (a.status === "finalized") return;
  await recomputeAssessment(assessmentId);
  await prisma.assessment.update({ where: { id: assessmentId }, data: { status: "finalized", finalizedAt: new Date() } });
  await audit(user.id, user.activeOrgId, "Assessment", assessmentId, "finalize");
  revalidatePath(`/portfolio/${a.companyId}`);
}
