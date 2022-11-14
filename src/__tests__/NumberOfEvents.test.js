import React from "react";
import { shallow } from "enzyme";
import NumberOfEvents from "../NumberOfEvents";

describe("<NumberOfEvents /> component", () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => { }} />);
  });

  test("render textbox element", () => {
    expect(NumberOfEventsWrapper.find(".numberOfEvents")).toHaveLength(1);
  });

  test("render text input correctly", () => {
    const numberOfEvents = NumberOfEventsWrapper.state("numberOfEvents");
    expect(
      NumberOfEventsWrapper.find("#numberOfEvents__input").prop("value")
    ).toBe(numberOfEvents);
  });

  test("change state when input changes", () => {
    const eventObject = { target: { value: 32 } };
    NumberOfEventsWrapper.find("#numberOfEvents__input").simulate(
      "change",
      eventObject
    );
    expect(NumberOfEventsWrapper.state("numberOfEvents")).toBe(32);
  });

  test("show number of events input label", () => {
    expect(NumberOfEventsWrapper.find(".numberOfEvents label")).toHaveLength(1);
  });
});
// import { mount, shallow } from 'enzyme';
// import NumberOfEvents from '../NumberOfEvents';

// describe('<NumberOfEvents /> component', () => {
//   let NumberOfEventsWrapper;
//   beforeAll(() => {
//     NumberOfEventsWrapper = shallow(<NumberOfEvents />);
//   });

//   test('render number input', () => {
//     expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
//   });

//   test('render default number in the input is 32', () => {
//     expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(32);
//   });

//   test('render change the number of events in input field by changing state', () => {
//     NumberOfEventsWrapper.setState({
//       numOfEvents: 32
//     });
//     const eventObject = { target: { value: 6 } };
//     NumberOfEventsWrapper.find('.number-input').simulate('change', eventObject);
//     expect(NumberOfEventsWrapper.state('numOfEvents')).toBe(6);
//   });
// });

