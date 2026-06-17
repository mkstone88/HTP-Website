# Deploying to a test subdomain (Cloudflare Pages)

Goal: serve the new Astro site at **`test.hometownpaintingokc.com`** so Matt can
preview it, without touching the live WordPress site or the PPC funnel.

The site is **noindex-guarded**: set the env var `PUBLIC_NOINDEX=true` on the
test deployment and every page emits `<meta name="robots" content="noindex,
nofollow">` and a disallow-all `robots.txt`. Google will not index the test
subdomain as duplicate content. (Leave the var unset for the real production
deploy.)

## Build settings (same for either path)

| Setting | Value |
|---|---|
| Root directory | `site` |
| Build command | `npm run build` |
| Build output directory | `dist` |
| Environment variable | `PUBLIC_NOINDEX = true` (test only) |
| Node version | 20 or 22 |

---

## Path A — Connect the GitHub repo (recommended)

Enables auto-deploy on every push **and** makes the Sveltia CMS work end-to-end.

1. Cloudflare dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
2. Pick `mkstone88/HTP-Website`, branch `claude/practical-cerf-osdbc7`
   (or merge to `main` first and deploy that).
3. Enter the build settings above; add `PUBLIC_NOINDEX=true`.
4. Deploy. You'll get a `htp-website.pages.dev` URL.
5. **Custom domain:** project → **Custom domains → Set up a domain** →
   `test.hometownpaintingokc.com`. Cloudflare auto-creates the CNAME (the zone is
   already on Cloudflare), SSL provisions in ~1 min.

## Path B — I deploy it for you (needs a scoped API token)

Give me a Cloudflare API token with **Account → Cloudflare Pages: Edit** and
**Zone → DNS: Edit** (for `hometownpaintingokc.com`), plus the Account ID. Then I run:

```bash
cd site
PUBLIC_NOINDEX=true npm run build
npx wrangler pages project create htp-website --production-branch main
npx wrangler pages deploy dist --project-name htp-website
# then attach the custom domain test.hometownpaintingokc.com + CNAME via API
```

> A token is sensitive. Scope it as above (not Global API Key), and you can
> delete it after. Path A avoids sharing any token.

---

## After it's up

- Visit `https://test.hometownpaintingokc.com` — full click-through of all 63 pages.
- The GoHighLevel forms will load live (they're blocked only in the build sandbox).
- For production cutover later: remove `PUBLIC_NOINDEX`, point the apex/`www`
  DNS at Pages, keep WordPress as fallback, resubmit the sitemap.
