import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import { withStyles } from '@material-ui/core/styles'
import CardMedia from '@material-ui/core/CardMedia'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

const styles = {
    media: {
        height: '18vh'
    }
}

class Competitors extends Component {
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
                        <Grid item xs={ 12 } sm={ 6 } md={ 4 } lg={ 2 } key={ i }>
                            <Card>
                                <CardMedia className={ classes.media } image="photo.jpeg" title="Contemplative Reptile"/>
                                <CardContent>
                                    <Typography>{ competitor.name }</Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )) }
                </Grid>
            </React.Fragment>
        )
    }
}

export default withStyles(styles)(Competitors)
