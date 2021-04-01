import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";
import {useAuthHeader} from 'react-auth-kit';
import {DataGrid} from '@material-ui/data-grid';
import Switch from '@material-ui/core/Switch';

import {renameKey, requestToBack} from "../../utils/utils_functions"

import useStylesTableValueColor from "../table/styles";
import UpdateDeleteSociete from "./updateDeleteSociete";
import ListeContact from "../suivi/suivi_exposants/ListeContact";


const Exposant = ({setTrig, trig}) => {

    const classes = useStylesTableValueColor();
    const authHeader = useAuthHeader()
    const history = useHistory();
    const [exposants,setExposants] = useState([])


    const columns = [
        { field: 'id', headerName: 'ID', hide: true },
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
            const response = await requestToBack('GET',null,`/societe/exposant_seulement`,authHeader())

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
