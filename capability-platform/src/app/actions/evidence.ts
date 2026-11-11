"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireUser, assertCompanyAccess, can } from "@/lib/auth";

export async function submitEvidence(input: {
  companyId: string;
  planId?: string;
  milestoneId?: string;
  name: string;
  type: string;
  period?: string;
}) {
  const user = await requireUser();
  if (!can(user, "evidence.submit")) throw new Error("FORBIDDEN");
  await assertCompanyAccess(input.companyId, user);
  const ev = await prisma.evidence.create({
    data: {
      companyId: input.companyId,
      planId: input.planId,
      milestoneId: input.milestoneId,
      name: input.name,
      type: input.type,
      period: input.period,
      submittedBy: user.name,
      status: "Submitted",
    },
  });
  if (input.milestoneId) {
    await prisma.milestone.update({ where: { id: input.milestoneId }, data: { status: "Evidence submitted" } });
  }
  await prisma.auditLog.create({ data: { userId: user.id, orgId: user.activeOrgId, entity: "Evidence", entityId: ev.id, action: "submit", detail: input.name } });
  await prisma.notification.create({ data: { userId: null, title: "Evidence submitted", body: `${input.name} awaiting verification.` } });
  revalidatePath("/evidence");
  revalidatePath(`/portfolio/${input.companyId}`);
  return ev.id;
}

// Reviewer verifies / rejects / requests more info. Rejected evidence does NOT
// count linked practices as verified.
export async function reviewEvidence(input: { evidenceId: string; decision: "verified" | "rejected" | "more_info"; comment: string }) {
  const user = await requireUser();
  if (!can(user, "evidence.verify")) throw new Error("FORBIDDEN");
  const ev = await prisma.evidence.findUnique({ where: { id: input.evidenceId }, select: { companyId: true, milestoneId: true } });
  if (!ev) throw new Error("NOT_FOUND");
  await assertCompanyAccess(ev.companyId, user);

  const statusMap = { verified: "Verified", rejected: "Rejected", more_info: "More info required" } as const;
  await prisma.$transaction([
    prisma.evidenceReview.create({ data: { evidenceId: input.evidenceId, reviewerId: user.id, decision: input.decision, comment: input.comment } }),
    prisma.evidence.update({ where: { id: input.evidenceId }, data: { status: statusMap[input.decision] } }),
  ]);

  // Only a verified decision advances a linked milestone to Verified.
  if (ev.milestoneId) {
    if (input.decision === "verified") {
      await prisma.milestone.update({ where: { id: ev.milestoneId }, data: { status: "Verified", verifiedAt: new Date() } });
    } else if (input.decision === "rejected") {
      await prisma.milestone.update({ where: { id: ev.milestoneId }, data: { status: "Rejected" } });
    }
  }
  await prisma.auditLog.create({ data: { userId: user.id, orgId: user.activeOrgId, entity: "Evidence", entityId: input.evidenceId, action: `review.${input.decision}`, detail: input.comment } });
  revalidatePath("/evidence");
  revalidatePath(`/portfolio/${ev.companyId}`);
}
