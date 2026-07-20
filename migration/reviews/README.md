# Google Reviews — source data

- `google-reviews-2026-07-19.json` — all 132 Google reviews (Apr 2019 → Jul 2026),
  pulled 2026-07-19 from the GoHighLevel reputation widget feed
  (`services.leadconnectorhq.com/reputation/widgets/data?locationId=ch2x7nFXHf3H6JiDzmas`,
  the same public feed the old site's review widget used). 128 of 132 are 5-star;
  aggregate shown by GHL: 132 reviews.
- `HTP-Google-Reviews-Tagging.xlsx` — the same reviews as a tagging worksheet for Matt:
  City + Service dropdowns (blue = auto-detected guess, yellow = needs input) and a
  "Feature on site?" column. Once returned, the tagged set becomes
  `site/src/data/reviews` and feeds city-matched review blocks on city pages.

Re-pull any time with the same endpoint (`projection[]=reviews&page=N&size=50`,
header `channel: APP`; `projection[]=review_aggregate` for the totals).

## GHL contact matching (2026-07-19)

`reviews-matched.json` / `reviews-matched.csv` — each Google review matched
against the full GoHighLevel contact list (2,973 contacts) by reviewer name.
Where a matching contact carried a `past customer` tag, the city was pulled
from that contact's address on file.

Results: 73/132 reviews matched a verified past-customer contact; 72 now have
a city (65 high-confidence exact matches, 7 looser matches to verify). The
remaining 60 need manual input (many are Google display handles that were
never contacts, e.g. "Section8", "ACE 99", "Midnight_2027").

`HTP-Google-Reviews-Tagging.xlsx` is regenerated with these matches
pre-filled and color-coded (green = verified customer + city, blue = verify,
yellow = needs input). Matt fills the gaps, marks which to feature, and returns it.

Matching used only name + the `past customer`/`job-sold`/`left review` tags; no
review text was altered. Contact data is NOT committed (PII) — only the derived
city/confidence per public review. Re-run: pull contacts via
`services.leadconnectorhq.com/contacts/` (env `GHL_API_Token` + `GHL_Location_ID`).
