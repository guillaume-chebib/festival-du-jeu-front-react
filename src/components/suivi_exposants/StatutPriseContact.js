import React, {useState} from "react";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';
import {MenuItem, Select} from "@material-ui/core";


const StatutPriseContact = ({row,setTrig,statuts}) => {
    const [statut, setStatut] = React.useState(row.statut_prise_contact);

    const handleChangeStatus = (event) => {
        setStatut(event.target.value);

    };


    return (
        <Select
            labelId="demo-simple-select-filled-label"
            id="id_editeur_jeu"
            value={statut}
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
