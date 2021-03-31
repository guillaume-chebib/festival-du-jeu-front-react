import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import useStylesTableValueColor from "../table/styles";
import {useHistory} from "react-router-dom";
import {useAuthHeader} from "react-auth-kit";
import {Checkbox} from "@material-ui/core";
import UpdateDeleteJeu from "../jeux/UpdateDeleteJeu";
import {renameKey, requestToBack} from "../../utils/utils_functions";
import CreateJeu from "../jeux/CreateJeu";
import {DataGrid} from "@material-ui/data-grid";

const useStyles = makeStyles((theme) => ({
    root: {
        padding: '2px 4px',
        display: 'flex',
        alignItems: 'center',
        width: 400,
    },
    input: {
        marginLeft: theme.spacing(1),
        flex: 1,
    },
    iconButton: {
        padding: 10,
    },
    divider: {
        height: 28,
        margin: 4,
    },
}));

export default function ListJeux() {

    const history = useHistory();
    const [jeux,setJeux] = useState([])
    const [trig,setTrig] = useState([])
    const authHeader = useAuthHeader()



    const columns = [
        { field: 'id', headerName: 'ID', hide: false },
        { field : 'titre_jeu', headerName: 'Titre du jeu', flex: 1,type: 'string'},
        { field : 'min_joueur_jeu', headerName: 'Joueur minimum', flex: 1, type: 'number'},
        { field : 'max_joueur_jeu', headerName: 'Joueur maximum', flex: 1, type: 'number'},
        { field : 'age_min_jeu', headerName: 'Age requis', flex: 1, type: 'number'},
        { field : 'duree_jeu', headerName: 'Durée(en min)', flex: 1, type: 'number'},
        { field : 'nom_societe', headerName: 'Editeur', flex: 1, type: 'string'},
        { field: 'Prototype', headerName: 'Prototype', flex: 1,
            renderCell: (params) =>
            {
                return <Checkbox
                    checked={params.row.proto_jeu}
                    inputProps={{ 'aria-label': 'primary checkbox' }}
                />

            }
        },
        { field : 'url_consignes_jeu', headerName: 'Règles du jeu', flex: 1},

    ]


    useEffect(() => {

        async function fetchData() {
            const responseJeu = await requestToBack('GET',null,`/public/festival/jeu`,authHeader())
            const bodyJeu = await responseJeu[0]
            const jeux = bodyJeu.message

            if (responseJeu[1] !== 200) {
                console.log(responseJeu[1])
            }
            else {
                jeux.forEach(obj => renameKey(obj, 'id_jeu', 'id'));
                setJeux(jeux)
            }

        }

        fetchData();

    },[trig]);

    return (
        <div>
            <div>
                <h1>
                    Liste des jeux
                </h1>

            </div>

            <div style={{paddingTop: '2em'}}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid sortModel={[
                        {

                            field: 'id',
                            sort: 'desc',

                        },
                    ]}
                              rows={jeux}
                              {...jeux} columns={columns} pageSize={15} />
                </div>
            </div>
        </div>

    )
}

export default function Search(onUpdate) {
    const classes = useStyles();

    return (
        <Paper component="form" className={classes.root}>
            <InputBase
                className={classes.input}
                placeholder="Rechercher ..."
                inputProps={{ 'aria-label': 'search google maps' }}
            />
            <IconButton type="submit" onChange={onUpdate} className={classes.iconButton} aria-label="search">
                <SearchIcon />
            </IconButton>
        </Paper>
    );
}
