import React, { Component } from 'react'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import CardActionArea from '@material-ui/core/CardActionArea'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import DialogTitle from '@material-ui/core/DialogTitle'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import TextField from '@material-ui/core/TextField'
import CreateIcon from '@material-ui/icons/Create'
import Snackbar from '@material-ui/core/Snackbar'
import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import Card from '@material-ui/core/Card'

import { withSocketIO } from '../../../context'
import VersusTable from '../VersusTable'

const theme = createMuiTheme({
    palette: {
        primary: red
    }
})
const styles = theme => ({
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    }
})

class Event extends Component {
    state = {
        openCreate: false,
        openEdit: false,
        showSnackbar: false,
        createName: '',
        createDescription: '',
        editName: '',
        editDescription: ''
    }
    handleOpenCreate = () => {
        this.setState({ openCreate: true })
    }
    handleCloseCreate = () => {
        this.setState({ openCreate: false, createName: '', createDescription: '' })
    }
    createNameChanged = input => {
        this.setState({ createName: input })
    }
    createDescriptionChanged = input => {
        this.setState({ createDescription: input })
    }
    editDescriptionChanged = input => {
        this.setState({ editDescription: input })
    }
    handleOpenEdit = (editName, editDescription) => {
      this.setState({ openEdit: true, editName, editDescription })
    }
    handleCloseEdit = () => {
      this.setState({ openEdit: false, editName: '', editDescription: '' })
    }
    handleCreate = () => {
        const { createName, createDescription } = this.state
        var canCreate = this.props.SocketIO.events.events.every(z => {
            return z.name.toLowerCase() !== createName.toLowerCase()
        })
        if(canCreate) {
            this.props.SocketIO.events.create({ name: createName, description: createDescription })
            this.handleCloseCreate()
        } else {
            this.setState({ showSnackbar: true })
        }
    }
    handleEdit = () => {
        const { editName, editDescription } = this.state
        this.props.SocketIO.events.create({ name: editName, description: editDescription })
        this.handleCloseEdit()
    }
    render() {
        const { classes, SocketIO } = this.props
        const { openCreate, openEdit, showSnackbar, createName, createDescription, editName, editDescription } = this.state
        return(
            <React.Fragment>
                <Typography variant="display2">Eventos</Typography>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 12 }>
                        <FormControl fullWidth>
                            <TextField label="Busqueda" margin="normal" variant="outlined" value={ SocketIO.events.searchTerm } onChange={ e => SocketIO.events.search(e.target.value) }/>
                        </FormControl>
                    </Grid>
                    { SocketIO.events.events.filter(z => {
                        return z.name.toLowerCase().includes(SocketIO.events.searchTerm.toLowerCase())
                    }).map((event, i) => (
                        <Grid item xs={ 12 } key={ i }>
                            <Card>
                                <CardActionArea style={{ width: '100%' }} onClick={ () => this.handleOpenEdit(event.name, event.description) }>
                                    <CardContent>
                                        <Typography gutterBottom variant="headline" component="h2">{ event.name }</Typography>
                                        <Typography component="p">{ event.description }</Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                    )) }
                </Grid>
                <MuiThemeProvider theme={ theme }>
                    <Grow in={ true } timeout={ 500 }>
                        <Button variant="fab" className={ classes.fab } onClick={ this.handleOpenCreate } color="primary">
                            <CreateIcon/>
                        </Button>
                    </Grow>
                    <Dialog open={ openCreate } onClose={ this.handleCloseCreate } scroll="paper">
                        <DialogTitle>Nuevo Evento</DialogTitle>
                        <DialogContent style={{ width: 300 }}>
                            <FormControl fullWidth>
                                <TextField label="Nombre" margin="normal" variant="outlined" value={ createName } onChange={ e => this.createNameChanged(e.target.value) }/>
                                <TextField label="Descripcion" margin="normal" variant="outlined" rowsMax="4" value={ createDescription } onChange={ e => this.createDescriptionChanged(e.target.value) } multiline/>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={ this.handleCloseCreate }>Cancelar</Button>
                            <Button variant="contained" color="primary" onClick={ this.handleCreate } disabled={ !createName }>Guardar</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={ openEdit } onClose={ this.handleCloseEdit } scroll="paper">
                        <DialogTitle>Editar Evento</DialogTitle>
                        <DialogContent style={{ width: 400 }}>
                            <FormControl fullWidth>
                                <TextField label="Nombre" margin="normal" variant="outlined" value={ editName } disabled/>
                                <TextField label="Descripcion" margin="normal" variant="outlined" rowsMax="4" value={ editDescription } onChange={ e => this.editDescriptionChanged(e.target.value) } multiline/>
                            </FormControl>
                            <VersusTable id="name" columns={ columns } data={ SocketIO.competitors.competitors } multiSelect hover/>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={ this.handleCloseEdit }>Cancelar</Button>
                            <Button variant="contained" color="primary" onClick={ this.handleEdit } disabled={ !editName }>Guardar</Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={ showSnackbar } onClose={ () => this.setState({ showSnackbar: false }) } autoHideDuration={ 3000 } message={ 'Evento: "' + createName + '" ya existe' }/>
            </React.Fragment>
        )
    }
}

export default withSocketIO(withStyles(styles)(Event))
