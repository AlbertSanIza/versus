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
        status: "set",
        seconds: "",
        text: ""
    }
    inputHandleChange = e => {
        this.setState({ seconds: e.target.value })
    }
    inputTextHandleChange = e => {
        this.setState({ text: e.target.value })
    }
    setButton = () => {
        this.setState({ status: "isSet" })
        this.props.visualizer({ status: "isSet", seconds: this.state.seconds, text: this.state.text })
    }
    startButton = () => {
        this.setState({status: "isStart"})
        this.props.visualizer({ status: "isStart", seconds: this.state.seconds, text: this.state.text})
    }
    pauseButton = () => {
        this.setState({status: "isSet"})
        this.props.visualizer({ status: "isPause", seconds: this.state.seconds, text: this.state.text})
    }
    resetButton = () => {
        this.setState({status: "set", seconds: "", text: ""})
        this.props.visualizer({ status: "isReset", seconds: "0", text: this.state.text})
    }
    onTick = () => {
        this.setState({seconds: this.state.seconds - 1})
        this.props.visualizer({ status: "isStart", seconds: this.state.seconds, text: this.state.text})
    }
    onComplete = () => {
        this.setState({status: "set", seconds: ""})
        this.props.visualizer({ status: "isReset", seconds: "0"})
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
                                <Countdown date={ Date.now() + (this.state.seconds * 1000) } onTick={ this.onTick } onComplete={ this.onComplete } renderer={ props => <div className={ classes.countdown }>{props.total / 1000}</div> }/>
                            )
                            default:
                            return ''
                        }
                    })()}
                </Typography>
                <Grid container spacing={ 16 }>
                    <Grid item xs={ 12 }>
                        <MuiThemeProvider theme={ theme }>
                            <TextField type="number" label="Tiempo" color="secondary" value={ this.state.seconds } onChange={ this.inputHandleChange } disabled={ this.state.status !== "set" } InputProps={{ startAdornment: (<InputAdornment position="start"><Timer/></InputAdornment>), endAdornment: (<InputAdornment position="end">Segundos</InputAdornment>) }} fullWidth/>
                            <TextField label="Tema" color="secondary" value={ this.state.text } onChange={ this.inputTextHandleChange } InputProps={{ startAdornment: (<InputAdornment position="start"><SchoolIcon/></InputAdornment>) }} fullWidth/>
                        </MuiThemeProvider>
                    </Grid>
                </Grid>
                <div className="card border-dark">
                    <div className="card-header">
                        <b>
                            Controles
                            {(() => {
                                switch (this.state.status) {
                                    case "isStart":
                                    return (
                                        <React.Fragment>
                                            <div className="countdown">
                                                <Countdown date={Date.now() + (this.state.seconds * 1000)} onTick={this.onTick} onComplete={this.onComplete} renderer={props => <React.Fragment>{props.total / 1000}</React.Fragment>}/>
                                            </div>
                                        </React.Fragment>
                                    )
                                    default:
                                    return ""
                                }
                            })()}
                        </b>
                    </div>
                    <div className="card-body">
                        <input className="form-control" type="text" placeholder="Tema" disabled={this.state.status !== "set"} value={this.state.text} onChange={this.inputTextHandleChange}/>
                        <br/>
                        <div className="input-group input-group-sm mb-3">
                            <input className="form-control" type="number" placeholder="Tiempo" min="5" disabled={this.state.status !== "set"} value={this.state.seconds} onChange={this.inputHandleChange}/>
                            <div className="input-group-append">
                                <span className="input-group-text">Segundos</span>
                            </div>
                        </div>
                        {(() => {
                            switch (this.state.status) {
                                case "set":
                                return (
                                    <button className="btn btn-outline-primary btn-sm btn-block" type="button" onClick={this.setButton} disabled={!this.state.seconds || this.state.seconds < 5}>Mostrar</button>
                                )
                                case "isSet":
                                case "isPause":
                                return (
                                    <div className="row">
                                        <div className="col">
                                            <button className="btn btn-outline-danger btn-sm btn-block" type="button" onClick={this.resetButton}>Cancelar</button>
                                        </div>
                                        <div className="col">
                                            <button className="btn btn-outline-success btn-sm btn-block" type="button" onClick={this.startButton}>Iniciar</button>
                                        </div>
                                    </div>
                                )
                                case "isStart":
                                return (
                                    <div>
                                        <button className="btn btn-outline-warning btn-sm btn-block" type="button" onClick={this.pauseButton}>Puasar</button>
                                    </div>
                                )
                                default:
                                return null
                            }
                        })()}
                    </div>
                </div>
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

export default withStyles(styles)(Competitors)
