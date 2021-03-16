import React, { useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";
import "../styles/App.scss"
import { ThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Switch from '@material-ui/core/Switch';


const Navbar = () => {

    const [auth, setAuth] = React.useState(true);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);

    const handleChange = (event) => {
        setAuth(event.target.checked);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    const theme = createMuiTheme({
        typography: {
            fontFamily: [
                'Dry Brush',
            ].join(','),
        },});

    const classes = useStyles();
    return(
        <div className={classes.root}>
            <FormGroup>
                <FormControlLabel
                    control={<Switch checked={auth} onChange={handleChange} aria-label="login switch" />}
                    label={auth ? 'Logout' : 'Login'}
                />
            </FormGroup>
            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <img src="../images/logo_seul_festival.png" alt="logo" className={classes.logo} />
                    <ThemeProvider theme={theme}>
                    <Typography variant="h6" className={classes.title}>
                        Festival du jeu
                    </Typography>
                    </ThemeProvider>
                    <Button component={ Link } color="inherit" to="/">Accueil</Button>
                    {auth ? (
                        <Button ccomponent={ Link } color="inherit" to="/">Mon Compte</Button>
                    ) : (
                        <Button component={ Link } color="inherit" to="/login">Se connecter</Button>
                    )}

                </Toolbar>
            </AppBar>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({

    header: {
        backgroundColor: "#002663",
    },
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        marginLeft: 50
    },

    logo: {
        maxWidth: 45,
    },
}));

export default Navbar