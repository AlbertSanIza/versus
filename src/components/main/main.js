import React, { Component } from 'react'
import { Route } from 'react-router-dom'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import VersusDrawer from './versusDrawer/'
import VisualsView from './visuals/'
import EventsView from './events/'
import CompetitorsView from './competitors/'
import SettingsView from './settings/'
import './main.css'

const styles = theme => ({
    root: {
        flexGrow: 1,
        flex: 1,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex'
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    appBarTitle: {
        width: '100%',
        textAlign: 'center'
    },
    drawerPaper: {
        position: 'relative',
        width: 200
    },
    toolbar: theme.mixins.toolbar,
})

class Main extends Component {
    render() {
        return(
            <div className={ this.props.classes.root }>
                <AppBar position="absolute" className={ this.props.classes.appBar }>
                    <Toolbar>
                        <Typography variant="title" color="inherit" className={ this.props.classes.appBarTitle }>Versus</Typography>
                    </Toolbar>
                </AppBar>
                <VersusDrawer classes={ this.props.classes }/>
                <div className="main-content-holder">
                    <div className="main-content">
                        <Route path="/main/visuals" component={ VisualsView }/>
                        <Route path="/main/events" component={ EventsView }/>
                        <Route path="/main/competitors" component={ CompetitorsView }/>
                        <Route path="/main/settings" component={ SettingsView }/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Main)
