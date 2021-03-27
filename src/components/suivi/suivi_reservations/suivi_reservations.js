import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';
import useStylesTableValueColor from "../../table/styles";
import {useAuthHeader} from 'react-auth-kit'
import {renameKey, requestToBack} from "../../../utils/utils_functions";
import DateContact from "../suivi_exposants/DateContact";
import DateFactureReservation from "./DateFactureReservation";
import {CheckBox} from "@material-ui/icons";
import {Checkbox} from "@material-ui/core";




const SuiviReservations = () => {
    let {id} = useParams();


    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [reservations,setReservations] = useState([])
    const [statuts,setStatuts] = useState([])
    const [trig,setTrig] = useState([])
    const authHeader = useAuthHeader()
    const [reserva,setReservation]= useState([])
    const [openCreate, setOpenCreate] = useState(false);
    const handleClickOpenCreate = () => {
        setOpenCreate(true);
    };

    const handleCloseCreate = () => {
        setOpenCreate(false);
    };

    const updateRow = async (row) =>{
        row.besoin_benevole_reservation = !row.besoin_benevole_reservation

        const response = await requestToBack('PUT',row,`/reservation/${row.id}`,authHeader())
        const body = await response[0]

        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

    }
    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'nom_societe', headerName: 'Nom de la société', flex: 1,type: 'string'},
        { field : 'besoin_benevole_reservation', headerName: 'Besoin de bénévole', flex: 1,
            renderCell: (params) =>{
                return <Checkbox
                    checked={params.row.besoin_benevole_reservation}
                    onChange={(e) => {
                        console.log(e.target.value)
                    }
                    }
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />
            }
        },
        { field : 'deplacement_reservation', headerName: 'Déplacement', flex: 1},
        { field : 'apport_jeux_reservation', headerName: 'Apport des jeux', flex: 1},
        { field : 'reduction_reservation', headerName: 'Réduction', flex: 1},
        { field : 'cr_envoye_reservation', headerName: 'Cr envoyé', flex: 1},
        { field : 'date_envoi_facture', headerName: 'Date envoi facture', flex: 1,
            renderCell: (params) =>{
                return <DateFactureReservation row = {params.row} setTrig={setTrig} id={1} disabled={params.row.date_paye_facture !== null}/>
            }
        },
        { field : 'date_paye_facture', headerName: 'Date facture paye', flex: 1,
            renderCell: (params) =>{
                return <DateFactureReservation row = {params.row} setTrig={setTrig} id={2}/>
            }
        },
    ]


    useEffect(() => {

        async function fetchData() {
            const responseReservation = await requestToBack('GET',null,`/festival/${id}/reservation`,authHeader())

            const bodyReservation = await responseReservation[0]
            const listesReservations = bodyReservation.message

            if (responseReservation[1] !== 200) {
                console.log(responseReservation[1])
            }
            else {
                listesReservations.forEach(obj => renameKey(obj, 'id_reservation', 'id'));
                const updatedJson = JSON.stringify(listesReservations);
                console.log(listesReservations)
                setReservations(listesReservations)
            }
        }

        fetchData();

    },[trig]);


    return (
        <div>
            <div>
                <h1>
                    Suivi des réservations
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
                              rows={reservations}
                              {...reservations} columns={columns} pageSize={5} />
                </div>
            </div>
        </div>

    )
}

export default SuiviReservations
