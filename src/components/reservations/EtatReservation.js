import React from "react";
import {Checkbox, FormControlLabel} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";


export const EtatReservation = ({row, setTrig}) => {
    const authHeader = useAuthHeader()

    const handleChange = async (row) => {
        console.log(row)
        const response = await requestToBack('PUT', row, `/reservation/${row.id_reservation}`, authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setTrig(row)

    };

    return <div>
        <FormControlLabel
            control={
                <Checkbox

                    checked={row.besoin_benevole_reservation}

                    onClickCapture={(event => {
                        row.besoin_benevole_reservation = event.target.checked

                        handleChange(row)

                    })}


                    inputProps={{'aria-label': 'primary checkbox'}}
                />
            }
            labelPlacement="top"
            label={<Typography variant="body2" color="textSecondary">Besoin bénévole ?</Typography>}

        />
        <FormControlLabel
            control={
                <Checkbox
                    checked={row.deplacement_reservation}
                    onClickCapture={(event => {
                        row.deplacement_reservation = event.target.checked
                        handleChange(row)
                    })}// a cause du bug datagrid
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
            }
            labelPlacement="top"
            label={<Typography variant="body2" color="textSecondary">Déplacement?</Typography>}

        />
        <FormControlLabel
            control={
                <Checkbox
                    checked={row.apport_jeux_reservation}
                    onClickCapture={(event => {
                        row.apport_jeux_reservation = event.target.checked
                        handleChange(row)
                    })}// a cause du bug datagrid
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
            }
            labelPlacement="top"
            label={<Typography variant="body2" color="textSecondary">Apport des jeux?</Typography>}

        />
        <FormControlLabel
            control={
                <Checkbox
                    checked={row.cr_envoye_reservation}
                    onClickCapture={(event => {
                        row.cr_envoye_reservation = event.target.checked
                        handleChange(row)
                    })}// a cause du bug datagrid
                    inputProps={{'aria-label': 'primary checkbox'}}
                />
            }
            labelPlacement="top"
            label={<Typography variant="body2" color="textSecondary">Cr envoyé?</Typography>}

        />
    </div>


}
