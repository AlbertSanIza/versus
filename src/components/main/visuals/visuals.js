import React, { Component } from 'react'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import InputAdornment from '@material-ui/core/InputAdornment'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import SchoolIcon from '@material-ui/icons/School'
import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'
import Timer from '@material-ui/icons/Timer'
import Countdown from 'react-countdown-now'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'

import { withSocketIO } from '../../../context'

const theme = createMuiTheme({
    palette: {
        primary: red
    }
})

const styles = theme => ({
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    },
    visualsIframeHolder: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#262626'
    },
    visualsIframe: {
        width: '44vw',
        height: '25vw',
        padding: 0,
        margin: 0,
        background: 'black'
    },
    countdown: {
        display: 'none',
        opacity: 0
    }
})

class Competitors extends Component {
    state = {
        status: '',
        seconds: '',
        text: ''
    }
    inputHandleChange = e => {
        this.setState({ seconds: e.target.value })
    }
    inputTextHandleChange = e => {
        this.setState({ text: e.target.value })
    }
    setButton = () => {
        this.setState({ status: 'isSet' })
        this.props.SocketIO.visualizer({ status: 'isSet', seconds: this.state.seconds, text: this.state.text })
    }
    resetButton = () => {
        this.setState({ status: '', seconds: '', text: '' })
        this.props.SocketIO.visualizer({ status: '', seconds: '', text: '' })
    }
    startButton = () => {
        this.setState({ status: 'isStart' })
        this.props.SocketIO.visualizer({ status: 'isStart', seconds: this.state.seconds, text: this.state.text })
    }
    pauseButton = () => {
        this.setState({ status: 'isPaused' })
        this.props.SocketIO.visualizer({ status: 'isPaused'})
    }
    roundButton = round => {
        console.log('round', round)
    }
    replicaButton = () => {
        console.log('replica')
    }
    onTick = () => {
        this.setState({ seconds: this.state.seconds - 1 })
        this.props.SocketIO.visualizer({ seconds: this.state.seconds, text: this.state.text })
    }
    onComplete = () => {
        this.setState({ status: '', seconds: '', text: '' })
        this.props.SocketIO.visualizer({ status: '', seconds: '', text: '' })
    }
    render() {
        const { classes } = this.props
        return(
            <React.Fragment>
                <div className={ classes.visualsIframeHolder }>
                    <iframe src="#/" frameBorder="0" title="visualizer" className={ classes.visualsIframe }></iframe>
                </div>
                <br/>
                <Typography variant="title">
                    Controles
                    {(() => {
                        switch (this.state.status) {
                            case 'isStart':
                            return (
                                <Countdown
                                    date={ Date.now() + (this.state.seconds * 1000) }
                                    onTick={ this.onTick }
                                    onComplete={ this.onComplete }
                                    renderer={ props => <div className={ classes.countdown }>{ props.total / 1000 }</div> }/>
                            )
                            default:
                            return ''
                        }
                    })()}
                </Typography>
                <MuiThemeProvider theme={ theme }>
                    <Grid container spacing={ 16 }>
                        <Grid item xs={ 12 }>

                        </Grid>
                        <Grid item xs={ 12 }>
                            <TextField
                                type="number"
                                label="Tiempo"
                                value={ this.state.seconds }
                                onChange={ this.inputHandleChange }
                                disabled={ this.state.status !== '' }
                                InputProps={{ startAdornment: (<InputAdornment position="start"><Timer/></InputAdornment>), endAdornment: (<InputAdornment position="end">Segundos</InputAdornment>) }}
                                fullWidth/>
                            <TextField
                                label="Tema"
                                value={ this.state.text }
                                onChange={ this.inputTextHandleChange }
                                InputProps={{ startAdornment: (<InputAdornment position="start"><SchoolIcon/></InputAdornment>) }}
                                fullWidth/>
                        </Grid>
                    </Grid>
                </MuiThemeProvider>
                <Grid container spacing={ 16 }>
                    {(() => {
                        switch (this.state.status) {
                            case '':
                            return (
                                <Grid item xs={ 12 }>
                                    <Button variant="contained" color="secondary" className={ classes.button } onClick={ this.setButton } disabled={ !this.state.seconds || this.state.seconds < 5 } fullWidth>Mostrar</Button>
                                </Grid>
                            )
                            case 'isSet':
                            case 'isPaused':
                            return (
                                <React.Fragment>
                                    <Grid item xs={ 6 }>
                                        <Button variant="contained" color="primary" onClick={ this.resetButton } fullWidth>Cancelar</Button>
                                    </Grid>
                                    <Grid item xs={ 6 }>
                                        <Button variant="contained" color="secondary" onClick={ this.startButton } fullWidth>Iniciar</Button>
                                    </Grid>
                                </React.Fragment>
                            )
                            case 'isStart':
                            return (
                                <Grid item xs={ 12 }>
                                    <Button variant="contained" color="primary" onClick={ this.pauseButton } fullWidth>Puasar</Button>
                                </Grid>
                            )
                            default:
                            return null
                        }
                    })()}
                </Grid>
                <br/>
                <br/>
                <br/>
                <Grid container spacing={ 16 }>
                    <Grid item xs={ 8 }>
                        <Button variant="contained" color="primary" onClick={ () => this.roundButton(1) } fullWidth>Round 1</Button>
                    </Grid>
                    <Grid item xs={ 4 }>
                        <Button variant="contained" color="primary" onClick={ this.replicaButton } fullWidth>Replica</Button>
                    </Grid>
                </Grid>
                <Grow in={ true } timeout={ 500 }>
                    <a href="#/" target="_blank" rel="noopener noreferrer">
                        <Button variant="fab" className={ classes.fab } onClick={ this.handleOpenCreate } color="primary">
                            <PlayArrowIcon/>
                        </Button>
                    </a>
                </Grow>
            </React.Fragment>
        )
    }
}

export default withSocketIO(withStyles(styles)(Competitors))
