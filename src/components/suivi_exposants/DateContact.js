import React, {useState} from "react";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import {UpdateDeleteButtons} from "../modals/UpdateDeleteButtons";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import Alert from "@material-ui/lab/Alert";
import Button from "@material-ui/core/Button";
import {Dialog, DialogTitle, List, ListItem, ListItemAvatar, ListItemText, makeStyles} from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import {blue} from "@material-ui/core/colors";
import PersonIcon from '@material-ui/icons/Person';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const DateContact = ({row,id,disabled}) => {
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
        // setSelectedDate(date);
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
        const response = await requestToBack('PUT',jeu,`/jeu/${row.id}`,authHeader())
        const body = await response[0]

        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

    };
    const name_id = 'date-picker-inline-' + {id}





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
