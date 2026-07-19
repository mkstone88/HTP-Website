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
