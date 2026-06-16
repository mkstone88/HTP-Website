# Hometown Painting — Astro site (POC)

Astro static site for **hometownpaintingokc.com**, deploying to Cloudflare Pages.
Design system copied from the PPC landing pages at `quote.hometownpaintingokc.com`
(Heritage Navy `#1B2A4A`, Brand Red `#C41230`, Warm Linen `#F5F0EB`; DM Serif
Display + DM Sans + Montserrat wordmark), extended for a multi-page marketing site.

## Status: proof-of-concept

Built so far:
- `/` — home page (live WordPress home content in the new design)
- `/exterior-painting-oklahoma-city/` — representative inner service page (template demo)
- Shared layout, header w/ nav, footer, lead form, analytics, JSON-LD schema
- `public/_redirects` (legacy WP 301s) + `robots.txt` + auto sitemap

## Commands

```bash
npm install
npm run dev      # local dev at http://localhost:4321
npm run build    # static output to dist/
npm run preview  # serve the production build
```

## Key conventions

- **Trailing-slash URLs** (`trailingSlash: 'always'`) to match WordPress exactly — critical for SEO.
- Routes mirror existing WordPress slugs 1:1 (see `../migration/seo/migration-map.csv`).
- Business data + tracking IDs are centralized in `src/data/site.ts`.
- Tracking uses the **live main-site** values (GTM-NS8LBWQQ, AW-16858477075, GA4 G-96VQPY702N,
  phone 405-400-1619) — NOT the ad-tracking values from the quote.* funnel.

## TODO before the real build

- Wire the lead form `action` to the GHL webhook (currently in WordPress `script.js`).
- Port the remaining 35 pages + 27 blog posts (content in `../migration/raw_html/`).
- Decide markdown-only vs Git CMS, booking iframe vs redirect (see `../migration/FINDINGS.md`).
- Real white/reversed logo asset (currently a CSS text wordmark).
- Add gallery + before/after images.

## Regenerate screenshots

```bash
npm run preview &     # serve on :4321
node shot.mjs         # writes to ../migration/screenshots/
```
