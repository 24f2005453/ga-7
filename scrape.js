const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let total = 0;

  for (let seed = 73; seed <= 82; seed++) {
    const url = `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("table");

    const values = await page.locator("table td").allTextContents();

    const seedTotal = values.reduce((sum, text) => {
      const n = Number(text.trim());
      return Number.isFinite(n) ? sum + n : sum;
    }, 0);

    console.log(`Seed ${seed}: ${seedTotal}`);
    total += seedTotal;
  }

  console.log(`Total sum: ${total}`);
  console.log(`TOTAL=${total}`);

  await browser.close();
})();
