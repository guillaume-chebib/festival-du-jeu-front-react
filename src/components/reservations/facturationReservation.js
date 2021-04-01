import DateFactureReservation from "../suivi/suivi_reservations/DateFactureReservation";
import React from "react";
import {FormControlLabel} from "@material-ui/core";


export const FacturationReservation = ({row, setTrig}) => {

    return (
        <div>
            <div style={{display: "inline-block", margin: '20px'}}>
                <FormControlLabel
                    control={<DateFactureReservation row={row} setTrig={setTrig} id={1}
                                                     disabled={row.date_paye_facture !== null}/>}
                    label="Facture envoyé ?"
                    labelPlacement={"top"}
                />
            </div>
            <div style={{display: "inline-block", margin: '20px'}}>
                <FormControlLabel
                    control={<DateFactureReservation row={row} setTrig={setTrig} id={2}/>}
                    label="Facture payé ?"
                    labelPlacement={"top"}
                />
            </div>
        </div>
    )

}
