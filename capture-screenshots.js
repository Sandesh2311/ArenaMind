const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: { width: 1440, height: 1800 } });

  await page.goto('http://localhost:4173', { waitUntil: 'networkidle' });
  await page.screenshot({ path: 'screenshots/landing-page.png', fullPage: true });

  await page.getByRole('tab', { name: 'Organizer' }).click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'screenshots/organizer-dashboard.png', fullPage: true });

  await page.getByRole('tab', { name: 'Volunteer' }).click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'screenshots/volunteer-dashboard.png', fullPage: true });

  await page.getByRole('tab', { name: 'Fan' }).click();
  await page.waitForTimeout(1200);
  await page.screenshot({ path: 'screenshots/fan-dashboard.png', fullPage: true });

  await page.locator('section[aria-label="AI Stadium Assistant"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);
  await page.screenshot({ path: 'screenshots/ai-assistant.png', fullPage: true });

  await browser.close();
})().catch((err) => {
  console.error(err);
  process.exit(1);
});
