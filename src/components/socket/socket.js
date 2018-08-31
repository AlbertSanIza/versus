import React, { Component } from 'react'
import io from 'socket.io-client'

const socket = io('http://' + window.location.hostname + ':12345')

class Main extends Component {
    constructor(props) {
        super(props)
        socket.on('message', msg => {
            console.log(msg)
        })
    }
    handleClick = () => {
        socket.emit('message', { message: "test" })
    }
    render() {
        return(
            <React.Fragment>{ this.props.children }</React.Fragment>
        )
    }
}

export default Socket
