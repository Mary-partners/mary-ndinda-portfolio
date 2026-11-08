# Mary Ndinda | Africa Investment & Leadership Playbook

An interactive operating plan supporting Mary Ndinda's application for **Director of Africa, Abler Nordic** (reference A003437, advertised by Millar Cameron, Nairobi). It answers one question: *"If appointed, how would I do the work?"*

> Independent application proposal by Mary Ndinda. Proposed approach, subject to mandate, portfolio review and internal approval. This site is not an Abler Nordic publication and does not imply appointment, endorsement or access to internal information.

This app lives in the `africa-playbook/` folder of the `mary-ndinda-portfolio` repository. It is separate from the static portfolio at the repository root and from `management-capital-lab/`.

---

## What is in it

| Route | Purpose |
| --- | --- |
| `/` | Executive thesis, three priorities, investment lifecycle, workstream navigation, a two-minute reading route |
| `/playbook` | Searchable, filterable index of the twelve workstreams. Search covers every section, including tables, and links straight to the matching section |
| `/playbook/[slug]` | Full operating plan per workstream: ten standard sections plus deep-dive sections, all deep-linkable (e.g. `/playbook/screening-and-diligence#gates`) |
| `/first-year` | Days 1–30, 31–60, 61–90, months 4–6 and 7–12, with deliverables, dependencies, owners, evidence and acceptance criteria |
| `/decision-lab` | Fictional equity case (Illustrative FSP A) with presets, validation and sensitivities; defer/decline gates; editable market-prioritisation aid |
| `/evidence` | Candid map of role requirements to supplied experience and the evidence still needed |
| `/sources` | Source register with check status, public facts relied on, figures deliberately not used, assumptions, methodology |
| `/brief` | Print-friendly executive brief (browser print / save as PDF) |

Every substantive item carries a visible evidence label: **Public source**, **Candidate-supplied**, **Proposed approach** or **Illustrative**.

## Tech

- Next.js 16.4.3 (App Router, Turbopack), React 19.3, TypeScript 5.9, Tailwind CSS 4.3
- Fonts are self-hosted from npm (`@fontsource-variable/newsreader`, `@fontsource-variable/inter`). No external font requests are made.
- All pages are statically prerendered. Client components are used only for search and filters, the mobile menu, accordion helpers, print and the calculators.
- There is no backend, database, API, secret or environment variable, and no analytics, trackers or cookies.

## Local development

Requires Node.js 20.9 or later (tested on Node 22).

```bash
cd africa-playbook
npm ci            # installs exactly what package-lock.json specifies
npm run dev       # http://localhost:3000
```

Checks:

```bash
npm run typecheck # TypeScript
npm run lint      # ESLint (next/core-web-vitals + typescript)
npm test          # calculator maths, prioritisation rules, content completeness
npm run build     # production build
npm run check     # all four, in order
npm start         # serve the production build
```

## Editing content

See **[EDITING.md](./EDITING.md)** for a plain-language guide. In short, all words live in `src/content/`:

| File | What it controls |
| --- | --- |
| `profile.ts` | Name, location, positioning, disclaimer, approved career details, external links |
| `home.ts` | Hero, thesis, priorities, lifecycle diagram |
| `workstreams/01-…ts` to `12-…ts` | One file per workstream |
| `first-year.ts` | Roadmap phases, process standards, delivery risks |
| `evidence.ts` | Capability map |
| `sources.ts` | Source register, public facts, assumptions, methodology |
| `src/lib/equity-case.ts` | Decision Lab defaults, presets and input ranges |
| `src/lib/prioritisation.ts` | Criteria, default weights, screens, illustrative scores |

`npm test` fails if a workstream loses a required element, if a table row has the wrong number of cells, or if calculator outputs drift from the hand-checked values.

## Deploying to Vercel

1. Push this branch to GitHub (already done if you are reading this on GitHub).
2. Go to <https://vercel.com/new> and import **`Mary-partners/mary-ndinda-portfolio`**.
3. Set **Root Directory** to **`africa-playbook`**. This step is required: without it Vercel builds the static site at the repository root.
4. Leave Framework Preset as **Next.js** and the build, output and install settings at their defaults. `vercel.json` pins the framework, and the lockfile is used automatically.
5. Leave environment variables empty. None are needed.
6. Click **Deploy**.

