import React, {useState} from 'react';
import useStylesForm from "../styles/formStyle";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import {useAuthHeader} from 'react-auth-kit'
import {IsAdmin, requestToBack} from "../../utils/utils_functions";
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Alert from "@material-ui/lab/Alert";
import {useHistory} from "react-router-dom";


const AjoutOrganisateur = () => {

    const [reponse, setReponse] = useState()
    const [nom, setNom] = useState("")
    const [prenom, setPrenom] = useState("")
    const [mail, setMail] = useState("")
    const [motdepasse, setMotdepasse] = useState("")
    const history = useHistory();
    const authHeader = useAuthHeader()


    const handleSubmit = async e => {
        e.preventDefault();
        const response = await requestToBack('POST', {
            prenom_organisateur: prenom,
            nom_organisateur: nom,
            email_organisateur: mail,
            mot_de_passe_organisateur: motdepasse
        }, `/organisateur`, authHeader())

        const body = await response[0]
        if (response[1] !== 200) {
            setReponse(<Alert severity="error">{body.message}</Alert>)
        } else {
            setReponse(<Alert severity="success">Compte crée avec succes ! </Alert>)
        }

    };

    const classes = useStylesForm()

    return (
        <div>
            <IsAdmin/>
            <Container component="main" maxWidth="xs">
                <CssBaseline/>
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Ajouter un organisateur
                    </Typography>
                    <form className={classes.form} noValidate onSubmit={handleSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    autoComplete="prenom"
                                    name="prenom"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="prenom"
                                    label="Prenom"
                                    autoFocus
                                    onChange={e => setPrenom(e.target.value)}

                                />
                            </Grid>
                            <Grid item xs={12} sm={6}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="nom"
                                    label="Nom"
                                    name="nom"
                                    autoComplete="nom"
                                    onChange={e => setNom(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="mail"
                                    label="Adresse mail"
                                    name="mail"
                                    autoComplete="mail"
                                    onChange={e => setMail(e.target.value)}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    required
                                    fullWidth
                                    name="motdepasse"
                                    label="Mot de passe"
                                    type="password"
                                    id="motdepasse"
                                    autoComplete="current-password"
                                    onChange={e => setMotdepasse(e.target.value)}
                                />
                            </Grid>
                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            className={classes.submit}
                        >
                            Créer le compte
                        </Button>
                        <Grid container justify="flex-end">
                            <Grid item>
                                <Button variant="contained" color="primary"
                                        onClick={() => history.push('/organisateur')}>
                                    Retour aux organisateurs
                                </Button>
                            </Grid>
                        </Grid>
                        {reponse}
                    </form>
                </div>
            </Container>
        </div>
    )
}


export default AjoutOrganisateur
