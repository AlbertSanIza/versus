import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import './visuals.css'

class Competitors extends Component {
    render() {
        return(
            <React.Fragment>
                <div className="visuals-iframe-holder">
                    <iframe src="#/" frameBorder="0" title="visualizer" className="visuals-iframe"></iframe>
                </div>
                <br/>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 4 }>
                        <Typography variant="title">Controles</Typography>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Competitors
