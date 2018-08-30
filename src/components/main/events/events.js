import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'

class Event extends Component {
    render() {
        const { events, searchTerm, searchEvents } = this.props
        return(
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Eventos</Typography>
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

export default Event
