import Link from "next/link";
import { requireUser } from "@/lib/auth";
import { latestAssessments } from "@/lib/portfolio";
import { PageHeader, Panel } from "@/components/ui/Page";
import { DIMENSION_META } from "@/lib/constants";
import { fmtScore, maturityBand, cn } from "@/lib/utils";

export const dynamic = "force-dynamic";

function cellTone(score: number | null) {
  if (score === null) return "bg-white text-ink-muted";
  if (score < 2) return "bg-red-50 text-red-700";
  if (score < 3) return "bg-amber-50 text-amber-700";
  return "bg-emerald-50 text-emerald-700";
}

export default async function ScoresPage() {
  const user = await requireUser();
  const rows = await latestAssessments(user.activeOrgId);

  return (
    <>
      <PageHeader title="Capability Scores" subtitle="Dimension-level maturity across the portfolio (latest finalised assessment). 0–4 custom SME maturity scale." />
      <Panel>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-navy/10">
                <th className="th sticky left-0 bg-white">Enterprise</th>
                {DIMENSION_META.map((d) => <th key={d.key} className="th whitespace-nowrap">{d.name.split(" ")[0]}</th>)}
                <th className="th">Overall</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(({ company, latest }) => {
                const byKey: Record<string, number | null> = {};
                for (const d of DIMENSION_META) byKey[d.key] = latest?.dimensionScores.find((s) => s.dimension.key === d.key)?.score ?? null;
                return (
                  <tr key={company.id} className="border-b border-navy/5 last:border-0">
                    <td className="td sticky left-0 bg-white font-medium text-navy-700">
                      <Link href={`/portfolio/${company.id}`} className="hover:underline">{company.tradingName ?? company.legalName}</Link>
                    </td>
                    {DIMENSION_META.map((d) => (
                      <td key={d.key} className="p-0">
                        <div className={cn("m-0.5 rounded px-2 py-2 text-center text-sm font-medium", cellTone(byKey[d.key]))}>{fmtScore(byKey[d.key])}</div>
                      </td>
                    ))}
                    <td className="td font-semibold">{fmtScore(latest?.overallScore)} <span className="text-xs font-normal text-ink-muted">{maturityBand(latest?.overallScore).label}</span></td>
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
