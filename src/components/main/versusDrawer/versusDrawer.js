import React, { Component } from 'react'
import { NavLink } from "react-router-dom"
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'
import EventIcon from '@material-ui/icons/Event'
import SchoolIcon from '@material-ui/icons/School'
import PeopleIcon from '@material-ui/icons/People'
import ImageIcon from '@material-ui/icons/Image'
import ListItem from '@material-ui/core/ListItem'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'

const styles = {
    style: {
        textDecoration: 'none'
    },
    activeStyle: {
        background: '#CFD8DC',
        pointerEvents: 'none'
    }
}

class VersusDrawer extends Component {
    render() {
        return(
            <Drawer variant="permanent" classes={{ paper: this.props.classes.drawerPaper }}>
                <div className={ this.props.classes.toolbar }/>
                <NavLink to="/main/visuals" style={ styles.style } activeStyle={ styles.activeStyle }>
                    <ListItem button>
                        <ListItemIcon>
                            <ImageIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Visuales"/>
                    </ListItem>
                </NavLink>
                <NavLink to="/main/events" style={ styles.style } activeStyle={ styles.activeStyle }>
                    <ListItem button>
                        <ListItemIcon>
                            <EventIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Eventos"/>
                    </ListItem>
                </NavLink>
                <NavLink to="/main/thematics" style={ styles.style } activeStyle={ styles.activeStyle }>
                    <ListItem button>
                        <ListItemIcon>
                            <SchoolIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Tematicas"/>
                    </ListItem>
                </NavLink>
                <NavLink to="/main/competitors" style={ styles.style } activeStyle={ styles.activeStyle }>
                    <ListItem button>
                        <ListItemIcon>
                            <PeopleIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Competidores"/>
                    </ListItem>
                </NavLink>
                <Divider/>
                <NavLink to="/main/settings" style={ styles.style } activeStyle={ styles.activeStyle }>
                    <ListItem button>
                        <ListItemIcon>
                            <SettingsIcon/>
                        </ListItemIcon>
                        <ListItemText primary="Ajustes"/>
                    </ListItem>
                </NavLink>
            </Drawer>
        )
    }
}

export default VersusDrawer
