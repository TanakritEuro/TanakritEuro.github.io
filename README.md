# tanakriteuro.github.io

My resume website: https://tanakriteuro.github.io

Built with [Astro](https://astro.build) (static output, TypeScript, plain CSS). See `CLAUDE.md`
for the full brief and the honesty rules for projects.

## Edit content

All text on the site lives in **`content/resume.json`**. Components never contain copy.

- **Resume fields** (`summary`, `projects`, `education`, `skills`, …) mirror the resume doc.
  `siteSummary` is the shorter summary shown in the hero.
- **`site`** holds the page title, meta description and interface labels (section headings,
  button text). Change wording there.
- **Projects** have a `group`: `own` (Team project), `daily-tool` (Tools I use daily) or
  `showcase` (More projects). Keep the `builtWith` field on anything built with Claude Code;
  it renders the "Built with Claude Code" label.
- **Project links:** keys in `links` (`demo`, `play`, `repo`, `frontend`, `backend`) need a matching
  label in `site.labels`.
- **Images** live under `src/assets/` (not `public/`) so Astro can resize them and serve
  WebP. Every image needs a descriptive `alt`.
  - `images` on a project or course project: figures with a `caption`; `imagesNote` adds a
    small line under them (Togethr uses it to say the screenshots use sample data).
  - `thumbnail` on a showcase project: the small picture on its card.
  - `headshot`: the round photo in the hero, from `src/assets/images/`.
    `headshot-original.jpg` is the uncropped photo; `headshot.jpg` is the square crop used.
  - `fpga-block-diagram.svg` is the editable source of the FPGA diagram; re-export the PNG
    after editing it.
- **Resume PDF:** export from the resume doc and save as `public/resume.pdf`. The
  "Download resume (PDF)" button appears automatically once the file exists.
- **Social preview image and touch icon:** after changing the name, headline or availability,
  run `npm run images` to regenerate `public/og.png` and `public/apple-touch-icon.png`.

Never add the phone number.

## Run locally

```bash
npm install
npm run dev      # http://localhost:4321
npm run build    # outputs to dist/
npm run check    # type-check
```

## Deploy

Push to `main`. `.github/workflows/deploy.yml` builds the site and publishes `dist/` to
GitHub Pages (repo Settings → Pages → Source: GitHub Actions). The "Last updated" date in the
footer is the date of the latest commit.
