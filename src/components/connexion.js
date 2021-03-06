import React, {useState} from 'react';
import {useSignIn} from 'react-auth-kit'
import "../styles/App.scss"
import jwt from 'jwt-decode'
import {Redirect} from "react-router-dom";
import {makeStyles} from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from '@material-ui/lab/Alert';
import {requestToBack} from "../utils/utils_functions";


const Connexion = () => {

    const signIn = useSignIn()

    const classes = useStyles();
    const [logged, setLogged] = useState()
    const [formData, setFormData] = useState({mail: '', password: ''})

    const onSubmit = async (e) => {
        e.preventDefault();

        const response = await requestToBack('POST', formData, `/login`, null)

        const body = await response[0]
        if (response[1] !== 200) {
            setLogged(<Alert severity="error">Combinaison identifant/mot de passe non reconnue, veuillez
                reesayer</Alert>)
        } else {

            if (body.token !== undefined) {
                var decode1 = await jwt(body.token)
                if (signIn({
                    token: body.token,
                    tokenType: 'Bearer',    // Token type set as Bearer
                    authState: {uid: decode1.id.toString(), superuser: decode1.superuser.toString()},
                    expiresIn: 60  // Token Expriration time, in minutes
                })) {
                    setLogged(<Redirect to="/dashboard"/>)

                } else {
                    // Else, there must be some error. So, throw an error
                    setLogged(<Alert severity="error">Une erreur est survenue, veuillez reesayer</Alert>)
                }
            } else {
                setLogged(<Alert severity="error">Combinaison identifant/mot de passe non reconnue, veuillez
                    reesayer</Alert>)
            }
        }

    }

    return (
        <div>

            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Avatar className={classes.avatar}>
                        <LockOutlinedIcon/>
                    </Avatar>
                    <Typography component="h1" variant="h5">
                        Connexion
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={onSubmit}>
                        <TextField
                            onChange={(e) => setFormData({...formData, mail: e.target.value})}
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
                            onChange={(e) => setFormData({...formData, password: e.target.value})}
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
                        {logged}
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
