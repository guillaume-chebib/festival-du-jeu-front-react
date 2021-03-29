import React, {useEffect, useState} from "react";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import {renameKey, requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import ModalJeuReserve from "./modalJeuReserve";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Grid from "@material-ui/core/Grid";
import {TextField} from "@material-ui/core";

const CreateZone = ({setTrig, id_festival}) => {

    const [openCreate, setOpenCreate] = useState(false);
    const [reponse,setReponse] = useState()
    const [zone,setZone] = useState({
        id_festival : `${id_festival}`,
        nom_zone : null,

    });

    const authHeader = useAuthHeader()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleCreate = async () => {

        const time = new Date(Date.now()).toISOString();
        // e.preventDefault();
        const response = await requestToBack('POST',{
            id_festival : zone.id_festival,
            nom_zone : zone.nom_zone,
        },`/zone`,authHeader())

        const body = await response[0]
        if (response[1] !== 200) {
            setReponse(<Alert severity="error">{body.message}</Alert>)
        }
        else {
            setReponse(<Alert severity="success">Zone ajoutée avec succes ! </Alert>)
        }
        setTrig(zone)
        setOpenCreate(false);
    };


    return (
        <div>
            <Button onClick={handleClickOpenCreate} variant="contained" color="primary">Ajouter une zone</Button>
            <ModalZone titre="Ajouter une zone" setRow={setZone} onClose={handleCloseCreate} onUpdate={handleCreate} open={openCreate}/>
        </div>

    )
}

const ModalZone = ({titre,setRow,onUpdate,onClose, open}) => {
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
                        <Grid container>
                            <Grid item xs={12}>
                                <TextField
                                    autoComplete="nom"
                                    name="nom"
                                    variant="outlined"
                                    required
                                    fullWidth
                                    id="nom"
                                    label="Nom de la zone"
                                    autoFocus
                                    onChange={e =>  setRow(prevState => ({
                                        ...prevState,
                                        nom_zone: e.target.value
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

export default CreateZone
