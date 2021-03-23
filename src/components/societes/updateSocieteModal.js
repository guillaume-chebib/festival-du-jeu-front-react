import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import React, {useRef} from "react";
import {Checkbox, Fade, FormControlLabel, makeStyles, Paper} from "@material-ui/core";
import { ValidatorForm, TextValidator} from 'react-material-ui-form-validator';

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

const UpdateSocieteModal = ({open,titre,row,setRow,onUpdate,onClose}) =>  {
    const inputRef = useRef("form");
    const classes = useStyles();
    const [nameError,setNameError] = React.useState("")
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

    const onChangeNom = (e) => {
        if(!e.target.value.match(nomRegex)){
            setNameError("")
        } else {
            setNameError("Le nom doit contenir des caractères")
        }
    }

    const onChangeNomAdresse = (e) => {
        if(!e.target.value.match(nomAdrRegex)){
            setNameError("")
        } else {
            setNameError("Le champs ne doit pas contenir de nombres")
        }
    }

    return (
        <div>

            <Dialog
                open={open}
                onClose={onClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                {/*<ValidatorForm ref={inputRef} onSubmit={onUpdate}>*/}
                <DialogTitle id="alert-dialog-title">{titre}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                    </DialogContentText>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            {/*<TextValidator*/}
                            {/*    label="Nom de la société"*/}
                            {/*    name="nom"*/}
                            {/*    value={row.nom_societe}*/}
                            {/*    validators={['required','matchRegexp:^[0-9]$']}*/}
                            {/*    errorMessages={["Le champs est requis","Le nom doit contenir des caractères"]}*/}
                            {/*/>*/}
                            <TextField
                                autoComplete="nom"
                                defaultValue={row.nom_societe}
                                name="nom"
                                variant="outlined"
                                error={nameError.length === 0 ? false : true}
                                helperText={nameError}
                                required
                                fullWidth
                                id="nom"
                                label="Nom de l'entreprise"
                                autoFocus
                                onChange={(e) => {
                                    setRow(prevState => ({
                                        ...prevState,
                                        nom_societe: e.target.value
                                    }));
                                    return onChangeNom(e);
                                }}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.root}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={checkedExposant}
                                        onChange={handleChangeExposant}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />}
                                    label="Est exposant ?"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <div className={classes.root}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={checkedInactif}
                                        onChange={handleChangeInactif}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />}
                                    label="Est inactif ?"
                                />
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className={classes.root}>
                                <FormControlLabel
                                    control={<Checkbox
                                        checked={checkedEditeur}
                                        onChange={handleChangeEditeur}
                                        inputProps={{ 'aria-label': 'primary checkbox' }}
                                    />}
                                    label="Est editeur ?"
                                />
                                <div className={classes.container}>
                                    <Fade in={checkedEditeur}>
                                        <Grid container spacing={2}>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="numero"
                                                defaultValue={row.numero_rue_editeur}
                                                name="numero"
                                                variant="outlined"
                                                required={checkedEditeur ? true : false}
                                                fullWidth
                                                id="numero"
                                                label="Numero de rue"
                                                autoFocus
                                                onChange={e =>  setRow(prevState => ({
                                                    ...prevState,
                                                    numero_rue_editeur: e.target.value
                                                }))}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="rue"
                                                defaultValue={row.rue_editeur}
                                                name="rue"
                                                variant="outlined"
                                                required={checkedEditeur ? true : false}
                                                fullWidth
                                                id="rue"
                                                label="Nom de la rue"
                                                autoFocus
                                                onChange={(e) => {
                                                    setRow(prevState => ({
                                                        ...prevState,
                                                        rue_societe: e.target.value
                                                    }));
                                                    //return onChangeNomAdresse(e);
                                                }}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="code_postal"
                                                defaultValue={row.code_postal_editeur}
                                                name="code_postal"
                                                variant="outlined"
                                                required={checkedEditeur ? true : false}
                                                fullWidth
                                                id="code_postal"
                                                label="Code postal"
                                                autoFocus
                                                onChange={e =>  setRow(prevState => ({
                                                    ...prevState,
                                                    code_postal_editeur: e.target.value
                                                }))}

                                            />
                                        </Grid>
                                        <Grid item xs={12} sm={6}>
                                            <TextField
                                                autoComplete="ville"
                                                defaultValue={row.ville_editeur}
                                                name="ville"
                                                variant="outlined"
                                                required={checkedEditeur ? true : false}
                                                fullWidth
                                                id="ville"
                                                label="Ville"
                                                autoFocus
                                                onChange={(e) => {
                                                    setRow(prevState => ({
                                                        ...prevState,
                                                        ville_editeur: e.target.value
                                                    }));
                                                    //return onChangeNomAdresse(e);
                                                }}

                                            />
                                        </Grid>
                                        </Grid>
                                    </Fade>
                                </div>
                            </div>
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
                {/*</ValidatorForm>*/}
            </Dialog>
        </div>
    );
}

export default UpdateSocieteModal
