import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { latestAssessments } from "@/lib/portfolio";
import { prisma } from "@/lib/prisma";
import { PageHeader, Panel } from "@/components/ui/Page";
import { StatusBadge } from "@/components/ui/Badge";
import { fmtScore, fmtDate } from "@/lib/utils";

export const dynamic = "force-dynamic";

export default async function DiagnosticsPage() {
  const user = await requireUser();
  const rows = await latestAssessments(user.activeOrgId);
  const drafts = await prisma.assessment.findMany({ where: { company: { orgId: user.activeOrgId }, status: "draft" }, select: { companyId: true } });
  const draftSet = new Set(drafts.map((d) => d.companyId));

  return (
    <>
      <PageHeader title="Management Diagnostics" subtitle="Guided, evidence-based assessments across eight management capability dimensions." />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy/10">
                <th className="th">Enterprise</th>
                <th className="th">Latest assessment</th>
                <th className="th">Finalised</th>
                <th className="th">Overall</th>
                <th className="th">Completeness</th>
                <th className="th"></th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ company, latest }) => (
                <tr key={company.id} className="border-b border-navy/5 last:border-0">
                  <td className="td font-medium text-navy-700">{company.tradingName ?? company.legalName}</td>
                  <td className="td">{latest ? <StatusBadge status="Verified" /> : <span className="text-ink-muted">Not assessed</span>}{draftSet.has(company.id) && <span className="ml-2 text-xs text-amber-700">draft open</span>}</td>
                  <td className="td text-ink-muted">{fmtDate(latest?.finalizedAt)}</td>
                  <td className="td font-medium">{fmtScore(latest?.overallScore)}</td>
                  <td className="td text-ink-muted">{Math.round((latest?.completeness ?? 0) * 100)}%</td>
                  <td className="td text-right">
                    <Link href={`/portfolio/${company.id}/diagnostic`} className="text-xs font-medium text-navy-600 hover:underline">Open diagnostic</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>
    </>
  );
}
