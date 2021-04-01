import React, {useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {DataGrid} from '@material-ui/data-grid';
import useStylesTableValueColor from "../../table/styles";
import {IsAdmin, renameKey, requestToBack} from "../../../utils/utils_functions"
import {useAuthHeader} from 'react-auth-kit'
import ListeContact from "./ListeContact";

import DateContact from "./DateContact";
import StatutPriseContact from "./StatutPriseContact";
import Button from "@material-ui/core/Button";


const SuiviExposants = () => {
    let {id} = useParams();


    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [editeurs, setEditeurs] = useState([])
    const [statuts, setStatuts] = useState([])
    const [reservations, setReservations] = useState([])
    const [trig, setTrig] = useState([])
    const authHeader = useAuthHeader()


    const existeReservation = (id_societe) => {
        return reservations.filter(r => r.id_societe === id_societe)
    }


    const columns = [
        {field: 'id', headerName: 'ID', hide: false},
        {field: 'nom_societe', headerName: 'Nom de la société', flex: 1, type: 'string'},
        {
            field: 'premier_prise_contact', headerName: 'Première prise de contact', flex: 1, type: 'date',
            renderCell: (params) => {
                return <DateContact row={params.row} setTrig={setTrig} id={1}
                                    disabled={params.row.deuxieme_prise_contact !== null}/>
            }
        },
        {
            field: 'deuxieme_prise_contact', headerName: 'Deuxieme prise de contact', flex: 1, type: 'date',
            renderCell: (params) => {
                if (params.row.premier_prise_contact !== null) {
                    return <DateContact row={params.row} setTrig={setTrig} id={2}
                                        disabled={params.row.troisieme_prise_contact !== null}/>
                }
            }
        },
        {
            field: 'troisieme_prise_contact', headerName: 'Troisième prise de contact', flex: 1, type: 'date',
            renderCell: (params) => {
                if (params.row.deuxieme_prise_contact !== null) {
                    return <DateContact row={params.row} id={3} setTrig={setTrig}/>
                }
            }
        },
        {
            field: 'statut_prise_contact', headerName: 'Statut prise de contact', flex: 1,
            renderCell: (params) => {
                return (
                    <StatutPriseContact row={params.row} setTrig={setTrig} statuts={statuts} id={params.row.id}/>

                )

            }
        },
        {
            field: 'Contacts', headerName: 'Contacts', flex: 1,
            renderCell: (params) => {
                return <ListeContact row={params.row} setTrig={setTrig} isEdit={false}/>
            }
        },
        {
            field: 'Reservation', headerName: 'Reservation', flex: 1,
            renderCell: (params) => {
                const reserv = existeReservation(params.row.id)
                if (reserv.length !== 0) { // S'il il y a une reservation pour cette prise de contact
                    return (
                        <Button
                            onClick={event => {
                                console.log(reserv[0])
                                history.push("/reservation/" + reserv[0].id_reservation);
                            }}
                            color="primary"
                            variant="contained"
                        >
                            Réservation
                        </Button>
                    )
                } else {
                    return (
                        <Button
                            onClick={async (e) => {
                                const reservation = {
                                    id_festival: id,
                                    id_societe: params.row.id_societe_prise_contact,
                                    besoin_benevol_reservation: false,
                                    deplacement_reservation: false,
                                    apport_jeux_reservation: false,
                                    reduction_reservation: 0,
                                    cr_envoye_reservation: false
                                }

                                const reponse_reserv = await requestToBack('POST', reservation, `/reservation/`, authHeader())
                                const body = await reponse_reserv[0]
                                if (reponse_reserv[1] !== 200) {
                                    console.log(reponse_reserv[1])

                                } else {
                                    const id_reservation = body.message
                                    history.push("/reservation/" + id_reservation);

                                }


                            }

                            }
                            color="primary"
                            variant="contained"
                        >
                            Création reservation
                        </Button>
                    )
                }
            }
        },


    ]


    useEffect(() => {

        async function fetchData() {
            const [responsePriseContact, reponseStatuts, reponseReservation] = await Promise.all([
                await requestToBack('GET', null, `/festival/${id}/prise_contact`, authHeader()),
                await requestToBack('GET', null, `/priseContact/statutsPriseContact/`, authHeader()),
                await requestToBack('GET', null, `/festival/${id}/reservation`, authHeader())
            ]);
            const bodyEditeursNonInactif = await responsePriseContact[0]
            const editeursNonInactif = bodyEditeursNonInactif.message

            if (responsePriseContact[1] !== 200) {
                console.log(responsePriseContact[1])
            } else {
                editeursNonInactif.forEach(obj => renameKey(obj, 'id_societe', 'id'));
                setEditeurs(editeursNonInactif)
            }

            const bodyStatuts = await reponseStatuts[0]
            const list_statuts = bodyStatuts.message
            if (reponseStatuts[1] !== 200) {
                console.log(reponseStatuts[1])
            } else {
                setStatuts(list_statuts.rows)

            }

            const bodyReserv = await reponseReservation[0]
            const list_reservation = bodyReserv.message
            if (reponseStatuts[1] !== 200) {
                console.log(reponseStatuts[1])
            } else {
                setReservations(list_reservation)

            }
        }

        fetchData();

    }, [trig]);


    return (
        <div>
            <IsAdmin/>
            <div>
                <h1>
                    Suivi des éditeurs
                </h1>

            </div>

            {
                editeurs && statuts && reservations &&
                <div style={{paddingTop: '2em'}}>
                    <div style={{height: 400, width: '100%'}}>
                        <DataGrid sortModel={[
                            {

                                field: 'id',
                                sort: 'desc',

                            },
                        ]}
                                  className={classes.root}
                                  rows={editeurs}
                                  {...editeurs} columns={columns} pageSize={5}/>
                    </div>
                </div>
            }
        </div>

    )
}

export default SuiviExposants
