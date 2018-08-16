import React, { Component } from 'react'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import instagramLogo from './instagramLogo.svg'
import githubLogo from './githubLogo.svg'

class Settings extends Component {
    render() {
        return (
            <React.Fragment>
                <Typography variant="display2" gutterBottom>Ajustes</Typography>
                <Typography variant="body1" align="center">
                    <Button href="https://github.com/AlbertSanIza">
                        Creado por Albert Sanchez
                    </Button>
                    <a href="https://github.com/AlbertSanIza" target="_blank" rel="noopener noreferrer">Albert Sanchez</a>
                <br/>
            </Typography>
        </React.Fragment>
    )
}
}

export default Settings
