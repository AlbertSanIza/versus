import React, { Component } from 'react';
import PropTypes from 'prop-types';
import io from 'socket.io-client';

import SocketIOContext from './SocketIOContext';

const socket = io(`http://${window.location.hostname}:3001`);

class SocketIOProvider extends Component {
  constructor() {
    super();
    this.state = {
      visualizer: e => socket.emit('visualizer', e),
      events: {
        events: [],
        searchTerm: '',
        search: e => this.searchEvents(e),
        create: e => this.createEditEvent(e),
        edit: e => this.createEditEvent(e),
      },
      thematics: {
        thematics: [],
        searchTerm: '',
        search: e => this.searchThematics(e),
        create: e => this.createThematic(e),
      },
      formats: {
        formats: [],
        searchTerm: '',
        search: e => this.searchFormats(e),
        create: e => this.createFormat(e),
      },
      competitors: {
        competitors: [],
        searchTerm: '',
        search: e => this.searchCompetitors(e),
        create: e => this.createEditCompetitor(e),
        edit: e => this.createEditCompetitor(e),
      },
      settings: {
        tempDir: '',
        openTempDir: () => socket.emit('settings', { type: 'openTempDir' }),
      },
      ip: '',
    };
    socket.emit('events', { type: 'get' }, data => {
      this.setState(prevState => ({ events: { ...prevState.events, events: data } }));
    });
    socket.emit('thematics', { type: 'get' }, data => {
      this.setState(prevState => ({ thematics: { ...prevState.thematics, thematics: data } }));
    });
    socket.emit('formats', { type: 'get' }, data => {
      this.setState(prevState => ({ formats: { ...prevState.formats, formats: data } }));
    });
    socket.emit('competitors', { type: 'get' }, data => {
      this.setState(prevState => ({ competitors: { ...prevState.competitors, competitors: data } }));
    });
    socket.emit('settings', { type: 'get' }, data => {
      this.setState(prevState => ({ settings: { ...prevState.settings, tempDir: data.tempDir } }));
    });
    socket.emit('ip', { type: 'get' }, data => {
      this.setState(data);
    });
  }

  searchEvents(e) {
    this.setState(prevState => ({ events: { ...prevState.events, searchTerm: e } }));
  }

  createEditEvent(e) {
    const { name } = e;
    const events = this.state.events.events.slice().filter(z => z.name.toLowerCase() !== name.toLowerCase());
    events.push(e);
    socket.emit('events', { type: 'set', payload: events });
    this.setState(prevState => ({ events: { ...prevState.events, events: events } }));
  }

  searchThematics(e) {
    this.setState(prevState => ({ thematics: { ...prevState.thematics, searchTerm: e } }));
  }

  createThematic(e) {
    const thematics = this.state.thematics.thematics.slice();
    thematics.push(e);
    socket.emit('thematics', { type: 'set', payload: thematics });
    this.setState(prevState => ({ thematics: { ...prevState.thematics, thematics: thematics } }));
  }

  searchFormats(e) {
    this.setState(prevState => ({ formats: { ...prevState.formats, searchTerm: e } }));
  }

  createFormat(e) {
    const formats = this.state.formats.formats.slice();
    formats.push(e);
    socket.emit('formats', { type: 'set', payload: formats });
    this.setState(prevState => ({ formats: { ...prevState.formats, formats: formats } }));
  }

  searchCompetitors(e) {
    this.setState(prevState => ({ competitors: { ...prevState.competitors, searchTerm: e } }));
  }

  createEditCompetitor(e) {
    const { name, photo } = e;
    const competitors = this.state.competitors.competitors.slice().filter(z => z.name.toLowerCase() !== name.toLowerCase());
    competitors.push({ name: name, photo: photo });
    socket.emit('competitors', { type: 'set', payload: competitors });
    socket.emit('competitors', { type: 'image', payload: e }, data => {
      this.setState(prevState => ({ competitors: { ...prevState.competitors, competitors: competitors } }));
    });
  }

  render() {
    const { ip } = this.state;
    return (
      <SocketIOContext.Provider value={{
        visualizer: e => this.state.visualizer(e),
        events: this.state.events,
        thematics: this.state.thematics,
        formats: this.state.formats,
        competitors: this.state.competitors,
        settings: this.state.settings,
        ip: ip,
      }}
      >
        { this.props.children }
      </SocketIOContext.Provider>
    );
  }
}

SocketIOProvider.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default SocketIOProvider;
