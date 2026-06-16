# Hometown Painting OKC — Site Inventory & SEO Migration

> Snapshot crawled **2026-06-16** from the live WordPress site (WordPress + Rank Math SEO, Cloudflare-fronted).
> Source of truth for the WordPress → Astro migration. Raw data lives alongside this file.

## Files in this folder

| File | What it is |
|------|------------|
| `sitemaps/` | Raw `sitemap_index.xml` + `post-`, `page-`, `local-` sub-sitemaps and `robots.txt` |
| `inventory/urls.tsv` | The 64 indexable URLs (27 posts + 37 pages) |
| `inventory/pages.json` | Full per-URL crawl data: title, meta, robots, canonical, OG tags, H1/H2, JSON-LD schema types, word/image/link counts, all internal links & images |
| `inventory/inventory.csv` | Flat spreadsheet summary of the above |
| `raw_html/*.html` | Saved raw HTML of every crawled URL (content source for the rewrite) |
| `seo/migration-map.csv` | **The migration map** — old URL → proposed new URL, action, title & meta to carry over |
| `seo/legacy-redirects.csv` | Existing WordPress 301s discovered live (must be preserved) |
| `seo/_redirects` | Cloudflare Pages redirect file, ready to drop into `public/_redirects` |
| `crawl.py` | The crawler (re-runnable) |

## At a glance

- **64 indexable URLs**, all returning **HTTP 200** (no broken pages in the sitemap).
- **37 pages** (~35k words) + **27 blog posts** (~26k words).
- Author archives (`/author/*`) are `noindex` — safe to drop.
- Site is consistently structured with Rank Math: every page has a title, meta description, canonical, OG tags, and a rich JSON-LD `@graph`.
- **Zero pages are missing a meta description.** 

## Schema (JSON-LD) — sitewide

Every page emits an `@graph` containing a shared **`HousePainter` + `Organization`** business node:

| Field | Live value |
|-------|-----------|
| name | Hometown Painting LLC |
| telephone | **1-405-400-1619** ⚠️ (handoff said 405-400-1707 — see FINDINGS) |
| email | matt@hometownpaintingokc.com |
| address | 13637 SE 114th St, Oklahoma City, OK 73165, US |
| priceRange | `$$$` |
| sameAs | facebook.com/Hometownpaintingokc |
| image | `#logo` |

- **Pages** add `Article` / `WebPage`. **Posts** add `BlogPosting`. A few add `VideoObject`.
- `ContactPage` on `/contact-us/`, `AboutPage` on `/professional-painters-okc/`.
- ⚠️ **No `aggregateRating` / `Review` schema anywhere**, despite the "120+ 5-star / 4.9★" claims in titles. Opportunity to add valid review schema in the new build (must be backed by real, on-page reviews per Google policy).

## Tracking found live (all pages)

| Tool | Live ID | Handoff doc said | Match? |
|------|---------|------------------|--------|
| Google Tag Manager | **GTM-NS8LBWQQ** | GTM-T3J5R93S | ❌ differs |
| Google Ads | AW-16858477075 | AW-16858477075 | ✅ |
| GA4 | **G-96VQPY702N** | (not listed) | ➕ new |
| Phone (displayed/tel:) | **405-400-1619** + a 405-202-7945 call-tracking number | 405-400-1707 | ❌ differs |

**These discrepancies must be resolved with Matt before cutover** — see `FINDINGS.md`.

## Page structure (the 37 pages)

**Core / nav:** `/` · `/interior-painting-okc/` · `/exterior-painting-oklahoma-city/` · `/fence-staining-okc/` · `/gallery/` · `/blog/` · `/contact-us/` · `/pricing/`

**Services:** interior, exterior, fence staining, deck staining (×2 — duplicate, see below), cabinet painting, drywall repair, pressure washing, commercial, pergola staining, wall painting, brick (post), lime wash (post).

**City/neighborhood landing pages:** Yukon, Mustang, Edmond, Bethany, Mesta Park.

**Conversion/utility:** `/painting-estimate/` · `/thank-you/` · `/painters/` · `/interior-painting/` · `/exterior-painting/` (these last three are thin "landing page" variants) · `/link-tree/` · `/reviews/`.

**Pricing cluster:** `/pricing/` → `/pricing/exterior-painting-cost-oklahoma-city/`, `/pricing/interior-pricing/`.

**Legal:** privacy-policy, terms-conditions, disclaimer, warranty.

### ⚠️ Duplicate / problem URLs

1. **Two near-identical deck-staining pages** under a deeply-nested path:
   - `/exterior-painting/deck-staining-okc-professional-deck-staining-services-in-oklahoma-city/`
   - `/exterior-painting/deck-staining-okc-.../professional-deck-staining-okc-hometown-painting-oklahoma-city/`
   Recommend consolidating to a clean `/deck-staining-okc/` and 301-ing both. (Note `/deck-staining-okc/` already 301s *into* the nested page today.) **Needs Matt's call** — flagged in the migration map, redirects left commented out.

2. **Thin pages (<300 words):** `/link-tree/` (104), `/thank-you/` (138), `/gallery/` (182), `/reviews/` (190), `/contact-us/` (212), `/painting-estimate/` (260), `/wall-painting-okc/` (287). Mostly fine (utility/conversion pages), but `/wall-painting-okc/` and `/reviews/` are weak and could be beefed up or merged.

## Existing 301 redirects (live in WordPress — MUST be carried over)

These already work on the live site and have link equity / possibly inbound links. They are reproduced in `seo/_redirects`:

| Old URL | → Target |
|---------|----------|
| `/exterior-painting-okc/` | `/exterior-painting-oklahoma-city/` |
| `/deck-staining-okc/` | nested deck page |
| `/commercial-painting/` | `/commercial-painting-in-yukon-ok-victory-baptist-church/` |
| `/fence-staining/` | `/fence-staining-okc/` |
| `/home/` | `/` |
| `/is-it-time-to-paint-my-house/` | `/signs-you-need-exterior-painting-oklahoma/` |
| `/when-to-paint-exterior/` | `/signs-you-need-exterior-painting-oklahoma/` |
| `/pricing/exterior-pricing/` | `/pricing/exterior-painting-cost-oklahoma-city/` |

WordPress also enforces **trailing slashes** and serves `/feed/`, `/wp-json/`, `/wp-sitemap.xml` → `/sitemap_index.xml`. The new static site should keep trailing-slash URLs to match exactly.

## Migration policy (default = lowest SEO risk)

1. **Preserve every live URL path 1:1.** New Astro routes mirror the existing slugs exactly. This is the safest path and is what `migration-map.csv` encodes (62 of 64 = `keep`).
2. **Carry over titles & meta descriptions verbatim** (then optionally improve the ~16 titles that exceed 60 chars — listed in `inventory.csv`).
3. **Rebuild the JSON-LD** business node + per-page types; add real review schema.
4. **Reproduce all legacy 301s** via `_redirects`; keep trailing slashes.
5. **Emit a fresh `/sitemap.xml`** from Astro and resubmit in Search Console.
6. Only the **2 deck pages** are proposed for consolidation — pending Matt's approval.

## Suggested cutover sequence (SEO-safe)

1. Build on `*.pages.dev`, validate every URL renders + has correct title/meta/schema.
2. Diff new sitemap vs `inventory/urls.tsv` — confirm 1:1 (no dropped URLs).
3. Validate `_redirects` against `seo/legacy-redirects.csv`.
4. Cut DNS over to Pages; keep WordPress reachable as fallback.
5. Resubmit sitemap; watch Search Console coverage + Core Web Vitals for 2–4 weeks.
