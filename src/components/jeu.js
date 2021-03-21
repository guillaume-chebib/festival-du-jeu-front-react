import React, { useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import { DataGrid } from '@material-ui/data-grid';
import useStylesTableValueColor from "./table/styles";



//TODO: recuperer tous les jeux et les afficher
//TODO: formulaire pour ajouter un jeu
const Jeu = () => {

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [jeux,setJeux] = useState([])


    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'titre_jeu', headerName: 'Titre du jeu', width: 400}
        ]

    function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/jeu`);
            const body = await response.json();

            const jeux = body.message

            jeux.forEach(obj => renameKey(obj, 'id_jeu', 'id'));
            setJeux(jeux)

        }

        fetchData();

    },[]);


    useEffect( () =>{
        console.log(jeux)
    },[jeux])

    return (
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
    )
}

export default Jeu
