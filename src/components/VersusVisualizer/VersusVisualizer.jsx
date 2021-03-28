/* eslint no-restricted-globals: ["off"] */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import PropTypes from 'prop-types';
import io from 'socket.io-client';
import 'particles.js/particles';

import mainLogo from './bdmgold-min.png';
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
    opacity: 1,
    filter: 'blur(2px)',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
    animation: 'breathing 20s infinite normal',
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
      // window.particlesJS.load('particles-js2', './assets/particles-config2.json');
    }
  }

  render() {
    const { classes } = this.props;
    const {
      status, seconds, format, entry, text, message, competitorONEObject, competitorTWOObject,
    } = this.state;
    let newSecondsNumber = 0;
    let newSecondsString = '';
    if (!isNaN(seconds)) {
      newSecondsNumber = Number(seconds);
      if (newSecondsNumber > 1000) {
        newSecondsString = `${Math.floor(newSecondsNumber / 60)}:${newSecondsNumber - (Math.floor(newSecondsNumber / 60) * 60)}`;
      } else {
        newSecondsString = `${newSecondsNumber}`;
        if (newSecondsNumber === 0) {
          newSecondsString = '';
        }
      }
    }
    return (
      <div className="visualizer">
        <div className={classes.background} />
        { /*
          <video autoPlay muted loop id="background-video">
          <track kind="captions" />
          <source src={`${window.location.origin}/assets/patterns/videoPangea.mp4`} type="video/ogg" />
          </video>
          */ }
        <div id="particles-js" className="particles" />
        { /* <div id="particles-js2" className="particles22" /> */ }
        { (status === '' || status === 'isPaused') && (
        <Fade in timeout={1000}>
          <img className="logoCenter" src={mainLogo} alt="LOGO" />
        </Fade>
        ) }
        {/* (status === 'isMessage' || status === 'isStart') && (
            <Fade in timeout={1000}>
            <div className="logoTopHolder">
            <img className="logoTop" src={mainLogo} alt="Main Logo" />
            </div>
            </Fade>
            ) */}
        { status === 'isMessage' && (
        <Fade in timeout={1000}>
          <div style={{ position: 'absolute', top: '20%' }}>
            <div className="glitch" data-text={message} style={{ fontSize: '22vh' }}>{ message }</div>
          </div>
        </Fade>
        ) }
        { (status === 'isSet' || status === 'isStart') && seconds === '' && (entry !== 'NULO' && entry !== '') ? (
          <Fade in timeout={1000}>
            <div className="glitch" style={{ fontSize: '32vh', marginTop: '0%' }}>{ entry }</div>
          </Fade>
        ) : (<div />) }
        { status !== '' && status !== 'isPaused' && format !== '' && format !== 'NULO' && (
        <Fade in timeout={1000}>
          <div className="format">{ format }</div>
        </Fade>
        ) }
        { status !== '' && status !== 'isPaused' && text !== '' && text !== 'NULO' ? (
          <Fade in timeout={1000}>
            <div className="thematic">{ text }</div>
          </Fade>
        ) : (<div />) }
        { (status === 'isSet' || status === 'isStart') && competitorONEObject.name && (
        <Fade in timeout={2000}>
          <div className="competitor competitorLeft">
            <div style={({ ...style.competitorImage, backgroundImage: `url(http://${window.location.hostname}:12345/img/${competitorONEObject.photo})` })} />
          </div>
        </Fade>
        ) }
        { (status === 'isSet' || status === 'isStart') && competitorTWOObject.name ? (
          <Fade in timeout={2000}>
            <div className="competitor competitorRight">
              <div style={({ ...style.competitorImage, backgroundImage: `url(http://${window.location.hostname}:12345/img/${competitorTWOObject.photo})` })} />
            </div>
          </Fade>
        ) : (<div />) }
        { (status === 'isSet' || status === 'isStart') && (
        <Fade in timeout={1000}>
          <div className="glitch" data-text={newSecondsString} style={{ position: 'absolute', fontSize: '60vh', top: '-10%' }}>{ newSecondsString }</div>
        </Fade>
        ) }
        {/*
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
              */}
      </div>
    );
  }
}

VersusVisualizer.propTypes = {
  classes: PropTypes.shape().isRequired,
};

export default withStyles(styles)(VersusVisualizer);
