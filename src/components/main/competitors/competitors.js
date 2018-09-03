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
        showSnackbar: false,
        createName: '',
        createImage: {  }
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
        var canCreate = true
        for(var i = 0; i < this.props.competitors.length; i++) {
            if(this.props.competitors[i].name.toLowerCase() === this.state.createName.toLowerCase()) {
                canCreate = false
            }
        }
        if(canCreate) {
            // this.props.createCompetitor({ name: this.state.createName, photo: '' })
            this.handleCloseCreate()
        } else {
            this.setState({ showSnackbar: true })
        }
    }
    render() {
        const { classes, competitors, searchTerm, searchCompetitors } = this.props
        return(
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Competidores</Typography>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 12 }>
                        <FormControl fullWidth>
                            <Input placeholder="Busqueda" value={ searchTerm } onChange={ e => searchCompetitors(e.target.value) }></Input>
                        </FormControl>
                    </Grid>
                    { competitors.map((competitor, i) => (
                        <Grid item xs={ 12 } sm={ 4 } md={ 3 } lg={ 2 } key={ i }>
                            <Paper elevation={ 1 }>
                                <CardMedia className={ classes.media } image={ competitor.photo } title="Contemplative Reptile"/>
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
                    <Dialog open={ this.state.openCreate } onClose={ this.handleCloseCreate } scroll="paper">
                        <DialogTitle>Nuevo Competidor</DialogTitle>
                        <DialogContent>
                            <Grid container spacing={ 16 }>
                                <Grid item sm={ 12 }>
                                    <FormControl fullWidth>
                                        <Input placeholder="Nombre" value={ this.state.createName } onChange={ e => this.createTermChanged(e.target.value) }></Input>
                                    </FormControl>
                                </Grid>
                            </Grid>
                            <br/>
                            <ImageDropZone anySize showButton width={ 312 } height={ 250 } imagePicked={ image => this.setImage({ createImage: image }) }/>
                        </DialogContent>
                        <DialogActions>
                            <Button color="primary" onClick={ this.handleCloseCreate }>Cancelar</Button>
                            <Button variant="contained" color="primary" onClick={ this.handleCreate } disabled={ this.state.createName === '' }>Guardar</Button>
                        </DialogActions>
                    </Dialog>
                </MuiThemeProvider>
                <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }} open={ this.state.showSnackbar } onClose={ () => this.setState({ showSnackbar: false }) } autoHideDuration={ 3000 } message={ 'Competidor: ' + this.state.createName + ' ya existe' }/>
                </React.Fragment>
            )
        }
    }

    export default withStyles(styles)(Competitors)
