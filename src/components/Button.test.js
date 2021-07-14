import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

// component to test
import { default as B } from "./Button";

// Configure enzyme for react 17
Enzyme.configure({ adapter: new Adapter() });

describe("Button", () => {
  it("should have no spinner", () => {
    const wrapper = mount(<B></B>);
    const notExistsSpan = wrapper.exists("span");
    expect(notExistsSpan).toBe(false);
  });
});

describe("Button click", () => {
  it("should be clicked to true, should have called api, and span should be showing", () => {
    // how to mock an object
    const historyMock = { push: jest.fn() };
    const apiMock = jest.fn();
    const response = { message: "ok" };
    var myBlob = new Blob([JSON.stringify(response, null, 2)], {
      type: "application/json",
    });
    const geoLocation = {
      country_code: "US",
      ip: "123.123.123.123",
    };
    var init = { status: 200, js: "ok" };
    var myResponse = new Response(myBlob, init);
    apiMock.mockReturnValueOnce(myResponse);
    const wrapper = shallow(
      <B
        history={historyMock}
        geoLocation={geoLocation}
        sendClick={apiMock}
      ></B>
    );
    const button = wrapper.find("button");
    button.props().onClick();

    expect(wrapper.find("button").props()["disabled"]).toBe(true);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(wrapper.exists("span")).toBe(true);
  });
});
