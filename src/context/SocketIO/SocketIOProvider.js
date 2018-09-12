import React, { Component } from 'react'
import io from 'socket.io-client'

import SocketIOContext from './SocketIOContext'

const socket = io('http://' + window.location.hostname + ':12345')

class SocketIOProvider extends Component {
    constructor() {
        super()
        this.state = {
            events: {
                events: [ ],
                searchTerm: '',
                searchEvents: e => this.searchEvents(e),
                createEvent: e => this.createEvent(e)
            },
            thematics: {
                thematics: [ ],
                searchTerm: '',
                searchThematics: e => this.searchThematics(e),
                createThematic: e => this.createThematic(e)
            },
            competitors: {
                competitors: [ ],
                searchTerm: '',
                searchCompetitors: e => this.searchCompetitors(e),
                createCompetitor: e => this.createCompetitor(e)
            },
            settings: {
                tempDir: '',
                openTempDir: () => socket.emit('settings', { type: 'openTempDir' })
            }
        }
        socket.emit('events', { type: 'get' }, data => {
            this.setState({ events: { ...this.state.events, events: data } })
        })
        socket.emit('thematics', { type: 'get' }, data => {
            this.setState({ thematics: { ...this.state.thematics, thematics: data } })
        })
        socket.emit('competitors', { type: 'get' }, data => {
            this.setState({ competitors: { ...this.state.competitors, competitors: data } })
        })
        socket.emit('settings', { type: 'get' }, data => {
            this.setState({ settings: { ...this.state.settings, tempDir: data.tempDir } })
        })
    }
    searchEvents = e => {
        this.setState({ events: { ...this.state.events, searchTerm: e } })
    }
    createEvent = e => {
    }
    searchThematics = e => {
        this.setState({ thematics: { ...this.state.thematics, searchTerm: e } })
    }
    createEvent = e => {
    }
    searchCompetitors = e => {
        this.setState({ competitors: { ...this.state.competitors, searchTerm: e } })
    }
    createCompetitor = e => {
    }
    render() {
        return (
            <SocketIOContext.Provider value={ this.state }>
                { this.props.children }
            </SocketIOContext.Provider>
        )
    }
}

export default SocketIOProvider
