import { chromium } from 'playwright-core';
const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const shots = [
  { url: 'http://localhost:4321/', vw: 1280, vh: 900, out: 'home-desktop.png' },
  { url: 'http://localhost:4321/', vw: 390, vh: 844, out: 'home-mobile.png' },
  { url: 'http://localhost:4321/blog/', vw: 1280, vh: 900, out: 'blog-index.png' },
  { url: 'http://localhost:4321/cabinet-painting-okc/', vw: 1280, vh: 900, out: 'service-page.png' },
  { url: 'http://localhost:4321/should-i-stain-my-fence/', vw: 1280, vh: 900, out: 'blog-post.png' },
  { url: 'http://localhost:4321/contact-us/', vw: 1280, vh: 900, out: 'contact-page.png' },
];
const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.vw, height: s.vh } });
  try {
    await page.goto(s.url, { waitUntil: 'load', timeout: 15000 });
  } catch (e) { console.log('goto warn', s.out, e.message); }
  await page.waitForTimeout(600);
  await page.screenshot({ path: '../migration/screenshots/' + s.out, fullPage: true });
  console.log('shot', s.out);
  await page.close();
}
await browser.close();
