import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Fade from '@material-ui/core/Fade'
import io from 'socket.io-client'
import 'particles.js/particles'
import 'typeface-caveat-brush'
import puma_logo from './puma.png'
import bdm_logo from './bdm.png'
import './visualizer.css'

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

class Visualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: '',
            seconds: '',
            text: ''
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
                    if(this.state.status === "isSet" || this.state.status === "isStart") {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className={ classes.header }>
                                    <img className={ classes.bdmLogo } src={ bdm_logo } alt="BDM Logo"/>
                                    <img className={ classes.pumaLogo } src={ puma_logo } alt="Puma Logo"/>
                                </div>
                            </Fade>
                        )
                    } else {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <img className={ classes.logoCenter } src={bdm_logo} alt="LOGO"/>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(this.state.status === "isSet" || this.state.status === "isStart") {
                        return (
                            <Fade in={ true } timeout={ 2000 }>
                                <div className="visualizer-countdown">{ this.state.seconds }</div>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if((this.state.status === "isSet" || this.state.status === "isStart") && this.state.text !== "") {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className="visualizer-text">{ this.state.text }</div>
                            </Fade>
                        )
                    }
                })() }
            </div>
        )
    }
}

export default withStyles(styles)(Visualizer)
