import React, {useState} from "react";
import {useAuthHeader} from "react-auth-kit";
import Button from "@material-ui/core/Button";
import {Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import AddContact from "./addContact";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialogDelete from "../../modals/AlertDialogDelete";
import {requestToBack} from "../../../utils/utils_functions";
import EditIcon from "@material-ui/icons/Edit";
import EditContact from "./editContact";


const ListeContact = ({row,setTrig,isEdit}) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [openListeContact, setListeContact] = useState(false);
    const [societe,setSociete] = useState(row);

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDelete = async () => {
        const response = await requestToBack('DELETE',row,`/contact/${row.id}`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

        console.log(body.message)
        setTrig(row)
        setOpenDelete(false);
    }

    const authHeader = useAuthHeader()

    const handleClickOpen = () => {
        setListeContact(true);
    };

    const handleClose = () => {
        setListeContact(false);
    };

    let addContact, deleteIcon;
    if (isEdit) {
        addContact = <AddContact id_societe={societe.id} isEdit={false}/>;
        deleteIcon = (
            <div>
                <IconButton onClick={handleClickOpenDelete} aria-label="delete">
                    <DeleteIcon fontSize="small" />
                </IconButton>
                <AlertDialogDelete titre="Supprimer contact" message={"Etes vous sur de vouloir supprimer : "+row.id} onClose={handleCloseDelete} onDelete={handleDelete} open={openDelete}/>
            </div>)
    }

    return (
        <div>
            <Button onClick={handleClickOpen} variant="contained" color="primary">Liste contact </Button>
            <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={openListeContact}>
                <DialogTitle id="simple-dialog-title">Contacts de {societe.nom_societe}</DialogTitle>
                <List>
                    {societe.contacts.map((c) => (
                        <ListItem >
                            <ListItemAvatar>
                                <Avatar >
                                    <PersonIcon />
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={c.nom_contact} secondary={c.prenom_contact} />
                            <EditContact row={c}/>
                            {deleteIcon}
                        </ListItem>
                    ))}
                    <div>{addContact}</div>
                </List>
            </Dialog>
        </div>

    )


}
export default ListeContact
