import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// component to test
import TotalClicks from "./TotalClicks";

// Configure enzyme for react 17
Enzyme.configure({ adapter: new Adapter() });

describe("TotalClicks table rows", () => {
  it("should have 2 rows", () => {
    const countries = [
      {
        countryCode: "US",
        count: 10,
      },
      {
        countryCode: "CN",
        count: 2,
      },
    ];
    const wrapper = mount(<TotalClicks countries={countries} />);
    const table = wrapper.find("table");
    const rows = table.find("tr");
    expect(rows).toHaveLength(3);
  });
});

describe("TotalClicks empty table", () => {
  it("should have 0 rows", () => {
    const countries = [];
    const wrapper = mount(<TotalClicks countries={countries} />);
    const table = wrapper.find("table");
    const rows = table.find("tr");
    expect(rows).toMatchObject({});
  });
});
