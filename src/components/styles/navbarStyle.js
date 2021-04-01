import React, {useEffect, useState} from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import BusinessIcon from '@material-ui/icons/Business';
import EventIcon from '@material-ui/icons/Event';
import {makeStyles} from "@material-ui/core/styles";
import {Link} from "react-router-dom";
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import AdjustIcon from '@material-ui/icons/Adjust';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import StarBorder from '@material-ui/icons/StarBorder';
import Collapse from '@material-ui/core/Collapse';
import List from '@material-ui/core/List';
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import GroupIcon from '@material-ui/icons/Group';


export const MainListItems = () => {

    const classes = useStyles1();
    const [open, setOpen] = useState(false);
    const authHeader = useAuthHeader()
    const [festival,setFestival] = useState("")

    const handleClick = async () => {
        setOpen(!open);
        await fetchData()
    };

    async function fetchData() {
        const response = await requestToBack('GET',null,`/festival/courant`,authHeader())
        const body = await response[0]
        const festival= body.message
        setFestival(festival)

    }

    useEffect(() => {
        console.log(festival)
    },[festival])


    return(
    <List>

        <ListItem button component={Link} to="/festival">
            <ListItemIcon>
                <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Les festivals"/>
        </ListItem>
        <ListItem button component={Link} to="/organisateur">
            <ListItemIcon>
                <PeopleIcon/>
            </ListItemIcon>
            <ListItemText primary="Organisateurs"/>
        </ListItem>
        <ListItem button component={Link} to="/jeu">
            <ListItemIcon>
                <VideogameAssetIcon/>
            </ListItemIcon>
            <ListItemText primary="Jeux"/>
        </ListItem>
        <ListItem button component={Link} to="/reservation">
            <ListItemIcon>
                <ShoppingCartIcon/>
            </ListItemIcon>
            <ListItemText primary="Reservations"/>
        </ListItem>
        <ListItem button component={Link} to="/societe">
            <ListItemIcon>
                <BusinessIcon/>
            </ListItemIcon>
            <ListItemText primary="Societes"/>
        </ListItem>

        <ListItem button onClick={handleClick}>
            <ListItemIcon>
                <ImportContactsIcon/>
            </ListItemIcon>
            <ListItemText primary="Suivis"/>
            {open ? <ExpandLess /> : <ExpandMore />}
        </ListItem>
        <Collapse in={open} timeout="auto" unmountOnExit>
            <List component="div" disablePadding>
                <ListItem button className={classes.nested} component={Link} to={`/festival/${festival[0].id_festival}/exposants`}>
                    <ListItemIcon>
                        <GroupIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Suivi exposants"/>
                </ListItem>
                <ListItem button className={classes.nested} component={Link} to={`/festival/${festival[0].id_festival}/reservations`}>
                    <ListItemIcon>
                        <EventIcon/>
                    </ListItemIcon>
                    <ListItemText primary="Suivi reservations"/>
                </ListItem>
            </List>
        </Collapse>


    </List>)
}

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
        marginRight : 10
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
    nested: {
        paddingLeft: theme.spacing(4),
    },
}));
