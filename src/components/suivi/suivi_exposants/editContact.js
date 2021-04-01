import React, {useState} from "react";
import {useAuthHeader} from "react-auth-kit";
import {Dialog, DialogTitle} from "@material-ui/core";
import {requestToBack} from "../../../utils/utils_functions";
import ModalContact from "./modalContact";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialogDelete from "../../modals/AlertDialogDelete";


const EditContact = ({row, setTrig}) => {
    const authHeader = useAuthHeader()
    const [reponse,setReponse] = useState()
    const [contact, setContact] = useState(row)
    const [openDelete, setOpenDelete] = useState(false);
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
        setTrig(contact)
    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDelete = async () => {
        const response = await requestToBack('DELETE',row,`/contact/${contact.id_contact}`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

        console.log(body.message)
        setTrig(row)
        setOpenDelete(false);
    }

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

            <IconButton onClick={handleClickOpenDelete} aria-label="delete">
                <DeleteIcon fontSize="small"/>
            </IconButton>
            <AlertDialogDelete titre="Supprimer contact"
                               message={"Etes vous sur de vouloir supprimer : " + contact.id_contact}
                               onClose={handleCloseDelete} onDelete={handleDelete} open={openDelete}/>


    </div>)


}
export default EditContact
