import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import EditIcon from "@material-ui/icons/Edit";
import ModalJeu from "./modal_jeu";

const DeleteJeu = ({row}) => {

    const [openDelete, setOpenDelete] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);

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

        const response = await fetch(`/jeu/${row.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        const body = await response.json()
        if (response.status !== 200) {
            console.log("erreur serveur")
        }
        console.log(body.message)

        setOpenDelete(false);
    };

    const handleEdit = async () => {

        // const response = await fetch(`/jeu/${row.id}`, {
        //     method: 'DELETE',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // });
        //
        // const body = await response.json()
        // if (response.status !== 200) {
        //     console.log("erreur serveur")
        // }
        // console.log(body.message)

        setOpenDelete(false);
    };

    return (
        <div>
            <IconButton aria-label="delete" onClick={handleClickOpenDelete}>
                <DeleteIcon />
            </IconButton>

            <IconButton aria-label="edit" onClick={handleClickOpenEdit}>
                <EditIcon />
            </IconButton>

            <ModalJeu titre="Supprimer jeu" message={"Etes vous sur de vouloir supprimer : "+row.id} onClose={handleCloseEdit} onDelete={handleEdit} open={openEdit}/>
            <AlertDialogDelete titre="Supprimer jeu" message={"Etes vous sur de vouloir supprimer : "+row.id} onClose={handleCloseDelete} onDelete={handleDelete} open={openDelete}/>
        </div>

    )


}
export default DeleteJeu
