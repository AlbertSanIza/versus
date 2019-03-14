import React, { Component } from 'react'
import MuiThemeProvider from '@material-ui/core/styles/MuiThemeProvider'
import { createMuiTheme } from '@material-ui/core/styles'
import { withStyles } from '@material-ui/core/styles'
import grey from '@material-ui/core/colors/grey'
import red from '@material-ui/core/colors/red'

const theme = createMuiTheme({
  palette: {
    primary: {
      main: grey[900]
    },
    secondary: red
  }
})

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
      margin: 0
    },
    img: {
      '-webkit-user-drag': 'none',
      '-khtml-user-drag': 'none',
      '-moz-user-drag': 'none',
      '-o-user-drag': 'none',
      userDrag: 'none'
    },
    '::-webkit-scrollbar': {
      width: 7
    },
    '::-webkit-scrollbar-track': {
      background: '#f1f1f1'
    },
    '::-webkit-scrollbar-thumb': {
      background: '#888'
    },
    '::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    }
  }
})

class Theme extends Component {
  render() {
    return (
      <MuiThemeProvider theme={ theme }>
        { this.props.children }
      </MuiThemeProvider>
    )
  }
}

export default withStyles(styles)(Theme)
