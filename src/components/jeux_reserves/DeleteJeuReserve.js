import React, {useState} from "react";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";

const DeleteJeuReserve = ({row, setTrig}) => {

    const [openDelete, setOpenDelete] = useState(false);
    const authHeader = useAuthHeader()


    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDelete = async () => {
        const response = await requestToBack('DELETE', row, `/jeuReserve/${row.id_jeu}/${row.id_reservation_jeu_reserve}`, authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

        setTrig(row)
        setOpenDelete(false);
    };


    return (
        <div>
            <IconButton onClick={handleClickOpenDelete} aria-label="delete">
                <DeleteIcon fontSize="small"/>
            </IconButton>
            <AlertDialogDelete titre="Retirer le jeu ?"
                               message={"Etes vous sur de vouloir retirer : " + row.id_jeu}
                               onClose={handleCloseDelete} onDelete={handleDelete} open={openDelete}/>
        </div>

    )


}
export default DeleteJeuReserve
