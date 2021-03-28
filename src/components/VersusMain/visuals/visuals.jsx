import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Checkbox from '@material-ui/core/Checkbox';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import Timer from '@material-ui/icons/Timer';
import Countdown from 'react-countdown-now';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';

import { withSocketIO } from '../../../context';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = () => ({
  fab: {
    margin: 0,
    top: 'auto',
    right: 20,
    bottom: 20,
    left: 'auto',
    position: 'fixed',
  },
  visualsIframeHolder: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'black',
  },
  visualsIframe: {
    width: '34vw',
    height: '16vw',
    padding: 0,
    margin: 0,
    background: '#1a1a1a',
  },
  countdown: {
    display: 'none',
    opacity: 0,
  },
});

class Visuals extends Component {
  constructor() {
    super();
    this.state = {
      status: '',
      seconds: '',
      format: 'NULO',
      entry: 'NULO',
      text: 'NULO',
      round: 1,
      event: 'NULO',
      competitorONE: 'NULO',
      competitorTWO: 'NULO',
      competitorONEObject: { },
      competitorTWOObject: { },
      checkedA: false,
    };
  }

  onTick() {
    this.setState(prevState => ({ seconds: prevState.seconds - 1 }));
    this.props.SocketIO.visualizer({ seconds: this.state.seconds, format: this.state.format, text: this.state.text });
    if (this.state.checkedA === true && this.state.competitorONEObject.name && this.state.competitorTWOObject.name) {
      this.props.SocketIO.visualizer({ competitorONEObject: this.state.competitorONEObject, competitorTWOObject: this.state.competitorTWOObject });
    } else {
      this.props.SocketIO.visualizer({ competitorONEObject: { }, competitorTWOObject: { } });
    }
  }

  onComplete() {
    this.setState({
      status: '', seconds: '', format: 'NULO', text: 'NULO', entry: 'NULO',
    });
    this.props.SocketIO.visualizer({
      status: '', seconds: '', format: 'NULO', text: 'NULO', entry: 'NULO',
    });
  }

  setButton() {
    this.setState({ status: 'isSet' });
    this.props.SocketIO.visualizer({
      status: 'isSet', seconds: this.state.seconds, format: this.state.format, text: this.state.text, entry: this.state.entry,
    });
    if (this.state.checkedA === true && this.state.competitorONEObject.name && this.state.competitorTWOObject.name) {
      this.props.SocketIO.visualizer({ competitorONEObject: this.state.competitorONEObject, competitorTWOObject: this.state.competitorTWOObject });
    } else {
      this.props.SocketIO.visualizer({ competitorONEObject: { }, competitorTWOObject: { } });
    }
  }

  startButton() {
    this.setState({ status: 'isStart' });
    this.props.SocketIO.visualizer({
      status: 'isStart', seconds: this.state.seconds, format: this.state.format, text: this.state.text, entry: this.state.entry,
    });
    if (this.state.checkedA === true && this.state.competitorONEObject.name && this.state.competitorTWOObject.name) {
      this.props.SocketIO.visualizer({ competitorONEObject: this.state.competitorONEObject, competitorTWOObject: this.state.competitorTWOObject });
    } else {
      this.props.SocketIO.visualizer({ competitorONEObject: { }, competitorTWOObject: { } });
    }
  }

  pauseButton() {
    this.setState({ status: 'isPaused' });
    this.props.SocketIO.visualizer({ status: 'isPaused' });
  }

  roundButton() {
    const { round } = this.state;
    this.setState({ status: 'isMessage' });
    this.props.SocketIO.visualizer({
      status: 'isMessage', message: `ROUND ${round}`, format: 'NULO', text: 'NULO', entry: this.state.entry,
    });
  }

  resetButton() {
    this.setState({
      status: '', seconds: '', format: 'NULO', text: 'NULO', entry: 'NULO',
    });
    this.props.SocketIO.visualizer({
      status: '', seconds: '', format: 'NULO', text: 'NULO', entry: 'NULO',
    });
  }

  inputFormatHandleChange(e) {
    this.setState({ format: e.target.value });
  }

  inputHandleChange(e) {
    this.setState({ seconds: e.target.value });
  }

  inputTextHandleChange(e) {
    this.setState({ text: e.target.value });
  }

  inputRoundHandleChange(e) {
    this.setState({ round: e.target.value });
  }

