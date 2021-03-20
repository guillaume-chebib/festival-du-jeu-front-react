import React, { useEffect, useState} from 'react';
import { useSignIn,useAuthUser,useAuthHeader,useIsAuthenticated } from 'react-auth-kit'
import "../styles/App.scss"
import jwt from 'jwt-decode'
import {Redirect} from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';


const Connexion = () => {

    const signIn = useSignIn()
    const auth = useAuthUser()
    const authHeader = useAuthHeader()
    const isAuthenticated = useIsAuthenticated()

    const classes = useStyles();
    const [logged,setLogged] = useState()
    const [formData, setFormData] = React.useState({mail: '', password: ''})

    const onSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });
        const body = await response.json()
        if (response.status !== 200) {
            console.log("erreur serveur")
        }
        else {
            console.log(body)
            if(body.token !== undefined) {
                //console.log(body.token)
                var decode1 = await jwt(body.token)
                if (await signIn({
                    token: body.token,
                    expiresIn: 60,
                    tokenType: "Bearer"
                })) {

                    console.log("oui")
                    console.log(isAuthenticated())
                    console.log(auth.user)
                    console.log(authHeader())
                    setLogged()
                } else {
                    console.log("non")
                }
            }
            else{
                console.log(body.message)
            }
        }

    }

    return (
        <div>
            {logged}
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon />
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <TextField
                            onChange={(e)=>setFormData({...formData, mail: e.target.value})}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            id="email"
                            label="Adresse Mail"
                            name="email"
                            autoComplete="email"
                            autoFocus
                        />
                        <TextField
                            onChange={(e)=>setFormData({...formData, password: e.target.value})}
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Mot de passe"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                        />
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Se connecter
                        </Button>
                    </form>
                </div>
            </Container>
        </div>
    )
}

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(1),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },
}));



export default Connexion
