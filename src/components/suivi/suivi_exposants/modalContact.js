import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useRef, useState} from "react";
import {Checkbox, Fade, FormControlLabel, makeStyles, Paper} from "@material-ui/core";

const ModalContact = ({row,setContact,onUpdate}) =>  {

    const handleChangePrincipal = () => {
        setContact(prevState => ({
            ...prevState,
            est_principal_contact: !prevState.est_principal_contact
        }))
    };

    return (
        <div>
            <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="prenom"
                        name="prenom"
                        variant="outlined"
                        defaultValue={row.prenom_contact}
                        required
                        fullWidth
                        id="prenom"
                        label="Prénom"
                        autoFocus
                        onChange={e =>  setContact(prevState => ({
                            ...prevState,
                            prenom_contact: e.target.value
                        }))}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="nom"
                        name="nom"
                        variant="outlined"
                        defaultValue={row.nom_contact}
                        required
                        fullWidth
                        id="nom"
                        label="Nom"
                        autoFocus
                        onChange={e => setContact(prevState => ({
                            ...prevState,
                            nom_contact: e.target.value
                        }))}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        autoComplete="email"
                        name="email"
                        variant="outlined"
                        defaultValue={row.email_contact}
                        required
                        fullWidth
                        id="email"
                        label="Email"
                        autoFocus
                        onChange={e =>  setContact(prevState => ({
                            ...prevState,
                            email_contact: e.target.value
                        }))}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="tel_fixe"
                        name="tel_fixe"
                        variant="outlined"
                        defaultValue={row.telephone_fixe_contact}
                        required
                        fullWidth
                        id="tel_fixe"
                        label="Telephone fixe"
                        autoFocus
                        onChange={e =>  setContact(prevState => ({
                            ...prevState,
                            telephone_fixe_contact: e.target.value
                        }))}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="tel_portable"
                        name="tel_portable"
                        variant="outlined"
                        defaultValue={row.telephone_portable_contact}
                        required
                        fullWidth
                        id="tel_portable"
                        label="Telephone portable"
                        autoFocus
                        onChange={e =>  setContact(prevState => ({
                            ...prevState,
                            telephone_portable_contact: e.target.value
                        }))}
                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <TextField
                        autoComplete="fonction"
                        name="fonction"
                        variant="outlined"
                        defaultValue={row.fonction_contact}
                        required
                        fullWidth
                        id="fonction"
                        label="Fonction"
                        autoFocus
                        onChange={e =>  setContact(prevState => ({
                            ...prevState,
                            fonction_contact: e.target.value
                        }))}

                    />
                </Grid>
                <Grid item xs={12} sm={6}>
                    <FormControlLabel
                        control={<Checkbox
                            checked={row.est_principal_contact}
                            onChange={handleChangePrincipal}
                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />}
                        label="Est principal ?"
                    />
                </Grid>
            </Grid>
            <Button onClick={onUpdate}  color="primary" autoFocus>
                Valider
            </Button>
        </div>
    );
}

export default ModalContact
