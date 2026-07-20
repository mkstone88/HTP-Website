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

## Interior — scope-driven, NOT a single band

Interior cost is driven by scope (how many rooms, which surfaces), not city, so the FAQs frame it
as a span from "a couple of rooms" to "a full-home repaint of every surface" rather than one number.
The data backs how wide that is — metro interior runs **$360 → $27,921** (min → max, n=78):

| City | n | Median | Max in data | Published FAQ interior framing |
|---|---|---|---|---|
| Oklahoma City | 28 | $5,382 | $27,921 | (metro anchor) |
| Yukon | 11 | $4,980 | $9,140 | rooms $2,500–$4,500 · full-home $8,000–$12,000+ (bundles cabinets → above metro) |
| Mustang | 5 | $3,668 | $7,684 | rooms $2,000–$4,000 · full-home $8,000–$12,000+ |
| Edmond | 11 | $3,247 | $7,901 | rooms $2,000–$4,000 · full-home **$15,000–$20,000+** |
| Bethany | 1 | $1,700 | $1,700 | rooms $1,500–$3,500 · full-home $6,000–$10,000+ |
| **Metro (all)** | **78** | **$3,713** | **$27,921** | — |

**Domain-knowledge override (Matt, 2026-07-20):** Edmond's low interior median is small-scope
sampling, not a real "Edmond is cheaper" effect — nothing about the city makes interiors cheaper;
the sampled Edmond jobs were just fewer rooms. Since Edmond homes are larger, a full-scope interior
there runs *above* OKC (Matt cited a recent $20K Edmond full repaint). The FAQ reflects this with a
$15–20K+ full-home ceiling, overriding the noisy $3,247 median. This is the "blend both" call in action.

Staining sample is small (13 projects, metro median ~$1,736) — not broken out per city.
Cabinets (n=4): $2,554 / $3,275 / $7,900 / $8,959.

## Method + guardrails

- Bands are **median-anchored**, kept inside the metro $4,000–$10,000 exterior envelope, and always
  paired with "you'll get a firm, itemized number at your free estimate" — so the range reads as a
  transparency/trust signal (resolving the ICP's price-shock fear), not a hard quote.
- Where the sample is thin (Mustang, Bethany, Mesta Park), the band **blends the data with
  home-profile logic** per Matt's call (2026-07-20), rather than publishing a noisy median.
- **Refresh:** re-pull the Projects table (amount + type + linked contact city) and re-run
  `analyze_projects.py` (in the session scratchpad) to update. Re-confirm bands with Matt before
  changing published numbers.
