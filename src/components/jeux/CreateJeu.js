import React, {useState} from "react";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import ModalJeu from "./ModalJeu";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";

const CreateJeu = () => {

    const [openCreate, setOpenCreate] = useState(false);
    const [reponse,setReponse] = useState()
    const [jeu,setJeu] = useState({
        titre_jeu : null, min_joueur_jeu : null, max_joueur_jeu : null, id_editeur_jeu : null,
        age_min_jeu : null, duree_jeu : null, url_consignes_jeu : null, proto_jeu : null
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
            titre_jeu : jeu.titre_jeu, min_joueur_jeu : jeu.min_joueur_jeu, max_joueur_jeu : jeu.max_joueur_jeu, id_editeur_jeu : jeu.id_editeur_jeu,
            age_min_jeu : jeu.age_min_jeu, duree_jeu : jeu.duree_jeu, url_consignes_jeu : jeu.url_consignes_jeu, proto_jeu : true
        },`/jeu`,authHeader())

        const body = await response[0]
        if (response[1] !== 200) {
            setReponse(<Alert severity="error">{body.message}</Alert>)
        }
        else {
            setReponse(<Alert severity="success">Jeu crée avec succes ! </Alert>)
        }
        // setTrig(row)
        setOpenCreate(false);
    };


    return (
        <div>
            <Button onClick={handleClickOpenCreate} variant="contained" color="primary">Ajouter un jeu </Button>
            <ModalJeu titre="Editer jeu" row={jeu} setRow={setJeu} onClose={handleCloseCreate} onUpdate={handleCreate} open={openCreate}/>
        </div>

    )


}
export default CreateJeu
