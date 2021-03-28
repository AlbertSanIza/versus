import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import PropTypes from 'prop-types';

const styles = theme => ({
  title: {
    flex: '0 0 auto',
  },
  spacer: {
    flex: '1 1 100%',
  },
  icons: {
    whiteSpace: 'nowrap',
  },
  normal: {
    background: 'lightgray',
    color: 'black',
  },
  highlight: {
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
  },
});

class VersusTableToolbar extends Component {
  render() {
    const { selected, customToolbar, classes } = this.props;
    return (
      <Toolbar variant="dense" className={selected.length > 0 ? classes.highlight : classes.normal}>
        { customToolbar ? customToolbar({ selected: selected, classes: classes }) : (
          <div className={classes.title}>
            <Typography color="inherit">
              { selected.length }
              {' '}
Competidores Seleccionados
            </Typography>
          </div>
        )}
      </Toolbar>
    );
  }
}

VersusTableToolbar.propTypes = {
  selected: PropTypes.array.isRequired,
  customToolbar: PropTypes.func,
};

export default withStyles(styles)(VersusTableToolbar);
