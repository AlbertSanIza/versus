import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import Snackbar from '@material-ui/core/Snackbar';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
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
  paperContent: {
    padding: 3,
    textAlign: 'center',
  },
});

class Thematics extends Component {
  constructor() {
    super();
    this.state = {
      openCreate: false,
      showSnackbar: false,
      createName: '',
    };
  }

  handleOpenCreate() {
    this.setState({ openCreate: true });
  }

  handleCloseCreate() {
    this.setState({ openCreate: false, createName: '' });
  }

  handleCreate() {
    const { createName } = this.state;
    const canCreate = this.props.SocketIO.thematics.thematics.every(z => z.name.toLowerCase() !== createName.toLowerCase());
    if (canCreate) {
      this.props.SocketIO.thematics.create({ name: createName });
      this.handleCloseCreate();
    } else {
      this.setState({ showSnackbar: true });
    }
  }

  createTermChanged(input) {
    this.setState({ createName: input });
  }

  render() {
    const { SocketIO, classes } = this.props;
    const { openCreate, showSnackbar, createName } = this.state;
    return (
      <>
        <Typography variant="h3">Tematicas</Typography>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField id="Busqueda" label="Busqueda" margin="normal" variant="outlined" value={SocketIO.thematics.searchTerm} onChange={e => SocketIO.thematics.search(e.target.value)} />
            </FormControl>
          </Grid>
          { SocketIO.thematics.thematics.filter(z => z.name.toLowerCase().includes(SocketIO.thematics.searchTerm.toLowerCase())).map((thematic, i) => (
            <Grid item xs={12} sm={4} md={3} lg={2} key={thematic.name}>
              <Paper elevation={1}>
                <div className={classes.paperContent}>
                  <Typography noWrap>{ thematic.name }</Typography>
                </div>
              </Paper>
            </Grid>
          )) }
        </Grid>
        <MuiThemeProvider theme={theme}>
          <Grow in timeout={500}>
            <Fab color="primary" className={classes.fab} onClick={() => this.handleOpenCreate()}>
              <CreateIcon />
            </Fab>
          </Grow>
          <Dialog open={openCreate} onClose={() => this.handleCloseCreate()} scroll="paper">
            <DialogTitle>Nueva Tematica</DialogTitle>
            <DialogContent style={{ width: 300 }}>
              <FormControl fullWidth>
                <TextField id="Nombre" label="Nombre" margin="normal" variant="outlined" value={createName} onChange={e => this.createTermChanged(e.target.value)} />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => this.handleCloseCreate()}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={() => this.handleCreate()} disabled={!createName}>Guardar</Button>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          message={`Tematica: "${createName}" ya existe`}
          onClose={() => this.setState({ showSnackbar: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
      </>
    );
  }
}

Thematics.propTypes = {
  SocketIO: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withSocketIO(withStyles(styles)(Thematics));
