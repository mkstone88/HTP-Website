# Next steps — living to-do list

Last updated: 2026-07-20. This is the running checklist for the Hometown Painting site.
When Matt asks "what's on my to-do list," read this file back. Check items off and add new
ones as work progresses. (Detailed pre-launch audit: the launch-readiness report artifact.)

## ⏳ Waiting on Matt (quick wins when you're at your computer)

- [ ] **Return the tagged review workbook** (`HTP-Google-Reviews-Tagging.xlsx`). 72/132 cities
      are pre-filled from your GHL customer records — just fix the blue ones, fill yellow ones
      you remember (Unknown is fine for the rest), and set **Feature on site? = Yes** for the
      reviews worth quoting (aim 3–5 per city page, a few per service). → unlocks real
      city-matched testimonials sitewide.
- [ ] **Project photos from the Drive folder (2026-07-20).** Added genuinely-new local hero shots to
      **Edmond** (Romeo Dr), **Mustang**, and **Yukon** (500 War Eagle) city pages. KEY FINDING: most
      of the drop was **already on the site** (the WordPress migration had pulled them) — Bethany already
      had a full local photo set (its page was never actually photo-less), and the 9409 SW 32nd / 5613 NE
      107th interior sets are already in use. Still available if wanted: a **new interior job (5616 NW 130th,
      7 pro photos)** and a Yukon interior — could refresh the gallery / interior page. Commercial folder is
      still empty (no commercial photos yet). Nichols Hills folder empty (and no NH page yet anyway).
- [ ] Decide on the **real logo** (SVG). Header/footer currently use a CSS text wordmark; the
      brush-H logo exists at `site/public/uploads/2022/08/edited.jpg` — OK to trace into an SVG?

## 🔧 Queued for Claude (some need the items above first)

- [ ] **Wire verified testimonials into pages** once the tagged workbook is back — city pages
      (Edmond/Yukon/Mustang/Bethany/Mesta Park), service pages, and commercial page, using the
      `First L., Role · City` attribution convention. Bethany especially needs local proof.
- [ ] Place/optimize new photos as they come in.
- [ ] Real logo SVG (reversed for the navy header) once approved.
- [ ] **Post-launch backlog** (fine after go-live): embedded lead forms on the top money pages +
      city pages + commercial (template already supports `formId`); decide /painting-estimate/'s
      role (noindex vs integrate); gallery captions with neighborhoods; blog category grouping.

## 🧪 Pre-launch QA gate (run LATE, once content is stable — do all four right before cutover)

These are the final quality passes. Do them near the end so new pages/edits don't undo the work.

- [ ] **1. Copy vs. brand + knowledge base.** Read every page against `brand/MESSAGING.md` and
      `brand/source/`: customer = Hero / Hometown = Guide (never brand-as-hero); each page leads
      with the homeowner's fear and resolves it with concrete proof (walk-through before final
      payment, written warranty, owner involvement, 130+ reviews); the five root fears are answered
      where relevant; copy targets the trust-driven ICP, not bargain hunters; testimonials use the
      `First L., Role · City` convention and are real. Flag/rewrite any page that drifts generic or
      makes us the hero. (Pairs naturally with the humanizer pass below.)
