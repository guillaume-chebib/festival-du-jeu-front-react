import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';
import useStylesTableValueColor from "../table/styles";
import {useAuthHeader} from 'react-auth-kit'
import {IsAdmin, renameKey, requestToBack} from "../../utils/utils_functions";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {EtatReservation} from "./EtatReservation";

const Reservation = () => {
    const classes = useStylesTableValueColor();
    const authHeader = useAuthHeader()

    const history = useHistory();
    const [reservation,setReservation] = useState()

    const preventDefault = (event) => event.preventDefault();
    const [trig,setTrig] = useState([])



    const {id} = useParams()

    useEffect(() => {

        async function fetchData() {
            const responseReservation = await requestToBack('GET',null,`/reservation/`+id,authHeader())

            const bodyReservation = await responseReservation[0]
            const reserv = bodyReservation.message
            console.log(reserv)

            reserv.id = reserv.id_reservation
            delete reserv.id_reservation
            if (responseReservation[1] !== 200) {
                console.log(responseReservation[1])
            }
            else {
                setReservation(reserv)

            }


        }

        fetchData();

    },[trig]);


    return (
        <div>
            <IsAdmin/>
            <h1>
                Réservation de : {
                    reservation && (reservation.nom_societe)
                }

            </h1>
            <div>
                {reservation && <EtatReservation row={reservation} setTrig={setTrig} />}
            </div>



        </div>
    )
}

export default Reservation
