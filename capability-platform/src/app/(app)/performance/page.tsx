import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { PageHeader, Panel } from "@/components/ui/Page";
import { fmtNumber, pctChange } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function PerformancePage() {
  const user = await requireUser();
  const kpis = await prisma.companyKpi.findMany({
    where: { company: { orgId: user.activeOrgId } },
    include: { company: true, definition: true },
    orderBy: [{ company: { legalName: "asc" } }],
  });

  const byCategory: Record<string, typeof kpis> = {};
  for (const k of kpis) (byCategory[k.definition.category] ??= []).push(k);

  return (
    <>
      <PageHeader title="Business Performance" subtitle="Financial, commercial, operational and people indicators — measured separately from management maturity." />
      <div className="space-y-5">
        {Object.entries(byCategory).map(([cat, list]) => (
          <Panel key={cat} title={cat[0].toUpperCase() + cat.slice(1)}>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-navy/10">
                    <th className="th">Enterprise</th>
                    <th className="th">KPI</th>
                    <th className="th">Baseline</th>
                    <th className="th">Current</th>
                    <th className="th">Target</th>
                    <th className="th">Status</th>
                    <th className="th">Change</th>
                  </tr>
                </thead>
                <tbody>
                  {list.map((k) => {
                    const ch = pctChange(k.baseline, k.actual);
                    return (
                      <tr key={k.id} className="border-b border-navy/5 last:border-0">
                        <td className="td"><Link href={`/portfolio/${k.companyId}`} className="font-medium text-navy-700 hover:underline">{k.company.tradingName ?? k.company.legalName}</Link></td>
                        <td className="td">{k.definition.name} <span className="text-xs text-ink-muted">({k.definition.unit})</span></td>
                        <td className="td text-ink-muted">{k.baseline === null ? "—" : fmtNumber(k.baseline)}</td>
                        <td className="td">{k.actual === null ? "—" : fmtNumber(k.actual)}</td>
                        <td className="td text-ink-muted">{k.target === null ? "—" : fmtNumber(k.target)}</td>
                        <td className="td text-xs text-ink-muted">{k.dataStatus}</td>
                        <td className="td text-xs">{ch.value === null ? <span className="text-ink-muted">{ch.note}</span> : <span className={ch.value >= 0 ? "text-emerald-700" : "text-red-700"}>{ch.value >= 0 ? "+" : ""}{ch.value.toFixed(1)}%</span>}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </Panel>
        ))}
      </div>
    </>
  );
}
