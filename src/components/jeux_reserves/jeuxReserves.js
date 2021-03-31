import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';

import useStylesTableValueColor from "../table/styles";
import {renameKey, requestToBack} from "../../utils/utils_functions"
import {useAuthHeader} from 'react-auth-kit'
import {
    Checkbox,
    Dialog,
    DialogActions, DialogContent,
    DialogTitle,
    FormControlLabel,
    InputLabel,
    MenuItem,
    Select
} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";
import CreateJeuReserve from "./createJeuReserve";
import TextField from "@material-ui/core/TextField";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import ModalContact from "../suivi/suivi_exposants/modalContact";
import Button from "@material-ui/core/Button";
import UpdateZone from "./updateZone";
import DeleteIcon from "@material-ui/icons/Delete";
import AlertDialogDelete from "../modals/AlertDialogDelete";
import CreateZone from "./createZone";
import DeleteJeuReserve from "./deleteZoneReserve";





const JeuxReserves = () => {
    let {id_reservation, id} = useParams()

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [jeux,setJeux] = useState([])
    const [jeu, setJeu] = useState()
    const [jeuxEditeur,setJeuxEditeur] = useState([])
    const [zones,setZones] = useState([])
    const [zone, setZone] = useState()
    const [trig,setTrig] = useState([])
    const authHeader = useAuthHeader()
    const [openDialog, setOpenDialog] = useState(false);
    const [openDelete, setOpenDelete] = useState(false);

    const handleCloseDialog = () => {
        setOpenDialog(false)
    }
    const handleOpenDialog = () => {
        setOpenDialog(true)
    }

    const handleChange = async (row) => {
        const response = await requestToBack('PUT',row,`/reservation/${id_reservation}/jeuReserve/${row.id}`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setTrig(row)

    };

    const handleClickOpenDelete = () => {
        setOpenDelete(true);
    };

    const handleCloseDelete = () => {
        setOpenDelete(false);
    };

    const handleDelete = async () => {
        const response = await requestToBack('DELETE',jeu,`jeuReserve/${jeu.id_jeu_jeu_reserve}/reservation/${jeu.id_reservation_jeu_reserve}`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

        console.log(body.message)
        setTrig(jeu)
        setOpenDelete(false);
    }

    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'titre_jeu', headerName: 'Titre du jeu', flex: 1,type: 'string'},
        {field: 'zones', headerName: 'Emplacement zone', flex: 1,
            renderCell: (params) =>{
            return(
                <div>
                    <div>
                    <TextField
                        id="outlined-select-currency"
                        select
                        required
                        disabled
                        fullWidth
                        label="Zones"
                        value={params.row.id_zone_jeu_reserve}
                        //onChange={(e) => {setZone(e.target.value)}}
                        variant="outlined"
                    >
                        {zones.map((option) => (
                            <MenuItem key={option.zone.id_zone} selected={params.row.id_zone_jeu_reserve===option.zone.id_zone} value={option.zone.nom_zone}>
                                {option.zone.nom_zone}
                            </MenuItem>
                        ))}
                    </TextField>
                        <UpdateZone row={params.row} setRow={setJeu} setTrig={setTrig} zones={zones}/>
                    </div>
                </div>
            )
    }},
        { field : 'quantite_jeu_reserve', headerName: 'Quantité', flex: 1, type: 'float'},
        { field : 'nb_table_jeu_reserve', headerName: 'Nb table', flex: 1, type: 'number'},
        { field : '', headerName: 'Dotation', flex: 1,
            renderCell: (params) =>
            {
                return (
                <FormControlLabel
                    control={
                        <Checkbox
                            checked={params.row.dotation_jeu_reserve}
                            onClickCapture={(event => {
                                params.row.dotation_jeu_reserve = event.target.checked
                                handleChange(params.row)
                            })}// a cause du bug datagrid
                            onChange={handleChange}

                            inputProps={{ 'aria-label': 'primary checkbox' }}
                        />
                    }
                    labelPlacement="top"
                    label={<Typography variant="body2" color="textSecondary">Dotation ?</Typography>}

                />)
            }},
        { field : 'tombola_jeu_reserve', headerName: 'Tombola', flex: 1, renderCell: (params) =>
            {
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.row.tombola_jeu_reserve}
                                onClickCapture={(event => {
                                    params.row.tombola_jeu_reserve = event.target.checked
                                    handleChange(params.row)
                                })}// a cause du bug datagrid
                                onChange={handleChange}

                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        labelPlacement="top"
                        label={<Typography variant="body2" color="textSecondary">Tombola ?</Typography>}

                    />)
            }},
        { field : 'place_plan_jeu_reserve', headerName: 'Placé ?', flex: 1,
            renderCell: (params) =>
            {
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.row.place_plan_jeu_reserve}
                                onClickCapture={(event => {
                                    params.row.place_plan_jeu_reserve = event.target.checked
                                    handleChange(params.row)
                                })}// a cause du bug datagrid
                                onChange={handleChange}

                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        labelPlacement="top"
                        label={<Typography variant="body2" color="textSecondary">Placé ?</Typography>}

                    />)
            }},
        { field : 'recu_jeu_reserve', headerName: 'Reçu ?', flex: 1,
            renderCell: (params) =>
            {
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.row.recu_jeu_reserve}
                                onClickCapture={(event => {
                                    params.row.recu_jeu_reserve = event.target.checked
                                    handleChange(params.row)
                                })}// a cause du bug datagrid
                                onChange={handleChange}

                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        labelPlacement="top"
                        label={<Typography variant="body2" color="textSecondary">Reçu ?</Typography>}

                    />)
            }},
        { field : 'a_renvoyer_jeu_reserve', headerName: 'A renvoyer ?', flex: 1,
            renderCell: (params) =>
            {
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.row.a_renvoyer_jeu_reserve}
                                onClickCapture={(event => {
                                    params.row.a_renvoyer_jeu_reserve = event.target.checked
                                    handleChange(params.row)
                                })}// a cause du bug datagrid
                                onChange={handleChange}

                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        labelPlacement="top"
                        label={<Typography variant="body2" color="textSecondary">A renvoyer ?</Typography>}

                    />)
            }},
        { field : 'est_renvoye_jeu_reserve', headerName: 'Dotation', flex: 1,
            renderCell: (params) =>
            {
                return (
                    <FormControlLabel
                        control={
                            <Checkbox
                                checked={params.row.est_renvoye_jeu_reserve}
                                onClickCapture={(event => {
                                    params.row.est_renvoye_jeu_reserve = event.target.checked
                                    handleChange(params.row)
                                })}// a cause du bug datagrid
                                onChange={handleChange}

                                inputProps={{ 'aria-label': 'primary checkbox' }}
                            />
                        }
                        labelPlacement="top"
                        label={<Typography variant="body2" color="textSecondary">Est renvoyé ?</Typography>}

                    />)
            }},
        { field : 'montant_renvoi_jeu_reserve', headerName: 'Montant du renvoi', flex: 1, type: 'float'},
        { field : 'supprimer', headerName: '', flex: 1,
            renderCell: (params) =>
            {
                return (
                    <div>
                        <DeleteJeuReserve setTrig={setTrig} row={params.row}/>
                    </div>
                )
            }},

    ]


    useEffect(() => {

        async function fetchData() {
            const [responseJeu, responseZone, responseJeuxEditeur] = await Promise.all([
                await requestToBack('GET',null,`/reservation/${id_reservation}/jeuxReserves`,authHeader()),
                await requestToBack('GET',null,`/festival/${id}/zone`,authHeader()),
                await requestToBack('GET',null,`/jeu/editeur/${6}`,authHeader()),
            ]);
            const bodyJeu = await responseJeu[0]
            const jeux = bodyJeu.message

            if (responseJeu[1] !== 200) {
                console.log(responseJeu[1])
            }
            else {
                jeux.forEach(obj => renameKey(obj, 'id_jeu_jeu_reserve', 'id'));
                const updatedJson = JSON.stringify(jeux);
                setJeux(jeux)
            }

            const bodyZones = await responseZone[0]
            const list_zones = bodyZones.message
            if (responseZone[1] !== 200) {
                console.log(responseZone[1])
            }
            else {
                setZones(list_zones)
            }

            const bodyJeuxEditeur = await responseJeuxEditeur[0]
            const list_jeux = bodyJeuxEditeur.message
            if (responseJeuxEditeur[1] !== 200) {
                console.log(responseJeuxEditeur[1])
            }
            else {
                setJeuxEditeur(list_jeux)
            }

            console.log("EDITEUR "+list_jeux)

        }

        fetchData();

    },[trig]);

    return (
        <div>
            <div>
                <h1>
                    Liste des jeux réservés
                </h1>
                {/*<CreateJeuReserve setTrig={setTrig} zones = {zones} id_reservation={reservation.id_reservation} id_societe={reservation.id_societe_reservation}/>*/}
                <CreateJeuReserve setTrig={setTrig} zones = {zones} jeux={jeuxEditeur} id_reservation={id_reservation} id_societe={1}/>
                <CreateZone setTrig={setTrig} id_festival={id}/>
            </div>

            <div style={{paddingTop: '2em'}}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid sortModel={[
                        {

                            field: 'id',
                            sort: 'desc',

                        },
                    ]}
                              className={classes.root}
                              rows={jeux}
                              {...jeux} columns={columns} pageSize={5} />
                </div>
            </div>
        </div>

    )
}

export default JeuxReserves