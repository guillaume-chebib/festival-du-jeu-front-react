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
import {Checkbox, Fade, FormControlLabel, InputLabel, makeStyles, MenuItem, Select} from "@material-ui/core";
import {useAuthHeader} from "react-auth-kit";
import FormControl from "@material-ui/core/FormControl";
import Typography from "@material-ui/core/Typography";

export default function ModalJeuReserve({open,zones,titre,row,setRow,jeux,onUpdate,onClose}) {

    console.log("JEUX "+jeux)
    const authHeader = useAuthHeader()
    const [jeu, setJeu] = useState()
    const [zone, setZone] = useState()
    const [allZones,setZones] = useState(zones)

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
    useEffect(() => {
        console.log(zones)
    })


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
                                id="outlined-select-currency"
                                select
                                required
                                fullWidth
                                label="Jeu à ajouter"
                                value={jeu}
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    id_jeu_jeu_reserve: e.target.value
                                }))}
                                variant="outlined"
                            >
                                {jeux.map((option) => (
                                    <MenuItem key={option.id_jeu} value={option.id_jeu}>
                                        {option.titre_jeu}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                defaultValue={row.quantite_jeu_reserve}
                                type={"number"}
                                inputProps={{ min: "1", max: "30"}}
                                required
                                fullWidth
                                id="quantite_jeu_reserve"
                                label="Quantité"
                                name="quantite_jeu_reserve"
                                autoComplete="quantite_jeu_reserve"
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    quantite_jeu_reserve: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                variant="outlined"
                                defaultValue={row.nb_table_jeu_reserve}
                                fullWidth
                                required
                                type={"number"}
                                inputProps={{ min: "0", max: "10", step: "0.5" }}
                                id="nb_table_jeu_reserve"
                                label="Nombre de table à utiliser"
                                name="nb_table_jeu_reserve"
                                autoComplete="nb_table_jeu_reserve"
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    nb_table_jeu_reserve: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} >
                            <TextField
                                id="outlined-select-currency"
                                select
                                required
                                fullWidth
                                label="Placer le jeu sur une zone"
                                value={zone}
                                onChange={e =>  setRow(prevState => ({
                                    ...prevState,
                                    id_zone_jeu_reserve: e.target.value
                                }))}
                                variant="outlined"
                            >
                                {zones.map((option) => (
                                    <MenuItem key={option.zone.id_zone} value={option.zone.id_zone}>
                                        {option.zone.nom_zone}
                                    </MenuItem>
                                ))}
                            </TextField>
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={row.tombola_jeu_reserve}
                                        onClickCapture={e =>  setRow(prevState => ({
                                            ...prevState,
                                            tombola_jeu_reserve: e.target.checked
                                        }))}

                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                labelPlacement="top"
                                label={<Typography variant="body2" color="textSecondary">Tombola ?</Typography>}

                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={row.dotation_jeu_reserve}
                                        onClickCapture={e =>  setRow(prevState => ({
                                            ...prevState,
                                            dotation_jeu_reserve: e.target.checked
                                        }))}

                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                labelPlacement="top"
                                label={<Typography variant="body2" color="textSecondary">Dotation ?</Typography>}

                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={row.place_plan_jeu_reserve}
                                        onClickCapture={e =>  setRow(prevState => ({
                                            ...prevState,
                                            place_plan_jeu_reserve: e.target.checked
                                        }))}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                labelPlacement="top"
                                label={<Typography variant="body2" color="textSecondary">Placé ?</Typography>}

                            />
                        </Grid>
                        <Grid item xs={6} sm={3}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={row.recu_jeu_reserve}
                                        onClickCapture={e =>  setRow(prevState => ({
                                            ...prevState,
                                            recu_jeu_reserve: e.target.checked
                                        }))}

                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                labelPlacement="top"
                                label={<Typography variant="body2" color="textSecondary">Reçu ?</Typography>}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={
                                    <Checkbox
                                        checked={row.a_renvoyer_jeu_reserve}
                                        onChange={e =>  setRow(prevState => ({
                                            ...prevState,
                                            a_renvoyer_jeu_reserve: e.target.checked
                                        }))}

                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />
                                }
                                labelPlacement="top"
                                label={<Typography variant="body2" color="textSecondary">A renvoyer ?</Typography>}

                            />
                        <Fade in={row.a_renvoyer_jeu_reserve}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={3}>
                                    <TextField
                                        variant="outlined"
                                        defaultValue={row.montant_renvoi_jeu_reserve}
                                        fullWidth
                                        required
                                        type={"number"}
                                        inputProps={{ min: "0", max: "10", step: "0.01" }}
                                        id="montant_renvoi_jeu_reserve"
                                        label="Montant du renvoi"
                                        name="montant_renvoi_jeu_reserve"
                                        autoComplete="montant_renvoi_jeu_reserve"
                                        onChange={e =>  setRow(prevState => ({
                                            ...prevState,
                                            nb_table_jeu_reserve: e.target.value
                                        }))}
                                    />
                                </Grid>
                            </Grid>
                        </Fade>
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onClose}>
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