import React, { Component } from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Toolbar from '@material-ui/core/Toolbar'
import AppBar from '@material-ui/core/AppBar'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import Grid from '@material-ui/core/Grid'

class Main extends Component {
    render() {
        return(
            <React.Fragment>
                <AppBar position="static" color="primary">
                    <Toolbar variant="dense">
                        <Typography variant="title" color="inherit">Versus</Typography>
                    </Toolbar>
                </AppBar>
                <br/>
                <Grid container spacing={16} style={{ margin: 0, width: '100%'}}>
                    <Grid item xs={4}>
                        <Card>
                            <CardContent>
                                <Button variant="contained" color="secondary">TEST</Button>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={8}>
                        <Card>
                            <CardContent>
                                TEST
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Main
