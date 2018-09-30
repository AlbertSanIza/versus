import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import io from 'socket.io-client'
import 'particles.js/particles'
// import puma_logo from './puma.png'
import bdm_logo from './bdm-min.png'

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
        justifyContent: 'center',
        overflow: 'hidden'
    },
    header: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: '40%',
        zIndex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    countDown: {
        paddingTop: '10%',
        fontFamily: 'Caveat Brush',
        fontSize: '50vh',
        color: '#eceff1',
        textShadow: '0px 0px 0px red',
        zIndex: 1
    },
    message: {
        paddingTop: '10%',
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
        maxWidth: '99%',
        maxHeight: '99%',
        zIndex: 1
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
    bdmLogo: {
        // float: 'left',
        // marginTop: '3%',
        // marginLeft: 70,
        paddingTop: '10%',
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
                    if(status !== '' && status !== 'isPaused' && status === 'isMessage') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.header }>
                                    <img className={ classes.bdmLogo } src={ bdm_logo } alt="BDM Logo"/>
                                    { /*
                                        <img className={ classes.pumaLogo } src={ puma_logo } alt="Puma Logo"/>
                                    */ }
                                </div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status === '' || status === 'isPaused') {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <img className={ classes.logoCenter } src={ bdm_logo } alt="LOGO"/>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(status !== '' && status !== 'isPaused') {
                        return (
                            <Fade in={ true } timeout={ 1500 }>
                                <div className={ classes.logoCenterBigContainer }>
                                    <img className={ classes.logoCenterBig } src={ bdm_logo } alt="LOGO"/>
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
                                <div style={ Object.assign({}, { left: 'calc(0px - 15%)', WebkitMaskImage: 'linear-gradient(to left, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 60%)' }, style.competitor) }>
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
                                <div style={ Object.assign({}, { right: 'calc(0px - 15%)', WebkitMaskImage: 'linear-gradient(to right, rgba(0, 0, 0, 0), rgba(0, 0, 0, 1) 60%)' }, style.competitor) }>
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
