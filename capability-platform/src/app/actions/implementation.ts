"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, assertCompanyAccess, can } from "@/lib/auth";

async function audit(userId: string, orgId: string, entity: string, entityId: string, action: string, detail?: string) {
  await prisma.auditLog.create({ data: { userId, orgId, entity, entityId, action, detail } });
}

export async function updateMilestoneStatus(milestoneId: string, status: string) {
  const user = await requireUser();
  if (!can(user, "implementation.update")) throw new Error("FORBIDDEN");
  const ms = await prisma.milestone.findUnique({ where: { id: milestoneId }, include: { plan: { select: { companyId: true } } } });
  if (!ms) throw new Error("NOT_FOUND");
  await assertCompanyAccess(ms.plan.companyId, user);

  await prisma.milestone.update({
    where: { id: milestoneId },
    data: { status, verifiedAt: status === "Verified" ? new Date() : null },
  });
  await audit(user.id, user.activeOrgId, "Milestone", milestoneId, "status.change", status);
  revalidatePath("/implementation");
  revalidatePath(`/portfolio/${ms.plan.companyId}`);
}

export async function updatePlanStatus(planId: string, status: string) {
  const user = await requireUser();
  if (!can(user, "plan.edit")) throw new Error("FORBIDDEN");
  const plan = await prisma.improvementPlan.findUnique({ where: { id: planId }, select: { companyId: true } });
  if (!plan) throw new Error("NOT_FOUND");
  await assertCompanyAccess(plan.companyId, user);
  await prisma.improvementPlan.update({ where: { id: planId }, data: { status } });
  await audit(user.id, user.activeOrgId, "ImprovementPlan", planId, "status.change", status);
  revalidatePath("/implementation");
  revalidatePath(`/portfolio/${plan.companyId}`);
}

export async function createAdvisorySession(input: {
  companyId: string;
  priorityProblem: string;
  observations: string;
  decisions: string;
  actions: string;
  durationMins?: number;
}) {
  const user = await requireUser();
  if (!can(user, "session.create")) throw new Error("FORBIDDEN");
  await assertCompanyAccess(input.companyId, user);
  const session = await prisma.advisorySession.create({
    data: {
      companyId: input.companyId,
      advisorId: user.id,
      durationMins: input.durationMins ?? 60,
      priorityProblem: input.priorityProblem,
      observations: input.observations,
      decisions: input.decisions,
      actions: input.actions,
      nextReviewDate: new Date(Date.now() + 21 * 86400000),
    },
  });
  await audit(user.id, user.activeOrgId, "AdvisorySession", session.id, "create", input.companyId);
  revalidatePath(`/portfolio/${input.companyId}`);
  revalidatePath("/sessions");
}
