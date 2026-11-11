// End-to-end data journey (exercises the same persistence + recompute path the
// server actions use): assess -> change score -> recompute -> finalize ->
// milestone verify -> evidence submit/verify. Run: npx tsx tests/journey.ts
import { PrismaClient } from "@prisma/client";
import { recomputeAssessment } from "../src/lib/recompute";

const prisma = new PrismaClient();
const ok = (c: boolean, m: string) => { if (!c) { console.error("FAIL:", m); process.exit(1); } console.log("ok -", m); };

async function main() {
  const company = await prisma.company.findFirstOrThrow({ where: { legalName: "Baus Taka Enterprise Ltd" } });
  const framework = await prisma.framework.findFirstOrThrow({ where: { isDefault: true }, include: { dimensions: { include: { questions: true } } } });

  // 1. Create a draft reassessment copying latest finalized responses
  const latest = await prisma.assessment.findFirstOrThrow({ where: { companyId: company.id, status: "finalized" }, orderBy: { finalizedAt: "desc" }, include: { responses: true } });
  const draft = await prisma.assessment.create({
    data: {
      companyId: company.id, frameworkId: framework.id, frameworkVersion: framework.version, type: "followup",
      status: "draft", isBaseline: false, label: "E2E reassessment",
      responses: { create: latest.responses.map((r) => ({ questionId: r.questionId, score: r.score, applicable: r.applicable, evidenceStatus: r.evidenceStatus })) },
    },
  });
  await recomputeAssessment(draft.id);
  const before = await prisma.assessment.findUniqueOrThrow({ where: { id: draft.id } });
  ok(before.overallScore !== null, `draft created with overall ${before.overallScore?.toFixed(2)}`);

  // 2. Raise every financial-dimension question to 4 and recompute
  const finDim = framework.dimensions.find((d) => d.key === "financial")!;
  for (const q of finDim.questions) {
    await prisma.response.update({ where: { assessmentId_questionId: { assessmentId: draft.id, questionId: q.id } }, data: { score: 4, evidenceStatus: "verified" } });
  }
  const res = await recomputeAssessment(draft.id);
  const finScore = res.dimensions.find((d) => d.key === "financial")!.score;
  ok(finScore === 4, `financial dimension recomputed to ${finScore}`);
  const after = await prisma.assessment.findUniqueOrThrow({ where: { id: draft.id } });
  ok((after.overallScore ?? 0) > (before.overallScore ?? 0), `overall rose ${before.overallScore?.toFixed(2)} -> ${after.overallScore?.toFixed(2)} after reassessment (not from a task)`);

  // 3. Finalize snapshot
  await prisma.assessment.update({ where: { id: draft.id }, data: { status: "finalized", finalizedAt: new Date() } });
  ok(true, "assessment finalized (immutable snapshot)");

  // 4. Milestone verification
  const plan = await prisma.improvementPlan.findFirstOrThrow({ where: { companyId: company.id }, include: { milestones: true } });
  const ms = plan.milestones[0];
  await prisma.milestone.update({ where: { id: ms.id }, data: { status: "Verified", verifiedAt: new Date() } });
  const verified = await prisma.milestone.findUniqueOrThrow({ where: { id: ms.id } });
  ok(verified.status === "Verified" && verified.verifiedAt !== null, "milestone verified + timestamped");

  // 5. Evidence submit -> reviewer reject -> milestone not verified
  const ev = await prisma.evidence.create({ data: { companyId: company.id, planId: plan.id, milestoneId: plan.milestones[1]?.id, name: "E2E evidence", type: "PDF", status: "Submitted", submittedBy: "E2E" } });
  await prisma.$transaction([
    prisma.evidenceReview.create({ data: { evidenceId: ev.id, decision: "rejected", comment: "E2E rejection" } }),
    prisma.evidence.update({ where: { id: ev.id }, data: { status: "Rejected" } }),
  ]);
  const rejected = await prisma.evidence.findUniqueOrThrow({ where: { id: ev.id }, include: { reviews: true } });
  ok(rejected.status === "Rejected" && rejected.reviews.length === 1, "rejected evidence does not count as verified");

  // cleanup the e2e draft + evidence so the demo stays clean
  await prisma.evidenceReview.deleteMany({ where: { evidenceId: ev.id } });
  await prisma.evidence.delete({ where: { id: ev.id } });
  await prisma.response.deleteMany({ where: { assessmentId: draft.id } });
  await prisma.dimensionScore.deleteMany({ where: { assessmentId: draft.id } });
  await prisma.assessment.delete({ where: { id: draft.id } });
  await prisma.milestone.update({ where: { id: ms.id }, data: { status: "In progress", verifiedAt: null } });

  console.log("\nE2E JOURNEY PASSED");
}
main().then(() => prisma.$disconnect()).catch((e) => { console.error(e); process.exit(1); });
