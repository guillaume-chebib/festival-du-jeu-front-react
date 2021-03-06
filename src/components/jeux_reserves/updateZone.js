import React, {useState} from "react";
import {useAuthHeader} from "react-auth-kit";
import Button from "@material-ui/core/Button";
import {Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField} from "@material-ui/core";
import {requestToBack} from "../../utils/utils_functions";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";


const UpdateZone = ({row, setRow, setTrig, zones, onUpdate}) => {
    const authHeader = useAuthHeader()
    const [openDialog, setOpenDialog] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleChangeZone = async () => {
        const response = await requestToBack('PUT', row, `/reservation/${row.id_reservation_jeu_reserve}/jeuReserve/${row.id}`, authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setTrig(row)
        handleCloseDialog()
    };

    return (
        <div>
            <IconButton onClick={handleOpenDialog} aria-label="edit">
                <EditIcon fontSize="small"/>
            </IconButton>
            <Dialog onClose={handleCloseDialog} open={openDialog}>
                <DialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
                    Modifier la zone
                </DialogTitle>
                <ModalZone row={row} setRow={setRow} zones={zones} onClose={handleCloseDialog}
                           onUpdate={handleChangeZone}/>
            </Dialog>
        </div>
    )
}

const ModalZone = ({row, setRow, zones, onClose, onUpdate}) => {

    return (<div>
        <DialogContent>
            <TextField
                id="outlined-select-currency"
                select
                required
                fullWidth
                label="Zones"
                value={row.id_zone_jeu_reserve}
                onChange={(e) => {
                    row.id_zone_jeu_reserve = e.target.value
                }}
                variant="outlined"
            >
                {zones.map((option) => (
                    <MenuItem key={option.zone.id_zone} selected={row.id_zone_jeu_reserve === option.zone.id_zone}
                              value={option.zone.id_zone}>
                        {option.zone.nom_zone}
                    </MenuItem>
                ))}
            </TextField>
        </DialogContent>
        <DialogActions>
            <Button color="primary" onClick={onClose}>
                Annuler
            </Button>
            <Button onClick={onUpdate} color="primary" autoFocus>
                Oui
            </Button>
        </DialogActions>
    </div>)

}
export default UpdateZone
