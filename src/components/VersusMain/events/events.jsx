import React, { Component } from 'react';
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import CardActionArea from '@material-ui/core/CardActionArea';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import FormControl from '@material-ui/core/FormControl';
import DialogTitle from '@material-ui/core/DialogTitle';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import CreateIcon from '@material-ui/icons/Create';
import Snackbar from '@material-ui/core/Snackbar';
import red from '@material-ui/core/colors/red';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import Grid from '@material-ui/core/Grid';
import Grow from '@material-ui/core/Grow';
import Card from '@material-ui/core/Card';
import Fab from '@material-ui/core/Fab';
import PropTypes from 'prop-types';

import { withSocketIO } from '../../../context';
import VersusTable from '../../VersusTable';

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
});

class Event extends Component {
  constructor() {
    super();
    this.state = {
      openCreate: false,
      openEdit: false,
      showSnackbar: false,
      createName: '',
      createDescription: '',
      editName: '',
      editDescription: '',
      editSelected: [],
      columns: [
        {
          id: 'name', disablePadding: false, label: 'Nombre',
        }
      ],
    };
  }

  handleOpenCreate() {
    this.setState({ openCreate: true });
  }

  handleCloseCreate() {
    this.setState({ openCreate: false, createName: '', createDescription: '' });
  }

  handleEdit() {
    const { editName, editDescription, editSelected } = this.state;
    this.props.SocketIO.events.create({ name: editName, description: editDescription, selected: editSelected });
    this.handleCloseEdit();
  }

  handleEditSelect({ selected }) {
    this.setState({ editSelected: selected });
  }

  handleCreate() {
    const { createName, createDescription } = this.state;
    const canCreate = this.props.SocketIO.events.events.every(z => z.name.toLowerCase() !== createName.toLowerCase());
    if (canCreate) {
      this.props.SocketIO.events.create({ name: createName, description: createDescription, selected: [] });
      this.handleCloseCreate();
    } else {
      this.setState({ showSnackbar: true });
    }
  }

  handleCloseEdit() {
    this.setState({
      openEdit: false, editName: '', editDescription: '', editSelected: [],
    });
  }

  handleOpenEdit(editName, editDescription, editSelected) {
    this.setState({
      openEdit: true, editName: editName, editDescription: editDescription, editSelected: editSelected,
    });
  }

  editDescriptionChanged(input) {
    this.setState({ editDescription: input });
  }

  createDescriptionChanged(input) {
    this.setState({ createDescription: input });
  }

  createNameChanged(input) {
    this.setState({ createName: input });
  }

  render() {
    const { SocketIO, classes } = this.props;
    const {
      openCreate, openEdit, showSnackbar, createName, createDescription, editName, editDescription, editSelected, columns,
    } = this.state;
    return (
      <>
        <Typography variant="h3">Eventos</Typography>
        <Grid container spacing={16}>
          <Grid item xs={12}>
            <FormControl fullWidth>
              <TextField id="Busqueda" label="Busqueda" margin="normal" variant="outlined" value={SocketIO.events.searchTerm} onChange={e => SocketIO.events.search(e.target.value)} />
            </FormControl>
          </Grid>
          { SocketIO.events.events.filter(z => z.name.toLowerCase().includes(SocketIO.events.searchTerm.toLowerCase())).map((event, i) => (
            <Grid item xs={12} key={event.name}>
              <Card>
                <CardActionArea style={{ width: '100%' }} onClick={() => this.handleOpenEdit(event.name, event.description, event.selected)}>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h2">{ event.name }</Typography>
                    <Typography component="p">{ event.description }</Typography>
                  </CardContent>
                </CardActionArea>
              </Card>
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
            <DialogTitle>Nuevo Evento</DialogTitle>
            <DialogContent style={{ width: 300 }}>
              <FormControl fullWidth>
                <TextField id="Nombre" label="Nombre" margin="normal" variant="outlined" value={createName} onChange={e => this.createNameChanged(e.target.value)} />
                <TextField
                  rowsMax="4"
                  margin="normal"
                  id="Descripcion"
                  variant="outlined"
                  label="Descripcion"
                  value={createDescription}
                  onChange={e => this.createDescriptionChanged(e.target.value)}
                  multiline
                />
              </FormControl>
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => this.handleCloseCreate()}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={() => this.handleCreate()} disabled={!createName}>Guardar</Button>
            </DialogActions>
          </Dialog>
          <Dialog open={openEdit} onClose={() => this.handleCloseEdit()} scroll="paper">
            <DialogTitle>Editar Evento</DialogTitle>
            <DialogContent style={{ width: 400 }}>
              <FormControl fullWidth>
                <TextField label="Nombre" margin="normal" variant="outlined" value={editName} disabled />
                <TextField
                  rowsMax="4"
                  margin="normal"
                  id="Descripcion"
                  variant="outlined"
                  label="Descripcion"
                  value={editDescription}
                  onChange={e => this.editDescriptionChanged(e.target.value)}
                  multiline
                />
              </FormControl>
              <VersusTable id="name" columns={columns} data={SocketIO.competitors.competitors} selected={editSelected} onSelect={selected => this.handleEditSelect(selected)} multiSelect hover />
            </DialogContent>
            <DialogActions>
              <Button color="primary" onClick={() => this.handleCloseEdit()}>Cancelar</Button>
              <Button variant="contained" color="primary" onClick={() => this.handleEdit()} disabled={!editName}>Guardar</Button>
            </DialogActions>
          </Dialog>
        </MuiThemeProvider>
        <Snackbar
          open={showSnackbar}
          autoHideDuration={3000}
          message={`Evento: "${createName}" ya existe`}
          onClose={() => this.setState({ showSnackbar: false })}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        />
      </>
    );
  }
}

Event.propTypes = {
  SocketIO: PropTypes.shape().isRequired,
  classes: PropTypes.shape().isRequired,
};

export default withSocketIO(withStyles(styles)(Event));
