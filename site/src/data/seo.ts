// Whether the current build should be kept out of search engines.
//
// Rule: index ONLY the production branch (main). Every other branch — Cloudflare
// preview deployments, staging, local builds — is treated as non-production and
// noindexed, so nothing but the real production site can ever be crawled.
//
// Cloudflare Pages sets CF_PAGES_BRANCH on every build automatically, so this
// needs no dashboard configuration. PUBLIC_NOINDEX is a manual override:
//   PUBLIC_NOINDEX=true  -> force noindex (e.g. to hide a main build)
//   PUBLIC_NOINDEX=false -> force index  (e.g. to expose a preview build)
export const PRODUCTION_BRANCH = 'main';

export function isNoindex(): boolean {
  const override = process.env.PUBLIC_NOINDEX;
  if (override === 'true') return true;
  if (override === 'false') return false;

  // On Cloudflare, index only the production branch. With no branch info
  // (local build) we stay safe and noindex.
  return process.env.CF_PAGES_BRANCH !== PRODUCTION_BRANCH;
}
