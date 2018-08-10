import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import io from 'socket.io-client'
import { Visualizer } from './components'

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
            <HashRouter>
                <div>
                    <button onClick={this.handleClick}>TESTin</button>
                    <Route exact path="/" component={Visualizer}/>
                    <Route exact path="/visualizer" component={Visualizer}/>
                </div>
            </HashRouter>
        )
    }
}

export default App
