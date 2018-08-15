import React, { Component } from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'
import PeopleIcon from '@material-ui/icons/People'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'

class VersusDrawer extends Component {
    render() {
        return(
            <Drawer variant="permanent" classes={{ paper: this.props.classes.drawerPaper }}>
                <div className={ this.props.classes.toolbar }/>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Eventos"/>
                </ListItem>
                <ListItem button>
                    <ListItemIcon>
                        <PeopleIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Competidores"/>
                </ListItem>
                <Divider/>
                <ListItem button>
                    <ListItemIcon>
                        <SettingsIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Ajustes"/>
                </ListItem>
            </Drawer>
        )
    }
}

export default VersusDrawer
