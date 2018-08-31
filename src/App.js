import React, { Component } from 'react'
import { HashRouter, Route } from 'react-router-dom'
import { Main, Visualizer } from './components'

class App extends Component {
    render() {
        return (
            <HashRouter>
                <React.Fragment>
                    <Route path="/main" component={ Main }/>
                    <Route exact path="/" component={ Visualizer }/>
                </React.Fragment>
            </HashRouter>
        )
    }
}

export default App
