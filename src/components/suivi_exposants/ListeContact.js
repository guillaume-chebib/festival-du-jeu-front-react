import React, {useState} from "react";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import AddContact from "./addContact";




// const ListeContact = ({nom_societe,contacts, id_societe, isEdit}) => {
//     const [openListeContact, setListeContact] = useState(false);
//     const [reponse,setReponse] = useState()

const ListeContact = ({row,setTrig}) => {

    const [openListeContact, setListeContact] = useState(false);
    const [societe,setSociete] = useState(row);



    const authHeader = useAuthHeader()

    const handleClickOpen = () => {
        setListeContact(true);
    };

    const handleClose = () => {
        setListeContact(false);
    };

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
                        </ListItem>
                    ))}

                    {/*<AddContact nom_societe={nom_societe} id_societe={id_societe} isEdit={isEdit}/>*/}
                </List>
            </Dialog>
        </div>

    )


}
export default ListeContact
