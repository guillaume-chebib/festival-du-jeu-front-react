import React, {useState} from "react";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import ModalJeu from "./ModalJeu";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";

const UpdateDeleteJeu = ({row,setTrig,editeurs}) => {

    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [jeu,setJeu] = useState(row);
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
        console.log(row.proto_jeu)
        const response = await requestToBack('DELETE',row,`/jeu/${row.id}`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

        console.log(body.message)
        setTrig(row)
        setOpenDelete(false);
    };

    const handleEdit = async () => {

        const response = await requestToBack('PUT',jeu,`/jeu/${row.id}`,authHeader())
        const body = await response[0]
        console.log(row)

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

            <ModalJeu titre="Editer jeu" editeurs = {editeurs} row={jeu} setRow={setJeu} onClose={handleCloseEdit} onUpdate={handleEdit} open={openEdit}/>
            <AlertDialogDelete titre="Supprimer jeu" message={"Etes vous sur de vouloir supprimer : "+row.id} onClose={handleCloseDelete} onDelete={handleDelete} open={openDelete}/>
        </div>

    )


}
export default UpdateDeleteJeu
