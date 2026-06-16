# HTP-Website

Migration workspace for porting **hometownpaintingokc.com** from WordPress to a
fast, static **Astro** site on **Cloudflare Pages**.

> ⚠️ The PPC landing pages at `quote.hometownpaintingokc.com`
> (repo `mkstone88/htp-landing-pages`) are **out of scope** — live and converting, do not touch.

## Status

- [x] Verified live access (HTTP 200, egress allowlist working)
- [x] Crawled + inventoried every indexable URL (64: 27 posts + 37 pages)
- [x] Built the SEO migration map (old URL → new/301, titles + meta to carry over)
- [x] Captured existing WordPress 301s + Cloudflare `_redirects`
- [ ] Resolve discrepancies & open questions — see [`migration/FINDINGS.md`](migration/FINDINGS.md)
- [ ] Astro build + content port

## Where things are

| Path | Contents |
|------|----------|
| [`migration/INVENTORY.md`](migration/INVENTORY.md) | Full site inventory, schema, tracking, structure, cutover plan |
| [`migration/FINDINGS.md`](migration/FINDINGS.md) | Discrepancies + open questions for Matt |
| `migration/seo/migration-map.csv` | The migration map (old → new URL, titles, meta) |
| `migration/seo/_redirects` | Cloudflare Pages redirects (legacy 301s preserved) |
| `migration/inventory/` | `pages.json`, `inventory.csv`, `urls.tsv` |
| `migration/raw_html/` | Saved HTML of every page (content source for the rewrite) |
| `migration/sitemaps/` | Raw sitemaps + robots.txt |
| `migration/crawl.py` | Re-runnable crawler |

## Re-running the crawl

```bash
pip install requests beautifulsoup4 lxml
python3 migration/crawl.py
```

## Design system (to reuse)

- Colors: Navy `#1B2A4A`, Red `#C41230`, Linen `#F5F0EB`
- Fonts: DM Serif Display + DM Sans + Montserrat (wordmark)
- Logo: temporary CSS text wordmark (real reversed asset TODO)
