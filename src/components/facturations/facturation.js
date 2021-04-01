import React, { useEffect, useState} from 'react';
import {IsAdmin, requestToBack} from "../../utils/utils_functions"
import {useAuthHeader} from 'react-auth-kit'


const Facturation = ({id_festival}) => {

    const authHeader = useAuthHeader()
    const [CAPrevu, setCAPrevu] = useState()
    const [CAReel, setCAReel] = useState()
    const [trig, setTrig] = useState([])

    useEffect(() => {

        async function fetchData() {
            const [responseCAPrevu, reponseCAReel] = await Promise.all([
                await requestToBack('GET',null,`/festival/${id_festival}/caPrevu`,authHeader()),
                await requestToBack('GET',null,`/festival/${id_festival}/caReel`,authHeader())
            ]);
            const bodyCAPrevu = await responseCAPrevu[0]
            const CAPrevu = bodyCAPrevu.message[0].ca_prevu

            if (responseCAPrevu[1] !== 200) {
                console.log(responseCAPrevu[1])
            }
            else {
                setCAPrevu(CAPrevu)
            }

            const bodyCAReel = await reponseCAReel[0]
            const CAReel = bodyCAReel.message[0].ca_reel

            if (reponseCAReel[1] !== 200) {
                console.log(reponseCAReel[1])
            }
            else {
                setCAReel(CAReel)
            }

        }

        fetchData();

    },[trig]);

    let pourcentPaye;
    if(CAReel !== undefined && CAReel !==null && CAPrevu!== undefined && CAPrevu !== null){
        pourcentPaye = (CAReel.ca_reel/CAPrevu.ca_prevu)*100
    } else {
        pourcentPaye = 0
    }

    return (
        <div>
            <IsAdmin/>
            <div>
                <h1>
                    Facturation
                </h1>

                <div>
                    CA PREVU : {CAPrevu} €
                </div>
                <div>
                    CA REEL : {CAReel} €
                </div>
                <div>
                    Pourcentage du CA payé : {pourcentPaye} %
                </div>
            </div>
        </div>

    )
}

export default Facturation
