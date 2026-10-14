# tanakriteuro.github.io — resume website

Personal resume site for Tanakrit "Euro" Roongtanapirom, a third-year Computer Engineering
student at Chulalongkorn University applying for 2027 internships in software and computer
engineering.
It replaces the old portfolio at https://portfolio-tanakriteuro.vercel.app (repo `../portfolio`).

Live URL (once deployed): **https://tanakriteuro.github.io**

## Audience and goal

A recruiter or engineer opens this from a resume or LinkedIn and decides in ~30 seconds whether
to read on. The first screen must answer: who he is, what he's looking for, and the strongest
evidence (Togethr, then the tools he uses daily). Everything else is one scroll or click away.

## Content: `content/resume.json` is the single source of truth

- All text on the site comes from `content/resume.json`. Never hardcode copy in components.
- It mirrors the resume document. If something is missing or wrong, change the JSON, not the UI.
- The site may be more detailed than the one-page `public/resume.pdf` (for example the full
  coursework list), but must never claim anything the PDF doesn't support.
- **Do not invent or embellish claims** (no made-up metrics, users, awards or roles). If a
  section would look thin, leave it thin and flag it to Euro rather than padding it.
- Do **not** publish the phone number. Email and LinkedIn are the contact routes.

### Honesty rules for projects (important)

Projects have a `group`:

| group | Meaning | How to present |
| --- | --- | --- |
| `own` | Euro's own work (Togethr, team project; AI-assisted coding like any modern workflow) | Featured first, full bullets |
| `daily-tool` | Built with Claude Code, Euro wrote the requirements, tested it and uses it daily | Second, full bullets, visible "Built with Claude Code" label |
| `showcase` | Built by Claude Code from Euro's specs and feedback | Compact grid/list under a heading that carries `showcaseNote`, each with a "Built with Claude Code" label |

Never drop or hide the `builtWith` labels, and never reword a showcase project as if Euro wrote
it himself. Interviewers will ask about anything on this site.

## Pages and sections

One page is enough; add project detail pages only if they add real substance.

1. **Hero:** name, headline, availability, summary, links (GitHub, LinkedIn, email) and a
   "Download resume (PDF)" button (`resumePdf`; hide it until `public/resume.pdf` exists).
2. **Projects:** `own` → `daily-tool` → `showcase`, as above. Showcase entries link to their
   live demos where they exist (gb-emu, AlgoViz, Ledger, AutomataLab are good to click).
3. **Course projects**
4. **Education** (GPAX, coursework)
5. **Skills**
6. **Footer:** contact again, last updated date, and a small "This site was built with Claude
   Code" line (consistent with the honesty rules).

## Design direction

- Calm, typographic, confident. It should read like a well-set resume, not a template:
  no stock hero gradients, no skill progress bars, no "Hi, I'm…" waving emoji, no carousels.
- Strong type hierarchy, generous whitespace, one accent colour, real links styled as links.
- Light and dark themes following the OS, with a toggle.
- Responsive down to 360 px wide; no horizontal scroll.
- **Print stylesheet:** printing the page should produce a clean, one-to-two-page resume
  (no nav, no buttons, black on white, URLs shown for links).
- Subtle motion at most, and respect `prefers-reduced-motion`.

## Tech stack

- **Astro** (static output) + TypeScript. Plain CSS or Tailwind, your choice; keep it small.
- Ships little or no client JavaScript (theme toggle is fine).
- `npm run build` must output to `dist/` (the deploy workflow uploads `dist/`).
- `astro.config` → `site: "https://tanakriteuro.github.io"`, no `base` (this is a user site
  served at the root).
- Good SEO/social basics: title, description, Open Graph tags and image, favicon, `sitemap`,
  `robots.txt`.

## Deployment: GitHub Pages (user site)

- The GitHub repo **must be named exactly `TanakritEuro.github.io`** under the `TanakritEuro`
  account; that's what makes the site live at the root URL.
- `.github/workflows/deploy.yml` (already here) builds and deploys on every push to `main`.
- One-time: GitHub repo → Settings → Pages → Build and deployment → Source: **GitHub Actions**.
- `https://tanakriteuro.github.io/gb-emu/` is served by the `gb-emu` repo. Don't create a
  `/gb-emu` route in this site.
- A custom domain can be added later (`public/CNAME` + DNS); not needed now.

### Retiring the old Vercel portfolio (after the new site is live)

In `../portfolio`, add a `vercel.json` that permanently redirects every path to
`https://tanakriteuro.github.io`, push to `main` (Vercel auto-deploys), and update the repo's
README to point to the new site. Ask Euro before deleting the Vercel project or the repo.

## Done when

- [ ] `npm run build` passes with no warnings; the GitHub Actions deploy is green.
- [ ] Every link on the page works (check them).
- [ ] Looks right at 360 px, 768 px and 1440 px, in light and dark, and in print preview.
- [ ] Lighthouse: Performance, Accessibility, Best Practices and SEO all ≥ 95.
- [ ] Keyboard navigation works with visible focus; images have alt text.
- [ ] No phone number anywhere; all "Built with Claude Code" labels present.
- [ ] README explains how to edit content and deploy.
