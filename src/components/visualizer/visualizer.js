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
            status: "set",
            seconds: "",
            text: ""
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
            <div className="visualizer flex">
                <div id="particles-js" className="particles"></div>
                { (() => {
                    if(this.state.status === "isSet" || this.state.status === "isStart") {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <div className="visualizer-header">
                                    <img className={ classes.bdmLogo } src={ bdm_logo } alt="LOGO"/>
                                    <img className={ classes.pumaLogo } src={ puma_logo } alt="LOGO"/>
                                </div>
                            </Fade>
                        )
                    } else {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <img className="bdm-logo-center" src={bdm_logo} alt="LOGO"/>
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
