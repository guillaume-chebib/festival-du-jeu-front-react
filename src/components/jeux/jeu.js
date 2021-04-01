import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import {DataGrid} from '@material-ui/data-grid';
import useStylesTableValueColor from "../table/styles";
import {IsAdmin, renameKey, requestToBack} from "../../utils/utils_functions"
import UpdateDeleteJeu from "./UpdateDeleteJeu";
import {useAuthHeader} from 'react-auth-kit'
import CreateJeu from "./CreateJeu";
import {Checkbox} from "@material-ui/core";
import LinkIcon from '@material-ui/icons/Link';
import {themeFestival} from "../styles/themes";
import Fab from "@material-ui/core/Fab";
import {ThemeProvider} from "@material-ui/core/styles";


const Jeu = () => {

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [jeux, setJeux] = useState([])
    const [editeurs, setEditeurs] = useState([])
    const [trig, setTrig] = useState([])
    const authHeader = useAuthHeader()


    const columns = [
        {field: 'id', headerName: 'ID', hide: true},
        {field: 'titre_jeu', headerName: 'Titre du jeu', flex: 1, type: 'string'},
        {field: 'min_joueur_jeu', headerName: 'Joueur minimum', flex: 1, type: 'number'},
        {field: 'max_joueur_jeu', headerName: 'Joueur maximum', flex: 1, type: 'number'},
        {field: 'age_min_jeu', headerName: 'Age requis', flex: 1, type: 'number'},
        {field: 'duree_jeu', headerName: 'Durée(en min)', flex: 1, type: 'number'},
        {field: 'nom_societe', headerName: 'Editeur', flex: 1, type: 'string'},
        {
            field: 'Prototype', headerName: 'Prototype', flex: 1,
            renderCell: (params) => {
                return <Checkbox
                    checked={params.row.proto_jeu}
                    inputProps={{'aria-label': 'primary checkbox'}}
                />

            }
        },
        {
            field: 'url_consignes_jeu', headerName: 'Règles', flex: 1,
            renderCell: (params) => {
                if (params.row.url_consignes_jeu !== null) {
                    return (
                        <ThemeProvider theme={themeFestival}>
                            <Fab size="small" color="primary" aria-label="edit" href={params.row.url_consignes_jeu}
                                 target="_blank">
                                <LinkIcon/>
                            </Fab>
                        </ThemeProvider>
                    )
                }
            }
        },
        {
            field: '', headerName: 'Update', flex: 1,
            renderCell: (params) => {
                return <UpdateDeleteJeu row={params.row} setTrig={setTrig} editeurs={editeurs}/>
            }
        },

    ]


    useEffect(() => {

        async function fetchData() {
            const [responseJeu, reponseEditeur] = await Promise.all([
                await requestToBack('GET', null, `/jeu`, authHeader()),
                await requestToBack('GET', null, `/societe/editeurs/`, authHeader())
            ]);
            const bodyJeu = await responseJeu[0]
            const jeux = bodyJeu.message

            if (responseJeu[1] !== 200) {
                console.log(responseJeu[1])
            } else {
                jeux.forEach(obj => renameKey(obj, 'id_jeu', 'id'));
                setJeux(jeux)
            }

            const bodyEditeur = await reponseEditeur[0]
            const list_editeurs = bodyEditeur.message
            if (reponseEditeur[1] !== 200) {
                console.log(reponseEditeur[1])
            } else {
                setEditeurs(list_editeurs)
            }

        }

        fetchData();

    }, [trig]);

    return (
        <div>
            <div>
                <h1>
                    Liste des jeux
                </h1>
                <CreateJeu setTrig={setTrig} editeurs={editeurs}/>

            </div>

            <div style={{paddingTop: '2em'}}>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid sortModel={[
                        {

                            field: 'id',
                            sort: 'desc',

                        },
                    ]}
                              className={classes.root}
                              rows={jeux}
                              {...jeux} columns={columns} pageSize={5}/>
                </div>
            </div>
        </div>

    )
}

export default Jeu
