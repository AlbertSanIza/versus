import React, { Component } from 'react'
import io from 'socket.io-client'

import SocketIOContext from './SocketIOContext'

const socket = io('http://' + window.location.hostname + ':12345')

class SocketIOProvider extends Component {
    constructor() {
        super()
        this.state = {
            visualizer: e => socket.emit('visualizer', e),
            events: {
                events: [ ],
                searchTerm: '',
                search: e => this.searchEvents(e),
                create: e => this.createEvent(e)
            },
            thematics: {
                thematics: [ ],
                searchTerm: '',
                search: e => this.searchThematics(e),
                create: e => this.createThematic(e)
            },
            competitors: {
                competitors: [ ],
                searchTerm: '',
                search: e => this.searchCompetitors(e),
                create: e => this.createCompetitor(e)
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
        var events = this.state.events.events
        events.push(e)
        socket.emit('events', { type: 'set', payload: events })
        this.setState({ events: { ...this.state.events, events: events } })
    }
    searchThematics = e => {
        this.setState({ thematics: { ...this.state.thematics, searchTerm: e } })
    }
    createThematic = e => {
        var thematics = this.state.thematics.thematics
        thematics.push(e)
        socket.emit('thematics', { type: 'set', payload: thematics })
        this.setState({ thematics: { ...this.state.thematics, thematics: thematics } })
    }
    searchCompetitors = e => {
        this.setState({ competitors: { ...this.state.competitors, searchTerm: e } })
    }
    createCompetitor = e => {
        const { name, photo } = e
        var competitors = this.state.competitors.competitors.slice()
        competitors.push({ name, photo })
        socket.emit('competitors', { type: 'set', payload: competitors })
        socket.emit('competitors', { type: 'image', payload: e }, data => {
            this.setState({ competitors: { ...this.state.competitors, competitors: competitors } })
        })
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
