import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {DataGrid} from '@material-ui/data-grid';
import useStylesTableValueColor from "../../table/styles";
import {useAuthHeader} from 'react-auth-kit'
import {IsAdmin, renameKey, requestToBack} from "../../../utils/utils_functions";
import DateFactureReservation from "./DateFactureReservation";
import {Fab, TextField} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import {EtatReservation} from "../../reservations/EtatReservation";
import {ThemeProvider} from "@material-ui/core/styles";
import {themeFestival} from "../../styles/themes";
import LinkIcon from "@material-ui/icons/Link";

const SuiviReservations = ({id_festival}) => {
    const {id} = useParams()

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [reservations, setReservations] = useState([])
    const [trig, setTrig] = useState([])
    const authHeader = useAuthHeader()

    const handleChange = async (row) => {
        const response = await requestToBack('PUT', row, `/reservation/${row.id}`, authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

    };

    const columns = [
        {field: 'id', headerName: 'ID', hide: true},
        {
            field: 'nom_societe', headerName: 'Nom de la société', flex: 1, type: 'string',
            renderCell: (params) => {
                return (
                    <Button
                        onClick={event => {
                            history.push("/reservation/" + params.row.id);
                        }}
                        color="primary"
                    >
                        {params.row.nom_societe}
                    </Button>

                )
            }
        },
        {
            field: 'commentaire_reservation', headerName: 'Commentaire', flex: 2
        },
        {
            field: 'checkbox', headerName: 'Suivi', flex: 4,
            renderCell: (params) => {
                return (
                    <EtatReservation row={params.row} setTrig={setTrig}/>
                )

            }
        },
        {
            field: 'date_envoi_facture', headerName: 'Date envoi facture', flex: 1,
            renderCell: (params) => {
                return <DateFactureReservation row={params.row} setTrig={setTrig} id={1}
                                               disabled={params.row.date_paye_facture !== null}/>
            }
        },
        {
            field: 'date_paye_facture', headerName: 'Date facture paye', flex: 1,
            renderCell: (params) => {
                return <DateFactureReservation row={params.row} setTrig={setTrig} id={2}/>
            }
        },
        {
            field: 'reservation', headerName: 'Reservation', flex: 1,
            renderCell: (params) => {
                return (
                    <ThemeProvider theme={themeFestival}>
                        <Fab size="small" color="primary" aria-label="edit" href={"/reservation/" + params.row.id}>
                            <LinkIcon/>
                        </Fab>
                    </ThemeProvider>
                )
            }
        },
        {field: 'prix_total_reservation', headerName: 'Prix total', flex: 1},


    ]


    useEffect(() => {

        async function fetchData() {
            let responseReservation;
            if (id === undefined) {
                responseReservation = await requestToBack('GET', null, `/festival/${id_festival}/reservation`, authHeader())
            } else {
                responseReservation = await requestToBack('GET', null, `/festival/${id}/reservation`, authHeader())
            }


            const bodyReservation = await responseReservation[0]
            const listesReservations = bodyReservation.message

            if (responseReservation[1] !== 200) {
                console.log(responseReservation[1])
            } else {
                listesReservations.forEach(obj => renameKey(obj, 'id_reservation', 'id'));
                setReservations(listesReservations)
            }
        }

        fetchData();

    }, [trig]);


    return (
        <div>
            <IsAdmin/>
            <div>
                <h1>
                    Suivi des réservations
                </h1>

            </div>

            <div style={{paddingTop: '2em'}}>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid sortModel={[
                        {

                            field: 'id',
                            sort: 'desc',

                        },
                    ]}
                              className={classes.root}
                              rows={reservations}
                              loading={reservations.length === 0}
                              {...reservations} columns={columns} pageSize={5}/>
                </div>
            </div>
        </div>

    )
}

export default SuiviReservations
