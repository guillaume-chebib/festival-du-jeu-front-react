import React, {useState} from "react";
import AddIcon from '@material-ui/icons/Add';
import {useAuthHeader} from "react-auth-kit";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {
    Checkbox,
    Dialog,
    DialogTitle, Fade, FormControlLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles, Paper,
    TextField
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {blue} from "@material-ui/core/colors";
import PersonIcon from '@material-ui/icons/Person';
import Grid from "@material-ui/core/Grid";
import {requestToBack} from "../../../utils/utils_functions";
import ModalContact from "./modalContact";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";



const EditContact = ({row}) => {
    const authHeader = useAuthHeader()
    const [reponse,setReponse] = useState()
    const [contact, setContact] = useState(row)
    const [openDialog, setOpenDialog] = useState(false);
    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleEdit = async () => {

        const response = await requestToBack('PUT',contact,`/contact/${contact.id_contact}`,authHeader())
        const body = await response[0]

        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setOpenDialog(false);
    };

    return (<div>
        <IconButton onClick={handleOpenDialog} aria-label="edit">
            <EditIcon fontSize="small"/>
        </IconButton>
        <Dialog onClose={handleCloseDialog} open={openDialog}>
            <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                Modifier
            </DialogTitle>
            <ModalContact row={contact} setContact={setContact} onUpdate={handleEdit} open={openDialog}/>
        </Dialog>

    </div>)


}
export default EditContact
