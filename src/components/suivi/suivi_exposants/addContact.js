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



const AddContact = ({nom_societe, id_societe, isEdit}) => {
    const authHeader = useAuthHeader()
    const [reponse,setReponse] = useState()
    const [visible, setVisible] = useState(false);
    const handleListItemClick = () => {
        setVisible((prev) => !prev);
    };
    const [checkedPrincipal, setPrincipal] = useState(false);
    const handleChangePrincipal = () => {
        setPrincipal((prev) => !prev);
    };
    const [contact,setContact] = useState({
        nom_contact : null,
        prenom_contact : null,
        email_contact : null,
        telephone_fixe_contact : null,
        telephone_portable_contact : null,
        fonction_contact : null,
        est_principal_contact : false,
        id_societe: `${id_societe}`
    });

    console.log("UI" + id_societe)

    const handleCreate = async () => {

        // e.preventDefault();
        const response = await requestToBack('POST',{
            nom_contact : contact.nom_contact, prenom_contact : contact.prenom_contact, email_contact : contact.email_contact, telephone_fixe_contact : contact.telephone_fixe_contact,
            telephone_portable_contact : contact.telephone_portable_contact, fonction_contact : contact.fonction_contact, est_principal_contact : contact.est_principal_contact, id_societe: contact.id_societe
        },`/contact`,authHeader())

        const body = await response[0]
        if (response[1] !== 200) {
            setReponse(<Alert severity="error">{body.message}</Alert>)
        }
        else {
            setReponse(<Alert severity="success">Contact créé avec succes ! </Alert>)
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
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="nom"
                                name="nom"
                                variant="outlined"
                                required
                                fullWidth
                                id="nom"
                                label="Nom"
                                autoFocus
                                onChange={e =>  setContact(prevState => ({
                                    ...prevState,
                                    nom_contact: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="prenom"
                                name="prenom"
                                variant="outlined"
                                required
                                fullWidth
                                id="prenom"
                                label="Prénom"
                                autoFocus
                                onChange={e =>  setContact(prevState => ({
                                    ...prevState,
                                    prenom_contact: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                autoComplete="email"
                                name="email"
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                autoFocus
                                onChange={e =>  setContact(prevState => ({
                                    ...prevState,
                                    email_contact: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="tel_fixe"
                                name="tel_fixe"
                                variant="outlined"
                                required
                                fullWidth
                                id="tel_fixe"
                                label="Telephone fixe"
                                autoFocus
                                onChange={e =>  setContact(prevState => ({
                                    ...prevState,
                                    telephone_fixe_contact: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="tel_portable"
                                name="tel_portable"
                                variant="outlined"
                                required
                                fullWidth
                                id="tel_portable"
                                label="Telephone portable"
                                autoFocus
                                onChange={e =>  setContact(prevState => ({
                                    ...prevState,
                                    telephone_portable_contact: e.target.value
                                }))}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                autoComplete="fonction"
                                name="fonction"
                                variant="outlined"
                                required
                                fullWidth
                                id="fonction"
                                label="Fonction"
                                autoFocus
                                onChange={e =>  setContact(prevState => ({
                                    ...prevState,
                                    fonction_contact: e.target.value
                                }))}

                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControlLabel
                                control={<Checkbox
                                    checked={checkedPrincipal}
                                    onChange={handleChangePrincipal}
                                    inputProps={{ 'aria-label': 'primary checkbox' }}
                                />}
                                label="Est principal ?"
                            />
                        </Grid>
                    </Grid>
                    <Button onClick={handleCreate}  color="primary" autoFocus>
                        Valider
                    </Button>
                    </Paper>
                </Fade>
            </div>
        </div>
    )


}
export default AddContact
