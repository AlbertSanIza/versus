import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import instagramLogo from './instagramLogo.svg'
import githubLogo from './githubLogo.svg'

class Settings extends Component {
    render() {
        return(
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Ajustes</Typography>
                <div>
                    <hr/>
                    Creado por <a href="https://github.com/AlbertSanIza" target="_blank" rel="noopener noreferrer">Albert Sanchez</a>
                <br/>
                <a href="https://www.instagram.com/albertsaniza/" target="_blank" rel="noopener noreferrer">
                    <img className="logo" src={instagramLogo} alt=""/>
                </a>
                <a href="https://github.com/BatallaDeMaestros" target="_blank" rel="noopener noreferrer">
                    <img className="logo" src={githubLogo} alt=""/>
                </a>
            </div>
        </React.Fragment>
    )
}
}

export default Settings
