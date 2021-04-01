import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";
import {useAuthHeader} from 'react-auth-kit'
import {renameKey,IsAdmin, requestToBack} from "../../utils/utils_functions";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    makeStyles,
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {EtatReservation} from "./EtatReservation";
import StatutPriseContact from "../suivi/suivi_exposants/StatutPriseContact";
import EspaceReservation from "./EspaceReservation";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import {Comment} from "@material-ui/icons";
import {CommentaireReservation} from "./commentairesReservation";
import JeuxReserves from "../jeux_reserves/jeuxReserves";
import {FacturationReservation} from "./facturationReservation";

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

    const [reservation,setReservation] = useState()
    const [statuts,setStatuts] = useState([])

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
            <IsAdmin/>
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

                    <Accordion>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Jeux liés à cette réservation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <JeuxReserves reservation={reservation} setTrig={setTrig}/>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Commentaires</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <CommentaireReservation row={reservation} setTrig={setTrig}/>
                        </AccordionDetails>
                    </Accordion>

                    <Accordion>
                        <AccordionSummary>
                            <Typography className={classes.heading}>Facturation</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <FacturationReservation row={reservation} setTrig={setTrig}/>
                        </AccordionDetails>
                    </Accordion>
                </div>

            </div>
            }
        </div>
    )
}

export default Reservation
