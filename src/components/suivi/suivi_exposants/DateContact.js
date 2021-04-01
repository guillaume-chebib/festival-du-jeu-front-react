import React from "react";
import {requestToBack} from "../../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import DatePickerComponent from "../DatePickerComponent";


const DateContact = ({row, id, disabled, setTrig}) => {
    const authHeader = useAuthHeader()

    let val
    switch (id) {
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
        switch (id) {
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
        console.log(row)
        const response = await requestToBack('PUT', row, `/societe/${row.id}/priseContact/festival/${row.id_festival_prise_contact}`, authHeader())
        // const body = await response[0]

        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setTrig(row)
    };

    return <DatePickerComponent val={val}
                                id={'date-picker-inline-' + id + row.id}
                                disabled={disabled}
                                handleDateChange={handleDateChange}
    />


}
export default DateContact
