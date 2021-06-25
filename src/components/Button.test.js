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

    const wrapper = shallow(<B history={historyMock} sendClick={apiMock}></B>);
    const button = wrapper.find("button");
    button.props().onClick();

    expect(wrapper.find("button").props()["disabled"]).toBe(true);
    expect(apiMock).toHaveBeenCalledTimes(1);
    expect(wrapper.exists("span")).toBe(true);
  });
});
