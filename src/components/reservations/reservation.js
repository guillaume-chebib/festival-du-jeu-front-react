import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';
import useStylesTableValueColor from "../table/styles";
import {useAuthHeader} from 'react-auth-kit'
import {renameKey, requestToBack} from "../../utils/utils_functions";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Checkbox,
    FormControlLabel,
    makeStyles,
    Paper
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {EtatReservation} from "./EtatReservation";
import StatutPriseContact from "../suivi/suivi_exposants/StatutPriseContact";
import EspaceReservation from "./EspaceReservation";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: theme.typography.fontWeightRegular,
    },
}));

const Reservation = () => {
    const authHeader = useAuthHeader()

    const history = useHistory();
    const [reservation,setReservation] = useState()
    const [statuts,setStatuts] = useState([])

    const preventDefault = (event) => event.preventDefault();
    const [trig,setTrig] = useState([])



    const {id} = useParams()

    useEffect(() => {

        async function fetchData() {

            const [responseReservation, reponseStatuts,responseEspaces] = await Promise.all([
                await requestToBack('GET',null,`/reservation/`+id,authHeader()),
                await requestToBack('GET',null,`/priseContact/statutsPriseContact/`,authHeader()),
            ]);

            const bodyReservation = await responseReservation[0]
            const reserv = bodyReservation.message

            reserv.id = reserv.id_reservation
            delete reserv.id_reservation

            if (responseReservation[1] !== 200) {
                console.log(responseReservation[1])
            }
            else {
                setReservation(reserv)

            }

            const bodyStatuts = await reponseStatuts[0]
            const list_statuts = bodyStatuts.message
            if (reponseStatuts[1] !== 200) {
                console.log(reponseStatuts[1])
            }
            else {
                 let list = list_statuts.rows.filter(s => {
                    let val = s.unnest
                    if(val === 'Présence confirmée' || val === 'Présent : Liste jeux demandée' || val === 'Présent : Liste jeux reçue') {
                        return s
                    }

                })
                setStatuts(list)

            }


        }

        fetchData();

    },[trig]);

    const classes = useStyles();

    return (
        <div>
            <h1>
                Réservation de : {
                    reservation && (reservation.nom_societe)
                }

            </h1>
            {reservation &&
            <div>
                <div className={classes.root}>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography className={classes.heading}> Statuts reservation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <EtatReservation row={reservation} setTrig={setTrig} />
                            {statuts && <StatutPriseContact row = {reservation} setTrig={setTrig} statuts={statuts} id={reservation.id_societe}/>}

                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography className={classes.heading}>Accordion 2</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <EspaceReservation setTrig={setTrig} reservation={reservation}/>
                        </AccordionDetails>
                    </Accordion>
                </div>
                <EspaceReservation setTrig={setTrig} reservation={reservation}/>

            </div>
            }
        </div>
    )
}

export default Reservation
