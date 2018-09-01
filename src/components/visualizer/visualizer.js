import React, { Component } from 'react'
import io from 'socket.io-client'
import Fade from '@material-ui/core/Fade'
import 'particles.js/particles'
import 'typeface-caveat-brush'
import puma_logo from './puma.png'
import bdm_logo from './bdm.png'
import './visualizer.css'

const socket = io('http://' + window.location.hostname + ':12345')

const VisualizerHeader = () => (
    <Fade in={ true } timeout={ 1000 }>
        <div className="visualizer-header">
            <img className="bdm-logo-sm" src={ bdm_logo } alt="LOGO"/>
            <img className="puma-logo-sm" src={ puma_logo } alt="LOGO"/>
        </div>
    </Fade>
)

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
        return (
            <div className="visualizer flex fade-in">
                <div id="particles-js" className="particles"></div>
                { (() => {
                    if(this.state.status === "isSet" || this.state.status === "isStart") {
                        return (
                            <VisualizerHeader/>
                        )
                    } else {
                        return (
                            <Fade in={ true } timeout={ 1000 }>
                                <img className="bdm-logo-center fade-in" src={bdm_logo} alt="LOGO"/>
                            </Fade>
                        )
                    }
                })() }
                { (() => {
                    if(this.state.status === "isSet" || this.state.status === "isStart") {
                        return (
                            <div className="visualizer-countdown fade-in">{ this.state.seconds }</div>
                        )
                    }
                })() }
                { (() => {
                    if((this.state.status === "isSet" || this.state.status === "isStart") && this.state.text !== "") {
                        return (
                            <div className="visualizer-text fade-in">{ this.state.text }</div>
                        )
                    }
                })() }
            </div>
        )
    }
}

export default Visualizer
