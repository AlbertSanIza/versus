import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import io from 'socket.io-client'
import 'particles.js/particles'

import bdm_gold_logo from './bdmgold-min.png'
import './glitch.css'

const socket = io('http://' + window.location.hostname + ':12345')

const styles = theme => ({
    particles: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        zIndex: 0,
        overflow: 'hidden'
    },
    visualizer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: '#1a1a1a',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'Caveat Brush',
        textShadow: '3px 3px 50px #cccc00',
        color: 'white'
    },
    logoCenter: {
        maxWidth: '90%',
        maxHeight: '90%',
        zIndex: 1
    },
    logoTopHolder: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1
    },
    logoTop: {
        maxHeight: '100%',
        zIndex: 1
    },
    thematic: {
        position: 'absolute',
        bottom: '1%',
        maxWidth: '60%',
        fontSize: '8vh',
        zIndex: 1,
        textAlign: 'center'
    },
    format: {
        position: 'absolute',
        bottom: '9vh',
        maxWidth: '60%',
        fontSize: '6vh',
        zIndex: 1,
        textAlign: 'center'
    }
})

const style = {
    competitor: {
        position: 'absolute',
        width: '32%',
        height: '90%'
    },
    competitorImage: {
        position: 'relative',
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: '100%',
        height: '100%'
    }
}

class VersusVisualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            seconds: '',
            format: '',
            text: '',
            message: '',
            competitorONEObject: {},
            competitorTWOObject: {}
        }
        socket.on('visualizer', msg => {
            this.setState(msg)
        })
    }
    componentDidMount() {
        var param = window.location.href.split('?')
        if(param.length < 2) {
            window.particlesJS.load('particles-js', './assets/particles-config.json')
        }
    }
    render() {
        const { classes } = this.props
        const { status, seconds, format, text, message, competitorONEObject, competitorTWOObject } = this.state
        return (
            <div className={ classes.visualizer }>
                <div id="particles-js" className={ classes.particles }/>
                { (() => {
                    if(status === '' || status === 'isPaused') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <img className={ classes.logoCenter } src={ bdm_gold_logo } alt="LOGO"/>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status !== '' && status !== 'isPaused') || status === 'isMessage') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.logoTopHolder }>
                                    <img className={ classes.logoTop } src={ bdm_gold_logo } alt="BDM Logo"/>
                                </div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status === 'isMessage') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className="glitch" data-text={ message } style={{ fontSize: '40vh' }}>{ message }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status === 'isSet' || status === 'isStart') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className="glitch" data-text={ seconds } style={{ fontSize: '56vh' }}>{ seconds }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status !== '' && status !== 'isPaused' && format !== '' && format !== 'NULO') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.format }>{ format }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status !== '' && status !== 'isPaused' && text !== '' && text !== 'NULO') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.thematic }>{ text }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status === 'isSet' || status === 'isStart') && competitorONEObject.name) {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div style={ Object.assign({}, { left: 'calc(0px + 2%)', WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 70%)' }, style.competitor) }>
                                    <div style={ Object.assign({}, style.competitorImage, { backgroundImage: `url(http://localhost:12345/img/${ competitorONEObject.photo })` }) }/>
                                </div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status === 'isSet' || status === 'isStart') && competitorTWOObject.name) {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div style={ Object.assign({}, { right: 'calc(0px + 2%)', WebkitMaskImage: 'radial-gradient(ellipse at center, rgba(0, 0, 0, 1) 40%, rgba(0, 0, 0, 0) 70%)' }, style.competitor) }>
                                    <div style={ Object.assign({}, style.competitorImage, { backgroundImage: `url(http://localhost:12345/img/${ competitorTWOObject.photo })` }) }/>
                                </div>
                            </Fade>
                        )
                    }
                })() }
            </div>
        )
    }
}

export default withStyles(styles)(VersusVisualizer)
