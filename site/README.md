# Hometown Painting — Astro site (POC)

Astro static site for **hometownpaintingokc.com**, deploying to Cloudflare Pages.
Design system copied from the PPC landing pages at `quote.hometownpaintingokc.com`
(Heritage Navy `#1B2A4A`, Brand Red `#C41230`, Warm Linen `#F5F0EB`; DM Serif
Display + DM Sans + Montserrat wordmark), extended for a multi-page marketing site.

## Status: full content port

- **All 63 URLs ported** (37 pages + 27 posts, minus 1 consolidated deck dupe).
- Content lives as markdown in `src/content/{pages,blog}/`, extracted from the
  live WordPress `.entry-content` (see `../migration/extract.py`).
- `/` home + `/blog/` index are custom Astro pages; everything else renders from
  markdown via `src/pages/[...slug].astro` at its exact `permalink`.
- **GoHighLevel forms** embedded via `src/components/GHLForm.astro` (homepage form
  on `/`, contact + estimate forms on their pages).
- **CMS:** Sveltia CMS at `/admin/` (Git-based, free) — see `../migration/CMS-SETUP.md`.
- `public/_redirects` (legacy WP 301s) + `robots.txt` + auto sitemap.

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

- Wire CMS auth (GitHub OAuth worker) — see `../migration/CMS-SETUP.md`.
- Localize images: content currently hot-links `hometownpaintingokc.com/wp-content/...`;
  download into `public/uploads/` (or R2) before WordPress is retired.
- Real white/reversed logo asset (currently a CSS text wordmark).
- Custom layouts for `/gallery/` (image grid) and `/pricing/` if desired
  (currently render through the standard prose template).
- Booking widget (`api.leadconnectorhq.com/widget/bookings/hometownpainting`) —
  add where wanted.

## Regenerate screenshots

```bash
npm run preview &     # serve on :4321
node shot.mjs         # writes to ../migration/screenshots/
```
