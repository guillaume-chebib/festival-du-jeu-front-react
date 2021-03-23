import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateOrganisateurModal from "./updateOrganisateurModal";
import {useAuthHeader} from 'react-auth-kit'
import {requestToBack} from "../../utils/utils_functions";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import AlertDialogDelete from "../modals/AlertDialogDelete";



export const UpdateDeleteOrganisateur = ({row,setTrig}) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [organisateur,setOrganisateur] = useState(row)
    const authHeader = useAuthHeader()


    const onClickOpenEdit = () => {
        setOrganisateur(prevState => ({
            ...prevState,
            mot_de_passe_organisateur: ""
        }))
        setOpenEdit(true);
    };

    const onClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseEdit = () => {
        setOpenEdit(false);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleUpdate = async () => {
        console.log(organisateur)
        const response = await requestToBack('PUT',organisateur,`/organisateur/${row.id}`,authHeader())


        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        console.log(body.message)
        setOpenEdit(false)
        setTrig(row)

    };

    const handleDelete = async () => {
        console.log(row)
        const response = await requestToBack('DELETE',row,`/organisateur/${row.id}`,authHeader())


        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

        console.log(body.message)
        setTrig(row)
    };

    return (
        <div>

            <UpdateDeleteButtons onClickOpenEdit={onClickOpenEdit} onClickOpenDelete={onClickOpenDelete}/>

            <UpdateOrganisateurModal titre="Editer organisateur" row={organisateur} setRow={setOrganisateur} onClose={handleCloseEdit} onUpdate={handleUpdate} open={openEdit}/>
            <AlertDialogDelete open={openDelete} onClose={handleCloseDelete} onDelete={handleDelete} message={"Etes vous sur de vouloir supprimer : "+row.nom_organisateur + " " + row.prenom_organisateur} titre="Supprimer organisateur"/>
        </div>

    )


}


