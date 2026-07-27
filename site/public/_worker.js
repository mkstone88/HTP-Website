// Cloudflare Pages "advanced mode" worker (deployed from the build output dir).
//
// Why advanced mode: this Pages project sets a root directory (site/), and the
// functions/ folder is not reliably picked up in that setup — _worker.js in the
// output directory is. Scope is controlled by public/_routes.json, which routes
// ONLY /api/* through this worker; every other URL is served by the static
// pipeline, so the legacy 301s in public/_redirects keep working.
//
// POST /api/lead: receives the custom lead form's JSON, validates it, and
// relays it to the GoHighLevel inbound-webhook workflow. Payload keys mirror
// the PPC landing-page webhook so GHL field mapping is familiar.

// GHL inbound-webhook workflow ("Website Form", provided by Matt 2026-07-23).
// A GHL_WEBHOOK_URL env var on the Pages project overrides this for rotation
// without a deploy.
const DEFAULT_WEBHOOK =
  'https://services.leadconnectorhq.com/hooks/ch2x7nFXHf3H6JiDzmas/webhook-trigger/4c690199-c0e6-4f05-b0cd-dd5097a75f31';

const MAX_LEN = 2000;

function json(status, obj) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

async function handleLead(request, env) {
  let data;
  try {
    data = await request.json();
  } catch {
    return json(400, { ok: false, error: 'Invalid JSON' });
  }

  // Honeypot: real visitors never see the "company" field. Pretend success so
  // bots don't learn they were caught.
  if (data.company) return json(200, { ok: true });

  const name = String(data.name || '').trim().slice(0, 200);
  const phone = String(data.phone || '').trim().slice(0, 40);
  const email = String(data.email || '').trim().slice(0, 200);
  if (!name || !phone) return json(422, { ok: false, error: 'Name and phone are required' });
  if ((phone.match(/\d/g) || []).length < 10)
    return json(422, { ok: false, error: 'Please enter a full phone number' });
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return json(422, { ok: false, error: 'Please check the email address' });

  // Optional Turnstile verification (enabled by setting TURNSTILE_SECRET).
  if (env.TURNSTILE_SECRET) {
    const verify = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        secret: env.TURNSTILE_SECRET,
        response: data.turnstileToken || '',
        remoteip: request.headers.get('CF-Connecting-IP') || undefined,
      }),
    }).then((r) => r.json()).catch(() => ({ success: false }));
    if (!verify.success) return json(403, { ok: false, error: 'Spam check failed — please call us instead' });
  }

  const payload = {
    name,
    phone,
    email,
    service: String(data.service || '').slice(0, 100),
    message: String(data.message || '').slice(0, MAX_LEN),
    source: 'Website Form',
    utm_source: String(data.utm_source || '').slice(0, 200),
    utm_medium: String(data.utm_medium || '').slice(0, 200),
    utm_campaign: String(data.utm_campaign || '').slice(0, 200),
    utm_content: String(data.utm_content || '').slice(0, 200),
    gclid: String(data.gclid || '').slice(0, 300),
    page_url: String(data.page_url || '').slice(0, 500),
  };

  const res = await fetch(env.GHL_WEBHOOK_URL || DEFAULT_WEBHOOK, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => null);

  if (!res || !res.ok)
    return json(502, { ok: false, error: 'Could not deliver your request — please call us' });

  return json(200, { ok: true });
}

export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    if (url.pathname === '/api/lead') {
      if (request.method !== 'POST') return new Response('Method Not Allowed', { status: 405 });
      return handleLead(request, env);
    }
    // _routes.json should keep non-/api requests away from this worker, but
    // fall through to static assets just in case.
    return env.ASSETS.fetch(request);
  },
};
