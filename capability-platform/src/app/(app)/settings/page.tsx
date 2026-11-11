import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { PageHeader, Panel } from "@/components/ui/Page";
import { ROLE_LABELS } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function SettingsPage() {
  const user = await requireUser();
  const framework = await prisma.framework.findFirst({ where: { isDefault: true }, include: { dimensions: { orderBy: { order: "asc" }, include: { _count: { select: { questions: true } } } } } });

  const matrix: { action: string; roles: string }[] = [
    { action: "Edit assessment responses", roles: "Advisor, Programme Manager, Founder" },
    { action: "Finalise assessment", roles: "Advisor, Programme Manager" },
    { action: "Edit improvement plans", roles: "Advisor, Programme Manager" },
    { action: "Update implementation", roles: "Advisor, Programme Manager, Founder" },
    { action: "Submit evidence", roles: "Founder, Advisor" },
    { action: "Verify evidence", roles: "Independent Reviewer, Programme Manager" },
    { action: "Log advisory session", roles: "Advisor, Programme Manager" },
  ];

  return (
    <>
      <PageHeader title="Settings" subtitle={`Signed in as ${user.name} · ${ROLE_LABELS[user.activeRole] ?? user.activeRole}`} />
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Assessment framework">
          <p className="mb-3 text-sm text-ink-muted">{framework?.name} · v{framework?.version} (default). Dimension weights are equal by default; changing weights or versions is restricted to platform administrators and recorded for audit.</p>
          <table className="w-full text-sm">
            <thead><tr className="border-b border-navy/10"><th className="th">Dimension</th><th className="th">Weight</th><th className="th">Questions</th></tr></thead>
            <tbody>
              {framework?.dimensions.map((d) => (
                <tr key={d.id} className="border-b border-navy/5 last:border-0"><td className="td">{d.name}</td><td className="td text-ink-muted">{d.weight.toFixed(1)}</td><td className="td text-ink-muted">{d._count.questions}</td></tr>
              ))}
            </tbody>
          </table>
        </Panel>

        <Panel title="Role-based permissions (active)">
          <table className="w-full text-sm">
            <thead><tr className="border-b border-navy/10"><th className="th">Action</th><th className="th">Permitted roles</th></tr></thead>
            <tbody>
              {matrix.map((m) => (<tr key={m.action} className="border-b border-navy/5 last:border-0"><td className="td">{m.action}</td><td className="td text-ink-muted">{m.roles}</td></tr>))}
            </tbody>
          </table>
          <p className="mt-3 text-xs text-ink-muted">Platform administrators may perform any action. Organisation data is tenant-isolated.</p>
        </Panel>
      </div>

      <Panel title="Environment" className="mt-5">
        <p className="text-sm text-ink-muted">Demo build · SQLite persistence · all enterprises and metrics are fictional and labelled DEMO DATA. Reseed with <code className="rounded bg-surface-muted px-1">npm run db:reset</code>.</p>
      </Panel>
    </>
  );
}
