import React, {useEffect, useState} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import {useHistory} from "react-router-dom";
import {useAuthHeader} from "react-auth-kit";
import HelpOutlineRoundedIcon from '@material-ui/icons/HelpOutlineRounded';
import {Checkbox, Tooltip} from "@material-ui/core";
import {renameKey, requestToBack} from "../../../utils/utils_functions";
import {DataGrid} from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function ListJeux() {

    const history = useHistory();
    const [jeux, setJeux] = useState([])
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
        {field: 'url_consignes_jeu', headerName: 'Règles du jeu', flex: 1},

    ]


    useEffect(() => {

        async function fetchData() {
            const responseJeu = await requestToBack('GET', null, `/public/festival/jeu`, authHeader())
            const bodyJeu = await responseJeu[0]
            const jeux = bodyJeu

            if (responseJeu[1] !== 200) {
                console.log(responseJeu[1])
            } else {
                jeux.forEach(obj => renameKey(obj, 'id_jeu', 'id'));
                setJeux(jeux)
            }

        }

        fetchData();

    }, [trig]);

    return (
        <div>
            <div>
                <h1 style={{display: "inline-block", margin: "20px"}}>
                    Liste des jeux
                </h1>

                <Tooltip title="Pour filtrer les jeux : Cliquez sur les options d'une colonne > Filter" arrow
                         placement="right">
                    <HelpOutlineRoundedIcon/>
                </Tooltip>

            </div>

            <div style={{paddingTop: '2em'}}>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid sortModel={[
                        {

                            field: 'id',
                            sort: 'desc',

                        },
                    ]}
                              rows={jeux}
                              {...jeux} columns={columns} pageSize={15}/>
                </div>
            </div>
        </div>

    )
}

