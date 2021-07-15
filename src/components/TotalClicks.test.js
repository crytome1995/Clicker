import React from "react";
import Enzyme, { shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
// component to test
import TotalClicks from "./TotalClicks";

// Configure enzyme for react 17
Enzyme.configure({ adapter: new Adapter() });

describe("TotalClicks Table Row with mock query", () => {
  it("should hold 3 rows", () => {
    const apiMock = jest.fn();
    const items = [
      {
        country: "US",
        count: 5,
      },
      {
        country: "NZ",
        count: 50,
      },
      {
        country: "CN",
        count: 1,
      },
    ];

    apiMock.mockImplementation(() => Promise.resolve(items));
    const wrapper = shallow(<TotalClicks allClicks={apiMock()} />);
    const countryUS = wrapper.find("#US");
    const countryNZ = wrapper.find("#NZ");
    const countryCN = wrapper.find("#CN");

    expect(countryUS).toBeDefined();
    expect(countryNZ).toBeDefined();
    expect(countryCN).toBeDefined();
  });
});
