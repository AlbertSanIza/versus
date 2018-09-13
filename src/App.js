import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'

import { Main, Visualizer } from './components'
import { SocketIOProvider } from './context'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <SocketIOProvider>
                        <Route path="/main" component={ Main }/>
                    </SocketIOProvider>
                    <Route exact path="/" component={ Visualizer }/>
                </React.Fragment>
            </HashRouter>
        )
    }
}

export default App
