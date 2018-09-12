import React, { Component } from 'react'
import FormControl from '@material-ui/core/FormControl'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import InputLabel from '@material-ui/core/InputLabel'
import Button from '@material-ui/core/Button'
import Input from '@material-ui/core/Input'
import Grid from '@material-ui/core/Grid'

import instagramLogo from './instagramLogo.svg'
import { withSocketIO } from '../../../context'
import githubLogo from './githubLogo.svg'

const styles = theme => ({
    settingsInstagramLogo: {
        height: 38,
        paddingTop: 6
    },
    settingsGithubLogo: {
        height: 36,
        paddingBottom: 2
    }
})

class Settings extends Component {
    render() {
        const { classes, SocketIO } = this.props
        return (
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Ajustes</Typography>
                <Grid container spacing={ 16 }>
                    <Grid item sm={ 12 }>
                        <FormControl fullWidth>
                            <InputLabel>Carpeta Temporal</InputLabel>
                            <Input placeholder="Carpeta Temporal" value={ SocketIO.settings.tempDir } disabled></Input>
                        </FormControl>
                    </Grid>
                    <Grid sm={ 12 } style={{ textAlign: 'right' }} item>
                        <Button variant="contained" color="primary" onClick={ () => SocketIO.settings.openTempDir() }>Mostrar</Button>
                    </Grid>
                </Grid>
                <br/><br/><br/>
                <Typography variant="body1" align="center">Creado por Albert Sanchez</Typography>
                <Typography variant="body1" align="center">
                    <a href="https://www.instagram.com/albertsaniza/" target="_blank" rel="noopener noreferrer">
                        <img className={ classes.settingsInstagramLogo } src={ instagramLogo } alt=""/>
                    </a>
                    <a href="https://github.com/BatallaDeMaestros" target="_blank" rel="noopener noreferrer">
                        <img className={ classes.settingsGithubLogo } src={ githubLogo } alt=""/>
                    </a>
                </Typography>
            </React.Fragment>
        )
    }
}

export default withSocketIO(withStyles(styles)(Settings))
