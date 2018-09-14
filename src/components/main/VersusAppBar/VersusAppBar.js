import React, { Component } from 'react'
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'

import { withVersus } from '../../../context'

const styles = theme => ({
    title: {
        flexGrow: 1,
        textAlign: 'center'
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20
    },
    topPadding: {
        minHeight: 48
    }
})

class VersusAppBar extends Component {
    render() {
        const { classes, Versus } = this.props
        return (
            <React.Fragment>
                <AppBar>
                    <Toolbar color="inherit" variant="dense">
                        <IconButton className={ classes.menuButton } color="inherit" onClick={ () => Versus.handleDrawer() }>
                            { (() => {
                                return Versus.drawer ? (<MoreVertIcon/>) : (<MoreHorizIcon/>)
                            })() }
                        </IconButton>
                        <Typography className={ classes.title } variant="title" color="inherit">Versus</Typography>
                    </Toolbar>
                </AppBar>
                <div className={ classes.topPadding }/>
            </React.Fragment>
        )
    }
}

export default withVersus(withStyles(styles)(VersusAppBar))
