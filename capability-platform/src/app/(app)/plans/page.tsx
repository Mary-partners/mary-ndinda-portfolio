import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { PageHeader, Panel } from "@/components/ui/Page";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { fmtScore, fmtDate } from "@/lib/utils";
import { DIMENSION_NAME } from "@/lib/constants";

export const dynamic = "force-dynamic";

export default async function PlansPage() {
  const user = await requireUser();
  const plans = await prisma.improvementPlan.findMany({
    where: { company: { orgId: user.activeOrgId } },
    include: { company: true, milestones: true },
    orderBy: [{ priority: "asc" }, { createdAt: "desc" }],
  });

  return (
    <>
      <PageHeader title="Improvement Plans" subtitle="Targeted management interventions — no more than three priorities per enterprise by default." />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy/10">
                <th className="th">Enterprise</th>
                <th className="th">Intervention</th>
                <th className="th">Dimension</th>
                <th className="th">Priority</th>
                <th className="th">Baseline → Target</th>
                <th className="th">Milestones</th>
                <th className="th">Status</th>
                <th className="th">Due</th>
              </tr>
            </thead>
            <tbody>
              {plans.map((p) => {
                const verified = p.milestones.filter((m) => m.status === "Verified").length;
                return (
                  <tr key={p.id} className="border-b border-navy/5 last:border-0">
                    <td className="td"><Link href={`/portfolio/${p.companyId}`} className="font-medium text-navy-700 hover:underline">{p.company.tradingName ?? p.company.legalName}</Link></td>
                    <td className="td">{p.title}<div className="text-xs text-ink-muted">{p.intervention}</div></td>
                    <td className="td text-ink-muted">{DIMENSION_NAME[p.dimensionKey] ?? p.dimensionKey}</td>
                    <td className="td"><Badge tone="navy">P{p.priority}</Badge></td>
                    <td className="td text-ink-muted">{fmtScore(p.baselineScore)} → {fmtScore(p.targetScore)}</td>
                    <td className="td text-ink-muted">{verified}/{p.milestones.length} verified</td>
                    <td className="td"><StatusBadge status={p.status} /></td>
                    <td className="td text-ink-muted">{fmtDate(p.dueDate)}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
