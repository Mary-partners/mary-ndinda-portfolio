# The Management Capital Lab

**A living DBA research platform by Mary Ndinda** — exploring whether African SMEs
need money first, or the management capability to use money well.

> _"For many African SMEs, the binding constraint to growth may not be financial
> capital alone, but insufficient management capital: the financial, strategic,
> operational, governance, and leadership capability required to absorb capital
> and convert it into sustainable growth."_

This is a real, working prototype — not a static mockup. Visitors can explore the
research, follow its progress, contribute digital post-it notes to a moderated
research wall, explore the Management Capital Index framework, and express
interest in collaboration.

---

## Tech stack

- **Next.js 15** (App Router) + **React 19**
- **TypeScript** (strict)
- **Tailwind CSS 3** with a custom brand palette (navy, deep green, cream, muted
  gold, and elegant sticky-note surfaces)
- **lucide-react** icons
- **File-based JSON storage** for the prototype (`/data`, git-ignored and
  regenerated from seeds on first run) — swap for a database in production
- Custom, lightweight, shadcn-style UI primitives (no CLI dependency)

---

## Running locally

```bash
cd management-capital-lab
npm install

# Set the admin password (see below). For a quick start:
export ADMIN_PASSWORD="choose-a-strong-password"

npm run dev          # http://localhost:3000
```

Other scripts:

```bash
npm run build        # production build
npm run start        # run the production build
npm run lint         # ESLint
npm run typecheck    # tsc --noEmit
```

---

## Environment variables

Copy `.env.example` to `.env.local` and set:

| Variable               | Purpose                                              | Default              |
| ---------------------- | ---------------------------------------------------- | -------------------- |
| `ADMIN_PASSWORD`       | Password for the `/admin` moderation dashboard       | `change-me-please`   |
| `NEXT_PUBLIC_SITE_URL` | Public URL used for SEO / Open Graph metadata        | `http://localhost:3000` |

**Admin password setup:** the dashboard at `/admin` is gated by a single password
read from `ADMIN_PASSWORD`. A signed cookie session is created on login (8-hour
expiry). This is a deliberately simple prototype gate — replace with real auth
before any production use.

---

## Routes

| Route                    | Description                                             |
| ------------------------ | ------------------------------------------------------ |
| `/`                      | Home / living research wall                             |
| `/about`                 | About the research (DBA problem, aim, questions)        |
| `/framework`             | The Management Capital Index (six pillars, scoring)     |
| `/journey`               | Research journey timeline + progress                    |
| `/field-notes`           | Research blog (list)                                    |
| `/field-notes/[slug]`    | Field note detail pages                                 |
| `/library`               | Research library (filterable by theme)                  |
| `/collaborate`           | Collaboration pathways + interest form                  |
| `/contribute`            | Submit a post-it contribution                           |
| `/thank-you`             | Post-submission confirmation                            |
| `/admin`                 | Moderation dashboard (password-protected)               |

> Note: the "Index" nav item routes to `/framework` — the path `/index` is
> avoided because it collides with a Next.js App Router internal.

### API endpoints

- `POST /api/contributions` — create a contribution (always `pending`)
- `GET  /api/contributions` — public, approved-only
- `POST /api/leads` — create a collaboration lead
- `POST /api/admin/login` / `DELETE` — login / logout
- `GET/PATCH/DELETE /api/admin/contributions` — moderation (auth-guarded)
- `GET /api/admin/export?type=contributions|leads` — CSV export (auth-guarded)

---

## How the moderation flow works

1. A visitor submits a post-it via `/contribute`. It is stored with
   `status: "pending"`.
2. Pending notes **do not** appear on the public wall.
3. An admin signs in at `/admin`, reviews, and **approves**, **rejects**,
   **edits**, or **deletes** each note.
4. Only **approved** notes appear publicly, newest first.

Themes (e.g. _Cash flow_, _Governance_, _Capital absorption_) are auto-inferred
from the text via simple keyword matching, and a post-it colour is assigned
deterministically (lavender used sparingly).

---

## Key files

```
src/
  app/
    layout.tsx                 # root layout, SEO metadata, header/footer/toast
    page.tsx                   # home / research wall
    about|framework|journey|library|collaborate|contribute|thank-you/
    field-notes/[slug]/        # blog + detail
    admin/                     # protected dashboard
    api/                       # route handlers (contributions, leads, admin, export)
  components/
    HeroSection, PostItWall, PostItCard, PromptCard, PillarCard,
    ResearchPhaseTimeline, FieldNoteCard, LibrarySourceCard,
    ContributionForm, CollaborationForm, MiniPoll, Newsletter,
    StatusBadge, EmptyState, PageHeader, SectionHeading,
    admin/AdminLogin, admin/AdminDashboard,
    ui/ (button, field, badge, toast)
  lib/
    types.ts                   # data models
    store.ts                   # JSON file store (contributions + leads)
    auth.ts                    # admin session
    utils.ts                   # cn, dates, theme inference, CSV
    data/                      # seed contributions, prompts, pillars, phases,
                               #   field notes, library sources
```

## Data models

`Contribution`, `CollaborationLead`, `FieldNote`, `ResearchSource`,
`ResearchPhase` — see `src/lib/types.ts`.

---

## Suggested next enhancements

- Replace the JSON store with SQLite/Postgres and the password gate with real auth.
- Ship the interactive Management Capital diagnostic (self-assessment → readiness
  profile + archetype).
- Wire the newsletter to a real email provider; add rate-limiting / spam
  protection on public forms.
- Add a contribution map visualisation and richer theme analytics.
- Email notifications to the moderator on new submissions.
