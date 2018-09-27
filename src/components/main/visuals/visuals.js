import React, { Component } from 'react'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import InputAdornment from '@material-ui/core/InputAdornment'
import PlayArrowIcon from '@material-ui/icons/PlayArrow'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import Checkbox from '@material-ui/core/Checkbox'
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
        text: 'NULO',
        round: 1,
        event: 'NULO',
        competitorONE: 'NULO',
        competitorTWO: 'NULO'
    }
    inputHandleChange = e => {
        this.setState({ seconds: e.target.value })
    }
    inputTextHandleChange = e => {
        this.setState({ text: e.target.value })
        this.props.SocketIO.visualizer({ text: 'NULO' })
    }
    inputRoundHandleChange = e => {
        this.setState({ round: e.target.value })
    }
    inputEventHandleChange = e => {
        this.setState({ event: e.target.value })
        if(e.target.value === 'NULO') {
            this.setState({ competitorONE: 'NULO', competitorTWO: 'NULO' })
        }
    }
    inputCompetitorONEHandleChange = e => {
        this.setState({ competitorONE: e.target.value })
    }
    inputCompetitorTWOHandleChange = e => {
        this.setState({ competitorTWO: e.target.value })
    }
    setButton = () => {
        this.setState({ status: 'isSet' })
        this.props.SocketIO.visualizer({ status: 'isSet', seconds: this.state.seconds, text: this.state.text })
    }
    resetButton = () => {
        this.setState({ status: '', seconds: '', text: 'NULO' })
        this.props.SocketIO.visualizer({ status: '', seconds: '', text: 'NULO' })
    }
    startButton = () => {
        this.setState({ status: 'isStart' })
        this.props.SocketIO.visualizer({ status: 'isStart', seconds: this.state.seconds, text: this.state.text })
    }
    pauseButton = () => {
        this.setState({ status: 'isPaused' })
        this.props.SocketIO.visualizer({ status: 'isPaused'})
    }
    roundButton = () => {
        const { round } = this.state
        this.setState({ status: 'isMessage' })
        this.props.SocketIO.visualizer({ status: 'isMessage', message: 'Round #' + round, text: 'NULO' })
    }
    replicaButton = () => {
        this.setState({ status: 'isMessage' })
        this.props.SocketIO.visualizer({ status: 'isMessage', message: 'Replica!', text: 'NULO' })
    }
    onTick = () => {
        this.setState({ seconds: this.state.seconds - 1 })
        this.props.SocketIO.visualizer({ seconds: this.state.seconds, text: this.state.text })
    }
    onComplete = () => {
        this.setState({ status: '', seconds: '', text: 'NULO' })
        this.props.SocketIO.visualizer({ status: '', seconds: '', text: 'NULO' })
    }
    render() {
        const { classes, SocketIO } = this.props
        return(
            <React.Fragment>
                <div className={ classes.visualsIframeHolder }>
                    <iframe src="#/?animation" frameBorder="0" title="visualizer" className={ classes.visualsIframe }></iframe>
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
                        <Grid item xs={ 6 }>
                            <TextField
                                type="number"
                                label="Tiempo"
                                value={ this.state.seconds }
                                onChange={ this.inputHandleChange }
                                disabled={ this.state.status !== '' && this.state.status !== 'isMessage' }
                                InputProps={{ startAdornment: (<InputAdornment position="start"><Timer/></InputAdornment>), endAdornment: (<InputAdornment position="end">Segundos</InputAdornment>) }}
                                fullWidth/>
                        </Grid>
                        <Grid item xs={ 6 }>
                            <TextField
                                label="Tema"
                                variant="outlined"
                                value={ this.state.text }
                                onChange={ this.inputTextHandleChange }
                                SelectProps={{ native: true }}
                                select fullWidth>
                                <option value="NULO">Ninguno</option>
                                { SocketIO.thematics.thematics.map(option => (
                                    <option key={ option.name } value={ option.value }>
                                        { option.name }
                                    </option>
                                )) }
                            </TextField>
                        </Grid>
                        <Grid item xs={ 6 }>
                            <TextField
                                label="Round"
                                variant="outlined"
                                value={ this.state.round }
                                SelectProps={{ native: true }}
                                onChange={ this.inputRoundHandleChange }
                                disabled={ this.state.status === 'isMessage' }
                                select fullWidth>
                                <option>1</option>
                                <option>2</option>
                                <option>3</option>
                            </TextField>
                        </Grid>
                        <Grid item xs={ 3 }>
                            <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                style={{ marginTop: 7 }}
                                onClick={ this.roundButton }
                                disabled={ this.state.status === 'isMessage' }
                                fullWidth>
                                Round
                            </Button>
                        </Grid>
                        <Grid item xs={ 3 }>
                            <Button
                                size="large"
                                color="primary"
                                variant="contained"
                                style={{ marginTop: 7 }}
                                onClick={ this.replicaButton }
                                disabled={ this.state.status === 'isMessage' }
                                fullWidth>
                                Replica
                            </Button>
                        </Grid>
                        <Grid item xs={ 8 }>
                            <TextField
                                label="Evento"
                                variant="outlined"
                                value={ this.state.event }
                                SelectProps={{ native: true }}
                                onChange={ this.inputEventHandleChange }
                                select fullWidth>
                                <option value="NULO">Ninguno</option>
                                { SocketIO.events.events.map(option => (
                                    <option key={ option.name } value={ option.value }>
                                        { option.name }
                                    </option>
                                )) }
                            </TextField>
                        </Grid>
                        <Grid item xs={ 4 }>
                            <FormControlLabel
                                style={{ marginTop: 5 }}
                                label="Mostrar Competidores"
                                control={ <Checkbox value="checkedA" checked={ this.state.checkedA }/> }/>
                        </Grid>
                        {(() => {
                            if(this.state.event !== 'NULO') {
                                return (
                                    <Grid item xs={ 6 }>
                                        <TextField
                                            label="Competidor #1"
                                            variant="outlined"
                                            SelectProps={{ native: true }}
                                            value={ this.state.competitorONE }
                                            disabled={ this.state.event === 'NULO' }
                                            onChange={ this.inputCompetitorONEHandleChange }
                                            select fullWidth>
                                            <option value="NULO">Ninguno</option>
                                            { SocketIO.events.events.filter(event => {
                                                return event.name === this.state.event
                                            })[0].selected.filter(name => {
                                                return name !== this.state.competitorTWO
                                            }).map((option, index) => (
                                                <option key={ index } value={ option }>
                                                    { option }
                                                </option>
                                            )) }
                                        </TextField>
                                    </Grid>
                                )
                            }
                        })() }
                        {(() => {
                            if(this.state.event !== 'NULO') {
                                return (
                                    <Grid item xs={ 6 }>
                                        <TextField
                                            label="Competidor #2"
                                            variant="outlined"
                                            SelectProps={{ native: true }}
                                            value={ this.state.competitorTWO }
                                            disabled={ this.state.event === 'NULO' }
                                            onChange={ this.inputCompetitorTWOHandleChange }
                                            select fullWidth>
                                            <option value="NULO">Ninguno</option>
                                            { SocketIO.events.events.filter(event => {
                                                return event.name === this.state.event
                                            })[0].selected.filter(name => {
                                                return name !== this.state.competitorONE
                                            }).map((option, index) => (
                                                <option key={ index } value={ option }>
                                                    { option }
                                                </option>
                                            )) }
                                        </TextField>
                                    </Grid>
                                )
                            }
                        })() }
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
                                case 'isMessage':
                                return (
                                    <React.Fragment>
                                        <Grid item xs={ 6 }>
                                            <Button variant="contained" color="primary" onClick={ this.resetButton } fullWidth>Cancelar</Button>
                                        </Grid>
                                        <Grid item xs={ 6 }>
                                            <Button variant="contained" color="secondary" className={ classes.button } onClick={ this.setButton } disabled={ !this.state.seconds || this.state.seconds < 5 } fullWidth>Mostrar</Button>
                                        </Grid>
                                    </React.Fragment>
                                )
                                default:
                                return null
                            }
                        })() }
                    </Grid>
                </MuiThemeProvider>
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
