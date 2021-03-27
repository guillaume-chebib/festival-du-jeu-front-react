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



const AddContact = ({id_societe, setTrig, isEdit}) => {
    const authHeader = useAuthHeader()
    const [reponse,setReponse] = useState()
    const [visible, setVisible] = useState(false);
    const handleListItemClick = () => {
        setVisible((prev) => !prev);
    };

    const [contact,setContact] = useState({
        prenom_contact : null,
        nom_contact : null,
        email_contact : null,
        telephone_portable_contact : null,
        telephone_fixe_contact : null,
        fonction_contact : null,
        est_principal_contact : false,
        id_societe: `${id_societe}`
    });

    const handleCreate = async () => {

        const response = await requestToBack('POST',{
            nom_contact : contact.nom_contact, prenom_contact : contact.prenom_contact, email_contact : contact.email_contact, telephone_portable_contact : contact.telephone_portable_contact,
            telephone_fixe_contact : contact.telephone_fixe_contact, fonction_contact : contact.fonction_contact, est_principal_contact : contact.est_principal_contact, id_societe: contact.id_societe
        },`/contact`,authHeader())

        const body = await response[0]
        if (response[1] !== 200) {
            setReponse(<Alert severity="error">{body.message}</Alert>)
        }
        else {
            setReponse(<Alert severity="success">Contact créé avec succes ! </Alert>)
            setTrig(contact)
            setVisible(false)
        }
    };

    return (
        <div>
            <ListItem autoFocus button onClick={handleListItemClick}>
                <ListItemAvatar>
                    <Avatar>
                        <AddIcon />
                    </Avatar>
                </ListItemAvatar>
                <ListItemText primary="Ajouter un contact" />
            </ListItem>

            <div>
                <Fade in={visible}>
                    <Paper>
                        <ModalContact row={contact} setContact={setContact} onUpdate={handleCreate}/>
                    </Paper>
                </Fade>
            </div>
        </div>
    )


}
export default AddContact
