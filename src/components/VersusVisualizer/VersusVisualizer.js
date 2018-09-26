import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import io from 'socket.io-client'
import 'particles.js/particles'
import puma_logo from './puma.png'
import bdm_logo from './bdm.png'

const socket = io('http://' + window.location.hostname + ':12345')

const styles = theme => ({
    visualizer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: 'black',
        color: 'white',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '30%',
        zIndex: 1
    },
    countDown: {
        fontFamily: 'Caveat Brush',
        fontSize: '50vh',
        color: '#eceff1',
        textShadow: '0px 0px 0px red',
        zIndex: 1
    },
    message: {
        fontFamily: 'Caveat Brush',
        fontSize: '40vh',
        color: '#eceff1',
        textShadow: '0px 0px 0px red',
        zIndex: 1
    },
    thematic: {
        position: 'absolute',
        bottom: '3%',
        left: 0,
        width: '100%',
        fontFamily: 'Caveat Brush',
        fontSize: '12vh',
        color: '#eceff1',
        textShadow: '0px 0px 0px red',
        zIndex: 1,
        textAlign: 'center'
    },
    particles: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: 'hidden'
    },
    logoCenter: {
        maxWidth: '80%',
        maxHeight: '80%',
        zIndex: 1
    },
    bdmLogo: {
        float: 'left',
        marginTop: '3%',
        marginLeft: 70,
        height: '100%'
    },
    pumaLogo: {
        position: 'relative',
        float: 'right',
        marginTop: 'calc(3% + 10px)',
        marginRight: 70,
        height: '90%',
        filter: 'invert(100%)'
    }
})

class VersusVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            seconds: '',
            text: '',
            message: ''
        }
        socket.on('visualizer', msg => {
            this.setState(msg)
        })
    }
    componentDidMount() {
        window.particlesJS.load('particles-js', './assets/particles-config.json')
    }
    render() {
        const { classes } = this.props
        return (
            <div className={ classes.visualizer }>
                <div id="particles-js" className={ classes.particles }/>
                { (() => {
                    if(this.state.status !== '' && this.state.status !== 'isPaused' && this.state.status !== 'isMessage') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.header }>
                                    <img className={ classes.bdmLogo } src={ bdm_logo } alt="BDM Logo"/>
                                    <img className={ classes.pumaLogo } src={ puma_logo } alt="Puma Logo"/>
                                </div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(this.state.status === '' || this.state.status === 'isPaused') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <img className={ classes.logoCenter } src={ bdm_logo } alt="LOGO"/>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(this.state.status === 'isMessage') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.message }>{ this.state.message }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(this.state.status === 'isSet' || this.state.status === 'isStart') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.countDown }>{ this.state.seconds }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(this.state.status !== '' && this.state.status !== 'isPaused' && this.state.text !== '' && this.state.text !== 'NULO') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.thematic }>{ this.state.text }</div>
                            </Fade>
                        )
                    }
                })() }
            </div>
        )
    }
}

export default withStyles(styles)(VersusVisualizer)
