"use server";

import crypto from "crypto";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { recomputeAssessment } from "@/lib/recompute";
import { ensurePublicOrg, ensureFramework } from "@/lib/install";

const t = (v: FormDataEntryValue | null) => String(v ?? "").trim();

// Public, self-serve entry: a founder starts their own assessment from the
// website. Creates an enterprise under the public-intake organisation and sends
// them straight into the self-assessment. No account required.
export async function startPublicAssessment(formData: FormData) {
  const business = t(formData.get("business"));
  if (!business) redirect("/start?error=1");
  const org = await ensurePublicOrg(prisma);
  await ensureFramework(prisma);
  const token = crypto.randomBytes(16).toString("hex");
  const company = await prisma.company.create({
    data: {
      orgId: org.id,
      legalName: business,
      tradingName: business,
      country: t(formData.get("country")) || "—",
      sector: t(formData.get("sector")) || "—",
      founderName: t(formData.get("founderName")) || null,
      founderEmail: t(formData.get("email")) || null,
      isDemo: false,
      scenarioTag: "Public self-assessment",
      inviteToken: token,
    },
  });
  await prisma.auditLog.create({ data: { orgId: org.id, entity: "Company", entityId: company.id, action: "public.start", detail: business } });
  redirect(`/assess/${token}`);
}

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
