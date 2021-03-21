import React, { useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

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

import useStylesTableValueColor from "../table/styles";
import {CheckBox} from "@material-ui/icons";




const Exposant = () => {

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [exposants,setExposants] = useState([])
    const [open, setOpen] = React.useState(false);


    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'nom_societe', headerName: "Nom de l'exposant", flex: 1,type: 'string'},
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
            const response = await fetch(`/societe/exposant`);
            const body = await response.json();

            const exposants = body.message
            console.log(exposants)

            exposants.forEach(obj => renameKey(obj, 'id_societe', 'id'));
            setExposants(exposants)

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
                          rows={exposants}
                          {...exposants} columns={columns} pageSize={5} />
            </div>
        </div>
    )
}

export default Exposant
