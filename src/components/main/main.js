import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import { Route } from 'react-router-dom'
import VersusDrawer from './versusDrawer/'
import VisualsView from './visuals/'
import EventsView from './events/'
import ThematicsView from './thematics/'
import CompetitorsView from './competitors/'
import SettingsView from './settings/'

const styles = theme => ({
    root: {
        display: 'flex',
        flexGrow: 1,
        height: '100vh',
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1
    },
    appBarTitle: {
        width: '100%',
        textAlign: 'center'
    },
    toolbar: {
        height: 48
    },
    drawerPaper: {
        position: 'relative',
        width: 200
    },
    mainContentHolder: {
        position: 'absolute',
        top: 48,
        bottom: 0,
        left: 200,
        right: 0,
        overflowY: 'hidden'
    },
    mainContent: {
        padding: 24,
        width: 'calc(100% - 48px)',
        height: 'calc(100% - 48px)',
        overflowY: 'scroll'
    }
})

class Main extends Component {
    render() {
        const { classes } = this.props
        return(
            <div className={ classes.root }>
                <AppBar position="absolute" className={ classes.appBar }>
                    <Toolbar variant="dense">
                        <Typography variant="title" color="inherit" className={ classes.appBarTitle }>Versus</Typography>
                    </Toolbar>
                </AppBar>
                <VersusDrawer classes={ classes }/>
                <div className={ classes.mainContentHolder }>
                    <div className={ classes.mainContent }>
                        <Route path="/main/visuals" component={ VisualsView }/>
                        <Route path="/main/events" component={ EventsView }/>
                        <Route path="/main/thematics" component={ ThematicsView }/>
                        <Route path="/main/competitors" component={ CompetitorsView }/>
                        <Route path="/main/settings" component={ SettingsView }/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withStyles(styles)(Main)
