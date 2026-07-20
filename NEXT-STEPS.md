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
- [ ] **GTM double-fire check** (~60 sec). tagmanager.google.com → container **GTM-NS8LBWQQ**
      → Tags. Is there a GA4 Configuration / Google tag using **G-96VQPY702N**? If yes, tell
      Claude "GA4 is in GTM" and it'll remove the duplicate direct gtag so pageviews stop
      counting twice. If no, current setup is correct.
- [ ] **Upload more project photos** for the site (before/afters, city-specific jobs, cabinets,
      commercial). Drop them in and Claude will place + optimize them. Especially wanted:
      Bethany (city page has no local photos), commercial jobs, recent interiors.
- [ ] Decide on the **real logo** (SVG). Header/footer currently use a CSS text wordmark; the
      brush-H logo exists at `site/public/uploads/2022/08/edited.jpg` — OK to trace into an SVG?

## 🔧 Queued for Claude (some need the items above first)

- [ ] **Wire verified testimonials into pages** once the tagged workbook is back — city pages
      (Edmond/Yukon/Mustang/Bethany/Mesta Park), service pages, and commercial page, using the
      `First L., Role · City` attribution convention. Bethany especially needs local proof.
- [ ] Remove duplicate GA4 gtag **if** Matt confirms GTM fires GA4.
- [ ] Place/optimize new photos as they come in.
- [ ] Real logo SVG (reversed for the navy header) once approved.
- [ ] **Post-launch backlog** (fine after go-live): embedded lead forms on the top money pages +
      city pages + commercial (template already supports `formId`); decide /painting-estimate/'s
      role (noindex vs integrate); gallery captions with neighborhoods; blog category grouping.

## 🎥 Video hosting decision (settled: stay on YouTube)

Re-embedded 7 of Hometown's own YouTube videos with a **click-to-load facade** (local poster
thumbnail, zero third-party requests until the visitor hits play) + VideoObject schema. Recommendation
was to **stay on YouTube, not move to Cloudflare Stream** — YouTube is free, already hosts the
catalog, and adds discovery/SEO; the facade removes the only real downside (page-speed/cookies).
Revisit Stream only if you ever want a fully branded, distraction-free player with no "more videos"
suggestions. Registry of embedded videos: `site/src/data/videos.mjs`.

## ✅ Done (recent)

- All 13 launch-blocking audit issues (404 page, favicon set, legacy-URL/wp-content/sitemap
  redirects, schema scoping, per-page noindex, hero preload, image pipeline, privacy/terms
  cleanup, pergola testimonials restored, deck metadata, thank-you page, etc.).
- Confirmed business facts applied sitewide (pricing, warranty tiers, brands, pressure-washing
  scope, repaint cadence, Bethany origin, privacy email).
- All 132 Google reviews pulled + matched to GHL contacts (73 verified customers, 72 cities).
- Blog sweep: typos, multiple-H1 fixes, silo/money links, price formatting.

## 🚀 Launch status

**Not a blocker anymore — the site is in good shape.** The remaining gates before flipping DNS:
1. (optional but recommended) tagged reviews in place for stronger city pages,
2. GTM/GA4 double-count resolved,
3. more photos,
4. execute the **cutover checklist** (in the launch-readiness report): set Pages production
   branch to `main`, drop `PUBLIC_NOINDEX`, point apex/www at Pages (keep WordPress warm for
   rollback), verify forms + image transforms live, submit `/sitemap-index.xml` to Search
   Console, watch 404s + rankings for ~2 weeks.

## 💡 Other ways Matt can move things forward (Claude can act on any of these)

- Send Google Business Profile categories/service-area list to tighten local SEO + schema.
- Confirm service-area cities you actually want pages for (only 5 exist today — could add
  Piedmont, Nichols Hills, Deer Creek, etc. if you serve them and want to rank there).
- Any seasonal promo / financing offer to feature in the hero or a banner?
- Point Claude at the GHL booking calendar settings if you want the scheduler embedded rather than linked.
