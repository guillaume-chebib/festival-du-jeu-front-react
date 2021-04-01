import React from "react";
import {requestToBack} from "../../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import {Checkbox} from "@material-ui/core";


const CheckBoxReservation = ({row,setTrig}) => {
    const authHeader = useAuthHeader()


    const handleDateChange = async (event) => {
        row.besoin_benevole_reservation = event.target.checked

        const response = await requestToBack('PUT',row,`/reservation/${row.id}`,authHeader())
        const body = await response[0]

        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setTrig(row)

    };

    return <Checkbox
        checked={row.besoin_benevole_reservation}
        onClickCapture={handleDateChange}// a cause du bug datagrid
        // onChange={handleDateChange}
        inputProps={{ 'aria-label': 'primary checkbox' }}
    />



}
export default CheckBoxReservation
