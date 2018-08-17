import React, { Component } from 'react'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'
import VersusViewer from '../versusViewer/'

class Competitors extends Component {
    render() {
        return(
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Visuales</Typography>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 4 }>
                        <Card>
                            <CardContent>
                                <Typography variant="title">Controles</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={ 8 }>
                        <Paper>
                            <VersusViewer></VersusViewer>
                        </Paper>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Competitors
