import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser, can } from "@/lib/auth";
import { latestAssessments } from "@/lib/portfolio";
import { PageHeader, Panel, EmptyState } from "@/components/ui/Page";
import { Badge } from "@/components/ui/Badge";
import { fmtIndex, maturityBand, fmtNumber } from "@/lib/utils";
import { CompanyForm } from "@/components/forms/CompanyForm";

export const dynamic = "force-dynamic";

export default async function PortfolioPage() {
  const user = await requireUser();
  const rows = await latestAssessments(user.activeOrgId);
  const canManage = can(user, "company.manage");
  const programmes = canManage
    ? await prisma.programme.findMany({ where: { orgId: user.activeOrgId }, orderBy: { createdAt: "desc" }, select: { id: true, name: true } })
    : [];

  return (
    <>
      <PageHeader
        title="Enterprise Portfolio"
        subtitle={`${rows.length} ${rows.length === 1 ? "enterprise" : "enterprises"} in the active organisation. Click any enterprise for its full capability profile.`}
        actions={canManage ? <CompanyForm programmes={programmes} /> : undefined}
      />
      {rows.length === 0 ? (
        <EmptyState
          title="No enterprises yet"
          description={canManage ? "Add your first SME to begin diagnostics, improvement planning and implementation tracking." : "No enterprises have been added to this organisation yet."}
        />
      ) : (
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-navy/10">
                <th className="th">Enterprise</th>
                <th className="th">Country</th>
                <th className="th">Sector</th>
                <th className="th">Stage</th>
                <th className="th">Advisor</th>
                <th className="th">Index</th>
                <th className="th">Readiness</th>
                <th className="th">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ company, latest }) => {
                const band = maturityBand(latest?.overallScore);
                return (
                  <tr key={company.id} className="border-b border-navy/5 last:border-0 hover:bg-surface-muted">
                    <td className="td">
                      <Link href={`/portfolio/${company.id}`} className="font-medium text-navy-700 hover:underline">
                        {company.tradingName ?? company.legalName}
                      </Link>
                      <div className="text-xs text-ink-muted">{company.scenarioTag}</div>
                    </td>
                    <td className="td text-ink-muted">{company.country}</td>
                    <td className="td text-ink-muted">{company.sector}</td>
                    <td className="td text-ink-muted">{company.stage}</td>
                    <td className="td text-ink-muted">{company.advisor?.name ?? "—"}</td>
                    <td className="td font-medium">{fmtIndex(latest?.overallScore)}</td>
                    <td className="td"><Badge tone={band.tone as "ok" | "warn" | "bad" | "neutral"}>{band.label}</Badge></td>
                    <td className="td text-ink-muted">{company.employees ? `${fmtNumber(company.employees)} staff` : "—"}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </Panel>
      )}
    </>
  );
}
