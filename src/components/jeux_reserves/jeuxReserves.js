import React, {useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import {DataGrid} from '@material-ui/data-grid';

import useStylesTableValueColor from "../table/styles";
import {IsAdmin, renameKey, requestToBack} from "../../utils/utils_functions"
import {useAuthHeader} from 'react-auth-kit'
import {Checkbox, MenuItem} from "@material-ui/core";
import CreateJeuReserve from "./createJeuReserve";
import TextField from "@material-ui/core/TextField";
import UpdateZone from "./updateZone";
import CreateZone from "./createZone";
import DeleteJeuReserve from "./deleteZoneReserve";


const JeuxReserves = ({reservation}) => {

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [jeux, setJeux] = useState([])
    const [jeu, setJeu] = useState()
    const [jeuxEditeur, setJeuxEditeur] = useState([])
    const [allJeux, setAllJeux] = useState([])
    const [zones, setZones] = useState([])
    const [zone, setZone] = useState()
    const [trig, setTrig] = useState([])
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
        const response = await requestToBack('PUT', row, `/reservation/${reservation.id}/jeuReserve/${row.id}`, authHeader())
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
        const response = await requestToBack('DELETE', jeu, `jeuReserve/${jeu.id_jeu_jeu_reserve}/reservation/${jeu.id_reservation_jeu_reserve}`, authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

        setTrig(jeu)
        setOpenDelete(false);
    }

    const columns = [
        {field: 'id', headerName: 'ID', flex: 0.4, hide: false},
        {field: 'titre_jeu', headerName: 'Titre du jeu', flex: 1, type: 'string'},
        {
            field: 'zones', headerName: 'Emplacement zone', flex: 3,
            renderCell: (params) => {
                return (
                    <div style={{textAlign: "center"}}>
                        <IsAdmin/>
                        <div>
                            <TextField
                                id="outlined-select-currency"
                                select
                                required
                                disabled
                                style={{display: "inline-block", width: '100%'}}
                                fullWidth
                                label="Zones"
                                value={params.row.nom_zone}
                                //onChange={(e) => {setZone(e.target.value)}}

                            >
                                {zones.map((option) => (
                                    <MenuItem key={option.zone.id_zone}
                                              selected={params.row.id_zone_jeu_reserve === option.zone.id_zone}
                                              value={option.zone.nom_zone}>
                                        {option.zone.nom_zone}
                                    </MenuItem>
                                ))}
                            </TextField>
                            <div style={{width: '18%', display: "inline-block"}}>
                                <UpdateZone row={params.row} setRow={setJeu} setTrig={setTrig} zones={zones}/>
                            </div>
                        </div>
                    </div>
                )
            }
        },
        {field: 'quantite_jeu_reserve', headerName: 'Quantité', flex: 1, type: 'float'},
        {field: 'nb_table_jeu_reserve', headerName: 'Nb table', flex: 1, type: 'number'},
        {
            field: '', headerName: 'Dotation', flex: 1,
            renderCell: (params) => {
                return (
                    <Checkbox
                        checked={params.row.dotation_jeu_reserve}
                        onClickCapture={(event => {
                            params.row.dotation_jeu_reserve = event.target.checked
                            handleChange(params.row)
                        })}// a cause du bug datagrid
                        onChange={handleChange}

                        inputProps={{'aria-label': 'primary checkbox'}}
                    />)
            }
        },
        {
            field: 'tombola_jeu_reserve', headerName: 'Tombola', flex: 1, renderCell: (params) => {
                return (
                    <Checkbox
                        checked={params.row.tombola_jeu_reserve}
                        onClickCapture={(event => {
                            params.row.tombola_jeu_reserve = event.target.checked
                            handleChange(params.row)
                        })}// a cause du bug datagrid
                        onChange={handleChange}

                        inputProps={{'aria-label': 'primary checkbox'}}
                    />
                )
            }
        },
        {
            field: 'place_plan_jeu_reserve', headerName: 'Placé ?', flex: 1,
            renderCell: (params) => {
                return (
                    <Checkbox
                        checked={params.row.place_plan_jeu_reserve}
                        onClickCapture={(event => {
                            params.row.place_plan_jeu_reserve = event.target.checked
                            handleChange(params.row)
                        })}// a cause du bug datagrid
                        onChange={handleChange}

                        inputProps={{'aria-label': 'primary checkbox'}}
                    />)
            }
        },
        {
            field: 'recu_jeu_reserve', headerName: 'Reçu ?', flex: 1,
            renderCell: (params) => {
                return (
                    <Checkbox
                        checked={params.row.recu_jeu_reserve}
                        onClickCapture={(event => {
                            params.row.recu_jeu_reserve = event.target.checked
                            handleChange(params.row)
                        })}// a cause du bug datagrid
                        onChange={handleChange}

                        inputProps={{'aria-label': 'primary checkbox'}}
                    />)
            }
        },
        {
            field: 'a_renvoyer_jeu_reserve', headerName: 'A renvoyer ?', flex: 1,
            renderCell: (params) => {
                return (
                    <Checkbox
                        checked={params.row.a_renvoyer_jeu_reserve}
                        onClickCapture={(event => {
                            params.row.a_renvoyer_jeu_reserve = event.target.checked
                            handleChange(params.row)
                        })}// a cause du bug datagrid
                        onChange={handleChange}

                        inputProps={{'aria-label': 'primary checkbox'}}
                    />)
            }
        },
        {
            field: 'est_renvoye_jeu_reserve', headerName: 'Est renvoyé?', flex: 1,
            renderCell: (params) => {
                return (
                    <Checkbox
                        checked={params.row.est_renvoye_jeu_reserve}
                        onClickCapture={(event => {
                            params.row.est_renvoye_jeu_reserve = event.target.checked
                            handleChange(params.row)
                        })}// a cause du bug datagrid
                        onChange={handleChange}

                        inputProps={{'aria-label': 'primary checkbox'}}
                    />)
            }
        },
        {field: 'montant_renvoi_jeu_reserve', headerName: 'Montant du renvoi', flex: 1, type: 'float'},
        {
            field: 'supprimer', headerName: '', flex: 1,
            renderCell: (params) => {
                return (
                    <div>
                        <DeleteJeuReserve setTrig={setTrig} row={params.row}/>
                    </div>
                )
            }
        },

    ]


    useEffect(() => {

        async function fetchData() {
            console.log("idFEst ", reservation)
            const [responseJeu, responseZone, responseJeuxEditeur, responseAllJeux] = await Promise.all([
                await requestToBack('GET', null, `/reservation/${reservation.id}/jeuxReserves`, authHeader()),
                await requestToBack('GET', null, `/festival/${reservation.id_festival}/zone`, authHeader()),
                await requestToBack('GET', null, `/jeu/editeur/${reservation.id_societe}`, authHeader()),
                await requestToBack('GET', null, `/jeu`, authHeader()),
            ]);
            const bodyJeu = await responseJeu[0]
            const jeux = bodyJeu.message

            if (responseJeu[1] !== 200) {
                console.log(responseJeu[1])
            } else {
                jeux.forEach(obj => renameKey(obj, 'id_jeu_jeu_reserve', 'id'));
                const updatedJson = JSON.stringify(jeux);
                setJeux(jeux)
            }

            const bodyZones = await responseZone[0]
            const list_zones = bodyZones.message
            if (responseZone[1] !== 200) {
                console.log(responseZone[1])
            } else {
                setZones(list_zones)
            }

            const bodyJeuxEditeur = await responseJeuxEditeur[0]
            const list_jeux = bodyJeuxEditeur.message
            if (responseJeuxEditeur[1] !== 200) {
                console.log(responseJeuxEditeur[1])
            } else {
                setJeuxEditeur(list_jeux)
            }

            const bodyAllJeux = await responseAllJeux[0]
            const all_jeux = bodyAllJeux.message
            if (responseAllJeux[1] !== 200) {
                console.log(responseAllJeux[1])
            } else {
                setAllJeux(all_jeux)
            }

        }

        fetchData();

    }, [trig]);

    let create
    if (reservation.est_editeur_societe) {
        create = <CreateJeuReserve setTrig={setTrig} zones={zones} jeux={jeuxEditeur} id_reservation={reservation.id}
                                   id_societe={reservation.id_societe_reservation}/>
    } else {
        create = <CreateJeuReserve setTrig={setTrig} zones={zones} jeux={allJeux} id_reservation={reservation.id}
                                   id_societe={reservation.id_societe_reservation}/>
    }

    return (
        <div style={{width: '100%'}}>
            <div>
                <h1>
                    Liste des jeux réservés
                </h1>
                {create}
                <CreateZone setTrig={setTrig} id_festival={reservation.id_festival_reservation}/>
            </div>

            <div style={{paddingTop: '2em'}}>
                <div style={{height: 400, width: '100%'}}>
                    <DataGrid sortModel={[
                        {

                            field: 'id',
                            sort: 'desc',

                        },
                    ]}
                              className={classes.root}
                              rows={jeux}
                              {...jeux} columns={columns} pageSize={5}/>
                </div>
            </div>
        </div>

    )
}

export default JeuxReserves
