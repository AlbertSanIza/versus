import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CreateIcon from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Grow from '@material-ui/core/Grow'

const styles = {
    fab: {
        margin: 0,
        top: 'auto',
        right: 20,
        bottom: 20,
        left: 'auto',
        position: 'fixed'
    }
}

class Event extends Component {
    render() {
        const { classes, events, searchTerm, searchEvents } = this.props
        return(
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Eventos</Typography>
                <Grow  in={ true } timeout={ 500 }>
                    <Button variant="fab" className={ classes.fab } color="secondary">
                        <CreateIcon/>
                    </Button>
                </Grow>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 12 }>
                        <FormControl fullWidth>
                            <Input placeholder="Busqueda" value={ searchTerm } onChange={ e => searchEvents(e.target.value) }></Input>
                        </FormControl>
                    </Grid>
                    { events.map((event, i) => (
                        <Grid item sm={ 4 } key={ i }>
                            <Typography variant="title" gutterBottom>{ event.name }</Typography>
                        </Grid>
                    )) }
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Event)
