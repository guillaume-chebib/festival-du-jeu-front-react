import React, { useEffect, useState} from 'react';
import {IsAdmin, requestToBack} from "../../utils/utils_functions"
import {useAuthHeader} from 'react-auth-kit'
import LinearProgress from '@material-ui/core/LinearProgress';
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles, withStyles } from '@material-ui/core/styles';


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
        pourcentPaye = (CAReel/CAPrevu)*100
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
                    Pourcentage du CA payé :
                </div>
                <Box display="flex" alignItems="center">
                    <Box width="100%" mr={1}>
                        <BorderLinearProgress variant="determinate" value={pourcentPaye} />

                    </Box>
                    <Box minWidth={35}>
                        <Typography variant="body2" color="textSecondary">{`${pourcentPaye
                        }%`}</Typography>
                    </Box>
                </Box>

            </div>
        </div>

    )
}


const BorderLinearProgress = withStyles((theme) => ({
    root: {
        height: 10,
        borderRadius: 5,
    },
    bar: {
        borderRadius: 5,
        backgroundColor: '#1a90ff',
    },
}))(LinearProgress);
export default Facturation
