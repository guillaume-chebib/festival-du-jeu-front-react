import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import BusinessIcon from '@material-ui/icons/Business';
import AssignmentIcon from '@material-ui/icons/Assignment';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import AdjustIcon from '@material-ui/icons/Adjust';

export const mainListItems = (
    <div>

        <ListItem button component={ Link } to="/festival">
            <ListItemIcon>
                <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Les festivals" />
        </ListItem>
        <ListItem button component={ Link } to="/organisateur">
            <ListItemIcon>
                <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Organisateurs" />
        </ListItem>
        <ListItem button component={ Link } to="/jeu">
            <ListItemIcon>
                <VideogameAssetIcon />
            </ListItemIcon>
            <ListItemText primary="Jeux" />
        </ListItem>
        <ListItem button component={ Link } to="/reservation">
            <ListItemIcon>
                <ShoppingCartIcon />
            </ListItemIcon>
            <ListItemText primary="Reservations" />
        </ListItem>
        <ListItem button component={ Link } to="/societe">
            <ListItemIcon>
                <BusinessIcon/>
            </ListItemIcon>
            <ListItemText primary="Societes" />
        </ListItem>


    </div>
);

export const publicListItems = (
    <div>
        <ListItem button component={ Link } to="/public/jeu">
            <ListItemIcon>
                <VideogameAssetIcon />
            </ListItemIcon>
            <ListItemText primary="Jeux du festival" />
        </ListItem>
        <ListItem button component={ Link } to="/public/zone">
            <ListItemIcon>
                <AdjustIcon />
            </ListItemIcon>
            <ListItemText primary="Zones du festival" />
        </ListItem>
        <ListItem button component={ Link } to="/public/editeur">
            <ListItemIcon>
                <BusinessIcon/>
            </ListItemIcon>
            <ListItemText primary="Les éditeurs" />
        </ListItem>
    </div>
);

const drawerWidth = 240;

export const useStyles1 = makeStyles((theme) => ({
    root: {
        display: 'flex',
    },
    logo: {
        maxWidth: 45,
        marginRight : 30
    },
    toolbar: {
        paddingRight: 24, // keep right padding when drawer closed
    },
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    appBar: {
        zIndex: theme.zIndex.drawer + 1,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
    },
    appBarShift: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    menuButton: {
        marginRight: 36,
    },
    menuButtonHidden: {
        display: 'none',
    },
    title: {
        flexGrow: 1,
    },
    drawerPaper: {
        position: 'relative',
        whiteSpace: 'nowrap',
        width: drawerWidth,
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    },
    drawerPaperClose: {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
            width: theme.spacing(9),
        },
    },
    appBarSpacer: theme.mixins.toolbar,
    content: {
        flexGrow: 1,
        height: '100vh',
        overflow: 'auto',
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4),
    },
    paper: {
        padding: theme.spacing(2),
        display: 'flex',
        overflow: 'auto',
        flexDirection: 'column',
    },
    fixedHeight: {
        height: 240,
    },
}));
