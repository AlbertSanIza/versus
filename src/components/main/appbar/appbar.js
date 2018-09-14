import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import { withStyles } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'

import { withSocketIO } from '../../../context'

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

class CoreAppBar extends Component {
    render() {
        const { classes } = this.props
        return (
            <React.Fragment>
                <AppBar>
                    <Toolbar color="inherit" variant="dense">
                        <IconButton className={ classes.menuButton } color="inherit">
                            <MenuIcon/>
                        </IconButton>
                        <Typography className={ classes.title } variant="title" color="inherit">Versus</Typography>
                    </Toolbar>
                </AppBar>
                <div className={ classes.topPadding }/>
            </React.Fragment>
        )
    }
}

export default withSocketIO(withStyles(styles)(CoreAppBar))
