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
    };
  }

  componentDidMount() {
    window.particlesJS.load('particles-js', './particles-config.json');
    socket.on('visualizer', msg => {
      this.setState(msg);
    });
  }

  render() {
    const { status, seconds } = this.state;
    return (
      <div className="root">
        <div id="particles-js" className="particles" />
        { (status === '' || status === 'isPaused') && (
          <Fade in timeout={1000}>
            <img className="logo" alt="theLogo" src={mainLogo} />
          </Fade>
        ) }
        { (status === 'isSet' || status === 'isStart') && (
          <Fade in timeout={1000}>
            <div className="glitch seconds" data-text={seconds}>
              { seconds }
            </div>
          </Fade>
        ) }
      </div>
    );
  }
}
export default Viewer;
