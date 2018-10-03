import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'

import { VersusProvider, SocketIOProvider } from './context'
import { VersusMain, VersusVisualizer } from './components'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <VersusProvider>
                        <SocketIOProvider>
                            <Route path="/main" component={ VersusMain }/>
                        </SocketIOProvider>
                    </VersusProvider>
                    <Route exact path="/" component={ VersusVisualizer }/>
                </React.Fragment>
            </HashRouter>
        )
    }
}

export default App
