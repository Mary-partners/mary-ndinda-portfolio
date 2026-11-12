import { prisma } from "@/lib/prisma";
import { requireUser, can } from "@/lib/auth";
import { PageHeader, Panel, StatCard, EmptyState } from "@/components/ui/Page";
import { StatusBadge } from "@/components/ui/Badge";
import { ROLE_LABELS } from "@/lib/constants";
import { fmtDate, fmtNumber } from "@/lib/utils";
import { ProgrammeForm } from "@/components/forms/ProgrammeForm";
import { OrgForm } from "@/components/forms/OrgForm";
import { UserForm } from "@/components/forms/UserForm";

export const dynamic = "force-dynamic";

export default async function OrganisationsPage() {
  const user = await requireUser();
  const org = await prisma.organisation.findUnique({
    where: { id: user.activeOrgId },
    include: {
      programmes: { orderBy: { createdAt: "desc" }, include: { _count: { select: { companies: true } } } },
      memberships: { include: { user: { select: { name: true, email: true, title: true } } } },
      _count: { select: { companies: true, memberships: true } },
    },
  });
  if (!org) return null;

  const canProg = can(user, "programme.manage");
  const canOrg = can(user, "org.manage");
  const canUser = can(user, "user.manage");

  // Unique members by user (a user may hold more than one role in the org).
  const memberMap = new Map<string, { name: string; email: string; title: string | null; roles: string[] }>();
  for (const m of org.memberships) {
    const key = m.user.email;
    const cur = memberMap.get(key) ?? { name: m.user.name, email: m.user.email, title: m.user.title, roles: [] };
    cur.roles.push(m.role);
    memberMap.set(key, cur);
  }
  const members = [...memberMap.values()];

  return (
    <>
      <PageHeader
        title="Organisations & Programmes"
        subtitle={`${org.name} · ${org.type} · ${org.country}`}
        actions={<div className="flex flex-wrap items-center gap-2">{canOrg && <OrgForm />}{canProg && <ProgrammeForm />}</div>}
      />
      <div className="mb-5 grid gap-3 sm:grid-cols-3">
        <StatCard label="Enterprises" value={org._count.companies} />
        <StatCard label="Programmes" value={org.programmes.length} />
        <StatCard label="Team members" value={members.length} />
      </div>

      <Panel title="Programmes">
        {org.programmes.length === 0 ? (
          <EmptyState title="No programmes yet" description={canProg ? "Create your first programme to start enrolling enterprises." : "No programmes have been created in this organisation."} />
        ) : (
          <div className="space-y-3">
            {org.programmes.map((p) => (
              <div key={p.id} className="rounded-lg border border-navy/10 bg-white p-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-navy-700">{p.name}</h3>
                  <StatusBadge status={p.status} />
                </div>
                {p.objectives && <p className="mt-1 text-sm text-ink-muted">{p.objectives}</p>}
                <div className="mt-2 flex flex-wrap gap-4 text-xs text-ink-muted">
                  {p.fundingPartner && <span>Funder: {p.fundingPartner}</span>}
                  {(p.startDate || p.endDate) && <span>{fmtDate(p.startDate)} → {fmtDate(p.endDate)}</span>}
                  <span>Target: {p.targetEnterprises ?? "—"} · Enrolled: {p._count.companies}</span>
                  <span>Budget: {p.budget ? fmtNumber(p.budget) : "—"}</span>
                  {p.reportingCadence && <span>Cadence: {p.reportingCadence}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
      </Panel>

      <Panel title="Team" className="mt-5" actions={canUser ? <UserForm /> : undefined}>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-navy/10"><th className="th">Name</th><th className="th">Email</th><th className="th">Role(s)</th></tr></thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.email} className="border-b border-navy/5 last:border-0">
                  <td className="td">{m.name}{m.title ? <span className="text-ink-muted"> · {m.title}</span> : null}</td>
                  <td className="td text-ink-muted">{m.email}</td>
                  <td className="td text-ink-muted">{m.roles.map((r) => ROLE_LABELS[r] ?? r).join(", ")}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      <p className="mt-4 text-xs text-ink-muted">Data is strictly isolated per organisation — the org switcher (top right, for multi-org users) changes the entire workspace.</p>
    </>
  );
}
