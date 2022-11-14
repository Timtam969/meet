import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
// import { mockData } from './mock-data';
import { getEvents, extractLocations } from './api';
import './nprogress.css';

class App extends Component {
  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: 32
  }


  updateEvents = (location, eventCount) => {
    const { numberOfEvents } = this.state;
    if (location === undefined) location = this.state.selectedLocation;

    getEvents().then((events) => {
      const locationEvents =
        location === "all"
          ? events
          : events.filter((event) => event.location === location);
      eventCount = eventCount === undefined ? numberOfEvents : eventCount;
      this.setState({
        events: locationEvents.slice(0, eventCount),
        selectedLocation: location,
        numberOfEvents: eventCount,
      });
    });
  };

  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({ events, locations: extractLocations(events) });
      }
    });
  }


  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    return (
      <div className="App">

        <div>
          <h1>The Meet App</h1>
        </div>
        <div>
          <h3 className='subtitle'>Search for your city and see upcoming events:</h3>
        </ div>
        <div>
          <CitySearch locations={this.state.locations}
            updateEvents={this.updateEvents} />
        </div>
        <div>
          <h3 className='subtitle'>Number of shown events</h3>
        </div>
        <div>
          <NumberOfEvents numberOfEvents={this.state.numberOfEvents}
            updateNumberOfEvents={(numberOfEvents) => this.updateNumberOfEvents(numberOfEvents)} />
        </div>
        <div>
          <div>
            <h3 className='subtitle'>Events List</h3>
          </div>
          <EventList events={this.state.events} />
        </div>
      </div>
    );
  }
}

export default App;