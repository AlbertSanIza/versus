import React from 'react';
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import PropTypes from 'prop-types';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900],
    },
    secondary: red,
  },
  typography: {
    useNextVariants: true,
  },
});

const styles = () => ({
  '@global': {
    body: {
      background: '#EEEEEE',
      '-webkit-touch-callout': 'none',
      '-webkit-user-select': 'none',
      '-khtml-user-select': 'none',
      '-moz-user-select': 'none',
      '-ms-user-select': 'none',
      'user-select': 'none',
      display: 'block',
      margin: 0,
      padding: 0,
    },
    img: {
      '-webkit-user-drag': 'none',
      '-khtml-user-drag': 'none',
      '-moz-user-drag': 'none',
      '-o-user-drag': 'none',
      userDrag: 'none',
    },
    '::-webkit-scrollbar': {
      width: 7,
    },
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1',
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888',
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555',
    },
  },
});

function Theme(props) {
  return (
    <MuiThemeProvider theme={theme}>
      { props.children }
    </MuiThemeProvider>
  );
}

Theme.propTypes = {
  children: PropTypes.shape().isRequired,
};

export default withStyles(styles)(Theme);
