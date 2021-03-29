import React, {useEffect, useState} from "react";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import {renameKey, requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import ModalJeuReserve from "./modalJeuReserve";

const CreateJeuReserve = ({setTrig,zones, jeux, id_reservation, id_societe}) => {

    const [openCreate, setOpenCreate] = useState(false);
    const [reponse,setReponse] = useState()
    const [jeuReserve,setJeuReserve] = useState({
        id_jeu_jeu_reserve : null,
        id_reservation_jeu_reserve : `${id_reservation}`,
        quantite_jeu_reserve : null,
        nb_table_jeu_reserve : null,
        tombola_jeu_reserve : false,
        dotation_jeu_reserve : false,
        place_plan_jeu_reserve : false,
        a_renvoyer_jeu_reserve : false,
        est_renvoye_jeu_reserve : false,
        montant_renvoi_jeu_reserve : null,
        id_zone_jeu_reserve : null,
        derniere_modif_jeu_reserve : null,

    });

    const authHeader = useAuthHeader()

    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const handleCreate = async () => {

        const time = new Date(Date.now()).toISOString().replace('T',' ').replace('Z','');
        // e.preventDefault();
        const response = await requestToBack('POST',{
            id_jeu_jeu_reserve : jeuReserve.id_jeu_jeu_reserve,
            id_reservation_jeu_reserve : jeuReserve.id_reservation_jeu_reserve,
            quantite_jeu_reserve : jeuReserve.quantite_jeu_reserve,
            nb_table_jeu_reserve : jeuReserve.nb_table_jeu_reserve,
            tombola_jeu_reserve : jeuReserve.tombola_jeu_reserve,
            dotation_jeu_reserve : jeuReserve.dotation_jeu_reserve,
            place_plan_jeu_reserve : jeuReserve.place_plan_jeu_reserve,
            a_renvoyer_jeu_reserve : jeuReserve.a_renvoyer_jeu_reserve,
            est_renvoye_jeu_reserve : jeuReserve.est_renvoye_jeu_reserve,
            montant_renvoi_jeu_reserve : jeuReserve.montant_renvoi_jeu_reserve,
            id_zone_jeu_reserve : jeuReserve.id_zone_jeu_reserve,
            derniere_modif_jeu_reserve : time,
        },`/jeuReserve`,authHeader())

        const body = await response[0]
        if (response[1] !== 200) {
            setReponse(<Alert severity="error">{body.message}</Alert>)
        }
        else {
            setReponse(<Alert severity="success">Jeu ajouté avec succes ! </Alert>)
        }
        setTrig(jeuReserve)
        setOpenCreate(false);
    };


    return (
        <div>
            <Button onClick={handleClickOpenCreate} variant="contained" color="primary">Ajouter un jeu</Button>
            <ModalJeuReserve titre="Ajouter un jeu" zones = {zones} row={jeuReserve} jeux = {jeux} setRow={setJeuReserve} onClose={handleCloseCreate} onUpdate={handleCreate} open={openCreate}/>
        </div>

    )


}
export default CreateJeuReserve
