import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import CreateIcon from '@material-ui/icons/Create'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Paper from '@material-ui/core/Paper'
import Grow  from '@material-ui/core/Grow'
import Grid from '@material-ui/core/Grid'

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
    render() {
        const { classes, competitors, searchTerm, searchCompetitors } = this.props
        return(
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Competidores</Typography>
                <Grow in={ true } timeout={ 500 }>
                    <Button variant="fab" className={ classes.fab } color="secondary">
                        <CreateIcon/>
                    </Button>
                </Grow>
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
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Competitors)
