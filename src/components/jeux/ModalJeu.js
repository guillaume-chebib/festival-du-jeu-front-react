import React, {useEffect, useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import TextField from '@material-ui/core/TextField';
import Grid from "@material-ui/core/Grid";
import Switch from "@material-ui/core/Switch";
import {renameKey, requestToBack} from "../../utils/utils_functions";
import {Checkbox, FormControlLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import {useAuthHeader} from "react-auth-kit";
import Typography from "@material-ui/core/Typography";

export default function ModalJeu({open,editeurs,est_create,titre,row,setRow,message,onUpdate,onClose}) {

    const authHeader = useAuthHeader()
    // const [editeurs,setEditeurs] = useState() // contient le contenu à ajouter
    const handleChange = () => {
        setRow(prevState => ({
            ...prevState,
            proto_jeu: !prevState.proto_jeu
        }))


    };
    const useStyles = makeStyles((theme) => ({
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120,
        },
        selectEmpty: {
            marginTop: theme.spacing(2),
        },
    }));

    const classes = useStyles();


    const handleChangeEditeur = (event) => {
        setRow(prevState => ({
            ...prevState,
            id_editeur_jeu: event.target.value
        }))

    };



    useEffect(() => {


    },[]);


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
                        <Grid item xs={12} >
                            <TextField
                                autoComplete="nom du jeu"
                                defaultValue={row.titre_jeu}
                                name="titre"
                                variant="outlined"
                                required
                                fullWidth
                                id="titre"
                                label="Titre"
                                autoFocus
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    titre_jeu: e.target.value
                                }))}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                defaultValue={row.min_joueur_jeu}
                                required
                                fullWidth
                                id="min_joueur_jeu"
                                label="Joueur minimum"
                                name="min_joueur_jeu"
                                autoComplete="min_joueur_jeu"
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    min_joueur_jeu: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                defaultValue={row.max_joueur_jeu}
                                fullWidth
                                id="max_joueur_jeu"
                                label="Joueur maximum"
                                name="max_joueur_jeu"
                                autoComplete="max_joueur_jeu"
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    max_joueur_jeu: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                defaultValue={row.age_min_jeu}
                                fullWidth
                                id="age_min_jeu"
                                label="Age maximum"
                                name="age_min_jeu"
                                autoComplete="age_min_jeu"
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    age_min_jeu: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                defaultValue={row.duree_jeu}
                                fullWidth
                                id="duree_jeu"
                                label="Duree du jeu"
                                name="duree_jeu"
                                autoComplete="duree_jeu"
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    duree_jeu: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                defaultValue={row.url_consignes_jeu}
                                fullWidth
                                id="url_consignes_jeu"
                                label="Lien règles du jeu"
                                name="url_consignes_jeu"
                                autoComplete="url_consignes_jeu"
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    url_consignes_jeu: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={2}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={row.proto_jeu}
                                        onChange={handleChange}
                                        name="proto_jeu"
                                        inputProps={{ 'aria-label': 'secondary checkbox' }}
                                    />
                                }
                                labelPlacement="top"
                                label={<Typography variant="body2" color="textSecondary">Proto ?</Typography>}

                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>

                            <TextField
                                id="outlined-select-currency"
                                select
                                required
                                fullWidth
                                label="Choisir un editeur"
                                value={row.id_editeur_jeu}
                                onChange={handleChangeEditeur}
                                variant="outlined"
                            >
                                {
                                    editeurs.map(e => <MenuItem value={e.id_societe}>{e.nom_societe}</MenuItem>)
                                }
                            </TextField>
                        </Grid>

                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onClose} color="primary">
                        Annuler
                    </Button>
                    <Button onClick={onUpdate}  color="primary" autoFocus>
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}
