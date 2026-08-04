const { chromium } = require("playwright");

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();

  let grandTotal = 0;

  for (let seed = 73; seed <= 82; seed++) {
    const url =
      `https://sanand0.github.io/tdsdata/js_table/?seed=${seed}`;

    await page.goto(url, { waitUntil: "networkidle" });
    await page.waitForSelector("table");

    const numbers = await page.locator("table td").allTextContents();

    const total = numbers.reduce((sum, text) => {
      const value = Number(text.trim());
      return sum + (Number.isFinite(value) ? value : 0);
    }, 0);

    console.log(`Seed ${seed}: ${total}`);
    grandTotal += total;
  }

  console.log(`TOTAL: ${grandTotal}`);

  await browser.close();
})();
