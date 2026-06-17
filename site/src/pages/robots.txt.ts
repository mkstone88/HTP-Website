import type { APIRoute } from 'astro';

// Dynamic robots.txt:
// - On the staging/test subdomain (PUBLIC_NOINDEX=true) -> block everything.
// - In production -> allow crawling and point at the sitemap.
const noindex = import.meta.env.PUBLIC_NOINDEX === 'true';

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
