import React, {useState} from "react";
import {useAuthHeader} from 'react-auth-kit'
import {requestToBack} from "../../utils/utils_functions";
import {themeFestival} from "../styles/themes";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import {ThemeProvider} from "@material-ui/core/styles";
import {UpdateFestivalModal} from "./updateFestivalModal";


export const UpdateFestival = ({row, setTrig}) => {

    const [openEdit, setOpenEdit] = useState(false);
    const [festival, setFestival] = useState(row)
    const [festivalPost, setFestivalPost] = useState({
        nom_festival: row.nom_festival,
        annee_festival: row.annee_festival,
        id_festival: row.id,
        est_courant_festival: row.est_courant_festival,
        prix_surface_espace_1: row.espaces[0].prix_surface_espace,
        prix_surface_espace_2: row.espaces[1].prix_surface_espace,
        prix_surface_espace_3: row.espaces[2].prix_surface_espace,
        nb_table_espace_1: row.espaces[0].nb_table_espace,
        nb_table_espace_2: row.espaces[1].nb_table_espace,
        nb_table_espace_3: row.espaces[2].nb_table_espace,
        prix_table_espace_1: row.espaces[0].prix_table_espace,
        prix_table_espace_2: row.espaces[1].prix_table_espace,
        prix_table_espace_3: row.espaces[2].prix_table_espace,
    })
    const authHeader = useAuthHeader()


    const onClickOpenEdit = () => {

        setOpenEdit(true);
    };


    const handleCloseEdit = () => {
        setOpenEdit(false);
    };


    const handleUpdate = async () => {
        console.log(festivalPost)

        const [response, response1, response2, response3] = await Promise.all([
            await requestToBack('PUT', {
                id: festivalPost.id_festival,
                annee_festival: festivalPost.annee_festival,
                nom_festival: festivalPost.nom_festival,
                est_courant_festival: festivalPost.est_courant_festival
            }, `/festival/${row.id_festival}`, authHeader()),
            await requestToBack('PUT', {
                prix_table_espace: festivalPost.prix_table_espace_1,
                prix_surface_espace: festivalPost.prix_surface_espace_1,
                nb_table_espace: festivalPost.nb_table_espace_1
            }, `/espace/${row.espaces[0].id_espace}`, authHeader()),
            await requestToBack('PUT', {
                prix_table_espace: festivalPost.prix_table_espace_2,
                prix_surface_espace: festivalPost.prix_surface_espace_2,
                nb_table_espace: festivalPost.nb_table_espace_2
            }, `/espace/${row.espaces[1].id_espace}`, authHeader()),
            await requestToBack('PUT', {
                prix_table_espace: festivalPost.prix_table_espace_3,
                prix_surface_espace: festivalPost.prix_surface_espace_3,
                nb_table_espace: festivalPost.nb_table_espace_3
            }, `/espace/${row.espaces[2].id_espace}`, authHeader())

        ]);


        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        console.log(body.message)
        setOpenEdit(false)
        setTrig(festivalPost)

    };


    return (
        <div>
            <ThemeProvider theme={themeFestival}>
                <Fab size="small" color="primary" aria-label="edit" onClick={onClickOpenEdit}>
                    <EditIcon/>
                </Fab>
            </ThemeProvider>
            <UpdateFestivalModal titre="Editer festival" row={festivalPost} setRow={setFestivalPost}
                                 onClose={handleCloseEdit} onUpdate={handleUpdate} open={openEdit}/>
        </div>

    )


}
