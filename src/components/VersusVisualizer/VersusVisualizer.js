import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import io from 'socket.io-client'
import 'particles.js/particles'
import axios from 'axios'

import bdm_gold_logo from './bdmgold-min.png'
import './VersusVisualizer.css'
import './glitch.css'

const socket = io('http://' + window.location.hostname + ':12345')

const styles = theme => ({
    background: {
        backgroundImage:'url(' + window.location.origin + '/assets/patterns/fondo.jpg)',
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        opacity: 0.8,
        filter: 'blur(1px)',
        backgroundSize: 'cover'
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
            competitorTWOObject: {},
            competitorONEPhoto: null,
            competitorTWOPhoto: null
        }
        socket.on('visualizer', msg => {
            if(msg.competitorONEObject && msg.competitorTWOObject) {
                if((JSON.stringify(this.state.competitorONEObject) !== JSON.stringify(msg.competitorONEObject)) && (JSON.stringify(this.state.competitorTWOObject) !== JSON.stringify(msg.competitorTWOObject))) {
                    if(msg.competitorONEObject.photo && msg.competitorTWOObject.photo) {
                        axios({
                            method:'get',
                            url:`http://${ window.location.hostname }:12345/img/${ msg.competitorONEObject.photo }`,
                            responseType:'blob'
                        }).then(response => {
                            setTimeout(() => {
                                this.setState({ competitorONEPhoto: window.URL.createObjectURL(response.data) })
                            }, 500)
                        }).catch(error => {
                            this.setState({ competitorONEPhoto: null })
                        })
                        axios({
                            method:'get',
                            url:`http://${ window.location.hostname }:12345/img/${ msg.competitorTWOObject.photo }`,
                            responseType:'blob'
                        }).then(response => {
                            setTimeout(() => {
                                this.setState({ competitorTWOPhoto: window.URL.createObjectURL(response.data) })
                            }, 500)
                        }).catch(error => {
                            this.setState({ competitorTWOPhoto: null })
                        })
                        this.setState(msg)
                    } else {
                        this.setState({ competitorONEObject: {}, competitorTWOObject: {}, competitorONEPhoto: null, competitorTWOPhoto: null })
                    }
                }
            } else {
                this.setState(msg)
            }
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
        const { status, seconds, format, text, message, competitorONEObject, competitorTWOObject, competitorONEPhoto, competitorTWOPhoto } = this.state
        return (
            <div className="visualizer">
                <div className={ classes.background }/>
                <div id="particles-js" className="particles"/>
                { (() => {
                    if(status === '' || status === 'isPaused') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <img className="logoCenter" src={ bdm_gold_logo } alt="LOGO"/>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status !== '' && status !== 'isPaused') || status === 'isMessage') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className="logoTopHolder">
                                    <img className="logoTop" src={ bdm_gold_logo } alt="BDM Logo"/>
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
                    if((status === 'isSet' || status === 'isStart') && competitorONEObject.name && competitorONEPhoto !== null && competitorTWOPhoto !== null) {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div className="competitor competitorLeft">
                                    <div style={ Object.assign({}, style.competitorImage, { backgroundImage: `url(${ competitorONEPhoto }` }) }/>
                                </div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status === 'isSet' || status === 'isStart') && competitorTWOObject.name && competitorTWOPhoto !== null && competitorONEPhoto !== null) {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div className="competitor competitorRight">
                                    <div style={ Object.assign({}, style.competitorImage, { backgroundImage: `url(${ competitorTWOPhoto })` }) }/>
                                </div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status === 'isSet' || status === 'isStart') && competitorONEObject.name && competitorONEPhoto !== null && competitorTWOPhoto !== null) {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div className="competitorName competitorLeft">{ competitorONEObject.name }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((status === 'isSet' || status === 'isStart') && competitorTWOObject.name && competitorTWOPhoto !== null && competitorONEPhoto !== null) {
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
