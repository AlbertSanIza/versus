import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';

import VersusDragNDrop from '../VersusDragNDrop';
import { withSocketIO } from '../../context';

const styles = theme => ({
  holder: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    height: '100%',
  },
  content: {
    position: 'relative',
    display: 'block',
    height: '90%',
    padding: 16,
  },
});

class Main extends Component {
  constructor() {
    super();
    this.state = {
      createName: '',
      createImage: { },
    };
  }

  handleCreate() {
    const { createName, createImage } = this.state;
    this.props.SocketIO.competitors.create({
      name: createName,
      photo: `${createName.toLowerCase().replace(/[\W_]+/g, '_') + Date.now()}.${createImage.file.type.split('/').pop()}`,
      file: createImage.file,
    });
    this.setState({ createName: '', createImage: {} });
  }

  createTermChanged(input) {
    this.setState({ createName: input });
  }

  render() {
    const { classes } = this.props;
    const { createName, createImage } = this.state;
    return (
      <div className={classes.holder}>
        <div className={classes.content}>
          <TextField
            id="Nombre"
            label="Nombre"
            margin="normal"
            variant="outlined"
            value={createName}
            onChange={e => this.createTermChanged(e.target.value)}
            fullWidth
          />
          <VersusDragNDrop
            width="100%"
            height="80%"
            imagePicked={image => this.setState({ createImage: image })}
            anySize
            showButton
          />
          <br />
          <Button
            color="primary"
            variant="contained"
            onClick={() => this.handleCreate()}
            disabled={!createName || !createImage.file}
            fullWidth
          >
            Guardar
          </Button>
        </div>
      </div>
    );
  }
}

Main.propTypes = {
  classes: PropTypes.shape().isRequired,
  SocketIO: PropTypes.shape().isRequired,
};

export default withSocketIO(withStyles(styles)(Main));
