import { sendClick } from "./ApiClient";

const unmockedFetch = global.fetch;

beforeAll(() => {
  global.fetch = () =>
    Promise.resolve({
      json: () => Promise.resolve({ message: "ok" }),
    });
});

afterAll(() => {
  global.fetch = unmockedFetch;
});

describe("Click API", () => {
  it("should be called once", async () => {
    const url = "http://localhost:5000/click";
    const countryCode = "US";
    const ip = "123.123.123.123";
    const response = await sendClick(url, countryCode, ip);
    const json = await response.json();
    expect(json.message).toBe("ok");
  });
});
