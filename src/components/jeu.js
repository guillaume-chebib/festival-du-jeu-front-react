import React, { useEffect, useState} from 'react';
import {useHistory} from "react-router-dom";

import {CellParams, DataGrid} from '@material-ui/data-grid';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import Switch from '@material-ui/core/Switch';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from "@material-ui/core/Button";

import useStylesTableValueColor from "./table/styles";
import AlertDialogDelete from "./modals/alert_dialog_delete"

const handleDeleteJeu = () => {
    console.log("oui")
};




const Jeu = () => {

    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [jeux,setJeux] = useState([])
    const [open, setOpen] = React.useState(false);


    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'titre_jeu', headerName: 'Titre du jeu', flex: 1,type: 'string'},
        { field : 'min_joueur_jeu', headerName: 'Joueur minimum', flex: 1, type: 'number'},
        { field : 'max_joueur_jeu', headerName: 'Joueur maximum', flex: 1, type: 'number'},
        { field : 'age_min_jeu', headerName: 'Age requis', flex: 1, type: 'number'},
        { field : 'duree_jeu', headerName: 'Furée(en min)', flex: 1, type: 'number'},
        { field: 'Prototype', headerName: 'Prototype', flex: 1,
            renderCell: (params) =>
            {
                return <Switch
                    checked={params.row.proto_jeu}
                    disabled
                    name="checkedA"
                    inputProps={{'aria-label': 'secondary checkbox'}}
                />

            }
        },
        { field : 'url_consignes_jeu', headerName: 'Règles du jeu', flex: 1},
        { field : '', headerName: '', flex: 1,
            renderCell:(params) =>
            {
                const handleClickOpen = () => {
                    setOpen(true);
                };

                const handleClose = () => {
                    setOpen(false);
                };
                const handleDelete = () => {
                    console.log("delete")
                    setOpen(false);
                };

                return (
                    <div>
                        <IconButton aria-label="delete" onClick={handleClickOpen}>
                            <DeleteIcon />
                        </IconButton>,
                        <AlertDialogDelete message={"Truc"} onClose={handleClose} onDelete={handleDelete} open={open}/>
                    </div>

                )
            }
        },

    ]

    function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/jeu`);
            const body = await response.json();

            const jeux = body.message

            jeux.forEach(obj => renameKey(obj, 'id_jeu', 'id'));
            setJeux(jeux)

        }

        fetchData();

    },[]);



    return (
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
    )
}

export default Jeu
