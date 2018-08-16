import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import instagramLogo from './instagramLogo.svg'
import githubLogo from './githubLogo.svg'
import './settings.css'

class Settings extends Component {
    render() {
        return (
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Ajustes</Typography>
                <Typography variant="body1" align="center">Creado por Albert Sanchez</Typography>
                <Typography variant="body1" align="center">
                    <a href="https://www.instagram.com/albertsaniza/" target="_blank" rel="noopener noreferrer">
                        <img className="settings-instagram-logo" src={ instagramLogo } alt=""/>
                    </a>
                    <a href="https://github.com/BatallaDeMaestros" target="_blank" rel="noopener noreferrer">
                        <img className="settings-github-logo" src={ githubLogo } alt=""/>
                    </a>
                </Typography>
            </React.Fragment>
        )
    }
}

export default Settings
