import React, { useEffect, useState} from 'react';
import {useHistory, useParams} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

import useStylesTableValueColor from "./table/styles";
import {renameKey, requestToBack} from "../utils/utils_functions"
import {useAuthHeader} from 'react-auth-kit'
import {Checkbox, FormControlLabel, InputLabel, MenuItem, Select} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import FormControl from "@material-ui/core/FormControl";





const JeuxReserves = () => {
    let {id_reservation, id} = useParams()

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [jeux,setJeux] = useState([])
    const [zones,setZones] = useState([])
    const [trig,setTrig] = useState([])
    const authHeader = useAuthHeader()

    const handleChange = async (row) => {
        const response = await requestToBack('PUT',row,`/reservation/${id_reservation}/jeuReserve/${row.id}`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setTrig(row)

    };

    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'titre_jeu', headerName: 'Titre du jeu', flex: 1,type: 'string'},
        {field: 'zones', headerName: 'Emplacement zone', flex: 1,
            renderCell: (params) =>{
            return(
                <FormControl className={classes.formControl}>
                    <InputLabel id="demo-simple-select-label">Zone</InputLabel>
                    <Select
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={params.row.id_zone_jeu_reserve}
                        onChange={handleChange}
                    >
                        {zones.map(z => {
                            return <MenuItem selected={z.id_zone === params.row.id_zone_jeu_reserve} value={z.id_zone}>{z.nom_zone}</MenuItem>
                        })}

                    </Select>
                </FormControl>)
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

    ]


    useEffect(() => {

        async function fetchData() {
            const [responseJeu, responseZone] = await Promise.all([
                await requestToBack('GET',null,`/reservation/${id_reservation}/jeuxReserves`,authHeader()),
                await requestToBack('GET',null,`/festival/${id}/zone`,authHeader())
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

        }

        fetchData();

    },[trig]);

    return (
        <div>
            <div>
                <h1>
                    Liste des jeux réservés
                </h1>
                {/*<CreateJeu setTrig={setTrig} zones = {zones}/>*/}

            </div>

            <div style={{paddingTop: '2em'}}>
                <div style={{ height: 400, width: '70%' }}>
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
