import React, {useState} from "react";
import {requestToBack} from "../../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const DateContact = ({row,id,disabled}) => {
    const authHeader = useAuthHeader()

    let val
    switch (id){
        case 1:
            val = row.premier_prise_contact
            break
        case 2:
            val = row.deuxieme_prise_contact
            break
        case 3:
            val = row.troisieme_prise_contact
            break
    }

    // const [selectedDate, setSelectedDate] = React.useState(val);
    const handleDateChange = async (date) => {
        console.log(row)
        switch (id){
            case 1:
                row.premier_prise_contact = date
                break
            case 2:
                row.deuxieme_prise_contact = date
                break
            case 3:
                row.troisieme_prise_contact = date
                break
        }
        const response = await requestToBack('PUT',row,`/societe/${row.id}/priseContact/festival/${row.id_festival_prise_contact}`,authHeader())
        const body = await response[0]

        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

    };
    const name_id = 'date-picker-inline-' + id
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id={name_id}
                    disabled={disabled}
                    label="Date picker inline"
                    value={val}
                    InputProps={{
                        disableUnderline: true,
                    }}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                        'aria-label': 'change date',
                    }}
                />
            </Grid>
        </MuiPickersUtilsProvider>

    )


}
export default DateContact
