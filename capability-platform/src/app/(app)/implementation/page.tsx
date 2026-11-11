import { prisma } from "@/lib/prisma";
import { requireUser, can } from "@/lib/auth";
import { PageHeader, StatCard, Panel } from "@/components/ui/Page";
import { ImplementationBoard, type BoardItem } from "@/components/ImplementationBoard";

export const dynamic = "force-dynamic";

export default async function ImplementationPage() {
  const user = await requireUser();
  const milestones = await prisma.milestone.findMany({
    where: { plan: { company: { orgId: user.activeOrgId } } },
    include: { plan: { include: { company: true } } },
    orderBy: { dueDate: "asc" },
  });

  const items: BoardItem[] = milestones.map((m) => ({
    id: m.id,
    title: m.title,
    status: m.status,
    planTitle: m.plan.title,
    companyName: m.plan.company.tradingName ?? m.plan.company.legalName,
    companyId: m.plan.companyId,
    dueDate: m.dueDate ? m.dueDate.toISOString() : null,
    overdue: !!m.dueDate && m.dueDate < new Date(),
  }));

  const verified = items.filter((i) => i.status === "Verified").length;
  const overdue = items.filter((i) => i.overdue && !["Verified", "Rejected"].includes(i.status)).length;
  const inProgress = items.filter((i) => i.status === "In progress").length;

  return (
    <>
      <PageHeader
        title="Implementation Tracker"
        subtitle="Milestone-level tracking across the portfolio. Status changes persist and update dashboards. Task completion does not change a maturity score."
      />
      <div className="mb-5 grid gap-3 sm:grid-cols-4">
        <StatCard label="Total milestones" value={items.length} />
        <StatCard label="In progress" value={inProgress} tone="navy" />
        <StatCard label="Verified" value={verified} tone="ok" />
        <StatCard label="Overdue" value={overdue} tone={overdue ? "warn" : "ok"} />
      </div>
      <Panel>
        <ImplementationBoard items={items} canEdit={can(user, "implementation.update")} />
      </Panel>
    </>
  );
}
