import React, { Component } from 'react'
import IconButton from '@material-ui/core/IconButton'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import MenuIcon from '@material-ui/icons/Menu'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'

class Main extends Component {
    render() {
        return(
            <React.Fragment>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="title" color="inherit">Versus</Typography>
                    </Toolbar>
                </AppBar>
                <br/>
                <Grid container spacing={8}>
                    <Grid item xs={12}>
                        <Button variant="contained" color="secondary">TEST</Button>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Main
