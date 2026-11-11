import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { PageHeader, Panel, StatCard } from "@/components/ui/Page";
import { StatusBadge } from "@/components/ui/Badge";
import { fmtDate, fmtNumber } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function OrganisationsPage() {
  const user = await requireUser();
  const org = await prisma.organisation.findUnique({
    where: { id: user.activeOrgId },
    include: {
      programmes: { include: { _count: { select: { companies: true } } } },
      _count: { select: { companies: true, memberships: true } },
    },
  });
  if (!org) return null;

  return (
    <>
      <PageHeader title="Organisations & Programmes" subtitle={`${org.name} · ${org.type} · ${org.country}`} />
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <StatCard label="Enterprises" value={org._count.companies} />
        <StatCard label="Programmes" value={org.programmes.length} />
        <StatCard label="Team members" value={org._count.memberships} />
      </div>
      <Panel title="Programmes">
        <div className="space-y-3">
          {org.programmes.map((p) => (
            <div key={p.id} className="rounded-lg border border-navy/10 bg-white p-4">
              <div className="flex items-center justify-between">
                <h3 className="font-semibold text-navy-700">{p.name}</h3>
                <StatusBadge status={p.status} />
              </div>
              <p className="mt-1 text-sm text-ink-muted">{p.objectives}</p>
              <div className="mt-2 flex flex-wrap gap-4 text-xs text-ink-muted">
                <span>Funder: {p.fundingPartner}</span>
                <span>{fmtDate(p.startDate)} → {fmtDate(p.endDate)}</span>
                <span>Target: {p.targetEnterprises} · Enrolled: {p._count.companies}</span>
                <span>Budget: {p.budget ? `$${fmtNumber(p.budget)}` : "—"}</span>
                <span>Framework v{p.frameworkVersion}</span>
                <span>Cadence: {p.reportingCadence}</span>
              </div>
            </div>
          ))}
        </div>
      </Panel>
      <p className="mt-4 text-xs text-ink-muted">You are viewing one organisation. Data is strictly isolated — the org switcher (top right, for multi-org users) changes the entire workspace.</p>
    </>
  );
}
