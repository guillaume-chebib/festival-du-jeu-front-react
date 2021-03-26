import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';
import useStylesTableValueColor from "../../table/styles";
import {useAuthHeader} from 'react-auth-kit'
import {renameKey, requestToBack} from "../../../utils/utils_functions";




const SuiviReservations = () => {
    let {id} = useParams();


    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [reservations,setReservations] = useState([])
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
        { field : 'besoin_benevole_reservation', headerName: 'Besoin de bénévole', flex: 1},
        { field : 'deplacement_reservation', headerName: 'Déplacement', flex: 1},
        { field : 'apport_jeux_reservation', headerName: 'Apport des jeux', flex: 1},
        { field : 'reduction_reservation', headerName: 'Réduction', flex: 1},
        { field : 'cr_envoye_reservation', headerName: 'Cr envoyé', flex: 1},
        { field : 'date_envoi_facture', headerName: 'Date envoi facture', flex: 1},
        { field : 'date_paye_facture', headerName: 'Date facture paye', flex: 1},
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
