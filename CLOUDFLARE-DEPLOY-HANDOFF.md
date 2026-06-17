# 🚀 Cloudflare Deploy Handoff — HTP Website test subdomain

**For:** the Cloudflare-authorized agent.
**From:** the agent that built this site.
**Task:** publish the Astro site in `site/` to **`test.hometownpaintingokc.com`**
via Cloudflare Pages, **noindexed** (it's a staging preview, must not be crawled).

---

## ⛔ Hard constraints — read first

1. **Do NOT touch `quote.hometownpaintingokc.com`** — that's the live PPC funnel
   (separate Pages project, repo `mkstone88/htp-landing-pages`). It's converting. Leave it alone.
2. **Do NOT change the apex (`hometownpaintingokc.com`) or `www` DNS.** Production
   is still WordPress. Only create the **`test`** subdomain record.
3. This is a **staging** deploy → it MUST stay out of Google. The code already
   handles this *if and only if* you set `PUBLIC_NOINDEX=true` (see env var below).

---

## Facts

| Thing | Value |
|---|---|
| GitHub repo | `mkstone88/HTP-Website` |
| Branch with the site | `claude/practical-cerf-osdbc7` (HEAD `0084c79`) — or merge to `main` and deploy that |
| App location | subdirectory **`site/`** (NOT repo root) |
| Framework | Astro 4 (static output) → `dist/` |
| Suggested Pages project name | `htp-website` |
| Target hostname | `test.hometownpaintingokc.com` |
| Zone | `hometownpaintingokc.com` (already on Cloudflare) |

## Cloudflare Pages build settings

| Setting | Value |
|---|---|
| **Root directory** | `site` |
| **Build command** | `npm run build` |
| **Build output directory** | `dist` |
| **Node version** | 20 or 22 (built/tested on 22) |
| **Environment variable** | **`PUBLIC_NOINDEX` = `true`**  ← required for staging |

> `site/wrangler.toml` already sets `pages_build_output_dir = "dist"`.

---

## Path A — Git-connected project (recommended)

Auto-deploys on every push **and** is required for the Sveltia CMS at `/admin/` to work later.

1. Create a Pages project connected to GitHub repo `mkstone88/HTP-Website`,
   production branch = the branch above (or `main` if you merge first).
2. Apply the build settings table above, including `PUBLIC_NOINDEX=true`.
3. Trigger the first deploy → confirm a `*.pages.dev` URL builds green.
4. Add custom domain **`test.hometownpaintingokc.com`** to the project.
   Cloudflare will auto-create the proxied CNAME in the zone; SSL provisions in ~1 min.

## Path B — Direct upload via wrangler

```bash
cd site
PUBLIC_NOINDEX=true npm run build          # produces site/dist (63 pages)
npx wrangler pages project create htp-website --production-branch main
npx wrangler pages deploy dist --project-name htp-website
```

Then attach the custom domain + DNS (dashboard, or API):

```bash
# 1) Add the custom domain to the Pages project
curl -X POST \
  "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/pages/projects/htp-website/domains" \
  -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
  --data '{"name":"test.hometownpaintingokc.com"}'

# 2) Create the proxied CNAME in the zone (only the `test` record!)
curl -X POST \
  "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/dns_records" \
  -H "Authorization: Bearer $CF_TOKEN" -H "Content-Type: application/json" \
  --data '{"type":"CNAME","name":"test","content":"htp-website.pages.dev","proxied":true}'
```

---

## ✅ Post-deploy verification (please confirm all)

```bash
# Staging guard is ON (must return a noindex line):
curl -s https://test.hometownpaintingokc.com/ | grep -i 'name="robots"'
#   expect: <meta name="robots" content="noindex, nofollow">

# robots.txt blocks everything:
curl -s https://test.hometownpaintingokc.com/robots.txt
#   expect: "User-agent: *" then "Disallow: /"

# Spot-check a few of the 63 routes return 200:
for u in / /blog/ /cabinet-painting-okc/ /deck-staining-okc/ \
         /pricing/interior-pricing/ /professional-painters-okc/warranty/; do
  echo "$u -> $(curl -s -o /dev/null -w '%{http_code}' https://test.hometownpaintingokc.com$u)"
done
```

Also eyeball in a browser: home hero + GoHighLevel form loads, images render,
nav works. Forms post to GoHighLevel (`api.leadconnectorhq.com`) — that's expected.

## When ready for PRODUCTION later (NOT now)

- Remove `PUBLIC_NOINDEX` (or set `false`) and redeploy so the site becomes indexable.
- Point apex + `www` at the Pages project, keep WordPress as fallback, resubmit
  the sitemap in Search Console. (Coordinate this separately — don't do it as part of this task.)

Detailed background: `migration/DEPLOY.md`, `migration/INVENTORY.md`, `README.md`.
Report the final `test.hometownpaintingokc.com` status + the verification output back to Matt.
