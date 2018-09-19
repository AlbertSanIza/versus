import React, { Component } from 'react'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
import Snackbar from '@material-ui/core/Snackbar'
import red from '@material-ui/core/colors/red'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'

import { withSocketIO } from '../../../context'

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
    },
    paperContent: {
        padding: 3,
        textAlign: 'center'
    }
})

class Event extends Component {
    state = {
        openCreate: false,
        showSnackbar: false,
        createName: ''
    }
    handleOpenCreate = () => {
        this.setState({ openCreate: true })
    }
    handleCloseCreate = () => {
        this.setState({ openCreate: false, createName: '' })
    }
    createTermChanged = input => {
        this.setState({ createName: input })
    }
    handleCreate = () => {
        var canCreate = this.props.SocketIO.events.events.every(z => {
            return z.name.toLowerCase() !== this.state.createName.toLowerCase()
        })
        if(canCreate) {
            this.props.SocketIO.events.create({ name: this.state.createName })
            this.handleCloseCreate()
        } else {
            this.setState({ showSnackbar: true })
        }
    }
    render() {
        const { classes, SocketIO } = this.props
        return(
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Eventos</Typography>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 12 }>
                        <FormControl fullWidth>
                            <Input placeholder="Busqueda" value={ SocketIO.events.searchTerm } onChange={ e => SocketIO.events.search(e.target.value) }></Input>
                        </FormControl>
                    </Grid>
                    { SocketIO.events.events.filter(z => {
                        return z.name.toLowerCase().includes(SocketIO.events.searchTerm.toLowerCase())
                    }).map((event, i) => (
                        <Grid item xs={ 12 } sm={ 4 } md={ 3 } lg={ 2 } key={ i }>
                            <Paper elevation={ 1 }>
                                <div className={ classes.paperContent }>
                                    <Typography noWrap>{ event.name }</Typography>
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
                    <Dialog open={ this.state.openCreate } onClose={ this.handleCloseCreate } scroll="paper">
                        <DialogTitle>Nuevo Evento</DialogTitle>
                        <DialogContent>
                            <FormControl fullWidth>
                                <Input placeholder="Nombre" value={ this.state.createName } onChange={ e => this.createTermChanged(e.target.value) }></Input>
                            </FormControl>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={ this.handleCloseCreate } color="primary">Cancelar</Button>
                            <Button variant="contained" onClick={ this.handleCreate } color="primary">Guardar</Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={ this.state.showSnackbar } onClose={ () => this.setState({ showSnackbar: false }) } autoHideDuration={ 3000 } message={ 'Evento: "' + this.state.createName + '" ya existe' }/>
            </React.Fragment>
        )
    }
}

export default withSocketIO(withStyles(styles)(Event))
