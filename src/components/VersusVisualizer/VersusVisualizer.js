import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import io from 'socket.io-client'
import 'particles.js/particles'

import bdm_gold_logo from './bdmgold-min.png'

const socket = io('http://' + window.location.hostname + ':12345')

const styles = theme => ({
    visualizer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        top: 0,
        left: 0,
        background: '#1a1a1a',
        color: '#FFF8F0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        fontFamily: 'Caveat Brush',
        textShadow: '5px 5px 5px black',
    },
    logoCenter: {
        maxWidth: '90%',
        maxHeight: '90%',
        zIndex: 1
    },
    countDown: {
        paddingTop: '10%',
        fontSize: '50vh',
        zIndex: 1
    },
    message: {
        paddingTop: '10%',
        fontSize: '40vh',
        zIndex: 1
    },
    thematic: {
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        fontSize: '10vh',
        zIndex: 1,
        textAlign: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)'
    },
    bdmLogoSmall: {
        paddingTop: '5%',
        height: '100%'
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '36%',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
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
    logoCenterBigContainer: {
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },
    logoCenterBig: {
        maxWidth: '99%',
        maxHeight: '99%',
        zIndex: 1,
        opacity: 0.1
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

const style = {
    competitor: {
        position: 'absolute',
        width: '50%',
        height: '100%'
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
        const { status, seconds, text, message, competitorONEObject, competitorTWOObject } = this.state
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
                                <div className={ classes.header }>
                                    <img className={ classes.bdmLogoSmall } src={ bdm_gold_logo } alt="BDM Logo"/>
                                </div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status === 'isMessage') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.message }>{ message }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status === 'isSet' || status === 'isStart') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.countDown }>{ seconds }</div>
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
                                <div style={ Object.assign({}, { left: 'calc(0px - 15%)', WebkitMaskImage: 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 40%)' }, style.competitor) }>
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
                                <div style={ Object.assign({}, { right: 'calc(0px - 15%)', WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 40%)' }, style.competitor) }>
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
