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
import {requestToBack} from "../../utils/utils_functions";
import useStylesTableValueColor from "../table/styles";
import {CheckBox} from "@material-ui/icons";
import {UpdateDeleteSociete} from "./updateDeleteSociete";




const Exposant = () => {

    const classes = useStylesTableValueColor();
    const authHeader = useAuthHeader()
    const history = useHistory();
    const [exposants,setExposants] = useState([])
    const [trig,setTrig] = useState([])


    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'nom_societe', headerName: "Nom de l'exposant", flex: 1,type: 'string'},
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
        {
            field: "",
            headerName: "",
            sortable: false,
            flex:1,
            disableClickEventBubbling: true,
            renderCell: (params: CellParams) => {

                return <UpdateDeleteSociete row={params.row} setTrig={setTrig}/>
            }
        },

    ]

    function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    useEffect(() => {
        async function fetchData() {
            const response = await requestToBack('GET',null,`/societe/exposant`,null)

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

export default Exposant
