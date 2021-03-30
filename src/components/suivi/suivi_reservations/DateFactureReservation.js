import React, {useState} from "react";
import {requestToBack} from "../../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import DatePickerComponent from "../DatePickerComponent";


const DateFactureReservation = ({row,id,disabled,setTrig}) => {
    const authHeader = useAuthHeader()

    let val
    switch (id){
        case 1:
            val = row.date_envoi_facture
            break
        case 2:
            val = row.date_paye_facture
            break
    }

    const handleDateChange = async (date) => {
        switch (id){
            case 1:
                row.date_envoi_facture = date
                break
            case 2:
                row.date_paye_facture = date
                break
        }

        console.log(row)
        const response = await requestToBack('PUT',row,`/reservation/${row.id}/date`,authHeader())
        const body = await response[0]

        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setTrig(row)
    };

    const name_id = 'date-picker-inline-' + id + row.id
    return <DatePickerComponent val={val}
                                id={name_id}
                                disabled={disabled}
                                handleDateChange={handleDateChange}
    />



}
export default DateFactureReservation
