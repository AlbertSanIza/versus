import React, { Component } from 'react'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import CardMedia from '@material-ui/core/CardMedia'
import CreateIcon from '@material-ui/icons/Create'
import Snackbar from '@material-ui/core/Snackbar'
import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import Grow  from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'

import { withSocketIO } from '../../../context'
import ImageDropZone from './dragDrop'

const theme = createMuiTheme({
    palette: {
        primary: red
    }
})
const styles = theme => ({
    media: {
        height: 0,
        paddingTop: '80%'
    },
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    },
    paperContent: {
        padding: 3,
        textAlign: 'center'
    }
})

class Competitors extends Component {
    state = {
        openCreate: false,
        openEdit: false,
        showSnackbar: false,
        createName: '',
        createImage: { },
        editName: '',
        editPhoto: ''
    }
    handleOpenCreate = () => {
        this.setState({ openCreate: true })
    }
    handleCloseCreate = () => {
        this.setState({ openCreate: false, createName: '', createImage: { } })
    }
    createTermChanged = input => {
        this.setState({ createName: input })
    }
    handleOpenEdit = editName => {
      this.setState({ openEdit: true, editName })
    }
    handleCloseEdit = () => {
      this.setState({ openEdit: false })
    }
    handleCreate = () => {
        const { createName, createImage } = this.state
        var canCreate = this.props.SocketIO.competitors.competitors.every(z => {
            return z.name.toLowerCase() !== createName.toLowerCase()
        })
        if(canCreate) {
            this.props.SocketIO.competitors.create({ name: createName, photo: createName.toLowerCase().replace(/[\W_]+/g, '_') + '.' + createImage.file.type.split('/').pop(), file: createImage.file })
            this.handleCloseCreate()
        } else {
            this.setState({ showSnackbar: true })
        }
    }
    render() {
        const { classes, SocketIO } = this.props
        const { openCreate, openEdit, showSnackbar, createName, editName, createImage } = this.state
        return(
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Competidores</Typography>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 12 }>
                        <FormControl fullWidth>
                            <Input placeholder="Busqueda" value={ SocketIO.competitors.searchTerm } onChange={ e => SocketIO.competitors.search(e.target.value) }></Input>
                        </FormControl>
                    </Grid>
                    { SocketIO.competitors.competitors.filter(z => {
                        return z.name.toLowerCase().includes(SocketIO.competitors.searchTerm.toLowerCase())
                    }).map((competitor, i) => (
                        <Grid item xs={ 12 } sm={ 4 } md={ 3 } lg={ 2 } key={ i }>
                            <Paper elevation={ 1 }>
                                <CardMedia title={ competitor.name }
                                    className={ classes.media }
                                    image={ 'http://' + window.location.hostname + ':12345/img/' + competitor.photo }
                                    onClick={ () => this.handleOpenEdit(competitor.name) }/>
                                <div className={ classes.paperContent }>
                                    <Typography noWrap>{ competitor.name }</Typography>
                                </div>
                            </Paper>
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
                        <DialogTitle>Nuevo Competidor</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={ 16 }>
                                <Grid item xs={ 12 }>
                                    <FormControl fullWidth>
                                        <Input placeholder="Nombre" value={ createName } onChange={ e => this.createTermChanged(e.target.value) }></Input>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br/>
                            <ImageDropZone anySize showButton width={ 312 } height={ 250 } imagePicked={ image => this.setState({ createImage: image }) }/>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={ this.handleCloseCreate }>Cancelar</Button>
                            <Button variant="contained" color="primary" onClick={ this.handleCreate } disabled={ !createName || !createImage.file }>Guardar</Button>
                        </DialogActions>
                    </Dialog>
                    <Dialog open={ openEdit } onClose={ this.handleCloseCreate } scroll="paper">
                        <DialogTitle>Editar Competidor</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={ 16 }>
                                <Grid item xs={ 12 }>
                                    <FormControl fullWidth>
                                        <Input placeholder="Nombre" value={ editName } disabled></Input>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br/>
                            <ImageDropZone anySize showButton width={ 312 } height={ 250 } imagePicked={ image => this.setState({ createImage: image }) }/>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={ this.handleCloseEdit }>Cancelar</Button>
                            <Button variant="contained" color="primary" onClick={ this.handleCreate } disabled={ !createName || !createImage.file }>Guardar</Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={ showSnackbar } onClose={ () => this.setState({ showSnackbar: false }) } autoHideDuration={ 3000 } message={ 'Competidor: ' + createName + ' ya existe' }/>
                </React.Fragment>
            )
        }
    }

    export default withSocketIO(withStyles(styles)(Competitors))
