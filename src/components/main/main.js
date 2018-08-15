import React, { Component } from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import CardContent from '@material-ui/core/CardContent'
import PeopleIcon from '@material-ui/icons/People'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import ListItem from '@material-ui/core/ListItem'
import Toolbar from '@material-ui/core/Toolbar'
import Divider from '@material-ui/core/Divider'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Drawer from '@material-ui/core/Drawer'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'
import List from '@material-ui/core/List'
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
                        <Typography variant="title" color="inherit" className={ this.props.classes.appBarTitle }>Versus</Typography>
                    </Toolbar>
                </AppBar>
                <Drawer variant="permanent" className="drawerPaper" classes={{ paper: this.props.classes.drawerPaper }}>
                    <div className={ this.props.classes.toolbar }/>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Competidores"/>
                    </ListItem>
                    <Divider/>
                </Drawer>
                <main className={ this.props.classes.content }>
                    <div className={ this.props.classes.toolbar }/>
                    <Typography noWrap>{'You think water moves fast? You should see ice.'}</Typography>
                </main>
            </div>
        )
    }
}

export default withStyles(styles)(Main)
