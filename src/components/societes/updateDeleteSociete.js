import React, {useState} from "react";
import IconButton from "@material-ui/core/IconButton";
import DeleteIcon from "@material-ui/icons/Delete";
import {ThemeProvider} from "@material-ui/core/styles";
import {themeFestival} from "../styles/themes";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import UpdateSocieteModal from "./updateSocieteModal";
import {DeleteSocieteModal} from "./deleteSocieteModal";



export const UpdateDeleteSociete = ({row,setTrig}) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);
    const [societes,setSocietes] = useState(row)

    const onClickOpenEdit = () => {
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
        console.log(societes)
        const response = await fetch(`/societe/${row.id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(societes),
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
        const response = await fetch(`/societe/${row.id}`, {
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
            <ThemeProvider theme={themeFestival}>
                <Fab size="small" color="primary" aria-label="edit" onClick={onClickOpenEdit}>
                    <EditIcon/>
                </Fab>
                <Fab size="small" color="secondary" aria-label="delete" onClick={onClickOpenDelete}>
                    <DeleteIcon />
                </Fab>
            </ThemeProvider>

            <UpdateSocieteModal titre="Editer société" row={societes} setRow={setSocietes} onClose={handleCloseEdit} onUpdate={handleUpdate} open={openEdit}/>
            <DeleteSocieteModal open={openDelete} onClose={handleCloseDelete} onDelete={handleDelete} message={"Etes vous sûr de vouloir supprimer : "+row.nom_societe + " ?"} titre="Supprimer société"/>
        </div>

    )


}


