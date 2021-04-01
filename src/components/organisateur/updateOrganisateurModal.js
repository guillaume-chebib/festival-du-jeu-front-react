import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";

const UpdateOrganisateurModal = ({open, titre, row, setRow, onUpdate, onClose}) => {
    return (
        <div>

            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{titre}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="prenom"
                                defaultValue={row.prenom_organisateur}
                                name="prenom"
                                variant="outlined"
                                required
                                fullWidth
                                id="prenom"
                                label="Prenom"
                                autoFocus
                                onChange={e => setRow(prevState => ({
                                    ...prevState,
                                    prenom_organisateur: e.target.value
                                }))}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                defaultValue={row.nom_organisateur}
                                required
                                fullWidth
                                id="nom"
                                label="Nom"
                                name="nom"
                                autoComplete="nom"
                                onChange={e => setRow(prevState => ({
                                    ...prevState,
                                    nom_organisateur: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                defaultValue={row.email_organisateur}
                                required
                                fullWidth
                                id="mail"
                                label="Adresse mail"
                                name="mail"
                                autoComplete="mail"
                                onChange={e => setRow(prevState => ({
                                    ...prevState,
                                    email_organisateur: e.target.value
                                }))}
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
                                onChange={e => setRow(prevState => ({
                                    ...prevState,
                                    mot_de_passe_organisateur: e.target.value
                                }))}
                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={onUpdate} color="primary" autoFocus>
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default UpdateOrganisateurModal
