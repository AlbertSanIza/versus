import React, { Component } from 'react'
import io from 'socket.io-client'
import logo from './logo.svg'
import './App.css'

const socket = io('http://' + window.location.hostname + ':12345')

class App extends Component {
    constructor(props) {
        super(props)
        socket.on('message', msg => {
            console.log(msg)
        })
    }
    handleClick = () => {
        socket.emit('message', {message: "test"})
    }
    render() {
        return (
            <div className="App">
                <header className="App-header">
                    <img src={logo} className="App-logo" alt="logo" />
                    <h1 className="App-title">Welcome to React: {window.location.hostname}</h1>
                </header>
                <p className="App-intro">
                    To get started, edit <code>src/App.js</code> and save to reload.
                </p>
                <br/>
                <button onClick={this.handleClick}>TEST</button>
            </div>
        )
    }
}

export default App
