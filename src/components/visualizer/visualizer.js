import React, { Component } from 'react'
import 'particles.js/particles'
import puma_logo from "./puma.png"
import bdm_logo from "./bdm.png"
import './visualizer.css'

const VisualizerHeader = () => (
    <div className="visualizer-header fade-in">
        <img className="bdm-logo-sm" src={ bdm_logo } alt="LOGO"/>
        <img className="puma-logo-sm" src={ puma_logo } alt="LOGO"/>
    </div>
)

class Visualizer extends Component {
    constructor(props) {
        super(props)
        this.state = {
            status: "set",
            seconds: "",
            text: ""
        }
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
                            <img className="bdm-logo-center fade-in" src={bdm_logo} alt="LOGO"/>
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
