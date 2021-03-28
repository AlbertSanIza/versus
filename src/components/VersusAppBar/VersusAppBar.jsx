import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { withStyles } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';

import { withVersus } from '../../context';

const styles = () => ({
  title: {
    flexGrow: 1,
    textAlign: 'center',
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20,
  },
  topPadding: {
    minHeight: 48,
  },
});

function VersusAppBar(props) {
  const { classes, Versus } = props;
  return (
    <>
      <AppBar>
        <Toolbar color="inherit" variant="dense">
          <IconButton className={classes.menuButton} color="inherit" onClick={() => Versus.handleDrawer()}>
            { (() => (Versus.drawer ? (<MoreVertIcon />) : (<MoreHorizIcon />)))() }
          </IconButton>
          <Typography className={classes.title} variant="h6" color="inherit">Versus</Typography>
        </Toolbar>
      </AppBar>
      <div className={classes.topPadding} />
    </>
  );
}

VersusAppBar.propTypes = {
  Versus: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withVersus(withStyles(styles)(VersusAppBar));
