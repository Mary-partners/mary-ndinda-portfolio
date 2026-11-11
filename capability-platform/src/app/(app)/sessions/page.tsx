import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser, can } from "@/lib/auth";
import { PageHeader, Panel, StatCard } from "@/components/ui/Page";
import { SessionForm } from "@/components/SessionForm";
import { fmtDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function SessionsPage() {
  const user = await requireUser();
  const [sessions, companies, advisors] = await Promise.all([
    prisma.advisorySession.findMany({ where: { company: { orgId: user.activeOrgId } }, include: { company: true, advisor: true }, orderBy: { date: "desc" } }),
    prisma.company.findMany({ where: { orgId: user.activeOrgId }, select: { id: true, legalName: true, tradingName: true }, orderBy: { legalName: "asc" } }),
    prisma.user.findMany({ where: { memberships: { some: { orgId: user.activeOrgId, role: "ADVISOR" } } }, include: { advisedCompanies: { where: { orgId: user.activeOrgId } } } }),
  ]);

  const overdueActions = sessions.filter((s) => s.nextReviewDate && s.nextReviewDate < new Date()).length;

  return (
    <>
      <PageHeader title="Advisory Sessions" subtitle="Chronological advisory journal and advisor workload across the portfolio." actions={can(user, "session.create") ? <SessionForm companies={companies.map((c) => ({ id: c.id, name: c.tradingName ?? c.legalName }))} /> : undefined} />

      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <StatCard label="Sessions logged" value={sessions.length} />
        <StatCard label="Advisors" value={advisors.length} />
        <StatCard label="Overdue follow-ups" value={overdueActions} tone={overdueActions ? "warn" : "ok"} />
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_320px]">
        <Panel title="Advisory journal">
          <ul className="space-y-3">
            {sessions.map((s) => (
              <li key={s.id} className="rounded-lg border border-navy/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <Link href={`/portfolio/${s.companyId}`} className="font-medium text-navy-700 hover:underline">{s.company.tradingName ?? s.company.legalName}</Link>
                  <span className="text-xs text-ink-muted">{fmtDate(s.date)} · {s.advisor?.name}</span>
                </div>
                <p className="mt-1 text-sm font-medium text-ink">{s.priorityProblem}</p>
                {s.observations && <p className="mt-1 text-xs text-ink-muted"><strong>Observations:</strong> {s.observations}</p>}
                {s.actions && <p className="mt-1 text-xs text-ink-muted"><strong>Actions:</strong> {s.actions}</p>}
                {s.nextReviewDate && <p className="mt-1 text-xs text-gold-700">Next review {fmtDate(s.nextReviewDate)}</p>}
              </li>
            ))}
            {sessions.length === 0 && <p className="text-sm text-ink-muted">No sessions yet.</p>}
          </ul>
        </Panel>

        <Panel title="Advisor workload">
          <ul className="space-y-2">
            {advisors.map((a) => (
              <li key={a.id} className="flex items-center justify-between rounded-lg bg-surface-muted p-3 text-sm">
                <span className="font-medium text-navy-700">{a.name}</span>
                <span className="text-ink-muted">{a.advisedCompanies.length} enterprises</span>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </>
  );
}
