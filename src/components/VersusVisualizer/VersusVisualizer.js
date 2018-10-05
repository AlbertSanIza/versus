import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import io from 'socket.io-client'
import 'particles.js/particles'

import bdm_gold_logo from './bdmgold-min.png'
import './VersusVisualizer.css'
import './glitch.css'

const socket = io('http://' + window.location.hostname + ':12345')

const styles = theme => ({
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
    background: {
        backgroundImage:'url(' + window.location.origin + '/assets/patterns/head.jpg)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        opacity: 0.4,
        filter: 'blur(4px)'
    },
    logoCenter: {
        maxWidth: '100%',
        maxHeight: '100%',
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
    }
})

const style = {
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
                <div className={ classes.background }/>
                <div id="particles-js" className="particles"/>
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
                                <div className="glitch" data-text={ seconds } style={{ fontSize: '54vh', marginTop: '7%' }}>{ seconds }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status !== '' && status !== 'isPaused' && format !== '' && format !== 'NULO') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className="format">{ format }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status !== '' && status !== 'isPaused' && text !== '' && text !== 'NULO') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className="thematic">{ text }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status === 'isSet' || status === 'isStart') && competitorONEObject.name) {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div className="competitor competitorLeft">
                                    <div style={ Object.assign({}, style.competitorImage, { backgroundImage: `url(http://${ window.location.hostname }:12345/img/${ competitorONEObject.photo })` }) }/>
                                </div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status === 'isSet' || status === 'isStart') && competitorTWOObject.name) {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div className="competitor competitorRight">
                                    <div style={ Object.assign({}, style.competitorImage, { backgroundImage: `url(http://${ window.location.hostname }:12345/img/${ competitorTWOObject.photo })` }) }/>
                                </div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status === 'isSet' || status === 'isStart') && competitorONEObject.name) {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div className="competitorName competitorLeft">{ competitorONEObject.name }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status === 'isSet' || status === 'isStart') && competitorTWOObject.name) {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div className="competitorName competitorRight">{ competitorTWOObject.name }</div>
                            </Fade>
                        )
                    }
                })() }
            </div>
        )
    }
}

export default withStyles(styles)(VersusVisualizer)
