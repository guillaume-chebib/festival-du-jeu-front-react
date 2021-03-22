import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {ThemeProvider} from "@material-ui/core/styles";
import {themeFestival} from "../styles/themes";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import {TextFields} from "@material-ui/icons";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";


export const UpdateDeleteOrganisateur = ({row,setTrig}) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [organisateur,setOrganisateur] = useState(row)

    const onClickOpenEdit = () => {
        setOrganisateur(prevState => ({
            ...prevState,
            mot_de_passe_organisateur: ""
        }))
        setOpenEdit(true);
    };

    const onClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleUpdate = async () => {
        console.log(organisateur)
        const response = await fetch(`/organisateur/${row.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(organisateur),
        });

        const body = await response.json()
        if (response.status !== 200) {
            console.log("erreur serveur")
        }
        console.log(body.message)
        setOpenEdit(false)
        setTrig(row)

    };

    const handleDelete = async () => {
        console.log(row)
        const response = await fetch(`/organisateur/${row.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(row),
        });

        const body = await response.json()
        if (response.status !== 200) {
            console.log("erreur serveur")
        }
        console.log(body.message)

    };

    return (
        <div>
            <ThemeProvider theme={themeFestival}>
                <Fab size="small" color="primary" aria-label="edit" onClick={onClickOpenEdit}>
                    <EditIcon/>
                </Fab>
                <Fab size="small" color="secondary" aria-label="delete" onClick={onClickOpenDelete}>
                    <DeleteIcon />
                </Fab>
            </ThemeProvider>

            <UpdateOrganisateurModal titre="Editer organisateur" row={organisateur} setRow={setOrganisateur} onClose={handleCloseEdit} onUpdate={handleUpdate} open={openEdit}/>
        </div>

    )


}
export const UpdateOrganisateurModal = ({open,titre,row,setRow,onUpdate,onClose}) =>  {
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
                                onChange={e =>  setRow(prevState => ({
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
                                onChange={e =>  setRow(prevState => ({
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
                                onChange={e =>  setRow(prevState => ({
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
                                onChange={e =>  setRow(prevState => ({
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
                    <Button onClick={onUpdate}  color="primary" autoFocus>
                        Oui
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}

