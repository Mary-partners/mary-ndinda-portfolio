# Management Capital Lab — Enterprise Capability Intelligence

**Measure management. Strengthen execution. Track enterprise performance.**

A working, multi-tenant platform for African SME support programmes (funds, DFIs,
accelerators, ESOs) to diagnose how an enterprise is managed, design targeted
improvement interventions, track implementation, verify evidence, and measure
business performance — **separately** from management-practice maturity.

> This is a real, interactive application (not a mockup). You can assess
> businesses, change scores, assign plans, record implementation, verify
> milestones, generate reports, and watch portfolio dashboards recompute from
> stored records.

---

## Stack

- **Next.js 15** (App Router) · **React 19** · **TypeScript** (strict)
- **Prisma 6** ORM with **SQLite** (zero-config demo persistence; documented
  migration path to PostgreSQL — see below)
- **Tailwind CSS** · **Recharts** · **lucide-react**
- Cookie-based demo auth with **role-based access control** and **tenant isolation**

## Quick start

```bash
cd capability-platform
npm install
cp .env.example .env            # DATABASE_URL + SESSION_SECRET
npx prisma migrate dev          # create the SQLite schema
npm run db:seed                 # load the demo portfolio
npm run dev                     # http://localhost:3000
```

Then open the app and pick a **demo user** on the login screen (one per role).

### Scripts
| Script | Purpose |
|---|---|
| `npm run dev` / `build` / `start` | Next.js dev / production build / serve |
| `npm run db:seed` | Seed the fictional demo portfolio |
| `npm run db:reset` | Drop, re-migrate and reseed |
| `npm run typecheck` | `tsc --noEmit` |
| `npm run test` | Scoring-engine unit tests (`node:test`) |
| `npx tsx tests/journey.ts` | End-to-end data-journey check |

## Demo access & roles

The login screen lists seeded users; click to sign in. Each sees a
permission-aware view of the **same** seeded data:

| Role | Can do |
|---|---|
| Platform Administrator | Everything; multi-org |
| Programme Manager | Assess, finalise, plans, verify evidence, reports |
| Enterprise Advisor | Assess, plans, implementation, log sessions |
| Founder / Company Manager | Edit responses, update implementation, submit evidence |
| Independent Reviewer | Verify / reject / request-more-info on evidence |

Switch organisations (for multi-org users) via the top-right switcher. Data is
**tenant-isolated** — a user cannot open another organisation's company
(`assertCompanyAccess`).

## What's implemented (and verified)

**Foundation**
- Relational schema (30+ models, UUID ids, framework versioning, immutable
  finalised assessments, audit log) — `prisma/schema.prisma`
- Demo auth, RBAC permission matrix, tenant guard — `src/lib/auth.ts`
- Configurable **0–4 weighted scoring engine** (applicable/NA, unanswered never
  scored as 0, completeness separate from maturity, evidence coverage) —
  `src/lib/scoring.ts`
- Seeded demo portfolio: 10 fictional African SMEs with **varied scenarios**,
  8 dimensions, ~40 original questions, baselines, 3 priority plans each,
  milestones, evidence, KPIs, advisory sessions, a follow-up reassessment —
  `prisma/seed.ts`

**End-to-end vertical slice (all persistent & recomputing)**
1. Guided **diagnostic** — change scores live, saves per response, recomputes
   dimension + overall instantly (`/portfolio/[id]/diagnostic`)
2. **Results** — radar (baseline vs current), gap analysis, transparent priority
   recommendations, constraint diagnosis, limitations
3. **Company profile** — radar, gaps, risk alerts (transparent rules),
   constraints, priority interventions, business KPIs, founder interview, advisory history
4. **Implementation Tracker** — Kanban; status changes persist and update dashboards
5. **Evidence & Verification** — reviewer workspace; verify/reject/more-info with
   required comment; **rejected evidence does not count as verified**
6. **Reassessment** → finalise → **portfolio dashboards recompute**
7. **Reports** — printable Enterprise Diagnostic Report (Print → PDF) + CSV exports

**Dashboards & analytics** — Overview, Portfolio table, Capability Scores matrix,
Improvement Plans, Advisory Sessions (with "log session"), Business Performance,
Portfolio Intelligence (by sector / size / advisor), Research & Methodology,
Settings. Every nav item is a functional page.

**Tests** — scoring unit tests (`npm test`, 6 passing) + an e2e data-journey
script that asserts: reassessment raises overall (not a task), finalised
snapshots, milestone verification, and that rejected evidence is not counted.

## Measurement integrity (by design)

- Three **separate** measures: capability maturity, implementation progress,
  business performance — each with its own metrics.
- Maturity changes **only** through a documented reassessment — never because a
  task was marked complete.
- Founder-submitted evidence is **not** independently verified until a reviewer
  confirms it; sustained adoption requires verified milestones.
- Percentage change is **suppressed** when a baseline is missing, zero or negative.
- Missing financial values stay missing (never silently zeroed).
- Custom SME maturity anchors are clearly labelled as **not** the official WMS
  scale; scores are **not** validated WMS scores. See **Research & Methodology**.
- Everything carries a **DEMO DATA** label; all companies/metrics are fictional.

## Migrating to PostgreSQL

1. In `prisma/schema.prisma` set `datasource.provider = "postgresql"`.
2. Point `DATABASE_URL` at your Postgres instance.
3. `npx prisma migrate dev` then `npm run db:seed`.
No model changes are required (no SQLite-only types are used; status/role fields
are strings with documented allowed values in `src/lib/constants.ts`).

## Environment variables

See `.env.example`: `DATABASE_URL`, `SESSION_SECRET`, `NEXT_PUBLIC_APP_ENV`.

## Known limitations / production-readiness

- Demo auth (seeded users + signed cookie) — replace with a real identity
  provider + hashed credentials before production.
- Evidence is **metadata-only** in this build — wire object storage with signed,
  expiring URLs and upload validation.
- Add rate limiting, CSRF hardening on server actions, and a full audit-export UI.
- Optional AI advisor is not wired to a model; the deterministic, rules-based
  recommendations (priority formula + intervention templates) run without any key.
- Broaden automated coverage (Playwright e2e over the UI) beyond the current
  scoring + data-journey tests.
