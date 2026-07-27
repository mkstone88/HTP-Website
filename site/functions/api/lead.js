// Cloudflare Pages Function: POST /api/lead
//
// Receives the custom lead form's JSON, validates it, and relays it to the
// GoHighLevel inbound-webhook workflow. The webhook URL stays server-side
// (env var GHL_WEBHOOK_URL, set in the Cloudflare Pages project settings) so
// bots can't scrape and flood it.
//
// Payload keys mirror the PPC landing-page webhook so GHL field mapping is
// familiar: name, phone, email, service, message, source, utm_*, gclid, page_url.
//
// Optional Turnstile: when TURNSTILE_SECRET is set, submissions must include a
// valid cf-turnstile token. Until then, the honeypot + validation still apply.

const MAX_LEN = 2000;

function bad(status, message) {
  return new Response(JSON.stringify({ ok: false, error: message }), {
    status,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function onRequestPost({ request, env }) {
  let data;
  try {
    data = await request.json();
  } catch {
    return bad(400, 'Invalid JSON');
  }

  // Honeypot: real visitors never see the "company" field. Pretend success so
  // bots don't learn they were caught.
  if (data.company) {
    return new Response(JSON.stringify({ ok: true }), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const name = String(data.name || '').trim().slice(0, 200);
  const phone = String(data.phone || '').trim().slice(0, 40);
  const email = String(data.email || '').trim().slice(0, 200);
  if (!name || !phone) return bad(422, 'Name and phone are required');
  if ((phone.match(/\d/g) || []).length < 10) return bad(422, 'Please enter a full phone number');
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return bad(422, 'Please check the email address');

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
    if (!verify.success) return bad(403, 'Spam check failed — please call us instead');
  }

  if (!env.GHL_WEBHOOK_URL) return bad(500, 'Form is not configured yet');

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

  const res = await fetch(env.GHL_WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  }).catch(() => null);

  if (!res || !res.ok) return bad(502, 'Could not deliver your request — please call us');

  return new Response(JSON.stringify({ ok: true }), {
    headers: { 'Content-Type': 'application/json' },
  });
}
