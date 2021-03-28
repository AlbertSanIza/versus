import React, { Component } from 'react';
import Fade from '@material-ui/core/Fade';
import io from 'socket.io-client';
import 'particles.js/particles';

import mainLogo from './logo.png';
import './Viewer.css';
import './glitch.css';

const socket = io(`http://${window.location.hostname}:3001`);

class Viewer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      seconds: '',
      format: '',
      text: '',
      message: '',
      competitorONEObject: {},
      competitorTWOObject: {},
    };
  }

  componentDidMount() {
    window.particlesJS.load('particles-js', './particles-config.json');
    socket.on('visualizer', msg => {
      this.setState(msg);
    });
  }

  render() {
    const {
      status, seconds, format, text, message, competitorONEObject, competitorTWOObject,
    } = this.state;
    return (
      <div className="root">
        <div id="particles-js" className="particles" />
        { (status === '' || status === 'isPaused') && (
          <Fade in timeout={1000}>
            <img className="logo" alt="theLogo" src={mainLogo} />
          </Fade>
        ) }
        { (status !== '' && status !== 'isPaused') && (
          <Fade in timeout={1000}>
            <img className="logo-small" alt="theLogo" src={mainLogo} />
          </Fade>
        ) }
        { status !== '' && status !== 'isPaused' && format !== '' && format !== 'NULO' && (
          <Fade in timeout={1000}>
            <div className="format">
              { format }
            </div>
          </Fade>
        ) }
        { (status !== '' && status !== 'isPaused' && text !== '' && text !== 'NULO') && (
          <Fade in timeout={1000}>
            <div className="thematic">
              { text }
            </div>
          </Fade>
        ) }
        { status === 'isMessage' && (
          <Fade in timeout={1000}>
            <div className="glitch message" data-text={message}>
              { message }
            </div>
          </Fade>
        ) }
        { (status === 'isSet' || status === 'isStart') && (
          <Fade in timeout={1000}>
            <div className="glitch seconds" data-text={seconds}>
              { seconds }
            </div>
          </Fade>
        ) }
        { (status === 'isSet' || status === 'isStart') && competitorONEObject.name && (
          <Fade in timeout={1000}>
            <div className="competitor-name competitor-name-left" data-text={competitorONEObject.name}>
              { competitorONEObject.name }
            </div>
          </Fade>
        ) }
        { (status === 'isSet' || status === 'isStart') && competitorTWOObject.name && (
          <Fade in timeout={1000}>
            <div className="competitor-name competitor-name-right" data-text={competitorTWOObject.name}>
              { competitorTWOObject.name }
            </div>
          </Fade>
        ) }
      </div>
    );
  }
}
export default Viewer;
