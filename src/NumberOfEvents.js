import React, { Component } from "react";
// import { ErrorAlert } from "./Alert";
class NumberOfEvents extends Component {
  state = {
    numberOfEvents: 32,
  };

  handleInputChanged = (event) => {
    const value = event.target.value;
    this.props.updateEvents(null, value);
    this.setState({ numberOfEvents: value });

    if (value < 1) {
      this.setState({
        infoText: "Select number from 1 to 32",
      });
    } else {
      this.setState({
        infoText: "",
      });
    }
  };

  render() {
    const { numberOfEvents } = this.state;
    return (
      <div className="numberOfEvents">
        <label>Number of Events: </label>
        <input
          type="text"
          id="numberOfEvents__input"
          value={numberOfEvents}
          onChange={this.handleInputChanged}
        />
        {/* <ErrorAlert text={this.state.infoText} /> */}
      </div>
    );
  }
}

export default NumberOfEvents;
// import React, { Component, PropTypes } from 'react';
// import { updateEvents } from "./App";


// class NumberOfEvents extends Component {
//   state = {
//     numberOfEvents: 32
//   };

//   handleInputChanged = (event) => {
//     const value = event.target.value;
//     if (value < 1 || value > 32) {
//       this.setState({
//         numberOfEvents: value,
//         errorText: "Please enter a number between 1-32",
//       });
//     } else {
//       this.setState({
//         numberOfEvents: event.target.value,
//       });
//     }
//     this.props.updateEvents(undefined, value);
//   };

//   render() {
//     return (
//       <div className="numberOfEvents">
//         <label>
//           <input
//             type="number"
//             className="number-input"
//             // placeholder="Number of events"
//             value={this.state.numberOfEvents}
//             onChange={this.handleInputChanged}
//           />
//         </label>
//       </div>
//     );
//   }
// }
// export default NumberOfEvents;
