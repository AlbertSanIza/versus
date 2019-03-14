import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import 'particles.js/particles';

import bdmGoldLogo from './bdmgold-min.png';
import './VersusVisualizer.css';
import './glitch.css';

const socket = io(`http://${window.location.hostname}:12345`);

const styles = theme => ({
  background: {
    backgroundImage: `url(${window.location.origin}/assets/patterns/fondo.jpg)`,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 0.8,
    filter: 'blur(1px)',
    backgroundSize: 'cover',
  },
});

const style = {
  competitorImage: {
    position: 'relative',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    backgroundSize: 'cover',
    width: '100%',
    height: '100%',
  },
};

class VersusVisualizer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      status: '',
      seconds: '',
      entry: '',
      format: '',
      text: '',
      message: '',
      competitorONEObject: {},
      competitorTWOObject: {},
    };
    socket.on('visualizer', msg => {
      this.setState(msg);
    });
  }

  componentDidMount() {
    const param = window.location.href.split('?');
    if (param.length < 2) {
      window.particlesJS.load('particles-js', './assets/particles-config.json');
    }
  }

  render() {
    const { classes } = this.props;
    const {
      status, seconds, format, entry, text, message, competitorONEObject, competitorTWOObject,
    } = this.state;
    return (
      <div className="visualizer">
        <div className={classes.background} />
        <div id="particles-js" className="particles" />
        { status === '' || status === 'isPaused' ? (
          <Fade in timeout={1000}>
            <img className="logoCenter" src={bdmGoldLogo} alt="LOGO" />
          </Fade>
        ) : (<div />) }
        { (status !== '' && status !== 'isPaused') || status === 'isMessage' ? (
          <Fade in timeout={1000}>
            <div className="logoTopHolder">
              <img className="logoTop" src={bdmGoldLogo} alt="BDM Logo" />
            </div>
          </Fade>
        ) : (<div />) }
        { status === 'isMessage' ? (
          <Fade in timeout={1000}>
            <div className="glitch" data-text={message} style={{ fontSize: '40vh' }}>{ message }</div>
          </Fade>
        ) : (<div />) }
        { status === 'isSet' || status === 'isStart' ? (
          <Fade in timeout={1000}>
            <div className="glitch" data-text={seconds} style={{ fontSize: '50vh', marginTop: '14%' }}>{ seconds }</div>
          </Fade>
        ) : (<div />) }
        { (status === 'isSet' || status === 'isStart') && seconds === '' && (entry !== 'NULO' && entry !== '') ? (
          <Fade in timeout={1000}>
            <div className="glitch" data-text={seconds} style={{ fontSize: '16vh', marginTop: '14%' }}>{ entry }</div>
          </Fade>
        ) : (<div />) }
        { status !== '' && status !== 'isPaused' && format !== '' && format !== 'NULO' ? (
          <Fade in timeout={1000}>
            <div className="format">{ format }</div>
          </Fade>
        ) : (<div />)
          }
        { status !== '' && status !== 'isPaused' && text !== '' && text !== 'NULO' ? (
          <Fade in timeout={1000}>
            <div className="thematic">{ text }</div>
          </Fade>
        ) : (<div />) }
        { (status === 'isSet' || status === 'isStart') && competitorONEObject.name ? (
          <Fade in timeout={2000}>
            <div className="competitor competitorLeft">
              <div style={Object.assign({}, style.competitorImage, { backgroundImage: `url(http://${window.location.hostname}:12345/img/${competitorONEObject.photo})` })} />
            </div>
          </Fade>
        ) : (<div />) }
        { (status === 'isSet' || status === 'isStart') && competitorTWOObject.name ? (
          <Fade in timeout={2000}>
            <div className="competitor competitorRight">
              <div style={Object.assign({}, style.competitorImage, { backgroundImage: `url(http://${window.location.hostname}:12345/img/${competitorTWOObject.photo})` })} />
            </div>
          </Fade>
        ) : (<div />) }
        { (status === 'isSet' || status === 'isStart') && competitorONEObject.name ? (
          <Fade in timeout={1000}>
            <div className="competitorName competitorLeft">{ competitorONEObject.name }</div>
          </Fade>
        ) : (<div />) }

        { (status === 'isSet' || status === 'isStart') && competitorTWOObject.name ? (
          <Fade in timeout={1000}>
            <div className="competitorName competitorRight">{ competitorTWOObject.name }</div>
          </Fade>
        ) : (<div />) }
      </div>
    );
  }
}

VersusVisualizer.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(VersusVisualizer);
