import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React from "react";
import {Checkbox, Fade, FormControlLabel, makeStyles, Paper} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    container: {
        display: 'flex',
    },
    paper: {
        margin: theme.spacing(1),
    },
    svg: {
        width: 100,
        height: 100,
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1,
    },
}));

//REGEX
const nomRegex = "^[0-9]*$";
const nomAdrRegex = "^[^0-9]*$";

const ModalSociete = ({open,titre,row,setRow,onUpdate,onClose}) =>  {
    const classes = useStyles();
    const [checkedEditeur, setCheckedEiteur] = React.useState(row.est_editeur_societe);
    const handleChangeEditeur = () => {
        setCheckedEiteur((prev) => !prev);
    };

    const [checkedExposant, setCheckedExposant] = React.useState(row.est_exposant_societe);
    const handleChangeExposant = () => {
        setCheckedExposant((prev) => !prev);
    };

    const [checkedInactif, setCheckedInactif] = React.useState(row.est_inactif_societe);
    const handleChangeInactif = () => {
        setCheckedInactif((prev) => !prev);
    };

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
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="nom"
                                defaultValue={row.nom_societe}
                                name="nom"
                                variant="outlined"
                                required
                                fullWidth
                                id="nom"
                                label="Nom de l'entreprise"
                                autoFocus
                                onChange={(e) => {
                                    e.stopPropagation()
                                    e.preventDefault()
                                    setRow(prevState => ({
                                        ...prevState,
                                        nom_societe: e.target.value
                                    }));
                                }}

                            />
                        </Grid>
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button color="primary" onClick={onClose} color="primary">
                        Annuler
                    </Button>
                    <Button type="submit" color="primary" autoFocus>
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

export default ModalSociete
