# Deploying mdawidallp.com to Vercel

This site is a standard Next.js 15 App Router project. Vercel detects the
framework automatically, so setup is quick.

## 1. Import the repository

1. Sign in to [vercel.com](https://vercel.com) with the account that should own
   the project.
2. Choose **Add New, Project** and import the `mary-partners/mdawidallp`
   repository from GitHub.
3. Vercel reads `vercel.json` and sets the framework to Next.js, the build
   command to `next build`, and the install command to `npm install`. Leave
   these as detected.

## 2. Set the environment variable

Under **Settings, Environment Variables**, add:

| Name                   | Value                     |
| ---------------------- | ------------------------- |
| `NEXT_PUBLIC_SITE_URL` | `https://mdawidallp.com`  |

This drives the metadata base, the sitemap, and robots.

## 3. Deploy

Trigger the first deploy. Every push to the default branch then deploys to
production, and every pull request gets its own preview URL.

## 4. Connect the domain

1. Go to **Settings, Domains** and add `mdawidallp.com` and
   `www.mdawidallp.com`.
2. At your domain registrar, point the records Vercel shows you:
   - An `A` record for the apex domain, or the `CNAME` Vercel provides.
   - A `CNAME` for `www` to the Vercel target.
3. Vercel issues the TLS certificate automatically once DNS resolves.

## 5. Optional next steps

- Wire the contact form to a real inbox or CRM. It currently validates on the
  client and hands off to email; swap in an API route or a form service when
  ready.
- Add analytics from the Vercel dashboard if you want traffic insight.
- Drop a real headshot of CPA Kennedy Mdawida in place of the monogram in
  `src/components/Monogram.tsx` when one is available.
