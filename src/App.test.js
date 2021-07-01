import React from "react";
import Enzyme, { shallow, mount, render } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { default as B } from "./components/Button";

//component to test
import { default as A } from "./App";

// Configure enzyme for react 17
Enzyme.configure({ adapter: new Adapter() });
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useLocation: () => ({
    pathname: "localhost:3000/",
  }),
}));

describe("App", () => {
  it("should render", () => {
    const wrapper = shallow(<A></A>);
  });
});