To deploy from a non-default branch, open the project's **Settings → Git** and set the Production Branch, or use the preview URL that Vercel creates for each pushed branch.

CLI alternative:

```bash
npm i -g vercel
cd africa-playbook
vercel          # first run links or creates the project; accept the detected settings
vercel --prod
```

### Verifying a deployment

After it deploys, open the URL and check:

- [ ] `/`, `/playbook`, a workstream, `/first-year`, `/decision-lab`, `/evidence`, `/sources` and `/brief` all load.
- [ ] The Decision Lab defaults show **USD 6.533m, 1.307x, 5.50%**.
- [ ] `/playbook/screening-and-diligence#gates` opens with "Decision gates" expanded.
- [ ] Response headers include `X-Robots-Tag: noindex, nofollow, noarchive` (run `curl -sI <url>` or use browser devtools).
- [ ] Deployment protection is set as intended (see below).

## Confidentiality

- The site sets `noindex, nofollow` in page metadata and in an `X-Robots-Tag` header. There is deliberately no `robots.txt` block, because blocking crawling would stop search engines from seeing the noindex instruction.
- **Neither noindex nor an obscure URL is access control.** Anyone with the link can read the site, and links get forwarded.
- If access must be restricted, enable **Vercel Deployment Protection** (Project → Settings → Deployment Protection), for example Vercel Authentication, or Password Protection or Trusted IPs where your plan includes them. Then test from a private browser window that a visitor without access is blocked.
- Do not describe the site as private unless protection has been configured and verified.
- **This repository is public.** Anything committed, including content hidden from the UI, can be read on GitHub. Keep unverified career details, client names and contact details out of `src/`. The internal review checklist lives in `internal/`, which is git-ignored.

## Updating

```bash
git pull
cd africa-playbook
npm ci
npm run check
git commit -am "Update playbook content" && git push   # Vercel redeploys automatically
```

To upgrade dependencies, change exact versions in `package.json`, run `npm install`, then `npm run check`.

## Role coverage

Each advertised responsibility (paraphrased from the role description, source S1) maps to at least one workstream:

| Responsibility area | Primary workstream(s) | Supporting |
| --- | --- | --- |
| Regional investment leadership across debt, equity and mezzanine | 05 Structuring, IC, negotiation and completion | 01, 03, 04 |
| Pipeline development and origination | 02 Origination and relationships | 01 |
| Transaction execution (screening, diligence, IC, closing) | 03 Screening and diligence; 05 Structuring | 04 |
| Financial modelling, valuation and returns | 04 Modelling, valuation and downside | Decision Lab |
| Local-currency financing and FX analysis | 06 Local-currency financing and FX | 04, 05 |
| Investee oversight, governance and board work | 07 Portfolio management and governance | 11 |
| Growth support and institutional strengthening | 08 Institutional strengthening, digitalisation and TA | 07 |
| Impact, ESG and responsible finance | 09 Impact, ESG and responsible finance | 03, 07 |
| Technical assistance coordination | 08 Institutional strengthening and TA | 09 |
| Firm strategy and capital allocation | 01 Africa strategy and capital allocation | 12 |
| Capital mobilisation, fundraising and co-investment | 10 Fundraising, investor diligence and partnerships | 01 |
| Follow-ons, refinancing, recoveries and exits | 11 Follow-ons, recoveries and exits | 04, 07 |
| Nairobi office leadership, team and budget | 12 Nairobi leadership and budget | First-year plan |
| Oslo alignment and Management Committee contribution | 12 Nairobi leadership and budget | 01, 10 |
| Hands-on, emerging-market PE experience (requirement) | `/evidence` (stated candidly as "Evidence to establish") | |

## Source status

The public sources (S1–S7) could not be reached from the build environment on the research reference date (8 November 2026). The site uses only the context supplied with the brief, and labels each source "Not rechecked". Before sharing, open each URL on `/sources` and confirm the dated facts, then set `status: "verified"` in `src/content/sources.ts`.
