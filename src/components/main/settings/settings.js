import React, { Component } from 'react'
import { withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import instagramLogo from './instagramLogo.svg'
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
        const { classes } = this.props
        return (
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Ajustes</Typography>
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

export default withStyles(styles)(Settings)
