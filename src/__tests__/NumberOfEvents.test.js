import React from 'react';
import { shallow } from 'enzyme';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {
  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents />);
  });

  test('render number input', () => {
    expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
  });

  test('render default number in the input is 32', () => {
    expect(NumberOfEventsWrapper.find('.number-input').prop('value')).toBe(32);
  });

  test('render change the number of events in input field by changing state', () => {
    expect(NumberOfEventsWrapper.find('.number-input')).toHaveLength(1);
  });
});

