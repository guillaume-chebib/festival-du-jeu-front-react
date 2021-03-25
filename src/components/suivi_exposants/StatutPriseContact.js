import React, {useState} from "react";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {MenuItem, Select} from "@material-ui/core";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";


const StatutPriseContact = ({row,setTrig,statuts}) => {
    const authHeader = useAuthHeader()

    const handleChangeStatus = async (event) => {
        row.statut_prise_contact = event.target.value
        const response = await requestToBack('PUT',row,`/societe/${row.id}/priseContact/festival/${row.id_festival_prise_contact}`,authHeader())
        const body = await response[0]

        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
    };


    return (
        <Select
            labelId="demo-simple-select-filled-label"
            id="id_editeur_jeu"
            value={row.statut_prise_contact}
            onChange={handleChangeStatus}
        >
            {
                statuts.map(s => <MenuItem value={s.unnest}>{s.unnest}</MenuItem>

                )
            }
        </Select>

    )


}
export default StatutPriseContact
