import React, { useEffect, useState} from 'react';
import {useAuthHeader} from 'react-auth-kit'
import {requestToBack} from "../../utils/utils_functions";
import SuiviReservations from "../suivi/suivi_reservations/suivi_reservations";
import Facturation from "./facturation";

const RedirectFacturation = () => {
    const authHeader = useAuthHeader()

    const [festival,setFestival] = useState()
    const [trig,setTrig] = useState([])


    useEffect(() => {

        async function fetchData() {
            const response = await requestToBack('GET',null,`/festival/courant`,authHeader())

            const body = await response[0].message[0]
            console.log("FEST "+ body)
            if (response[1] !== 200) {
                console.log(response[1])
            }
            else {
                setFestival(body)
            }

        }

        fetchData();

    },[trig]);


    return (
        <div>
            {festival &&
            <Facturation id_festival={festival.id_festival}/>
            }
        </div>
    )
}

export default RedirectFacturation
