import React, { Component } from 'react'
import { withStyles, createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import CreateIcon from '@material-ui/icons/Create'
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

class Thematics extends Component {
    state = {
        openCreate: false,
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
        this.props.SocketIO.thematics.createThematic({ name: this.state.createName })
        this.handleCloseCreate()
    }
    render() {
        const { classes, SocketIO } = this.props
        return (
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Tematicas</Typography>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 12 }>
                        <FormControl fullWidth>
                            <Input placeholder="Busqueda" value={ SocketIO.thematics.earchTerm } onChange={ e => SocketIO.thematics.searchThematics(e.target.value) }></Input>
                        </FormControl>
                    </Grid>
                    { SocketIO.thematics.thematics.map((thematic, i) => (
                        <Grid item xs={ 12 } sm={ 4 } md={ 3 } lg={ 2 } key={ i }>
                            <Paper elevation={ 1 }>
                                <div className={ classes.paperContent }>
                                    <Typography noWrap>{ thematic.name }</Typography>
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
                        <DialogTitle>Nueva Tematica</DialogTitle>
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
            </React.Fragment>
        )
    }
}

export default withSocketIO(withStyles(styles)(Thematics))
