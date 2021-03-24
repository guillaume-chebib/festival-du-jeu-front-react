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


const DateContact = ({value,disabled}) => {
    const [selectedDate, setSelectedDate] = React.useState(value);

    const handleDateChange = (date) => {
        setSelectedDate(date);
    };


    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="MM/dd/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Date picker inline"
                    value={selectedDate}
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
