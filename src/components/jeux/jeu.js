import React, { useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

import useStylesTableValueColor from "../table/styles";
import {renameKey, requestToBack} from "../../utils/utils_functions"
import UpdateDeleteJeu from "./UpdateDeleteJeu";
import {useAuthHeader} from 'react-auth-kit'





const Jeu = () => {

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [jeux,setJeux] = useState([])
    const [trig,setTrig] = useState([])
    const authHeader = useAuthHeader()



    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'titre_jeu', headerName: 'Titre du jeu', flex: 1,type: 'string'},
        { field : 'min_joueur_jeu', headerName: 'Joueur minimum', flex: 1, type: 'number'},
        { field : 'max_joueur_jeu', headerName: 'Joueur maximum', flex: 1, type: 'number'},
        { field : 'age_min_jeu', headerName: 'Age requis', flex: 1, type: 'number'},
        { field : 'duree_jeu', headerName: 'Furée(en min)', flex: 1, type: 'number'},
        { field: 'Prototype', headerName: 'Prototype', flex: 1,
            renderCell: (params) =>
            {
                return <Switch
                    checked={params.row.proto_jeu}
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />

            }
        },
        { field : 'url_consignes_jeu', headerName: 'Règles du jeu', flex: 1},
        { field : '', headerName: '', flex: 1,
            renderCell:(params) =>
            {

                return <UpdateDeleteJeu row = {params.row} setTrig={setTrig}/>
            }
        },

    ]


    useEffect(() => {
        async function fetchData() {

            const response = await requestToBack('GET',null,`/jeu`,authHeader())
            const body = await response[0]
            const jeux = body.message
            if (response[1] !== 200) {
                console.log(response[1])
            }
            else {
                jeux.forEach(obj => renameKey(obj, 'id_jeu', 'id'));
                const updatedJson = JSON.stringify(jeux);
                console.log(updatedJson);
                setJeux(jeux)
            }

        }

        fetchData();

    },[trig]);


    const handleCreateJeu = async e => {
       //creation jeux modal

    };

    return (
        <div>
            <div>
                <h1>
                    Liste des jeux
                </h1>
                <Button onClick={handleCreateJeu} variant="contained" color="primary">Ajouter un jeu </Button>
            </div>

            <div style={{paddingTop: '2em'}}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid sortModel={[
                        {

                            field: 'id',
                            sort: 'desc',

                        },
                    ]}
                              className={classes.root}
                              rows={jeux}
                              {...jeux} columns={columns} pageSize={5} />
                </div>
            </div>
        </div>

    )
}

export default Jeu
