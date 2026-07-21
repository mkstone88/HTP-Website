# Hometown Painting — website project

Migrating **hometownpaintingokc.com** from WordPress to a static **Astro** site on
**Cloudflare Pages**. App lives in the **`site/`** subdirectory.

## Branching & deploy — read this first

**`main` is the canonical production branch, and Cloudflare Pages auto-deploys it** to
`test.hometownpaintingokc.com` (staging now; the live site after DNS cutover). Each session gets
its own working branch (e.g. `claude/...`) — do your work there, then **merge into `main`** so it
deploys; a session branch never deploys on its own. `main` is the GitHub default branch, so new
sessions branch from it. **Indexing is safe-by-default:** every build stays noindexed unless
`PUBLIC_NOINDEX=false` is set, which only the real production site does, at cutover (`src/data/seo.ts`).

> **Start each session by reading [`NEXT-STEPS.md`](NEXT-STEPS.md)** — it's the living
> to-do list (things waiting on Matt, things queued for Claude, launch status). When Matt
> asks "what's on my to-do list," that file is the answer. Keep it updated as items close.

> **Before writing or rewriting ANY copy/page/ad, read [`brand/MESSAGING.md`](brand/MESSAGING.md).**
> It's the StoryBrand-based voice + ICP guide: customer = Hero, Hometown = Guide; the meta-fear is
> *loss of control*; lead with the homeowner's fear and resolve it with concrete proof (walk-through
> before final payment, written warranty, owner involvement, 130+ real reviews). Target the ideal
> customer (trust-driven OKC homeowner 45–65), not bargain hunters. Source docs in `brand/source/`.

> **Adding NEW substantial content (new page, blog post, major rewrite)? Interview Matt FIRST.**
> Matt wants our content to stand out from generic AI writing, so it has to lead with his firsthand
> knowledge. Standard process, in priority order: **(1) interview Matt** for his stories, opinions,
> specifics, and preferences; **(2) then mine our loaded context** (this file, `brand/`, `migration/`,
> Airtable, the 132 real reviews) for relevant facts; **(3) only then fall back to general knowledge**
> to fill the gaps. His voice first, the model's last. Do not draft substantial copy without step 1.

> ⛔ **Never touch `quote.hometownpaintingokc.com`** (repo `mkstone88/htp-landing-pages`) —
> it's the live, converting PPC funnel. Out of scope, separate project.

## Business facts (confirmed with Matt — don't re-ask, keep the site consistent with these)

- **Company:** Hometown Painting LLC. Owner **Matt Stone** (learned the trade from his
  grandfather **Art**); wife **Rachel** co-owns. Family business, plain-spoken brand voice.
- **Contact:** 405-400-1619 · matt@hometownpaintingokc.com · 13637 SE 114th St, Oklahoma City, OK 73165.
- **Origin:** got started in **Bethany**, now **OKC-based** (say "got our start in Bethany," not "based in Bethany").
- **Reputation:** 4.9★, 130+ Google reviews (132 actual as of 2026-07).
- **Warranty:** **5-year** on interior & exterior *painting* (walls, trim, exterior surfaces);
  **2-year** on *cabinets* and *all staining* (fence, deck, pergola). Per-page hero badge is
  driven by `warranty:` frontmatter (default "5-Year Warranty"; staining/cabinet pages set "2-Year Warranty").
- **Pricing (one truth — every page must agree):** exterior repaint **$4,000–$10,000**;
  interior **$5–$10/sq ft**; fence staining **$2,000–$4,000**; cabinets **$5,000–$10,000**.
- **Repaint cadence:** standard line is **every 7–10 years**.
- **Paint:** **Sherwin-Williams primary** (Duration, Emerald, Cashmere); *Benjamin Moore
  available on request* only where already mentioned. Fence/deck stain: **Wood Defender**.
- **Services offered:** interior, exterior, cabinets, fence/deck/pergola staining, commercial,
  drywall repair, pressure washing (house washing, driveways, decks, fences, pre-paint prep —
  **NOT** roof cleaning, gutter cleaning, or fleet washing). Military & first-responder discounts.
- **Tracking:** GTM `GTM-NS8LBWQQ`, Google Ads `AW-16858477075`, GA4 `G-96VQPY702N`
  (✅ resolved 2026-07-20: GTM container holds only a Conversion Linker, no GA4 tag, so GA4 fires
  once via the direct gtag — no double-counting; no change needed).

## Verified reviews asset → use for ALL social proof

`migration/reviews/` holds **all 132 real Google reviews** plus a name-match against Matt's
GoHighLevel contacts. For 72 of them we have a **verified city** (pulled from the past-customer's
address on file); `reviews-matched.csv` has date, reviewer, stars, city, confidence, and whether
they're a verified customer.

**Whenever a page needs a testimonial or social proof, pull a REAL one from this list that matches
the page's city/service** — never invent or reuse a generic quote. Once Matt returns the completed
`HTP-Google-Reviews-Tagging.xlsx` (cities filled from memory + a "Feature on site?" flag), only use
reviews he marked **Feature = Yes**.

**Attribution convention** (agreed with Matt): first name + last initial, role, city —
> *"…quote…"* — **Sally V., Homeowner · Edmond**
> *"…quote…"* — **Susan G., Office Manager · Oklahoma City** (commercial page)

Re-pull reviews or contacts anytime via the LeadConnector API using env vars
`GHL_API_Token` + `GHL_Location_ID` (location `ch2x7nFXHf3H6JiDzmas`). Raw contact export
(PII: emails/phones) is git-ignored — never commit it; only derived city/tags per public review.

## Tech notes

- **Astro 4 static** → `site/dist`. Content: `site/src/content/pages/*.md` + `blog/*.md`
  (frontmatter: title, description, permalink, h1, ogImage, formId?, noindex?, showRating?, warranty?).
- `trailingSlash: 'always'`. Canonicals/sitemap from `SITE` in `astro.config.mjs`.
- **Staging noindex is safe-by-default:** every build is noindexed unless `PUBLIC_NOINDEX=false`
  is set (`src/data/seo.ts`). Only the real production site sets `PUBLIC_NOINDEX=false`, at cutover. Per-page `noindex: true`
  frontmatter also drops the page from the sitemap (keep `NOINDEX_PATHS` in `astro.config.mjs` in sync).
- **Images:** Cloudflare transforms are ON (`src/data/images.mjs`, `/cdn-cgi/image/...`). Local
  markdown images auto-get lazy-load + responsive srcset via `src/lib/rehype-cf-images.mjs`.
- **Schema:** sitewide HousePainter JSON-LD in `BaseLayout.astro`; `aggregateRating` only emits
  on pages with `showRating: true` (home + /reviews/). Posts get BlogPosting; pages get BreadcrumbList.
- **Forms:** GoHighLevel iframes (`api.leadconnectorhq.com`), ids in `src/data/site.ts`.
- Build/verify: `cd site && npm run build`. Redirects: `site/public/_redirects` (Cloudflare Pages).

## Deploy

Cloudflare Pages, root dir `site/`, build `npm run build`, output `dist`. Full cutover
sequence is in NEXT-STEPS.md. Staging preview: `test.hometownpaintingokc.com` (noindexed).
Production apex/www still on WordPress until cutover.
