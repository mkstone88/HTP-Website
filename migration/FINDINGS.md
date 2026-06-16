# Migration Findings & Open Questions — for Matt

Crawled the live site 2026-06-16. Inventory + SEO migration map are done and committed.
A few things turned up that I need you to confirm **before** we build/cut over.

## 🔴 Discrepancies between the handoff notes and what's actually live

These matter because we carry them into the new site:

1. **Phone number.** Handoff says **405-400-1707**, but the live site shows **405-400-1619** everywhere (displayed + `tel:` links + schema). There's also a **405-202-7945** number on the homepage (looks like a call-tracking/forwarding line).
   → Which number is correct for the new site, and is 405-202-7945 a tracking number we keep?

2. **Google Tag Manager container.** Handoff says **GTM-T3J5R93S**, but the live site loads **GTM-NS8LBWQQ** on all 128 pages.
   → Which GTM container should the new site use?

3. **GA4.** The live site loads **G-96VQPY702N** (not mentioned in the handoff). Carry it over? It may already be wired inside GTM.

4. **Google Ads** AW-16858477075 ✅ matches the handoff — no issue.

## 🟡 Review schema / star claims

Titles advertise "120+ 5-star reviews" / "4.9★ 130+", but there is **no `aggregateRating` or `Review` JSON-LD anywhere** on the current site. We can add valid review schema in the new build — but Google requires it be backed by genuine reviews shown on the page. Do you want me to pull real reviews (Google Business Profile) onto a `/reviews/` page and mark them up?

## 🟡 Duplicate deck-staining pages

There are two near-identical deck pages on a very long nested URL:
- `/exterior-painting/deck-staining-okc-professional-deck-staining-services-in-oklahoma-city/`
- `/exterior-painting/deck-staining-okc-.../professional-deck-staining-okc-hometown-painting-oklahoma-city/`

Recommend collapsing to a single clean **`/deck-staining-okc/`** and 301-ing both old URLs. (Heads up: `/deck-staining-okc/` currently 301s *into* the nested page, so we'd be flipping that.) Left as a commented proposal in `seo/_redirects` — say the word and I'll wire it up.

## Open questions from the handoff (still need answers)

1. **Keep-list.** Default plan keeps all 37 pages + 27 posts 1:1. Anything you want to drop, merge, or rewrite? (Weakest candidates: `/link-tree/`, `/wall-painting-okc/`, the thin `/painters/` `/interior-painting/` `/exterior-painting/` landing variants.)
2. **CMS.** Markdown-only, or a Git-based CMS (e.g. Decap/TinaCMS) so you can edit in a browser?
3. **Booking.** Embed the scheduler in an iframe, or redirect off-site?
4. **New repo name.** What should the new Astro repo be called? (This work currently lives in the `HTP-Website` repo under `/migration`.)

## What's NOT touched

The PPC landing pages at **quote.hometownpaintingokc.com** (repo `mkstone88/htp-landing-pages`) were not crawled or modified — they're live and converting.
