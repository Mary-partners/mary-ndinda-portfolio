import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireUser } from "@/lib/auth";
import { PageHeader, Panel } from "@/components/ui/Page";
import { FileText, Table, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReportsPage() {
  const user = await requireUser();
  const companies = await prisma.company.findMany({ where: { orgId: user.activeOrgId }, select: { id: true, legalName: true, tradingName: true }, orderBy: { legalName: "asc" } });

  return (
    <>
      <PageHeader title="Reports & Exports" subtitle="Generate professional diagnostic reports and export portfolio data." />
      <div className="grid gap-5 lg:grid-cols-2">
        <Panel title="Enterprise Management Diagnostic Report">
          <p className="mb-3 text-sm text-ink-muted">A printable, investment-committee-ready report per enterprise (profile, maturity, gaps, constraints, recommendations, limitations). Use your browser's Print → Save as PDF.</p>
          <ul className="space-y-1.5">
            {companies.map((c) => (
              <li key={c.id}>
                <Link href={`/reports/company/${c.id}`} className="flex items-center justify-between rounded-lg border border-navy/10 px-3 py-2 text-sm hover:bg-surface-muted">
                  <span className="flex items-center gap-2 font-medium text-navy-700"><FileText className="h-4 w-4 text-gold-600" /> {c.tradingName ?? c.legalName}</span>
                  <span className="text-xs text-navy-600">Open report →</span>
                </Link>
              </li>
            ))}
          </ul>
        </Panel>

        <div className="space-y-5">
          <Panel title="Data exports (CSV)">
            <div className="space-y-2">
              <a href="/api/export/companies" className="flex items-center justify-between rounded-lg border border-navy/10 px-3 py-2 text-sm hover:bg-surface-muted">
                <span className="flex items-center gap-2 font-medium text-navy-700"><Table className="h-4 w-4" /> Enterprise portfolio + maturity</span>
                <Download className="h-4 w-4 text-navy-600" />
              </a>
              <a href="/api/export/scores" className="flex items-center justify-between rounded-lg border border-navy/10 px-3 py-2 text-sm hover:bg-surface-muted">
                <span className="flex items-center gap-2 font-medium text-navy-700"><Table className="h-4 w-4" /> Dimension scores matrix</span>
                <Download className="h-4 w-4 text-navy-600" />
              </a>
              <a href="/api/export/kpis" className="flex items-center justify-between rounded-lg border border-navy/10 px-3 py-2 text-sm hover:bg-surface-muted">
                <span className="flex items-center gap-2 font-medium text-navy-700"><Table className="h-4 w-4" /> Business performance KPIs</span>
                <Download className="h-4 w-4 text-navy-600" />
              </a>
            </div>
          </Panel>
          <Panel title="Programme & portfolio reports">
            <p className="text-sm text-ink-muted">Programme performance and investor portfolio summaries are generated from the live Portfolio Intelligence figures. Open <Link href="/intelligence" className="text-navy-600 hover:underline">Portfolio Intelligence</Link> and print, or export the CSVs above.</p>
          </Panel>
        </div>
      </div>
    </>
  );
}
