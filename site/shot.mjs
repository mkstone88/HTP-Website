import { chromium } from 'playwright-core';

const EXEC = '/opt/pw-browsers/chromium-1194/chrome-linux/chrome';
const shots = [
  { url: 'http://localhost:4321/', vw: 1280, vh: 900, out: 'home-desktop.png', full: true },
  { url: 'http://localhost:4321/', vw: 390, vh: 844, out: 'home-mobile.png', full: true },
  { url: 'http://localhost:4321/exterior-painting-oklahoma-city/', vw: 1280, vh: 900, out: 'exterior-desktop.png', full: true },
];

const browser = await chromium.launch({ executablePath: EXEC, args: ['--no-sandbox'] });
for (const s of shots) {
  const page = await browser.newPage({ viewport: { width: s.vw, height: s.vh } });
  await page.goto(s.url, { waitUntil: 'networkidle' });
  await page.waitForTimeout(400);
  await page.screenshot({ path: '/home/user/HTP-Website/migration/screenshots/' + s.out, fullPage: s.full });
  console.log('shot', s.out);
  await page.close();
}
await browser.close();
