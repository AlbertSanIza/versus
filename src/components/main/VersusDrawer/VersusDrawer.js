import React, { Component } from 'react'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import SettingsIcon from '@material-ui/icons/Settings'
import { withStyles } from '@material-ui/core/styles'
import SchoolIcon from '@material-ui/icons/School'
import PeopleIcon from '@material-ui/icons/People'
import ListItem from '@material-ui/core/ListItem'
import EventIcon from '@material-ui/icons/Event'
import ImageIcon from '@material-ui/icons/Image'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import { NavLink } from "react-router-dom"

import { withVersus } from '../../../context'

const styles = theme => ({
    root: {
        display: 'flex',
        height: 'calc(100vh - 48px)',
        overflow: 'hidden'
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap'
    },
    drawerPaperClose: {
        position: 'relative',
        overflowX: 'hidden',
        width: theme.spacing.unit * 7,
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing.unit * 9
        }
    },
    content: {
        position: 'relative',
        width: '100%'
    },
    scrollContent: {
        position: 'relative',
        height: '100%',
        padding: 16,
        overflowY: 'scroll'
    },
    icon: {
        margin: 5,
        height: 32,
        width: 32,
        verticalAlign: 'middle'
    }
})
const style = {
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
        const { classes, Versus } = this.props
        return(
            <React.Fragment>
                <div className={ classes.root }>
                    <Drawer variant="permanent" classes={{ paper: Versus.drawer ? classes.drawerPaperClose : classes.drawerPaper }}>
                        <NavLink to="/main/visuals" style={ style.style } activeStyle={ style.activeStyle }>
                            <ListItem button>
                                <ListItemIcon>
                                    <ImageIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Visuales"/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/main/events" style={ style.style } activeStyle={ style.activeStyle }>
                            <ListItem button>
                                <ListItemIcon>
                                    <EventIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Eventos"/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/main/thematics" style={ style.style } activeStyle={ style.activeStyle }>
                            <ListItem button>
                                <ListItemIcon>
                                    <SchoolIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Tematicas"/>
                            </ListItem>
                        </NavLink>
                        <NavLink to="/main/competitors" style={ style.style } activeStyle={ style.activeStyle }>
                            <ListItem button>
                                <ListItemIcon>
                                    <PeopleIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Competidores"/>
                            </ListItem>
                        </NavLink>
                        <Divider/>
                        <NavLink to="/main/settings" style={ style.style } activeStyle={ style.activeStyle }>
                            <ListItem button>
                                <ListItemIcon>
                                    <SettingsIcon/>
                                </ListItemIcon>
                                <ListItemText primary="Ajustes"/>
                            </ListItem>
                        </NavLink>
                    </Drawer>
                    <div className={ classes.content }>
                        <div className={ classes.scrollContent }>
                            { this.props.children }
                        </div>
                    </div>
                </div>
            </React.Fragment>
        )
    }
}

export default withVersus(withStyles(styles)(VersusDrawer))
