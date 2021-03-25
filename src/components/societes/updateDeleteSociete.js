import React, {useState} from "react";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import ModalSociete from "./modalSociete";

const UpdateDeleteSociete = ({row,setTrig,societes}) => {

    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [societe,setSociete] = useState(row);
    const authHeader = useAuthHeader()


    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleClickOpenEdit = () => {
        setOpenEdit(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleDelete = async () => {
        const response = await requestToBack('DELETE',row,`/societe/${row.id}`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

        console.log(body.message)
        setTrig(row)
        setOpenDelete(false);
    };

    const handleEdit = async () => {

        const response = await requestToBack('PUT',societe,`/societe/${row.id}`,authHeader())
        const body = await response[0]

        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        console.log(body.message)
        setTrig(row)

        setOpenEdit(false);
    };

    return (
        <div>

            <UpdateDeleteButtons onClickOpenDelete={handleClickOpenDelete} onClickOpenEdit={handleClickOpenEdit} />

            <ModalSociete titre="Editer société" editeurs = {societes} row={societe} setRow={setSociete} onClose={handleCloseEdit} onUpdate={handleEdit} open={openEdit}/>
            <AlertDialogDelete titre="Supprimer société" message={"Etes vous sur de vouloir supprimer : "+row.id} onClose={handleCloseDelete} onDelete={handleDelete} open={openDelete}/>
        </div>

    )


}
export default UpdateDeleteSociete
