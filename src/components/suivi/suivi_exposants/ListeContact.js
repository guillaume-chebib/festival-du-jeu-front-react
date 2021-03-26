import React, {useState} from "react";
import {useAuthHeader} from "react-auth-kit";
import Button from "@material-ui/core/Button";
import {Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import AddContact from "./addContact";




// const ListeContact = ({nom_societe,contacts, id_societe, isEdit}) => {
//     const [openListeContact, setListeContact] = useState(false);
//     const [reponse,setReponse] = useState()

const ListeContact = ({row,setTrig,isEdit}) => {

    const [openListeContact, setListeContact] = useState(false);
    const [societe,setSociete] = useState(row);



    const authHeader = useAuthHeader()

    const handleClickOpen = () => {
        setListeContact(true);
    };

    const handleClose = () => {
        setListeContact(false);
    };

    let addContact;
    if (isEdit) {
        addContact = <AddContact nom_societe={societe.nom_societe} id_societe={societe.id_societe} isEdit={isEdit}/>;
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
                        </ListItem>
                    ))}
                    {addContact}
                </List>
            </Dialog>
        </div>

    )


}
export default ListeContact
