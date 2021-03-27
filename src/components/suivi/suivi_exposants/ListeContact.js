import React, {useState} from "react";
import {useAuthHeader} from "react-auth-kit";
import Button from "@material-ui/core/Button";
import {
    Checkbox,
    Dialog,
    DialogTitle, FormControlLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    makeStyles
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import AddContact from "./addContact";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialogDelete from "../../modals/AlertDialogDelete";
import {requestToBack} from "../../../utils/utils_functions";
import EditIcon from "@material-ui/icons/Edit";
import EditContact from "./editContact";
import {CheckBox} from "@material-ui/icons";


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
        addContact = <AddContact id_societe={societe.id} setTrig={setTrig} isEdit={false}/>;
    }

    return (
        <div>
            <Button onClick={handleClickOpen} variant="contained" color="primary">Liste contact </Button>
            <Dialog onClose={handleClose} maxWidth={"md"} aria-labelledby="simple-dialog-title" open={openListeContact}>
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
                            {/*<ListItemText primary={"Email"} secondary={c.email_contact} />*/}
                            {/*<ListItemText primary={"Fixe : " + c.telephone_fixe_contact} secondary={"Portable : "+ c.telephone_fixe_contact}/>*/}
                            {/*<ListItemText primary={"Fonction"} secondary={c.fonction_contact}/>*/}
                            {/*<ListItemText hidden={c.est_principal_contact? false : true} primary={"<<Contact Principal>>"}/>*/}
                            {/*<FormControlLabel*/}
                            {/*    control={<Checkbox*/}
                            {/*        checked={c.est_principal_contact}*/}
                            {/*        disabled={true}*/}
                            {/*    />}*/}
                            {/*    label="Est principal ?"*/}
                            {/*    labelPlacement="top"*/}
                            {/*/>*/}
                            <EditContact row={c} setTrig={setTrig}/>
                        </ListItem>
                    ))}
                    <div>{addContact}</div>
                </List>
            </Dialog>
        </div>

    )


}
export default ListeContact
