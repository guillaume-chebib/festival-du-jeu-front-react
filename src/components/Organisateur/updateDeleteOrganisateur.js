import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import UpdateOrganisateurModal from "./updateOrganisateurModal";
import {ThemeProvider} from "@material-ui/core/styles";
import {themeFestival} from "../styles/themes";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import AlertDialogDelete from "../modals/AlertDialogDelete";



export const UpdateDeleteOrganisateur = ({row,setTrig}) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [organisateur,setOrganisateur] = useState(row)

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
        const response = await fetch(`/organisateur/${row.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(organisateur),
        });

        const body = await response.json()
        if (response.status !== 200) {
            console.log("erreur serveur")
        }
        console.log(body.message)
        setOpenEdit(false)
        setTrig(row)

    };

    const handleDelete = async () => {
        console.log(row)
        const response = await fetch(`/organisateur/${row.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(row),
        });

        const body = await response.json()
        if (response.status !== 200) {
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


