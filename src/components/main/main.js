import React, { Component } from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
https://material-ui.com/demos/drawers/
const styles = theme => ({
    root: {
        flexGrow: 1,
        height: 100,
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
    },
    drawerPaper: {
        position: 'relative',
        width: 240,
    },
    content: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.default,
        padding: theme.spacing.unit * 3,
        minWidth: 0
    },
    toolbar: theme.mixins.toolbar,
})

class Main extends Component {
    render() {
        return(
            <div className={ this.props.classes.root }>
                <AppBar position="absolute" className={ this.props.classes.appBar }>
                    <Toolbar>
                        <Typography variant="title" color="inherit" noWrap>Versus</Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" className="drawerPaper" classes={{ paper: this.props.classes.drawerPaper }}>
                </Drawer>
                <main className={ this.props.classes.content }>
                    <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(Main)
