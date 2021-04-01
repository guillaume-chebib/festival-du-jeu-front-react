import React, { useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useAuthHeader} from 'react-auth-kit';
import {CellParams, DataGrid} from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

import {renameKey, requestToBack} from "../../utils/utils_functions"

import useStylesTableValueColor from "../table/styles";
import {CheckBox} from "@material-ui/icons";
import UpdateDeleteSociete from "./updateDeleteSociete";
import ListeContact from "../suivi/suivi_exposants/ListeContact";


function getFullAdresse(params) {
    return `${params.getValue('numero_rue_editeur')+', ' || ''} ${
        params.getValue('rue_editeur') || ''} \n ${params.getValue('code_postal_editeur') || ''} ${params.getValue('ville_editeur') || ''}`;
}

const EditeurExposant = ({setTrig,trig}) => {

    const classes = useStylesTableValueColor();
    const authHeader = useAuthHeader()
    const history = useHistory();
    const [exposants,setExposants] = useState([])


    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
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
            renderCell: (params) =>
            {
                return <Switch
                    checked={params.row.est_inactif_societe}
                    disabled
                    name="checkedA"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />

            },
        },
        { field : '', headerName: '', flex: 1,
            renderCell:(params) =>
            {

                return <UpdateDeleteSociete row = {params.row} setTrig={setTrig} editeurs = {exposants}/>
            }
        },
        { field : 'Contacts', headerName: 'Contacts', flex: 1,
            renderCell: (params) =>{
                return <ListeContact row = {params.row} setTrig={setTrig} isEdit={true}/>
            }
        },
    ]


    useEffect(() => {
        async function fetchData() {
            const response = await requestToBack('GET',null,`/societe/editeurExposant`,authHeader())

            const body = await response[0]
            const exposants = body.message
            if (response[1] !== 200) {
                setExposants("Impossible de fetch")
            }
            else {
                exposants.forEach(obj => renameKey(obj, 'id_societe', 'id'));
                setExposants(exposants)
            }

        }

        fetchData();

    },[trig]);



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
                          rows={exposants}
                          {...exposants} columns={columns} pageSize={5} />
            </div>
        </div>
    )
}

export default EditeurExposant
