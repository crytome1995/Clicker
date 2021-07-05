const faker = require("faker");
const puppeteer = require("puppeteer");

describe("Press Me Button", () => {
  test("Button loads and is clickable", async () => {
    let browser = await puppeteer.launch({
      headless: true,
    });
    let page = await browser.newPage();

    page.emulate({
      viewport: {
        width: 500,
        height: 1200,
      },
      userAgent: "",
    });

    await page.goto("http://localhost:3000");
    await page.waitForSelector(".button");
    await page.waitFor(2000);
    await Promise.all([
      page.click("button"),
      page.waitForNavigation({ waitUntil: "networkidle2" }),
    ]);
    await page.waitForSelector(".total-clicks-div");
    browser.close();
  }, 30000);
});
