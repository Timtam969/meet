import React, { Component } from 'react';

class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    if (value >= 33 || value <= 0) {
      this.setState({
        numberOfEvents: value,
        errorText: "Please enter a number between 1-32",
      });
    } else {
      this.setState({
        numberOfEvents: event.target.value,
      });
    }
  };

  render() {
    return (
      <div className="numberOfEvents">
        <div>Please enter number of Events</div>
        <label>
          <input
            type="number"
            className="number-input"
            // placeholder="Number of events"
            value={this.state.numberOfEvents}
            onChange={this.handleInputChanged}
          />
        </label>
      </div>
    );
  }
}
export default NumberOfEvents;