  inputEventHandleChange(e) {
    this.setState({ event: e.target.value });
    if (e.target.value === 'NULO') {
      this.setState({ competitorONE: 'NULO', competitorTWO: 'NULO' });
    }
  }

  inputCompetitorONEHandleChange(e) {
    const competidor = this.props.SocketIO.competitors.competitors.filter(competitor => competitor.name === e.target.value);
    this.setState({
      competitorONE: e.target.value,
      competitorONEObject: competidor.length > 0 ? competidor[0] : { },
    });
  }

  inputCompetitorTWOHandleChange(e) {
    const competidor = this.props.SocketIO.competitors.competitors.filter(competitor => competitor.name === e.target.value);
    this.setState({
      competitorTWO: e.target.value,
      competitorTWOObject: competidor.length > 0 ? competidor[0] : { },
    });
  }

  inputEntryHandleChange(e) {
    this.setState({ entry: e.target.value });
  }

  replicaButton() {
    this.setState({ status: 'isMessage' });
    this.props.SocketIO.visualizer({
      status: 'isMessage', message: 'REPLICA', format: 'NULO', text: 'NULO', entry: this.state.entry,
    });
  }

  render() {
    const { SocketIO, classes } = this.props;
    return (
      <>
        <div className={classes.visualsIframeHolder}>
          <iframe src="/viewer" frameBorder="0" title="visualizer" className={classes.visualsIframe} />
        </div>
        <br />
        <Typography variant="h6">

          Controles
          {(() => {
            switch (this.state.status) {
              case 'isStart':
                return (
                  <Countdown
                    date={Date.now() + (this.state.seconds * 1000)}
                    onTick={() => this.onTick()}
                    onComplete={() => this.onComplete()}
                    renderer={props => <div className={classes.countdown}>{ props.total / 1000 }</div>}
                  />
                );
              default:
                return '';
            }
          })()}
        </Typography>
        <MuiThemeProvider theme={theme}>
          <Grid container spacing={16}>
            <Grid item xs={4}>
              <TextField
                type="number"
                label="Tiempo"
                value={this.state.seconds}
                onChange={e => this.inputHandleChange(e)}
                disabled={this.state.status !== '' && this.state.status !== 'isMessage'}
                InputProps={{ startAdornment: (<InputAdornment position="start"><Timer /></InputAdornment>), endAdornment: (<InputAdornment position="end">Segundos</InputAdornment>) }}
                fullWidth
              />
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Formato"
                variant="outlined"
                value={this.state.format}
                onChange={e => this.inputFormatHandleChange(e)}
                SelectProps={{ native: true }}
                select
                fullWidth
              >
                <option value="NULO">Ninguno</option>
                { SocketIO.formats.formats.map(option => (
                  <option key={option.name} value={option.value}>
                    { option.name }
                  </option>
                )) }
                <option>1 Entrada</option>
                <option>2 Entradas</option>
                <option>3 Entradas</option>
                <option>4 Entradas</option>
                <option>5 Entradas</option>
                <option>6 Entradas</option>
                <option>7 Entradas</option>
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <TextField
                label="Tema"
                variant="outlined"
                value={this.state.text}
                onChange={e => this.inputTextHandleChange(e)}
                SelectProps={{ native: true }}
                select
                fullWidth
              >
                <option value="NULO">Ninguno</option>
                { SocketIO.thematics.thematics.map(option => (
                  <option key={option.name} value={option.value}>
                    { option.name }
                  </option>
                )) }
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Entradas"
                variant="outlined"
                value={this.state.entry}
                SelectProps={{ native: true }}
                onChange={e => this.inputEntryHandleChange(e)}
                select
                fullWidth
              >
                <option value="NULO">Ninguno</option>
                <option>1 Entrada</option>
                <option>2 Entradas</option>
                <option>3 Entradas</option>
                <option>4 Entradas</option>
                <option>5 Entradas</option>
                <option>6 Entradas</option>
                <option>7 Entradas</option>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <TextField
                label="Round"
                variant="outlined"
                value={this.state.round}
                SelectProps={{ native: true }}
                onChange={e => this.inputRoundHandleChange(e)}
                disabled={this.state.status === 'isMessage'}
                select
                fullWidth
              >
                <option>1</option>
                <option>2</option>
                <option>3</option>
              </TextField>
            </Grid>
            <Grid item xs={3}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                style={{ marginTop: 7 }}
                onClick={() => this.roundButton()}
                disabled={this.state.status === 'isMessage'}
                fullWidth
              >
                Round
              </Button>
            </Grid>
            <Grid item xs={3}>
              <Button
                size="large"
                color="primary"
                variant="contained"
                style={{ marginTop: 7 }}
                onClick={() => this.replicaButton()}
                disabled={this.state.status === 'isMessage'}
                fullWidth
              >
                Replica
              </Button>
            </Grid>
            <Grid item xs={8}>
              <TextField
                label="Evento"
                variant="outlined"
                value={this.state.event}
                SelectProps={{ native: true }}
                onChange={e => this.inputEventHandleChange(e)}
                select
                fullWidth
              >
                <option value="NULO">Ninguno</option>
                { SocketIO.events.events.map(option => (
                  <option key={option.name} value={option.value}>
                    { option.name }
                  </option>
                )) }
              </TextField>
            </Grid>
            <Grid item xs={4}>
              <FormControlLabel
                style={{ marginTop: 5 }}
                label="Mostrar Competidores"
                control={<Checkbox value="checkedA" checked={this.state.checkedA} onChange={e => this.setState({ checkedA: e.target.checked })} />}
              />
            </Grid>
            { this.state.event !== 'NULO' ? (
              <Grid item xs={6}>
                <TextField
                  label="Competidor #1"
                  variant="outlined"
                  SelectProps={{ native: true }}
                  value={this.state.competitorONE}
                  disabled={this.state.event === 'NULO'}
                  onChange={e => this.inputCompetitorONEHandleChange(e)}
                  select
                  fullWidth
                >
                  <option value="NULO">Ninguno</option>
                  { SocketIO.events.events.filter(event => event.name === this.state.event)[0].selected.filter(name => name !== this.state.competitorTWO).map(option => (
                    <option key={option} value={option}>
                      { option }
                    </option>
                  )) }
                </TextField>
              </Grid>
            ) : (<div />) }
            { this.state.event !== 'NULO' ? (
              <Grid item xs={6}>
                <TextField
                  label="Competidor #2"
                  variant="outlined"
                  SelectProps={{ native: true }}
                  value={this.state.competitorTWO}
                  disabled={this.state.event === 'NULO'}
                  onChange={e => this.inputCompetitorTWOHandleChange(e)}
                  select
                  fullWidth
                >
                  <option value="NULO">Ninguno</option>
                  { SocketIO.events.events.filter(event => event.name === this.state.event)[0].selected.filter(name => name !== this.state.competitorONE).map(option => (
                    <option key={option} value={option}>
                      { option }
                    </option>
                  )) }
                </TextField>
              </Grid>
            ) : (<div />) }
            {(() => {
              switch (this.state.status) {
                case '':
                  return (
                    <Grid item xs={12}>
                      <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.setButton()} fullWidth>Mostrar</Button>
                    </Grid>
                  );
                case 'isSet':
                case 'isPaused':
                  return (
                    <>
                      <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={() => this.resetButton()} fullWidth>Cancelar</Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button variant="contained" color="secondary" onClick={() => this.startButton()} fullWidth>Iniciar</Button>
                      </Grid>
                    </>
                  );
                case 'isStart':
                  return (
                    <Grid item xs={12}>
                      <Button variant="contained" color="primary" onClick={() => this.pauseButton()} fullWidth>Puasar</Button>
                    </Grid>
                  );
                case 'isMessage':
                  return (
                    <>
                      <Grid item xs={6}>
                        <Button variant="contained" color="primary" onClick={() => this.resetButton()} fullWidth>Cancelar</Button>
                      </Grid>
                      <Grid item xs={6}>
                        <Button variant="contained" color="secondary" className={classes.button} onClick={() => this.setButton()} fullWidth>Mostrar</Button>
                      </Grid>
                    </>
                  );
                default:
                  return null;
              }
            })() }
          </Grid>
        </MuiThemeProvider>
        <br />
        <br />
        <Grow in timeout={500}>
          <a href="/viewer" target="_blank" rel="noopener noreferrer">
            <Fab color="primary" className={classes.fab}>
              <PlayArrowIcon />
            </Fab>
          </a>
        </Grow>
      </>
    );
  }
}

Visuals.propTypes = {
  SocketIO: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withSocketIO(withStyles(styles)(Visuals));
