import React, { Component } from 'react'
import io from 'socket.io-client'

import SocketIOContext from './SocketIOContext'

const socket = io('http://' + window.location.hostname + ':12345')

class SocketIOProvider extends Component {
    constructor() {
        super()
        this.state = {
            settings: {
                tempDir: '',
                openTempDir: () => socket.emit('settings', { type: 'openTempDir' })
            }
        }
        socket.emit('settings', { type: 'get' }, data => {
            this.setState({ settings: { ...this.state.settings, tempDir: data.tempDir } })
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
