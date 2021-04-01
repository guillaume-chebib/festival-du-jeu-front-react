import React, {useState} from "react";
import {useAuthHeader} from "react-auth-kit";
import Button from "@material-ui/core/Button";
import {
    Checkbox,
    Dialog,
    DialogTitle,
    FormControlLabel,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText
} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import PersonIcon from '@material-ui/icons/Person';
import AddContact from "./addContact";
import EditContact from "./editContact";


const ListeContact = ({row, setTrig, isEdit}) => {
    // TODO Trigger a rajouté pour mettre a jour
    const [openListeContact, setListeContact] = useState(false);
    const [societe, setSociete] = useState(row);

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

    let message
    if(societe.contacts.length === 0){
        message = (<div style={{textAlign : "center", fontSize : "20px"}}>Aucun contact</div>)
    }

    return (
        <div>
            <Button onClick={handleClickOpen} variant="contained" color="primary">Liste contact </Button>
            <Dialog onClose={handleClose} maxWidth={"md"} aria-labelledby="simple-dialog-title" open={openListeContact}>
                <DialogTitle id="simple-dialog-title">Contacts de {societe.nom_societe}</DialogTitle>
                <List>
                    {message}
                    {societe.contacts.map((c) => (
                        <ListItem key={c.nom_contact}>
                            <ListItemAvatar>
                                <Avatar>
                                    <PersonIcon/>
                                </Avatar>
                            </ListItemAvatar>
                            <ListItemText primary={c.nom_contact} secondary={c.prenom_contact}/>
                            <ListItemText primary={"Email"} secondary={c.email_contact} />
                            <ListItemText primary={"Fixe : " + c.telephone_fixe_contact} secondary={"Portable : "+ c.telephone_fixe_contact}/>
                            <ListItemText primary={"Fonction"} secondary={c.fonction_contact}/>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={c.est_principal_contact}
                                    disabled={true}
                                />}
                                label="Est principal ?"
                                labelPlacement="top"
                            />
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
