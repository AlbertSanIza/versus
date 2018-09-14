import React, { Component } from 'react'
import { Route } from 'react-router-dom'

import CompetitorsView from './competitors'
import VersusDrawer from './VersusDrawer'
import VersusAppBar from './VersusAppBar'
import ThematicsView from './thematics'
import SettingsView from './settings'
import VisualsView from './visuals'
import EventsView from './events'

class Main extends Component {
    render() {
        return(
            <React.Fragment>
                <VersusAppBar/>
                <VersusDrawer>
                    <Route path="/main/visuals" component={ VisualsView }/>
                    <Route path="/main/events" component={ EventsView }/>
                    <Route path="/main/thematics" component={ ThematicsView }/>
                    <Route path="/main/competitors" component={ CompetitorsView }/>
                    <Route path="/main/settings" component={ SettingsView }/>
                </VersusDrawer>
            </React.Fragment>
        )
    }
}

export default Main
