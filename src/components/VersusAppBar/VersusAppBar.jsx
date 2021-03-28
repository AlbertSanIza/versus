import React from 'react';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Toolbar from '@material-ui/core/Toolbar';
import AppBar from '@material-ui/core/AppBar';
import PropTypes from 'prop-types';

import { withVersus } from '../../context';

const style = {
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
};

function VersusAppBar(props) {
  const { Versus } = props;
  return (
    <>
      <AppBar>
        <Toolbar color="inherit" variant="dense">
          <IconButton color="inherit" style={style.menuButton} onClick={() => Versus.handleDrawer()}>
            { Versus.drawer ? (
              <MoreVertIcon />
            ) : (
              <MoreHorizIcon />
            ) }
          </IconButton>
          <Typography style={style.title} variant="h6" color="inherit">
            Versus
          </Typography>
        </Toolbar>
      </AppBar>
      <div style={style.topPadding} />
    </>
  );
}

VersusAppBar.propTypes = {
  Versus: PropTypes.shape().isRequired,
};

export default withVersus(VersusAppBar);
