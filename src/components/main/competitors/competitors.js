import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'
import Card from '@material-ui/core/Card'

class Competitors extends Component {
    render() {
        return(
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Competidores</Typography>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 12 }>
                        <FormControl fullWidth>
                            <Input placeholder="Busqueda"></Input>
                        </FormControl>
                    </Grid>
                    <Grid item sm={ 3 }>
                        <Card>
                            <CardContent>
                                <Typography variant="title" gutterBottom>Aczino</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={ 3 }>
                        <Card>
                            <CardContent>
                                <Typography variant="title" gutterBottom>Rapder</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={ 3 }>
                        <Card>
                            <CardContent>
                                <Typography variant="title" gutterBottom>Lobo Estepario</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={ 3 }>
                        <Card>
                            <CardContent>
                                <Typography variant="title" gutterBottom>Yoiker</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item sm={ 3 }>
                        <Card>
                            <CardContent>
                                <Typography variant="title" gutterBottom>Jack Adrenalina</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </React.Fragment>
        )
    }
}

export default Competitors
