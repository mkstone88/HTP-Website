# Next steps — living to-do list

Last updated: 2026-07-20. This is the running checklist for the Hometown Painting site.
When Matt asks "what's on my to-do list," read this file back. Check items off and add new
ones as work progresses. (Detailed pre-launch audit: the launch-readiness report artifact.)

## ⏳ Waiting on Matt (quick wins when you're at your computer)

- [x] **Review workbook returned (2026-07-20)** — Matt marked **42 reviews** Feature=Yes across
      83 tagged cities. Wired into pages (below). More can be featured anytime by marking more rows
      in `migration/reviews/HTP-Google-Reviews-Tagging-COMPLETED.xlsx` and re-running.
      RESOLVED (2026-07-21): **Bethany** now has a testimonial block — Tammy Cox + Helen McFadden (both
      real verified Bethany customers; Matt OK'd using them). **Mesta Park** now leads with **Dolan
      McTiernan** (Katie Donelson's husband; Matt had marked him Feature=Yes with the note "in mesta park";
      detailed historic-home exterior review), keeping the two real legacy quotes below it. Note for future:
      Mesta Park is an OKC *neighborhood*, so it never city-matches an address — pick its reviews by hand.
- [ ] **Project photos from the Drive folder (2026-07-20).** Added genuinely-new local hero shots to
      **Edmond** (Romeo Dr), **Mustang**, **Yukon** (500 War Eagle) city pages, and built the **commercial
      page** into a 3-project portfolio (Victory Baptist church + an office building w/ ADA ramp + the
      Clydesdale barns). KEY FINDING: most of the drop was **already on the site** (Bethany's full set,
      the 9409/5613 interior sets, Clydesdale + church — all already present). New/unused photos are now
      **cataloged in `migration/photos/CATALOG.md`** with Drive IDs (incl. a full new interior job at 5616
      NW 130th) — grab them when a page needs fresh content. Nichols Hills folder empty (no NH page anyway).
- [ ] **Company Cam** — Matt added an API credential, but env vars added mid-session don't reach a running
      session (it wasn't in this session's env). In a **fresh session** it should be available; Company Cam
      photos carry customer addresses, so they can source **city-specific** shots when a city page is thin.
      Confirm the exact env var name next session.
- [ ] Decide on the **real logo** (SVG). Header/footer currently use a CSS text wordmark; the
      brush-H logo exists at `site/public/uploads/2022/08/edited.jpg` — OK to trace into an SVG?

## 🔧 Queued for Claude (some need the items above first)

- [x] **Verified testimonials wired in (2026-07-20).** Placed Matt's featured, city-matched reviews
      (`First L., Role · City`) on Edmond (3), Yukon (3), Mustang (1), exterior (3), interior (3),
      cabinet (3), fence (1 added), commercial (1 new section), and refreshed the /reviews/ page with
      8. This corrected real errors (Yukon page had quoted an OKC customer; cabinet had Filiz tagged
      OKC when she's Edmond). Still to fill: **Bethany** (two real verified candidates identified —
      Tammy Cox / Helen McFadden — awaiting Matt's OK) and **Mesta Park** (neighborhood, never
      city-matches; see the Waiting-on-Matt note above).
- [ ] Place/optimize new photos as they come in.
- [ ] Real logo SVG (reversed for the navy header) once approved.
- [ ] **Post-launch backlog** (fine after go-live): embedded lead forms on the top money pages +
      city pages + commercial (template already supports `formId`); decide /painting-estimate/'s
      role (noindex vs integrate); gallery captions with neighborhoods; blog category grouping.

## 🧪 Pre-launch QA gate (run LATE, once content is stable — do all four right before cutover)

These are the final quality passes. Do them near the end so new pages/edits don't undo the work.

- [x] **1 & 2. Humanizer + brand-voice pass (done 2026-07-21).** Swept all 61 content files plus the
      home page, 404, and footer. Removed ~260 em dashes used as prose punctuation (process-step cards,
      FAQ answers, intros, benefit cards, visible h1/meta), keeping numeric-range en dashes, real review
      quotes, and their `— Name` attributions intact. Trimmed AI tells (filler like "when it comes to",
      inflated "seamless"/"non-negotiable", a few "-ing" tails, rule-of-three, one "not only…but also"),
      fixed a brand slip (drywall "competitive pricing" → "honest, upfront pricing", per the never-compete-
      on-price rule), and corrected small typos (spraying "is the use"→"is to use"; "three vs four example
      fences"; a missing-word heading). Build clean (62 pages). Checked against `brand/MESSAGING.md`:
      pages lead with the homeowner's problem and resolve with proof; testimonials real + `First L., Role
      · City`. THIN-PAGE + brand findings recorded below.
- [x] **3. Local SEO audit + fix (done 2026-07-20, re-verify at cutover).** 57 indexable pages came
      back clean: no duplicate/missing titles, H1s, or descriptions; 1 H1 each; canonicals correct;
      all images have alt text; NAP consistent. Fixed: 7 over-long titles (dropped redundant boilerplate),
      4 long descriptions, and enriched HousePainter JSON-LD with hours + real Facebook/Google/BBB/Yelp/
      Nextdoor sameAs. STILL OPEN (need Matt): **geo coordinates + GBP categories/URL** to finish the
      schema; and a call on two money-page titles (exterior "BEST … In Town", commercial suffix).
- [x] **4. Page-speed audit (done 2026-07-20).** Excellent: **0 KB JS**, **26 KB CSS**, key pages
      **~85–100 KB total**, images served resized/AVIF via the CF pipeline. DONE 2026-07-21: **all three
      Google Fonts now self-hosted** (DM Sans, DM Serif Display, Montserrat → local woff2 in
      `site/public/fonts/`), so there is zero render-blocking third-party font request; the two primary
      faces (DM Sans 400, DM Serif Display 400) preload.

## 📄 Thin-page + brand findings (from the 2026-07-21 humanizer pass)

Flagged for Matt's call. None block launch; most are "make a strong page stronger." Nothing was
expanded automatically (needs your judgment or a real review pick).

**Thin / worth expanding:**
- **`should-i-stain-my-fence.md`** (blog, shortest post ~350 words) — genuinely thin. Add OKC-specific
  depth: staining a brand-new fence vs waiting, Wood Defender + the 2-year staining warranty, the
  $2,000–$4,000 range, and a real local review.
- **`professional-painters-okc--warranty.md`** (~390 words) — reads like a terms checklist. Add one
  short brand line tying the warranty to the walk-through-before-final-payment and Matt personally
  standing behind it, so it's a trust asset, not just terms.
- **`okc-fence-stain-colors.md`** (~440 words) — mostly color cards, ~3 short paragraphs. Optional: one
  line tying colors to the 2-year staining warranty / linking the fence-staining service.

**Light social proof (add a 2nd real review when you can):**
- **`commercial-painters-oklahoma-city.md`** — only 1 testimonial (Nathan H.). Pull a 2nd real commercial
  review. Also the opener still leans slightly company-forward; a stronger StoryBrand reframe would open
  on the business owner's fear (downtime, disruption, an unreliable contractor) before the company claim.
- **`painters-mustang-ok.md`** — only 1 review (Hunter C.) vs 2-3 on sibling city pages. Add a 2nd if a
  real Mustang review exists.

**Brand-voice polish (optional, not thin):**
- **`professional-painters-okc.md`** (About) — leans heritage/nostalgia; per MESSAGING it should be an
  "Origin of Empathy" (Art as proof of care, homeowner as the hero being served). Homeowner is present
  but secondary. Candidate for a future reframe.
- **`painters-edmond-ok.md`** — mild promo clichés in Matt's note ("Your vision is our mission,"
  "results that exceed your expectations").
- **`how-to-choose-the-best-sheen-or-gloss.md`** — ends on a chart image with no closing paragraph/CTA;
  a short close linking to interior/cabinet painting would help.

Note: `house-painting-contractors…` and `wall-painting-okc.md` read thin but are `draft: true`
(consolidated + 301-redirected), so not launch content. If ever un-drafted, they need a homeowner-first rewrite.

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
- **2026-07-21 content pass:** humanizer + brand-voice sweep across all 61 files + home/404/footer;
  self-hosted the 3 web fonts; wired real reviews for Bethany (Tammy C., Helen M.), Mesta Park
  (Dolan M.), Mustang (Nichole H., Collin D.), and commercial (Mitch; Kennedy H., Office Manager);
  moved + rewrote the home owner intro; StoryBrand commercial intro; rewrote the About page as an
  Origin of Empathy (Art's story + the warranty-we-stand-behind section); expanded both fence pages.
  Saved the interview-first content process to CLAUDE.md.

## 🔌 Keeping reviews + GBP data fresh (tooling — researched 2026-07-21)

Goal: pull new Google reviews over time (site freshness) and read GBP categories/attributes, ideally
pay-per-use not subscription. Findings + recommendation:
- **Reviews — already solved, $0.** We pulled all 132 via the **GoHighLevel/LeadConnector reputation
  API** (env `GHL_API_Token` + `GHL_Location_ID`). GHL syncs Google reviews, so re-running that pull is
  the zero-cost way to catch new ones. Cadence idea: monthly, re-pull → tag new ones → wire any Matt
  marks Feature=Yes. No new tool needed.
- **Official Google Business Profile API** — free, can list/read reviews + categories/attributes, but
  requires an **access-request approval** (Cloud project + org account + verified profile 60+ days);
  approvals are slow/uncertain (3+ month waits reported). Worth applying only if we want full automation.
- **Places API (New)** — just an API key, no approval gauntlet; returns rating, review count, categories,
  hours + **only 5 "most relevant" reviews** (no pagination). Pay-as-you-go (the old $200/mo credit
  expired Feb 2025), but at our volume it is pennies. Good for a lightweight "profile snapshot" read.
- **Pay-as-you-go scrapers** (Outscraper / Apify / DataForSEO) — return ALL reviews with pagination,
  credit-based, no subscription. Only needed if we ever stop using GHL.
- **RECOMMENDATION:** lean on **GHL for reviews** (free, in hand). If Matt wants me to read the live GBP
  (categories/hours) directly on demand, drop a **Google Maps Places API key** in env — pay-per-use, no
  subscription. Skip the official GBP API approval hassle unless we later want hands-off automation.

## 🚀 Launch status

**Strategy (decided 2026-07-21): launch NOW with the current page set, then expand.** Because this is a
full WordPress→Astro overhaul, the priority is getting the new structure + redirects in front of Google
so it can recrawl and re-settle. Ship the current (strong, audited) pages, give it 1–2 weeks to stabilize
in the index, then systematically build out the silos (more city pages, more supporting/blog content) as
purely additive URLs. Fresh content over time is a positive ranking signal, so post-launch expansion helps
rather than hurts. Only the QA gate (humanizer + brand pass) must finish first, since it touches pages
that are going live.

**Content is complete — the site is launch-ready.** Status of the gates before flipping DNS:
1. ✅ Tagged/real reviews wired across city, service, and commercial pages (all five city pages + commercial now covered).
2. ✅ GTM/GA4 double-count checked — GTM has only a Conversion Linker, no GA4 tag, so no double-fire; nothing to change.
3. ✅ Project photos placed + cataloged.
4. ✅ **Pre-launch QA gate done** (copy/brand review, humanizer, local SEO audit, page speed).
5. ⏳ **Matt's final pass on the test subdomain** (`test.hometownpaintingokc.com`, noindexed): walk the
   live site, build a punch-list of any tweaks, Claude fixes them.
   **IN PROGRESS (2026-07-23) — homepage review round 1** (branch `claude/homepage-review-optimization-hzs80s`):
   fixed the stretched owners photo (a forced `height` attr; now a 4:3 crop), demoted "free estimates"
   from differentiator bullets to a small no-obligation note under the hero CTAs (hero bullet → final
   walk-through; estimate bullet → 25% deposit), and swapped the cabinet service card to the pro 5616
   NW 130th kitchen shot (also fixes its duplication with the Recent Work strip — **Matt: confirm that
   kitchen's cabinets are our work**). OPEN with Matt: headline options, de-duplicating the three bullet
   zones (hero / estimate / Why Hometown) into distinct jobs, and beefing up homepage content
   (~590 words today) targeting **"painters OKC"**.
6. ⏳ execute the **cutover checklist** (in the launch-readiness report): set **`PUBLIC_NOINDEX=false`**
   on the Pages project to make it indexable (production branch is already `main`), point apex/www at Pages (keep WordPress warm for
   rollback), verify forms + image transforms live, submit `/sitemap-index.xml` to Search
   Console, watch 404s + rankings for ~2 weeks.

## 💡 Other ways Matt can move things forward (Claude can act on any of these)

- Send Google Business Profile categories/service-area list to tighten local SEO + schema.
- Confirm service-area cities you actually want pages for (only 5 exist today — could add
  Piedmont, Nichols Hills, Deer Creek, etc. if you serve them and want to rank there).
- Any seasonal promo / financing offer to feature in the hero or a banner?
- Point Claude at the GHL booking calendar settings if you want the scheduler embedded rather than linked.
