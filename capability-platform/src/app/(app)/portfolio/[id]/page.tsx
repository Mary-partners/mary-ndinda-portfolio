import Link from "next/link";
import { notFound } from "next/navigation";
import { requireUser, assertCompanyAccess, can } from "@/lib/auth";
import { getCompanyDetail } from "@/lib/company";
import { startReassessment } from "@/app/actions/assessment";
import { InviteLink } from "@/components/InviteLink";
import { PageHeader, Panel, StatCard, EmptyState } from "@/components/ui/Page";
import { Badge, StatusBadge } from "@/components/ui/Badge";
import { CapabilityRadar } from "@/components/charts";
import { fmtScore, fmtDate, fmtNumber, pctChange, maturityBand } from "@/lib/utils";
import { CONSTRAINT_LABELS } from "@/lib/constants";
import { AlertTriangle, ClipboardCheck, ArrowRight, Download } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function CompanyPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const user = await requireUser();
  await assertCompanyAccess(id, user).catch(() => notFound());
  const data = await getCompanyDetail(id);
  if (!data) notFound();
  const { company, latest, baseline, draft, dimRows } = data;
  const canManage = can(user, "company.manage");

  const radar = dimRows.map((d) => ({ dimension: d.name.split(" ")[0], current: d.current, baseline: d.baseline }));
  const band = maturityBand(latest?.overallScore);

  // Transparent risk alerts
  const score = (key: string) => dimRows.find((d) => d.key === key)?.current ?? null;
  const overdue = company.plans.flatMap((p) => p.milestones).filter((m) => m.dueDate && m.dueDate < new Date() && !["Verified", "Rejected"].includes(m.status));
  const deteriorating = company.kpis.filter((k) => {
    if (k.actual === null || k.baseline === null) return false;
    return k.definition.higherIsBetter ? k.actual < k.baseline : k.actual > k.baseline;
  });
  const alerts: { label: string; why: string }[] = [];
  if ((score("financial") ?? 9) < 2) alerts.push({ label: "Weak financial controls", why: `Financial Management score ${fmtScore(score("financial"))} (< 2.0).` });
  if ((score("governance") ?? 9) < 2) alerts.push({ label: "High founder dependency", why: `Governance & Delegation score ${fmtScore(score("governance"))} (< 2.0).` });
  if ((score("people") ?? 9) < 2) alerts.push({ label: "Critical staffing gaps", why: `People & Talent score ${fmtScore(score("people"))} (< 2.0).` });
  if (overdue.length) alerts.push({ label: "Overdue implementation", why: `${overdue.length} milestone(s) past due and not yet verified.` });
  if (deteriorating.length) alerts.push({ label: "Deteriorating business performance", why: `${deteriorating.length} KPI(s) moved the wrong way vs baseline.` });
  if ((latest?.evidenceCoverage ?? 1) < 0.25) alerts.push({ label: "Insufficient verified evidence", why: `Only ${Math.round((latest?.evidenceCoverage ?? 0) * 100)}% of answered items have verified evidence.` });

  const priorityPlans = [...company.plans].sort((a, b) => a.priority - b.priority).slice(0, 3);

  return (
    <>
      <PageHeader
        title={company.tradingName ?? company.legalName}
        subtitle={`${company.sector} · ${company.country} · ${company.stage ?? ""} · Advisor: ${company.advisor?.name ?? "—"}`}
        actions={
          <div className="flex flex-wrap items-center gap-2">
            <a href={`/api/report/company/${company.id}`} className="btn-outline"><Download className="h-4 w-4" /> PDF report</a>
            <Link href={`/portfolio/${company.id}/diagnostic${latest ? `?assessment=${draft?.id ?? ""}` : ""}`} className="btn-outline">
              <ClipboardCheck className="h-4 w-4" /> {latest ? "View diagnostic" : "Start diagnostic"}
            </Link>
            <form action={startReassessment.bind(null, company.id)}>
              <button className="btn-primary">{draft ? "Resume reassessment" : "New reassessment"} <ArrowRight className="h-4 w-4" /></button>
            </form>
          </div>
        }
      />

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Overall maturity" value={fmtScore(latest?.overallScore)} sub={<Badge tone={band.tone as "ok" | "warn" | "bad" | "neutral"}>{band.label}</Badge>} tone="gold" />
        <StatCard label="Assessment completeness" value={`${Math.round((latest?.completeness ?? 0) * 100)}%`} sub="of applicable questions" />
        <StatCard label="Evidence coverage" value={`${Math.round((latest?.evidenceCoverage ?? 0) * 100)}%`} sub="answered items verified" />
        <StatCard label="Open interventions" value={company.plans.filter((p) => !["Verified", "Rejected"].includes(p.status)).length} tone="navy" href="/implementation" />
      </div>

      {canManage && (
        <div className="mt-5">
          <Panel title="Founder self-assessment">
            <p className="mb-3 text-sm text-ink-muted">Invite the business owner to complete the capability check themselves. Their answers appear here as self-reported maturity — evidence is only counted once a reviewer verifies it.</p>
            <InviteLink companyId={company.id} existingToken={company.inviteToken} />
          </Panel>
        </div>
      )}

      <div className="mt-6 grid gap-5 lg:grid-cols-3">
        <Panel title="Capability profile (baseline vs current)">
          <CapabilityRadar data={radar} />
        </Panel>

        <Panel title="Capability gap analysis" className="lg:col-span-2">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy/10">
                  <th className="th">Dimension</th>
                  <th className="th">Baseline</th>
                  <th className="th">Current</th>
                  <th className="th">Band</th>
                  <th className="th">Gap to 4.0</th>
                </tr>
              </thead>
              <tbody>
                {dimRows.map((d) => {
                  const b = maturityBand(d.current);
                  return (
                    <tr key={d.key} className="border-b border-navy/5 last:border-0">
                      <td className="td font-medium text-navy-700">{d.name}</td>
                      <td className="td text-ink-muted">{fmtScore(d.baseline)}</td>
                      <td className="td font-medium">{fmtScore(d.current)}</td>
                      <td className="td"><Badge tone={b.tone as "ok" | "warn" | "bad" | "neutral"}>{b.label}</Badge></td>
                      <td className="td text-ink-muted">{d.gap !== null ? d.gap.toFixed(2) : "—"}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-muted">
            Maturity reflects a documented assessment — not task completion. Reassess to change scores.
          </p>
        </Panel>
      </div>

      <div className="mt-5 grid gap-5 lg:grid-cols-3">
        {/* Risk alerts */}
        <Panel title="Risk alerts" className="lg:col-span-1">
          {alerts.length === 0 ? (
            <p className="text-sm text-ink-muted">No active alerts.</p>
          ) : (
            <ul className="space-y-2">
              {alerts.map((a) => (
                <li key={a.label} className="rounded-lg border border-amber-200 bg-amber-50/60 p-3">
                  <div className="flex items-center gap-2 text-sm font-medium text-amber-800">
                    <AlertTriangle className="h-4 w-4" /> {a.label}
                  </div>
                  <p className="mt-1 text-xs text-ink-muted">{a.why}</p>
                </li>
              ))}
            </ul>
          )}
        </Panel>

        {/* Constraint diagnosis */}
        <Panel title="Constraints beyond management" className="lg:col-span-2">
          {company.constraints.length === 0 ? (
            <p className="text-sm text-ink-muted">No non-management constraints flagged. Management capability is the primary lever.</p>
          ) : (
            <ul className="space-y-2">
              {company.constraints.map((c) => (
                <li key={c.id} className="flex items-start justify-between gap-3 rounded-lg border border-navy/10 bg-surface-muted p-3">
                  <div>
                    <div className="text-sm font-medium text-navy-700">{CONSTRAINT_LABELS[c.type] ?? c.type}</div>
                    <p className="text-xs text-ink-muted">{c.note}</p>
                  </div>
                  <Badge tone={c.severity === "high" ? "bad" : c.severity === "medium" ? "warn" : "neutral"}>{c.severity}</Badge>
                </li>
              ))}
            </ul>
          )}
          <p className="mt-3 text-xs text-ink-muted">
            A company with a capital or market constraint is not automatically assigned more management training.
          </p>
        </Panel>
      </div>

      {/* Priority interventions */}
      <div className="mt-5">
        <Panel title="Priority interventions" actions={<Link href="/implementation" className="text-xs font-medium text-navy-600 hover:underline">Open tracker</Link>}>
          {priorityPlans.length === 0 ? (
            <EmptyState title="No improvement plans yet" />
          ) : (
            <div className="grid gap-3 md:grid-cols-3">
              {priorityPlans.map((p) => {
                const verified = p.milestones.filter((m) => m.status === "Verified").length;
                return (
                  <div key={p.id} className="rounded-lg border border-navy/10 bg-white p-4">
                    <div className="flex items-center justify-between">
                      <Badge tone="navy">Priority {p.priority}</Badge>
                      <StatusBadge status={p.status} />
                    </div>
                    <h3 className="mt-2 text-sm font-semibold text-navy-700">{p.title}</h3>
                    <p className="mt-1 text-xs text-ink-muted">Owner: {p.ownerName ?? "—"} · Target {fmtScore(p.targetScore)}</p>
                    <div className="mt-2 text-xs text-ink-muted">{verified}/{p.milestones.length} milestones verified</div>
                    <div className="mt-2 h-1.5 w-full rounded-full bg-navy/10">
                      <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${p.milestones.length ? (verified / p.milestones.length) * 100 : 0}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </Panel>
      </div>

      {/* Business performance + founder + sessions */}
      <div className="mt-5 grid gap-5 lg:grid-cols-2">
        <Panel title="Business performance (separate from maturity)">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-navy/10">
                  <th className="th">KPI</th>
                  <th className="th">Baseline</th>
                  <th className="th">Current</th>
                  <th className="th">Target</th>
                  <th className="th">Change</th>
                </tr>
              </thead>
              <tbody>
                {company.kpis.map((k) => {
                  const ch = pctChange(k.baseline, k.actual);
                  return (
                    <tr key={k.id} className="border-b border-navy/5 last:border-0">
                      <td className="td font-medium text-navy-700">{k.definition.name}<div className="text-[11px] text-ink-muted">{k.definition.unit}{k.dataStatus !== "actual" ? ` · ${k.dataStatus}` : ""}</div></td>
                      <td className="td text-ink-muted">{k.baseline === null ? "—" : fmtNumber(k.baseline)}</td>
                      <td className="td">{k.actual === null ? "—" : fmtNumber(k.actual)}</td>
                      <td className="td text-ink-muted">{k.target === null ? "—" : fmtNumber(k.target)}</td>
                      <td className="td text-xs">{ch.value === null ? <span className="text-ink-muted">{ch.note}</span> : <span className={ch.value >= 0 ? "text-emerald-700" : "text-red-700"}>{ch.value >= 0 ? "+" : ""}{ch.value.toFixed(1)}%</span>}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          <p className="mt-3 text-xs text-ink-muted">Percentage change is suppressed where a baseline is missing, zero or negative.</p>
        </Panel>

        <div className="space-y-5">
          <Panel title="Founder ambition & objectives">
            {company.founderProfile ? (
              <dl className="space-y-2 text-sm">
                <div><dt className="text-xs font-semibold uppercase text-ink-muted">Objective</dt><dd>{company.founderProfile.objectiveType}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-ink-muted">Three-year vision</dt><dd className="text-ink-muted">{company.founderProfile.threeYearVision}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-ink-muted">What the founder believes limits growth</dt><dd className="text-ink-muted">{company.founderProfile.growthLimiter}</dd></div>
                <div><dt className="text-xs font-semibold uppercase text-ink-muted">Top priorities</dt><dd className="text-ink-muted">{company.founderProfile.topPriorities}</dd></div>
              </dl>
            ) : <p className="text-sm text-ink-muted">No founder interview captured.</p>}
            <p className="mt-3 text-xs text-ink-muted">Captured as qualitative context — not scored as management quality.</p>
          </Panel>

          <Panel title="Advisory history" actions={<Link href="/sessions" className="text-xs font-medium text-navy-600 hover:underline">All sessions</Link>}>
            {company.sessions.length === 0 ? (
              <p className="text-sm text-ink-muted">No advisory sessions recorded.</p>
            ) : (
              <ul className="space-y-2">
                {company.sessions.slice(0, 4).map((sx) => (
                  <li key={sx.id} className="rounded-lg border border-navy/10 bg-surface-muted p-3 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="font-medium text-navy-700">{sx.priorityProblem}</span>
                      <span className="text-xs text-ink-muted">{fmtDate(sx.date)}</span>
                    </div>
                    <p className="mt-1 text-xs text-ink-muted">{sx.observations}</p>
                  </li>
                ))}
              </ul>
            )}
          </Panel>
        </div>
      </div>
    </>
  );
}
