# mdawidallp.com

**Mdawida LLP** is a premium, partner led audit, tax, and advisory firm serving
East Africa, founded by CPA Kennedy Mdawida. This repository holds the firm's
marketing website.

The site is a real, working Next.js application, not a static mockup. It ships
with dynamic insight routing, client side filtering, scroll reveal animation, a
working enquiry form, and a full set of brand rendered artwork so no external
image hosting is required.

---

## What is on the site

- **Home** with hero, service overview, values, industries, leadership, and
  featured insights
- **About Us** with the firm story, values, leadership profile of CPA Kennedy
  Mdawida, working approach, and East African coverage
- **Services** covering the three lines: Audit and Assurance, Tax and
  Regulatory Services, and Advisory
- **Industries** across financial services, SMEs, agribusiness, manufacturing,
  real estate, development, technology, and energy
- **Insights**, a filterable library of researched articles on the tax,
  assurance, and advisory questions facing East African businesses, with a
  dynamic detail page for each article
- **Contact** with an enquiry form and firm details

---

## Tech stack

- **Next.js 15** (App Router) and **React 19**
- **TypeScript** in strict mode
- **Tailwind CSS 3** with a custom premium palette (deep ink, minted teal,
  restrained gold, and warm sand)
- **lucide-react** icons
- Self contained SVG artwork, so the site needs no external image service

---

## Local development

```bash
npm install
npm run dev
```

The site runs on http://localhost:3000.

Useful scripts:

```bash
npm run build      # production build
npm run start      # serve the production build
npm run lint       # eslint
npm run typecheck  # tsc --noEmit
```

---

## Deployment

The site is built for **Vercel**. See [DEPLOYMENT.md](./DEPLOYMENT.md) for the
step by step guide to connecting the repository and pointing the
`mdawidallp.com` domain at it.

---

## Content

All copy lives in a small number of typed data files, so the site is easy to
extend without touching layout code:

- `src/lib/site.ts` — firm details, navigation, services, industries, values,
  leadership, and stats
- `src/lib/insights.ts` — the full library of insight articles

Add a new insight by appending an object to the `insights` array. It appears in
the library, gets its own page, and shows up in the sitemap automatically.
