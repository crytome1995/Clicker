import { getSendClickURL, getGetClicksURL } from "./Config";
const dev = "development";
const test = "test";
const prod = "production";

describe("Get from config CLICK URLS", () => {
  it("covers environments", () => {
    const devURL = getSendClickURL(dev);
    const testURL = getSendClickURL(test);
    const prodURL = getSendClickURL(prod);
    const localURL = getSendClickURL("");

    expect(devURL).toBe(
      "http://clickcounter.control.clickthebutton.click/click"
    );
    expect(testURL).toBe(
      "http://clickcounter.control.clickthebutton.click/click"
    );
    expect(prodURL).toBe("http://clickcounter.pub.clickthebutton.click/click");
    expect(localURL).toBeDefined();
  });
});

describe("Get from config CLICKS URLS", () => {
  it("covers environments", () => {
    const devURL = getGetClicksURL(dev);
    const testURL = getGetClicksURL(test);
    const prodURL = getGetClicksURL(prod);
    const localURL = getGetClicksURL("");

    expect(devURL).toBe(
      "http://clickgetter.control.clickthebutton.click/click"
    );
    expect(testURL).toBe(
      "http://clickgetter.control.clickthebutton.click/click"
    );
    expect(prodURL).toBe("http://clickgetter.pub.clickthebutton.click/click");
    expect(localURL).toBeDefined();
  });
});
