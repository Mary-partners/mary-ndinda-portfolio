# Content editing guide

This guide is for editing words, not code. All content sits in `src/content/` as plain text inside quotation marks. You can edit it directly on GitHub (open the file, click the pencil icon, edit, commit), and Vercel redeploys automatically.

## Ground rules

1. **Keep the four labels honest.**
   - *Public source*: something a public page says, with its source and date.
   - *Candidate-supplied*: Mary's own experience, until she has verified the wording for circulation.
   - *Proposed approach*: what Mary would do. Write it as "I would…".
   - *Illustrative*: fictional numbers and names. Never use a real investee.
2. **Never claim what cannot be evidenced.** That includes closed deals, investment approvals, exits, board seats, fundraising totals, investor relationships, credentials and languages.
3. **The repository is public.** Anything you type into these files can be read on GitHub, even if the website hides it. Do not add employer names, figures, client names or contact details until Mary has approved them in the internal review.
4. **Do not describe Abler Nordic as having problems.** The plan is written so that it works whatever the portfolio's condition.

## Common edits

### Change the positioning line or disclaimer
Open `src/content/profile.ts` and edit `positioning` or `disclaimer`.

### Publish a verified career detail
In `src/content/profile.ts`, add an entry to `approvedCareerDetails`:

```ts
approvedCareerDetails: [
  { heading: "Finance leadership", text: "Wording exactly as approved.", approvedOn: "2026-11-15" },
],
```

It appears on `/evidence` under the public profile.

### Add a checked LinkedIn or other link
Add it to `links` in `profile.ts` only after opening the URL and confirming it is Mary's:

```ts
links: [{ label: "LinkedIn", href: "https://www.linkedin.com/in/…", checkedOn: "2026-11-15" }],
```

### Mark a source as verified
In `src/content/sources.ts`, set `status: "verified"`, update `published` with the date shown on the page, and replace `statusNote` with what you checked. Update the matching entry in `publicFacts` if the wording or date differs.

### Edit a workstream
Open `src/content/workstreams/NN-name.ts`. Each one follows the same structure:

| Field | Shows as |
| --- | --- |
| `summary` | Paragraph under the title |
| `outcome` | 01 Intended outcome |
| `establishFirst` | 02 What I would establish first |
| `method` | 03 How I would do it (numbered steps) |
| `deliverables`, `templates` | 04 Deliverables and templates (tables) |
| `ownership` | 05 Ownership and dependencies |
| `gates` | 06 Decision gates |
| `cadence`, `kpis` | 07 Cadence and KPIs |
| `risks` | 08 Risks and trade-offs |
| `timeline` | 09 First 90 days and months 4–12 |
| `success` | 10 Success and assumptions |
| `extras` | Deep-dive sections placed after the section named in `after` |

**Tables:** each row must have the same number of cells as `columns`. `npm test` checks this.

**Renaming a section id or slug** breaks deep links that people may have saved, so avoid it.

### Change Decision Lab numbers
Defaults and presets are in `src/lib/equity-case.ts`. If you change the defaults, update the expected values in `tests/calculators.test.ts` and the README checklist. The tests exist to catch arithmetic errors.

## After editing

Run locally if you can:

```bash
cd africa-playbook
npm run check
```

If you edited on GitHub, open the Vercel preview for your commit and check the page you changed.
