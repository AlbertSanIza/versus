import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import Typography from '@material-ui/core/Typography';
import CardMedia from '@material-ui/core/CardMedia';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import Snackbar from '@material-ui/core/Snackbar';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';

import VersusDragNDrop from '../../VersusDragNDrop';
import { withSocketIO } from '../../../context';

const theme = createMuiTheme({
  palette: {
    primary: red,
  },
});

const styles = () => ({
  media: {
    height: 0,
    paddingTop: '80%',
  },
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

class Competitors extends Component {
  constructor() {
    super();
    this.state = {
      openCreate: false,
      openEdit: false,
      showSnackbar: false,
      createName: '',
      createImage: { },
      editName: '',
      editPhoto: '',
      editImage: { },
    };
  }

  handleOpenCreate() {
    this.setState({ openCreate: true });
  }

  handleCloseCreate() {
    this.setState({ openCreate: false, createName: '', createImage: { } });
  }

  createTermChanged(input) {
    this.setState({ createName: input });
  }

  handleOpenEdit(editName, editPhoto) {
    this.setState({ openEdit: true, editName: editName, editPhoto: editPhoto });
  }

  handleCloseEdit() {
    this.setState({ openEdit: false, editName: '', editImage: { } });
  }

  handleCreate() {
    const { createName, createImage } = this.state;
    if (this.props.SocketIO.competitors.competitors.every(z => z.name.toLowerCase() !== createName.toLowerCase())) {
      this.props.SocketIO.competitors.create({ name: createName, photo: `${createName.toLowerCase().replace(/[\W_]+/g, '_') + Date.now()}.${createImage.file.type.split('/').pop()}`, file: createImage.file });
      this.handleCloseCreate();
    } else {
      this.setState({ showSnackbar: true });
    }
  }

  handleEdit() {
    const { editName, editImage } = this.state;
    this.props.SocketIO.competitors.edit({ name: editName, photo: `${editName.toLowerCase().replace(/[\W_]+/g, '_') + Date.now()}.${editImage.file.type.split('/').pop()}`, file: editImage.file });
    this.handleCloseEdit();
  }

  render() {
    const { SocketIO, classes } = this.props;
    const {
      openCreate, openEdit, showSnackbar, createName, createImage, editName, editPhoto, editImage,
    } = this.state;
    return (
      <React.Fragment>
        <Typography variant="display2">Competidores</Typography>
        <Grid container spacing={16}>
          <Grid item sm={12}>
            <FormControl fullWidth>
              <TextField id="Busqueda" label="Busqueda" margin="normal" variant="outlined" value={SocketIO.competitors.searchTerm} onChange={e => SocketIO.competitors.search(e.target.value)} />
            </FormControl>
          </Grid>
          { SocketIO.competitors.competitors.filter(z => z.name.toLowerCase().includes(SocketIO.competitors.searchTerm.toLowerCase())).map((competitor, i) => (
            <Grid item xs={12} sm={4} md={3} lg={2} key={competitor.name}>
              <Paper elevation={1}>
                <CardMedia
                  title={competitor.name}
                  className={classes.media}
                  image={`http://${window.location.hostname}:12345/img/${competitor.photo}`}
                  onClick={() => this.handleOpenEdit(competitor.name, competitor.photo)}
                />
                <div className={classes.paperContent}>
                  <Typography noWrap>{ competitor.name }</Typography>
                </div>
              </Paper>
            </Grid>
          )) }
        </Grid>
        <br />
        <br />
        <MuiThemeProvider theme={theme}>
          <Grow in timeout={500}>
            <Button variant="fab" className={classes.fab} onClick={this.handleOpenCreate} color="primary">
              <CreateIcon />
            </Button>
          </Grow>
          <Dialog open={openCreate} onClose={this.handleCloseCreate} scroll="paper">
            <DialogTitle>Nuevo Competidor</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <TextField id="Nombre" label="Nombre" margin="normal" variant="outlined" value={createName} onChange={e => this.createTermChanged(e.target.value)} />
              </FormControl>
              <VersusDragNDrop anySize showButton width="312px" height="250px" imagePicked={image => this.setState({ createImage: image })} />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handleCloseCreate}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={this.handleCreate} disabled={!createName || !createImage.file}>Guardar</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openEdit} onClose={this.handleCloseEdit} scroll="paper">
            <DialogTitle>Editar Competidor</DialogTitle>
            <DialogContent>
              <FormControl fullWidth>
                <TextField label="Nombre" margin="normal" variant="outlined" value={editName} disabled />
              </FormControl>
              <VersusDragNDrop anySize showButton width="312px" height="250px" imagePicked={image => this.setState({ editImage: image })} imageDefault={`http://${window.location.hostname}:12345/img/${editPhoto}`} />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={this.handleCloseEdit}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={this.handleEdit} disabled={!editName || !editImage.file}>Guardar</Button>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
        <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={showSnackbar} onClose={() => this.setState({ showSnackbar: false })} autoHideDuration={3000} message={`Competidor: ${createName} ya existe`} />
      </React.Fragment>
    );
  }
}

Competitors.propTypes = {
  SocketIO: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withSocketIO(withStyles(styles)(Competitors));
