import { prisma } from "@/lib/prisma";
import { requireUser, can } from "@/lib/auth";
import { PageHeader, StatCard, Panel } from "@/components/ui/Page";
import { EvidenceReviewer, type EvidenceItem } from "@/components/EvidenceReviewer";

export const dynamic = "force-dynamic";

export default async function EvidencePage() {
  const user = await requireUser();
  const evidence = await prisma.evidence.findMany({
    where: { company: { orgId: user.activeOrgId } },
    include: { company: true, plan: true, reviews: { orderBy: { createdAt: "desc" } } },
    orderBy: { createdAt: "desc" },
  });

  const items: EvidenceItem[] = evidence.map((e) => ({
    id: e.id,
    name: e.name,
    type: e.type,
    period: e.period,
    status: e.status,
    submittedBy: e.submittedBy,
    createdAt: e.createdAt.toISOString(),
    companyName: e.company.tradingName ?? e.company.legalName,
    companyId: e.companyId,
    planTitle: e.plan?.title ?? null,
    reviews: e.reviews.map((r) => ({ decision: r.decision, comment: r.comment, createdAt: r.createdAt.toISOString() })),
  }));

  const verified = items.filter((i) => i.status === "Verified").length;
  const pending = items.filter((i) => ["Submitted", "Under review"].includes(i.status)).length;
  const moreInfo = items.filter((i) => i.status === "More info required").length;

  return (
    <>
      <PageHeader
        title="Evidence & Verification"
        subtitle="Reviewer workspace. Evidence submitted is not implementation verified; verified is not sustained adoption."
      />
      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        <StatCard label="Evidence items" value={items.length} />
        <StatCard label="Awaiting review" value={pending} tone={pending ? "warn" : "ok"} />
        <StatCard label="More info required" value={moreInfo} tone={moreInfo ? "warn" : "navy"} />
        <StatCard label="Verified" value={verified} tone="ok" />
      </div>
      <Panel>
        <EvidenceReviewer items={items} canVerify={can(user, "evidence.verify")} />
      </Panel>
    </>
  );
}
