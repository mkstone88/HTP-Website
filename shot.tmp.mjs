import { chromium } from 'playwright-core';
const b = await chromium.launch({ executablePath: '/opt/pw-browsers/chromium' });
const p = await b.newPage({ viewport: { width: 1440, height: 1100 } });
await p.goto('http://localhost:8899/', { waitUntil: 'networkidle' });
await p.evaluate(async () => {
  for (let y = 0; y < document.body.scrollHeight; y += 600) { window.scrollTo(0, y); await new Promise(r => setTimeout(r, 120)); }
  window.scrollTo(0, 0);
});
await p.waitForTimeout(1200);
const dir = '/tmp/claude-0/-home-user-HTP-Website/ad6fd2c2-83d8-5e9d-ac71-3dfa60ba2237/scratchpad';
// hero + trustbar together
await p.screenshot({ path: dir + '/r2-hero.png', clip: { x: 0, y: 0, width: 1440, height: 780 } });
const est = await p.locator('section.estimate').boundingBox();
await p.locator('section.estimate').screenshot({ path: dir + '/r2-estimate.png' });
await p.locator('section.why').screenshot({ path: dir + '/r2-why.png' });
await b.close();
// word count of rendered main content
