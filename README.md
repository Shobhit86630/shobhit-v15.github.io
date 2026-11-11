# Shobhit Bawangarh — Portfolio

Personal portfolio built with **Next.js (App Router) + TypeScript + Tailwind CSS v4 + Framer Motion + GSAP**, exported as a fully static site for **GitHub Pages**.

Live target: <https://shobhit-v15.github.io>

## Quick start

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # static export -> ./out
npm start          # serve ./out locally
npm run lint       # TypeScript type-check
```

## Editing content

All copy, links, stats and asset paths live in **`src/data/portfolio.ts`**. You shouldn't need to touch components to update content.

| What | Where |
| --- | --- |
| Name, title, intro, email, availability | `profile` |
| GitHub / LinkedIn / Email links | `socials` |
| Stats (experience, projects, technologies) | `stats` (projects/technologies are counted automatically) |
| Projects (image, optional `video`, tags, `github`, `live`) | `projects` |
| Experience & education timeline | `experience` |
| Technologies | `tools` |
| Articles | `thoughts` (placeholders; set `href` and remove `draft` when published) |
| Contact copy & form options | `contact` |

### Replacing placeholder assets

The project images under `public/images/projects/` are **demo placeholders** (labelled "DEMO PREVIEW"):

- **Portrait:** `public/images/portrait.webp` is an 800×800 WebP made from the transparent cut-out in `assets/portrait-original.png`. The original lives outside `public/`, so it isn't deployed. To change it, swap in a new image (transparent backgrounds look best on the orange card) and update `profile.portrait`.
- **Project previews:** replace `public/images/projects/*.svg` with screenshots (4:3 ratio), or update each project's `image`.
- **Project videos:** put an `.mp4`/`.webm` file in `public/videos/` and set `video: "/videos/<file>.mp4"` on the project. It autoplays muted on a loop, uses `image` as the poster, and falls back to the image when the visitor prefers reduced motion.
- **Project links:** each project's `github` is left unset until its repo is public, and the Source button stays hidden until you set it.
- **Resume:** add the PDF to `public/` and set `profile.resume`. It's not included by default because the resume contains a phone number.

### Technology logos

Logos in `public/icons/` come from [Simple Icons](https://simpleicons.org) (CC0), with brand colours applied. To add one, put its slug in `scripts/sync-icons.mjs`, run `npm run icons`, and reference `/icons/<slug>.svg` in `tools`. Concepts without an official logo (RAG, OpenAI API) use a Lucide glyph via `glyph`.

## Project structure

```
src/
  app/            layout.tsx (SEO/OG metadata), page.tsx, globals.css (design tokens),
                  og.png/ (static OG image), robots.ts, sitemap.ts, icon.svg
  components/     Navbar, Hero (+ ProfileCard), Stats, Projects, Experience,
                  Tools, Thoughts, Contact, Footer, ui (Reveal, SectionHeading, icons)
  data/           portfolio.ts  <- all content
  lib/            utils.ts (cn, asset path helper, date formatting)
public/           images/, icons/, videos/, .nojekyll
scripts/          sync-icons.mjs
```

Design tokens (colours, radii) are CSS variables in `src/app/globals.css` and are exposed to Tailwind as `bg-accent`, `text-muted`, `bg-surface`, `border-line`, and so on.

## Deploying to GitHub Pages

1. Create a repository named **`shobhit-v15.github.io`** under the `shobhit-v15` account.
2. Push this project to the `main` branch:
   ```bash
   git init && git add . && git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/shobhit-v15/shobhit-v15.github.io.git
   git push -u origin main
   ```
3. In the repo, go to **Settings → Pages → Build and deployment → Source** and choose **GitHub Actions**.
4. Each push to `main` runs `.github/workflows/deploy.yml`, which builds `out/` and publishes it.

**Deploying to a project page** (`username.github.io/<repo>`) instead: set `NEXT_PUBLIC_BASE_PATH: "/<repo>"` in the workflow, and update `site.url` in `portfolio.ts`. Asset paths go through the `asset()` helper, so they pick up the base path automatically.

## Notes

- The contact form works with static hosting: it opens a pre-filled email in the visitor's mail client. To submit in the page instead, swap `handleSubmit` in `Contact.tsx` for a service like Formspree or Web3Forms.
- Animations respect `prefers-reduced-motion`.
- **Light / dark mode:** the sun/moon button in the navbar switches theme. First-time visitors get their OS setting, and an explicit choice is saved in `localStorage`. An inline script in `layout.tsx` applies it before first paint, so there's no flash. Both palettes are CSS variables in `globals.css` (`:root` is dark, `[data-theme="light"]` is light).
- The visual design is inspired by the Sawad Framer template.
