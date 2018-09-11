import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { Main, Visualizer } from './components'
import rootReducer from './reducers'

import { SocketIOProvider } from './context'
const store = createStore(rootReducer)

class App extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <SocketIOProvider>
                        <Provider store={ store }>
                            <Route path="/main" component={ Main }/>
                        </Provider>
                    </SocketIOProvider>
                    <Route exact path="/" component={ Visualizer }/>
                </React.Fragment>
            </HashRouter>
        )
    }
}

export default App
