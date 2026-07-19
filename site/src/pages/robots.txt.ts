import type { APIRoute } from 'astro';
import { isNoindex } from '../data/seo';

// Dynamic robots.txt:
// - Non-production builds (previews/staging/local) -> block everything.
// - Production (main branch) -> allow crawling and point at the sitemap.
const noindex = isNoindex();

const staging = `# Test/staging build — do not index.
User-agent: *
Disallow: /
`;

const production = `User-agent: *
Allow: /
Disallow: /wp-admin/
Disallow: /admin/

Sitemap: https://hometownpaintingokc.com/sitemap-index.xml
`;

export const GET: APIRoute = () =>
  new Response(noindex ? staging : production, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  });
