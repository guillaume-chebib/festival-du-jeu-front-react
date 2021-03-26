import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';
import useStylesTableValueColor from "../../table/styles";
import {renameKey, requestToBack} from "../../../utils/utils_functions"
import {useAuthHeader} from 'react-auth-kit'
import ListeContact from "./ListeContact";

import DateContact from "./DateContact";
import StatutPriseContact from "./StatutPriseContact";




const SuiviExposants = () => {
    let {id} = useParams();


    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [editeurs,setEditeurs] = useState([])
    const [statuts,setStatuts] = useState([])
    const [trig,setTrig] = useState([])
    const authHeader = useAuthHeader()

    const [openCreate, setOpenCreate] = useState(false);
    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };


    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'nom_societe', headerName: 'Nom de la société', flex: 1,type: 'string'},
        { field : 'premier_prise_contact', headerName: 'Première prise de contact', flex: 1,type: 'date',
            renderCell: (params) =>{
                return <DateContact row = {params.row} id={1} disabled={params.row.deuxieme_prise_contact !== null}/>
            }
        },
        { field : 'deuxieme_prise_contact', headerName: 'Deuxieme prise de contact', flex: 1,type: 'date',
            renderCell: (params) =>{
                if(params.row.premier_prise_contact !== null){
                    return <DateContact row = {params.row} id={2} disabled={params.row.troisieme_prise_contact !== null}/>
                }
            }
        },
        { field : 'troisieme_prise_contact', headerName: 'Troisième prise de contact', flex: 1,type: 'date',
            renderCell: (params) =>{
                if(params.row.deuxieme_prise_contact !== null){
                    return <DateContact row = {params.row}  id={3}/>
                }
            }
        },
        { field : 'statut_prise_contact', headerName: 'Statut prise de contact', flex: 1,
            renderCell: (params) =>{
                return (
                    <StatutPriseContact row = {params.row} setTrig={setTrig} statuts={statuts} />

                )

            }
        },
        { field : 'Contacts', headerName: 'Contacts', flex: 1,
            renderCell: (params) =>{

                //return <ListeContact nom_societe={params.row.nom_societe} id_societe={params.row.id_societe} contacts={params.row.contacts} isEdit={false}/>

                return <ListeContact row = {params.row} setTrig={setTrig} />


            }
        },


    ]


    useEffect(() => {

        async function fetchData() {
            const [responsePriseContact, reponseStatuts] = await Promise.all([
                await requestToBack('GET',null,`/festival/${id}/prise_contact`,authHeader()),
                await requestToBack('GET',null,`/priseContact/statutsPriseContact/`,authHeader())
            ]);
            const bodyEditeursNonInactif = await responsePriseContact[0]
            const editeursNonInactif = bodyEditeursNonInactif.message

            if (responsePriseContact[1] !== 200) {
                console.log(responsePriseContact[1])
            }
            else {
                editeursNonInactif.forEach(obj => renameKey(obj, 'id_societe', 'id'));
                const updatedJson = JSON.stringify(editeursNonInactif);
                setEditeurs(editeursNonInactif)
            }

            const bodyStatuts = await reponseStatuts[0]
            const list_statuts = bodyStatuts.message
            if (reponseStatuts[1] !== 200) {
                console.log(reponseStatuts[1])
            }
            else {
                setStatuts(list_statuts.rows)

            }

        }

        fetchData();

    },[trig]);


    return (
        <div>
            <div>
                <h1>
                    Suivi des éditeurs
                </h1>

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
                              rows={editeurs}
                              {...editeurs} columns={columns} pageSize={5} />
                </div>
            </div>
        </div>

    )
}

export default SuiviExposants
