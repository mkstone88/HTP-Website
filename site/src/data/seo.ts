// Whether the current build should be kept out of search engines.
//
// SAFE BY DEFAULT: every build is noindexed unless we EXPLICITLY opt in to
// indexing with PUBLIC_NOINDEX=false. A staging or preview build can never be
// crawled by accident, even when it runs on a branch named `main`.
//
//   PUBLIC_NOINDEX=false -> index this build. Set this ONLY on the real
//                           production site, at DNS cutover.
//   PUBLIC_NOINDEX=true  -> noindex (explicit; same as the default).
//   (unset)              -> noindex. Covers staging, Cloudflare previews,
//                           and local builds.
export function isNoindex(): boolean {
  return process.env.PUBLIC_NOINDEX !== 'false';
}
