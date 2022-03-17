import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";

import StyledButton, { ButtonContainer, StyledText } from "./Button";

configure({ adapter: new Adapter() });

describe("Styled button component test", () => {
  it("01. Props test", () => {
    const onPressMock = jest.fn();

    const wrapper = shallow(
      <StyledButton
        title="Title"
        width={40}
        height={15}
        size={10}
        onPress={onPressMock}
      />
    );

    const buttonContainer = wrapper.find(ButtonContainer);
    const styledText = wrapper.find(StyledText);

    expect(buttonContainer.props().width).toBe(40);
    expect(buttonContainer.props().height).toBe(15);
    expect(styledText.props().size).toBe(10);
    expect(styledText.contains("Title")).toBe(true);
  });

  it("02. onPress test", () => {
    const onPressMock = jest.fn();

    const wrapper = shallow(
      <StyledButton
        title="Title"
        width={40}
        height={15}
        size={10}
        onPress={onPressMock}
      />
    );

    const buttonContainer = wrapper.find(ButtonContainer);

    buttonContainer.simulate("press");
    expect(onPressMock.mock.calls.length).toEqual(1);
  });
});
