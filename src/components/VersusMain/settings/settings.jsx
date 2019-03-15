import React from 'react';
import FormControl from '@material-ui/core/FormControl';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import instagramLogo from './instagramLogo.svg';
import { withSocketIO } from '../../../context';
import githubLogo from './githubLogo.svg';

const styles = theme => ({
  settingsInstagramLogo: {
    height: 38,
    paddingTop: 6,
  },
  settingsGithubLogo: {
    height: 36,
    paddingBottom: 2,
  },
});

function Settings(props) {
  const { SocketIO, classes } = props;
  return (
    <React.Fragment>
      <Typography variant="display2" gutterBottom>Ajustes</Typography>
      <Grid container spacing={16}>
        <Grid item sm={12}>
          <FormControl fullWidth>
            <TextField label="Carpeta Temporal" margin="normal" variant="outlined" value={SocketIO.settings.tempDir} disabled />
          </FormControl>
        </Grid>
        <Grid sm={12} style={{ textAlign: 'right' }} item>
          <Button variant="contained" color="primary" onClick={() => SocketIO.settings.openTempDir()}>Mostrar</Button>
        </Grid>
      </Grid>
      <br />
      <br />
      <br />
      <Typography variant="body1" align="center">Creado por Albert Sanchez</Typography>
      <Typography variant="body1" align="center">
        <a href="https://www.instagram.com/albertsaniza/" target="_blank" rel="noopener noreferrer">
          <img className={classes.settingsInstagramLogo} src={instagramLogo} alt="" />
        </a>
        <a href="https://github.com/BatallaDeMaestros" target="_blank" rel="noopener noreferrer">
          <img className={classes.settingsGithubLogo} src={githubLogo} alt="" />
        </a>
      </Typography>
    </React.Fragment>
  );
}

Settings.propTypes = {
  SocketIO: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withSocketIO(withStyles(styles)(Settings));