- [ ] **2. Humanizer pass.** Run the humanizer skill across all content to strip AI tells: em dashes
      as sentence breaks (Matt's pet peeve), rule-of-three phrasing, "not just X but Y," inflated
      adjectives, hollow intros. New copy is already written em-dash-free; numeric ranges like
      $2,000–$4,000 keep the correct en dash. After humanizing, re-check that target keyphrases
      survived (humanizing can soften a page's focus keyword).
- [ ] **3. Local SEO audit + fix.** Work through: title tags (≤60 char, keyword + city) and meta
      descriptions per page; one unique keyword-rich H1 per page; NAP consistency (name, 13637 SE
      114th St, 405-400-1619) identical across footer, contact page, and schema; HousePainter /
      LocalBusiness JSON-LD completeness (geo coords, areaServed cities, hours, sameAs — add Google
      Business Profile + other real profiles); city pages geo-targeted with unique local content;
      image alt text present + descriptive; internal links to money pages; canonicals + trailing
      slashes; sitemap/robots correct; validate all structured data (Rich Results Test); confirm no
      orphan/thin pages remain. Fix everything basic that turns up. (Ask Matt for the GBP categories
      + service-area list to align schema — see the section below.)
- [ ] **4. Page-speed audit.** Run Lighthouse / PageSpeed Insights on the production (or preview)
      URL, mobile + desktop. Check Core Web Vitals (LCP, CLS, INP); confirm hero images preload and
      the LCP is fast; verify images ship resized/AVIF via the CF pipeline (no raw full-size); check
      font loading, CSS size, and render-blocking JS; confirm the GHL form iframe and GTM aren't
      tanking the score and the video facades make zero third-party requests until clicked. Fix
      regressions; aim for green CWV on mobile.

## 🎥 Video hosting decision (settled: stay on YouTube)

Re-embedded 7 of Hometown's own YouTube videos with a **click-to-load facade** (local poster
thumbnail, zero third-party requests until the visitor hits play) + VideoObject schema. Recommendation
was to **stay on YouTube, not move to Cloudflare Stream** — YouTube is free, already hosts the
catalog, and adds discovery/SEO; the facade removes the only real downside (page-speed/cookies).
Revisit Stream only if you ever want a fully branded, distraction-free player with no "more videos"
suggestions. Registry of embedded videos: `site/src/data/videos.mjs`.

## 💲 City-specific pricing (done — review the numbers)

Each city page's FAQ now carries a pricing range built from **202 real completed projects**
(Airtable → Projects, amount + type by city). Edmond $5,000–$9,000 exterior (16 jobs, confirmed
larger), Yukon $3,500–$7,000 ext / $4,500–$7,500 int, Mustang $4,000–$8,000, Bethany
$3,000–$6,500, Mesta Park qualitative. Data + refresh steps: `brand/pricing-data.md`. **Matt: skim
the bands and tell me any you'd adjust** — thin-sample cities (Mustang/Bethany) lean on home-profile
logic. Airtable connector is now working, so future data pulls (job costing, sources, etc.) are on the table.

## ✅ Done (recent)

- All 13 launch-blocking audit issues (404 page, favicon set, legacy-URL/wp-content/sitemap
  redirects, schema scoping, per-page noindex, hero preload, image pipeline, privacy/terms
  cleanup, pergola testimonials restored, deck metadata, thank-you page, etc.).
- Confirmed business facts applied sitewide (pricing, warranty tiers, brands, pressure-washing
  scope, repaint cadence, Bethany origin, privacy email).
- All 132 Google reviews pulled + matched to GHL contacts (73 verified customers, 72 cities).
- Blog sweep: typos, multiple-H1 fixes, silo/money links, price formatting.
- City-specific pricing FAQs from 202 real projects; interior reframed as scope-driven.
- FAQPage + VideoObject schema; 7 videos re-embedded (lazy facade). Brand/messaging knowledge base.
- GTM/GA4 double-fire check (resolved: no double-fire).

## 🚀 Launch status

**Not a blocker anymore — the site is in good shape.** The remaining gates before flipping DNS:
1. (optional but recommended) tagged reviews in place for stronger city pages,
2. ✅ GTM/GA4 double-count checked — GTM has only a Conversion Linker, no GA4 tag, so no double-fire; nothing to change.
3. more photos,
4. **the Pre-launch QA gate above** (copy/brand review, humanizer, local SEO audit, page speed),
5. execute the **cutover checklist** (in the launch-readiness report): set Pages production
   branch to `main`, drop `PUBLIC_NOINDEX`, point apex/www at Pages (keep WordPress warm for
   rollback), verify forms + image transforms live, submit `/sitemap-index.xml` to Search
   Console, watch 404s + rankings for ~2 weeks.

## 💡 Other ways Matt can move things forward (Claude can act on any of these)

- Send Google Business Profile categories/service-area list to tighten local SEO + schema.
- Confirm service-area cities you actually want pages for (only 5 exist today — could add
  Piedmont, Nichols Hills, Deer Creek, etc. if you serve them and want to rank there).
- Any seasonal promo / financing offer to feature in the hero or a banner?
- Point Claude at the GHL booking calendar settings if you want the scheduler embedded rather than linked.
