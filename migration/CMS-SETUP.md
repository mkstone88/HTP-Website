# CMS Setup — Sveltia CMS (free, Git-based)

The site uses **[Sveltia CMS](https://github.com/sveltia/sveltia-cms)** — a free,
open-source, actively-maintained content manager that commits markdown straight
to the GitHub repo. It reads the **Decap CMS** `config.yml` format, so we can
switch to Decap CMS later without changing any config.

- Admin UI: **`https://hometownpaintingokc.com/admin/`**
- Config: `site/public/admin/config.yml`
- Edits two collections: **Blog Posts** (`src/content/blog`) and **Pages**
  (`src/content/pages`). Saving commits a markdown file to GitHub; Cloudflare
  Pages rebuilds automatically.

## Why Sveltia (vs Decap / Tina)

- **Free & open-source**, no third-party account (unlike TinaCloud).
- **Actively maintained** with a faster, modern UI than Decap.
- **Decap-config-compatible** — drop-in `config.yml`, easy to swap if desired.
- Works cleanly on **Cloudflare Pages + GitHub** (our stack).

## One-time auth setup (required before login works)

Sveltia uses the GitHub backend, which needs a GitHub OAuth app to let editors
log in. Two simple options:

### Option A — Sveltia's GitHub OAuth (simplest)
1. Create a GitHub OAuth App (Settings → Developer settings → OAuth Apps):
   - Homepage URL: `https://hometownpaintingokc.com`
   - Authorization callback URL: `https://hometownpaintingokc.com/oauth/callback`
2. Deploy a tiny OAuth worker. Sveltia documents a one-file Cloudflare Worker:
   https://github.com/sveltia/sveltia-cms#with-cloudflare-pages
3. Add `base_url`/`auth_endpoint` to `config.yml` pointing at the worker.

### Option B — Decap's hosted-style flow
Any Decap-compatible OAuth provider works (e.g. an existing
`netlify-cms-oauth-provider` instance). Point `backend.base_url` at it.

> We can wire whichever you prefer once the repo + Cloudflare Pages project
> are connected. Until then the markdown files are fully editable in Git / locally.

## Editing locally (no auth needed)

The content is just markdown in `site/src/content/`. You (or an AI assistant)
can edit those files directly and commit — the CMS is a convenience layer, not a
requirement.
