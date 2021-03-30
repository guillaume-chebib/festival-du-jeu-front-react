import React, {useState} from "react";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import ModalSociete from "./modalSociete";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

const CreateSociete = ({setTrig}) => {

    const [openCreate, setOpenCreate] = useState(false);
    const [reponse,setReponse] = useState()
    const [societe,setSociete] = useState({
        nom_societe : null,
        est_exposant_societe : false,
        numero_rue_editeur : null,
        rue_editeur : null,
        est_editeur_societe : false,
        est_inactif_societe : false,
        ville_editeur : null,
        code_postal_editeur: null
    });

    const authHeader = useAuthHeader()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleCreate = async () => {

        // e.preventDefault();
        const response = await requestToBack('POST',{
            nom_societe : societe.nom_societe,
            est_exposant_societe : societe.est_exposant_societe,
            numero_rue_editeur : societe.numero_rue_editeur,
            rue_editeur : societe.rue_editeur,
            est_editeur_societe : societe.est_editeur_societe,
            est_inactif_societe : societe.est_inactif_societe,
            ville_editeur : societe.ville_editeur,
            code_postal_editeur: societe.code_postal_editeur,
        },`/societe`,authHeader())

        const body = await response[0]
        if (response[1] !== 200) {
            setReponse(<Alert severity="error">{body.message}</Alert>)
        }
        else {
            setReponse(<Alert severity="success">Société créée avec succes ! </Alert>)
        }
        setTrig(societe)
        setOpenCreate(false);
    };


    return (
        <div>
            <Button onClick={handleClickOpenCreate} variant="contained" color="primary">Ajouter une société </Button>
            <ModalSociete titre="Créer une société" row={societe} setRow={setSociete} onClose={handleCloseCreate} onUpdate={handleCreate} open={openCreate}/>
        </div>

    )


}
export default CreateSociete
