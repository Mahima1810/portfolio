# Mahima Kopalley · Portfolio

My personal site: experience, projects and contact. Built with **Next.js 15**, **React 19**, **TypeScript** and **Tailwind CSS v4**, exported as a static site and deployed to **GitHub Pages**.

## Run locally

```bash
npm install
npm run dev      # http://localhost:3000
```

## Edit content

All text lives in [`src/data/profile.ts`](src/data/profile.ts). Project screenshots are in `public/projects/`.

## Deploy (free, GitHub Pages)

1. Push this folder to a GitHub repository. The best name is **`Mahima1810.github.io`**, which gives the site the address `https://mahima1810.github.io`.
2. On GitHub, open the repository's **Settings → Pages** and set **Source** to **GitHub Actions**.
3. Every push to `main` builds and deploys the site (`.github/workflows/deploy.yml`).

Any other repository name also works: the workflow sets the base path automatically, and the site appears at `https://mahima1810.github.io/<repo-name>/`.

## Design notes

- Dark theme with an aurora gradient, a subtle grid, and glass-style cards
- Accessible: semantic sections, labelled icon buttons, visible focus, `prefers-reduced-motion` respected
- Responsive from 375 px phones to wide desktops (no horizontal scroll)
- No tracking or analytics
