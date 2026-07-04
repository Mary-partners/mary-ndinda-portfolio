# Deploying The Management Capital Lab to Vercel

This app lives in the **`management-capital-lab/`** subdirectory of the
repository, so the single most important setting is the **Root Directory**.

## 1. Import the project

1. Go to <https://vercel.com/new> and sign in.
2. Import the GitHub repo **`Mary-partners/mary-ndinda-portfolio`**.
3. When prompted for **Root Directory**, click **Edit** and select
   **`management-capital-lab`**. This is required — without it Vercel will try to
   build the old static portfolio at the repo root.
4. Framework Preset should auto-detect **Next.js**. Leave build/output settings
   at their defaults (a `vercel.json` in the folder pins them).

## 2. Set environment variables

In **Project → Settings → Environment Variables**, add:

| Name                   | Value                                  | Environments            |
| ---------------------- | -------------------------------------- | ----------------------- |
| `ADMIN_PASSWORD`       | _a strong password of your choice_     | Production, Preview      |
| `NEXT_PUBLIC_SITE_URL` | `https://your-domain.com`              | Production               |

Then **Deploy**.

## 3. Choose the deployment branch

By default Vercel deploys the repo's production branch. To deploy this work:

- Either merge `claude/management-capital-lab-site-jm25p6` into your production
  branch, **or**
- In **Settings → Git**, set the **Production Branch** to
  `claude/management-capital-lab-site-jm25p6`.

Every push to that branch redeploys automatically; other branches get preview URLs.

## 4. Connect your custom domain

1. Go to **Project → Settings → Domains**.
2. Enter your domain (e.g. `managementcapitallab.com`) and click **Add**.
3. Vercel shows the DNS records to set at your registrar:
   - **Apex/root domain** → an `A` record to Vercel's IP (Vercel displays the
     current value), or use Vercel nameservers.
   - **`www` subdomain** → a `CNAME` to `cname.vercel-dns.com`.
4. Save the records at your DNS provider. SSL is provisioned automatically once
   DNS resolves (usually minutes).

Update `NEXT_PUBLIC_SITE_URL` to the final domain and redeploy so Open Graph /
SEO metadata uses the correct URL.

## 5. Deploy from the CLI (optional)

```bash
npm i -g vercel
cd management-capital-lab
vercel            # first run links/creates the project (accept defaults)
vercel --prod     # promote to production
```

---

## Important: data persistence on serverless

This prototype stores contributions and leads in **JSON files**. On Vercel the
project filesystem is read-only, so the app writes to `/tmp` instead — which is
**ephemeral and not shared between serverless instances**. That means:

- Seeded content (the research wall, field notes, library, pillars) renders
  perfectly and is production-ready.
- New post-it submissions and collaboration leads **may not persist** reliably
  after the serverless instance recycles.

For durable submissions in production, swap the store in
`src/lib/store.ts` for a managed database. Good drop-in options on Vercel:

- **Vercel Postgres** or **Neon** (SQL)
- **Vercel KV** (Redis) or **Upstash**

The store exposes a small interface (`getContributions`, `addContribution`,
`updateContribution`, `deleteContribution`, `getLeads`, `addLead`) — only that
file needs to change; nothing else in the app does.

> Note: the repo root also has a GitHub Pages workflow for the older static
> portfolio. Vercel (this app) and GitHub Pages (the portfolio) are independent;
> deploying one does not affect the other.
