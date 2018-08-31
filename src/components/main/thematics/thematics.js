import React, { Component } from 'react'
import DialogContent from '@material-ui/core/DialogContent'
import DialogActions from '@material-ui/core/DialogActions'
import FormControl from '@material-ui/core/FormControl'
import CardContent from '@material-ui/core/CardContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CreateIcon from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'
import Card from '@material-ui/core/Card'

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
        // this.props.createEvent({ name: this.state.createName })
        this.handleCloseCreate()
    }
    render() {
        const { classes, thematics, searchTerm, searchThematics } = this.props
        return (
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Tematicas</Typography>
                <Grow in={ true } timeout={ 500 }>
                    <Button variant="fab" className={ classes.fab } onClick={ this.handleOpenCreate } color="secondary">
                        <CreateIcon/>
                    </Button>
                </Grow>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 12 }>
                        <FormControl fullWidth>
                            <Input placeholder="Busqueda" value={ searchTerm } onChange={ e => searchThematics(e.target.value) }></Input>
                        </FormControl>
                    </Grid>
                    { thematics.map((thematic, i) => (
                        <Grid item xs={ 12 } sm={ 4 } md={ 3 } lg={ 2 } key={ i }>
                            <Card>
                                <CardContent>
                                    <Typography variant="title" gutterBottom>{ thematic.name }</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) }
                </Grid>
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
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Thematics)
