import React, { Component } from 'react';
import './App.css';
import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
// import { mockData } from './mock-data';
import WelcomeScreen from './WelcomeScreen';
import { getEvents, extractLocations, checkToken, getAccessToken } from
  './api';
import './nprogress.css';
import { OfflineAlert } from './Alert';

class App extends Component {
  state = {
    events: [],
    locations: [],
    locationSelected: 'all',
    numberOfEvents: 32,
    showWelcomeScreen: undefined
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

  async componentDidMount() {
    tthis.mounted = true;
    const isLocal =
      window.location.href.startsWith("http://127.0.0.1") ||
      window.location.href.startsWith("http://localhost");
    if (navigator.onLine && !isLocal) {
      const accessToken = localStorage.getItem("access_token");
      const isTokenValid = (await checkToken(accessToken)).error ? false : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted)
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events: events.slice(0, this.state.numberOfEvents),
              locations: extractLocations(events),
            });
          }
        });
    } else {
      getEvents().then((events) => {
        if (this.mounted) {
          this.setState({
            showWelcomeScreen: false,
            events: events.slice(0, this.state.numberOfEvents),
            locations: extractLocations(events),
          });
        }
      });
    }
  }


  componentWillUnmount() {
    this.mounted = false;
  }


  render() {
    if (this.state.showWelcomeScreen === undefined) return <div className="App" />;
    return (
      <div className="App">
        <h1>The Meet App</h1>
        <div className="OfflineAlert">
          {!navigator.onLine && (
            <OfflineAlert
              text={
                'You are currently offline. The list of events may not be up-to-date.'
              }
            />
          )}
        </div>
        <div>
          <CitySearch locations={this.state.locations}
            updateEvents={this.updateEvents} />
        </div>
        <div>
          <NumberOfEvents numberOfEvents={this.state.numberOfEvents}
            updateEvents={this.updateEvents} />
        </div>
        <div>
          <EventList events={this.state.events} />
          <WelcomeScreen showWelcomeScreen={this.state.showWelcomeScreen} getAccessToken={() => { getAccessToken() }} />
        </div>
      </div>
    );
  }
}

export default App;