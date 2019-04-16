/* eslint no-restricted-globals: ["off"] */
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Fade from '@material-ui/core/Fade';
import io from 'socket.io-client';
import PropTypes from 'prop-types';
import 'particles.js/particles';

import mainLogo from './pangea_2vs2_logo.png';
import './VersusVisualizer.css';
import './glitch.css';

const socket = io(`http://${window.location.hostname}:12345`);

const styles = theme => ({
  background: {
    backgroundImage: `url(${window.location.origin}/assets/patterns/fondoPangea.jpg)`,
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    opacity: 1,
    filter: 'blur(0px)',
    backgroundSize: '100% 100%',
    backgroundRepeat: 'no-repeat',
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
    let newSecondsNumber = 0;
    let newSecondsString = '';
    if (!isNaN(seconds)) {
      newSecondsNumber = Number(seconds);
      if (newSecondsNumber > 120) {
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
        <video autoPlay muted loop id="background-video">
          <track kind="captions" />
          <source src={`${window.location.origin}/assets/patterns/videoPangea.mp4`} type="video/ogg" />
        </video>
        <div id="particles-js" className="particles" />
        { status === '' || status === 'isPaused' ? (
          <Fade in timeout={1000}>
            <img className="logoCenter" src={mainLogo} alt="LOGO" />
          </Fade>
        ) : (<div />) }
        { (status !== '' && status !== 'isPaused') || status === 'isMessage' ? (
          <Fade in timeout={1000}>
            <div className="logoTopHolder">
              <img className="logoTop" src={mainLogo} alt="BDM Logo" />
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
            <div className="glitch" data-text={newSecondsString} style={{ fontSize: '44vh', marginTop: '-4%', fontFamily: 'Tofino' }}>{ newSecondsString }</div>
          </Fade>
        ) : (<div />) }
        { (status === 'isSet' || status === 'isStart') && seconds === '' && (entry !== 'NULO' && entry !== '') ? (
          <Fade in timeout={1000}>
            <div className="glitch" style={{ fontSize: '32vh', marginTop: '0%' }}>{ entry }</div>
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
