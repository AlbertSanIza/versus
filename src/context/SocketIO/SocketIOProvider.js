import React, { Component } from 'react'
import io from 'socket.io-client'

import SocketIOContext from './SocketIOContext'

const socket = io('http://' + window.location.hostname + ':12345')

class SocketIOProvider extends Component {
    constructor() {
        super()
        this.state = {
            test: { }
        }
        socket.on('show', msg => {
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
