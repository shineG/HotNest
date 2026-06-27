# Hotnest Technology — Corporate Website

Static corporate website for [Hotnest Technology](https://www.hotnest.net), rebuilt with [Astro](https://astro.build) using hand-written CSS for broad browser compatibility.

## Stack

- **Astro 6** — static HTML output, minimal JavaScript
- **Plain CSS** — no Tailwind; Autoprefixer for vendor prefixes
- **ES5 site script** — header scroll, mobile nav, fade-in animations
- **Deploy** — Cloudflare Pages (build: `npm run build`, output: `dist`)

## Browser support

Primary target: **Firefox 78.15.0 ESR on macOS 10.9.5**. CSS uses flexbox, transforms, and transitions; no `:has()`, scroll-driven CSS, or View Transitions. See [COMPATIBILITY.md](./COMPATIBILITY.md) for GSAP vs CSS notes.

## Setup

```bash
npm install
bash scripts/download-images.sh   # fetch assets from Wix CDN (one-time)
npm run dev
```

## Build

```bash
npm run build
npm run preview
```

## Cloudflare Pages

| Setting | Value |
|---------|--------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 22 |

Connect your GitHub repository in the Cloudflare Pages dashboard and bind `www.hotnest.net` after preview approval.

## Project structure

```
src/
  components/   # Reusable Astro components
  data/         # Content (navigation, stats, partners, timeline)
  layouts/      # BaseLayout
  pages/        # Routes
  styles/       # Global CSS
public/
  images/       # Static images (after download script)
  scripts/      # site.js (ES5)
```
