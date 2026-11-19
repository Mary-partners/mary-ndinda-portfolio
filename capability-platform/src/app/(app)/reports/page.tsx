import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { PageHeader, Panel, EmptyState } from "@/components/ui/Page";
import { BASE_PATH } from "@/lib/constants";
import { FileText, Download, PieChart } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const user = await requireUser();
  const companies = user.activeOrgId
    ? await prisma.company.findMany({ where: { orgId: user.activeOrgId }, select: { id: true, legalName: true, tradingName: true }, orderBy: { legalName: "asc" } })
    : [];

  return (
    <>
      <PageHeader title="Reports & Exports" subtitle="Download branded PDF reports — diagnostic reports per enterprise, and a portfolio summary." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Enterprise diagnostic reports (PDF)">
          <p className="mb-3 text-sm text-ink-muted">An investment-committee-ready PDF per enterprise: profile, overall maturity, capability breakdown, priority recommendations, constraints, performance and limitations.</p>
          {companies.length === 0 ? (
            <EmptyState title="No enterprises yet" description="Add an enterprise to generate its diagnostic report." />
          ) : (
            <ul className="space-y-1.5">
              {companies.map((c) => (
                <li key={c.id}>
                  <a href={`${BASE_PATH}/api/report/company/${c.id}`} className="flex items-center justify-between rounded-lg border border-navy/10 px-3 py-2 text-sm hover:bg-surface-muted">
                    <span className="flex items-center gap-2 font-medium text-navy-700"><FileText className="h-4 w-4 text-gold-600" /> {c.tradingName ?? c.legalName}</span>
                    <span className="flex items-center gap-1.5 text-xs text-navy-600">Download PDF <Download className="h-4 w-4" /></span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        <Panel title="Portfolio summary (PDF)">
          <p className="mb-3 text-sm text-ink-muted">A one-page portfolio briefing: headline metrics, average capability by dimension, and the adoption funnel — generated from your live figures.</p>
          <a href={`${BASE_PATH}/api/report/portfolio`} className="flex items-center justify-between rounded-lg border border-navy/10 px-3 py-2 text-sm hover:bg-surface-muted">
            <span className="flex items-center gap-2 font-medium text-navy-700"><PieChart className="h-4 w-4 text-gold-600" /> Portfolio Intelligence summary</span>
            <span className="flex items-center gap-1.5 text-xs text-navy-600">Download PDF <Download className="h-4 w-4" /></span>
          </a>
          <p className="mt-4 text-xs text-ink-muted">Every figure in these PDFs is computed from stored records. Scores reflect a custom SME maturity assessment, not validated WMS scores.</p>
        </Panel>
      </div>
    </>
  );
}
