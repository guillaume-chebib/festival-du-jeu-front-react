import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';
import useStylesTableValueColor from "../table/styles";
import {useAuthHeader} from 'react-auth-kit'
import {renameKey, requestToBack} from "../../utils/utils_functions";
import {CheckBox} from "@material-ui/icons";
import {Checkbox, FormControlLabel, Link, makeStyles, TextField} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const Reservation = () => {
    const classes = useStylesTableValueColor();
    const authHeader = useAuthHeader()

    const history = useHistory();
    const [reservation,setReservation] = useState([])


    const preventDefault = (event) => event.preventDefault();

    const columns = [

    ]
    const {id} = useParams()

    useEffect(() => {

        async function fetchData() {
            const responseReservation = await requestToBack('GET',null,`/reservation/${id}`,authHeader())

            const bodyReservation = await responseReservation[0]
            const reserv = bodyReservation.message

            if (responseReservation[1] !== 200) {
                console.log(responseReservation[1])
            }
            else {
                console.log(reserv)
                setReservation(reserv)
            }
        }

        fetchData();

    },[]);


    return (
        <div>
            <h1>
                {reservation.nom_societe}
            </h1>
        </div>
    )
}

export default Reservation
