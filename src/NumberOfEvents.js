import React, { Component, PropTypes } from 'react';
import { updateEvents } from "./App";
import { ErrorAlert } from './Alert';


class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
    errorText: '',
    events: []
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value < 1 || value > 32) {
      this.setState({
        numberOfEvents: value,
        errorText: "Please enter a number between 1-32",
      });
    } else {
      this.setState({
        numberOfEvents: event.target.value,
        errorText: '',
      });
    }
    this.props.updateEvents(undefined, value);
  };

  render() {
    return (
      <div className="numberOfEvents">
        <label>
          Number of Events:
          <input
            type="number"
            className="number-input"
            min='1'
            value={this.state.numberOfEvents}
            onChange={this.handleInputChanged}
          />
        </label>
        <ErrorAlert text={this.state.errorText} />
      </div>
    );
  }
}
export default NumberOfEvents;
