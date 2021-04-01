import React, {useState} from "react";
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
} from '@material-ui/pickers';


const DatePickerComponent = ({val,id,disabled,handleDateChange}) => {
    const name_id = 'date-picker-inline-' + id
    return (
        <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
                <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id={name_id}
                    disabled={disabled}
                    label="Date"
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
export default DatePickerComponent
