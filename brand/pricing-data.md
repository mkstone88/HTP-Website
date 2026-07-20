# City pricing — data provenance

The city-specific pricing in each location page's FAQ is grounded in Hometown's **real completed
projects**, pulled from the *Hometown Operations* Airtable base → **Projects** table
(`Project Amount` + `Project Type`, joined to each customer's city via the linked NEW - Contact),
on **2026-07-20**. 202 completed projects with a real dollar amount, segmented by service type.

## Exterior painting — median job by city (the basis for the FAQ ranges)

| City | # exterior jobs | Median | Published FAQ band | Notes |
|---|---|---|---|---|
| Edmond | 16 | $6,999 | $5,000–$9,000 | Strong sample. Larger homes → highest in metro. |
| Oklahoma City | 51 | $5,365 | (metro anchor) | Largest sample; the metro middle. |
| Choctaw | 6 | $4,219 | — (no page) | |
| Yukon | 10 | $4,160 | $3,500–$7,000 | Decent sample; runs near metro middle. |
| Mustang | 3 | $7,825* | $4,000–$8,000 | *Thin sample, one large job skews the median — band leans on home profile, not the raw number. |
| Bethany | 3 | $3,502* | $3,000–$6,500 | *Thin sample; older/mid-sized homes → honest lower band. |
| Mesta Park | 0 | — | "start around $6,000" | No Mesta-tagged jobs; framed qualitatively (historic = premium). |
| **Metro (all)** | **106** | **$5,330** | $4,000–$10,000 | Matches Matt's confirmed metro range. |

## Interior — median job by city

| City | n | Median | Published FAQ band |
|---|---|---|---|
| Oklahoma City | 28 | $5,382 | — |
| Yukon | 11 | $4,980 | $4,500–$7,500 (runs higher than Edmond interior) |
| Norman | 3 | $4,943 | — |
| Mustang | 5 | $3,668 | $2,500–$6,000 |
| Edmond | 11 | $3,247 | $2,500–$5,500 |
| **Metro (all)** | **78** | **$3,713** | — |

Staining sample is small (13 projects, metro median ~$1,736) — not broken out per city.

## Method + guardrails

- Bands are **median-anchored**, kept inside the metro $4,000–$10,000 exterior envelope, and always
  paired with "you'll get a firm, itemized number at your free estimate" — so the range reads as a
  transparency/trust signal (resolving the ICP's price-shock fear), not a hard quote.
- Where the sample is thin (Mustang, Bethany, Mesta Park), the band **blends the data with
  home-profile logic** per Matt's call (2026-07-20), rather than publishing a noisy median.
- **Refresh:** re-pull the Projects table (amount + type + linked contact city) and re-run
  `analyze_projects.py` (in the session scratchpad) to update. Re-confirm bands with Matt before
  changing published numbers.
