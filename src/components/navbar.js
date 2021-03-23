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
import {useIsAuthenticated} from 'react-auth-kit';
import { useSignOut } from 'react-auth-kit'

const Navbar = () => {

    const isAuthenticated = useIsAuthenticated()
    const signOut = useSignOut()

    const theme = createMuiTheme({
        typography: {
            fontFamily: [
                'Dry Brush',
            ].join(','),
        },});

    const classes = useStyles();
    return(
        <div className={classes.root}>

            <AppBar position="static" className={classes.header}>
                <Toolbar>
                    <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
                        <MenuIcon />

                    </IconButton>
                    <img src="../images/logo_seul_festival.png" alt="logo" className={classes.logo} />
                    <ThemeProvider theme={theme}>
                    <Typography variant="h6" className={classes.title}>
                        Festival du jeu
                    </Typography>
                    </ThemeProvider>
                    {isAuthenticated() ? (
                        <Button component={ Link } color="inherit" to="/dashboard" >Tableau de bord</Button>
                    ) : (
                        <Button component={ Link } color="inherit" to="/">Accueil</Button>
                    )}
                    {isAuthenticated() ? (
                        <Button component={ Link } color="inherit" to="/" onClick={signOut}>Deconnexion</Button>
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
