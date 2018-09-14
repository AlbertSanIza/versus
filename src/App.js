import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'

import { Main, VersusVisualizer } from './components'
import { SocketIOProvider } from './context'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <SocketIOProvider>
                        <Route path="/main" component={ Main }/>
                    </SocketIOProvider>
                    <Route exact path="/" component={ VersusVisualizer }/>
                </React.Fragment>
            </HashRouter>
        )
    }
}

export default App
