import React, { useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';

import useStylesTableValueColor from "../table/styles";
import {CheckBox} from "@material-ui/icons";

function getFullAdresse(params: ValueGetterParams) {
    return `${params.getValue('numero_rue_editeur')+', ' || ''} ${
        params.getValue('rue_editeur') || ''} \n ${params.getValue('code_postal_editeur') || ''} ${params.getValue('ville_editeur') || ''}`;
}


const Editeur = () => {

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [editeurs,setEditeurs] = useState([])
    const [open, setOpen] = React.useState(false);


    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'nom_societe', headerName: "Nom de l'editeur", flex: 1,type: 'string'},
        {field: 'numero_rue_editeur', headerName: 'NumeroRue', hide: true},
        {field: 'rue_editeur', headerName: 'Rue', hide: true},
        {field: 'code_postal_editeur', headerName: 'CP', hide: true},
        {field: 'ville_editeur', headerName: 'Ville', hide: true},
        { field: 'adresse', headerName: 'Adresse', flex: 1,
            valueGetter: getFullAdresse,
            sortComparator: (v1, v2, cellParams1, cellParams2) =>
                getFullAdresse(cellParams1).localeCompare(getFullAdresse(cellParams2)),
        },
        {
            field: 'est_inactif_societe',
            headerName: 'Inactif ?',
            renderCell: (params: GridCellParams) => {
                console.log(params.getValue('est_inactif_societe'))
                return (<CheckBox
                    aria-checked={params.getValue('est_inactif_societe')}
                    checked={params.getValue('est_inactif_societe')}
                ></CheckBox>)
            },
        },
    ]

    function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/societe/editeur`);
            const body = await response.json();

            const editeurs = body.message
            console.log(editeurs)

            editeurs.forEach(obj => renameKey(obj, 'id_societe', 'id'));
            setEditeurs(editeurs)

        }

        fetchData();

    },[]);



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
                          rows={editeurs}
                          {...editeurs} columns={columns} pageSize={5} />
            </div>
        </div>
    )
}

export default Editeur
