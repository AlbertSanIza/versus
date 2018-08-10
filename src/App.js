import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import io from 'socket.io-client'
import { Main, Visualizer } from './components'

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
                    <Route exact path="/" component={Main}/>
                    <Route exact path="/visualizer" component={Visualizer}/>
                </div>
            </HashRouter>
        )
    }
}

export default App
