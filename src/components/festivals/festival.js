import React, { useEffect, useState} from 'react';
import {TextField} from '@material-ui/core';
import {Button} from "@material-ui/core";
import { DataGrid, ColDef, ValueGetterParams, CellParams, GridApi } from '@material-ui/data-grid';
import clsx from 'clsx';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import useStylesTableValueColor from "../table/styles";
import {useAuthHeader} from 'react-auth-kit'
import Typography from "@material-ui/core/Typography";
import Input from '@material-ui/core/Input';
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import InputAdornment from '@material-ui/core/InputAdornment';

import FormControl from '@material-ui/core/FormControl';


import '../../styles/App.scss';
import {requestToBack} from "../../utils/utils_functions";
import {themeFestival} from "../styles/themes";
import Fab from "@material-ui/core/Fab";
import EditIcon from "@material-ui/icons/Edit";
import DeleteIcon from "@material-ui/icons/Delete";


const Festival = () => {

    const year = new Date().getFullYear()


    const [annee,setAnnee] = useState(year) // contient le contenu à ajouter
    const [nom,setNom] = useState("") // contient le contenu à ajouter
    const [reponse,setReponse] = useState("") //reponse depuis le back
    const [festival,setFestival] = useState({annee_festival:year})
    const authHeader = useAuthHeader()


    const handleSubmit = async e => {
        e.preventDefault();
        const response = await requestToBack('POST',festival,`/festival`,authHeader())

        const body = await response[0]
        if (response[1] !== 200) {

        }
        else {
            setReponse(body)
        }

    };

    return(
        <div>
            <h1>Test</h1>
            <form noValidate autoComplete="on" onSubmit={handleSubmit} >
                <TextField required id="outlined-required" isrequired="true" label="Nom du festival" variant="outlined"
                           onChange={e => setFestival(prevState => ({
                               ...prevState,
                               nom_festival: e.target.value
                           }))}/>
                <TextField
                    id="outlined-number"
                    label="Année du festival"
                    type="number"
                    defaultValue={year}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={e => setFestival(prevState => ({
                        ...prevState,
                        annee_festival: e.target.value
                    }))}/>
                <FormEspace setForm={setFestival} value={1} />
                <FormEspace setForm={setFestival} value={2}/>

                <FormEspace setForm={setFestival} value={3}/>

                <Button type="submit" variant="contained" color="secondary">Soumettre</Button>
            </form>
            <Festivals body={reponse}/>
        </div>
    )
}

const FormEspace = ({setForm,value}) => {

    const setValue_prix_espace = async e => {
        switch (value) {
            case 1:
                setForm(prevState => ({
                    ...prevState,
                    prix_surface_espace_1: e.target.value

                }))
                break;
            case 2:
                setForm(prevState => ({
                    ...prevState,
                    prix_surface_espace_2: e.target.value

                }))
                break;
            case 3:
                setForm(prevState => ({
                    ...prevState,
                    prix_surface_espace_3: e.target.value

                }))
                break
        }
    }

    const setValue_nb_tables_espace = async e => {
        switch (value) {
            case 1:
                setForm(prevState => ({
                    ...prevState,
                    nb_table_espace_1: e.target.value

                }))
                break;
            case 2:
                setForm(prevState => ({
                    ...prevState,
                    nb_table_espace_2: e.target.value

                }))
                break;
            case 3:
                setForm(prevState => ({
                    ...prevState,
                    nb_table_espace_3: e.target.value

                }))
                break
        }
    }

    const setValue_prix_tables_espace = async e =>{
        switch(value) {
            case 1:
                setForm(prevState => ({
                    ...prevState,
                    prix_table_espace_1: e.target.value

                }))
                break;
            case 2:
                setForm(prevState => ({
                    ...prevState,
                    prix_table_espace_2: e.target.value

                }))
                break;
            case 3:
                setForm(prevState => ({
                    ...prevState,
                    prix_table_espace_3: e.target.value

                }))
                break
        }
    }
    return(
        <div>
            <FormControl >
                <InputLabel htmlFor="prix-m2">Prix m²</InputLabel>
                <Input
                    id="prix-m2"
                    endAdornment={<InputAdornment position="end">€</InputAdornment>}
                    onChange={e => setValue_prix_espace(e)}

                />
            </FormControl>
            <FormControl >
                <InputLabel htmlFor="nb-tables">Nb tables</InputLabel>
                <Input
                    id="nb-tables"
                    onChange={e => setValue_nb_tables_espace(e)}
                />
            </FormControl>
            <FormControl >
                <InputLabel htmlFor="prix-table">Prix table</InputLabel>
                <Input
                    id="prix-table"
                    endAdornment={<InputAdornment position="end">€</InputAdornment>}
                    onChange={e => setValue_prix_tables_espace(e)}
                />
            </FormControl>
        </div>

    )
}

const Festivals = ({body}) => {
    const classes = useStylesTableValueColor();

    const [festivals,setFestivals] = useState([]) //contient tous les festivals
    const [value, setValue] = useState(""); //contient le festival courant actif
    const authHeader = useAuthHeader()

    const columns = [ //structure du tableau des festivals
        {
            field: "",
            headerName: "",
            sortable: false,
            flex:0.7,
            disableClickEventBubbling: true,
            renderCell: (params) => {
                const onClick = async () => {

                    let festivalPlusActif;
                    let festivalActif;
                    festivals.map((festival) =>{
                        if(value===festival.id){
                            festivalPlusActif = festival
                            festivalPlusActif.est_courant_festival = false
                        }
                        if(params.row.id===festival.id){
                            festivalActif = festival
                            festivalActif.est_courant_festival = true
                        }
                    })
                    console.log(festivalPlusActif)
                    console.log(festivalActif)


                    const [response, response1] = await Promise.all([
                        await requestToBack('PUT',festivalPlusActif,`/festival/${festivalPlusActif.id}`,authHeader()),
                        await requestToBack('PUT',festivalActif,`/festival/${festivalActif.id}`,authHeader())
                    ]);


                    const body = await response[0]
                    if (response[1] !== 200) {
                        console.log("erreur serveur")
                    }
                    setValue("")


                    const body1 = await response1[0]
                    if (response1[1] !== 200) {
                        console.log("erreur serveur")
                    }
                    setValue(params.row.id)
                };

                return (<ThemeProvider theme={themeFestival}>
                    <Button  size="small" variant="contained" onClick={onClick} color="primary">
                        Rendre actif
                    </Button>
                </ThemeProvider>)
            }
        },
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Actif ?', headerName: 'Actif ?',flex:0.5,valueGetter: (params) =>
                `${params.getValue('est_courant_festival')?"Actif" : "Non actif"}`,
            cellClassName: (params) =>
                clsx('super-app', {
                    neutral: params.getValue('est_courant_festival') === false,
                    positive: params.getValue('est_courant_festival') === true,
                }),},
        { field: 'nom_festival', headerName: 'Nom du festival', flex:2 },
        { field: 'annee_festival', headerName: 'Année',type: 'date', flex:0.5 },
        { field: 'Espace 1', headerName: 'Espace 1',flex:0.9,renderCell: (params) =>
                (
                    <div>
                        <Typography> Prix m²: {params.row.espaces.rows[0].prix_surface_espace}</Typography>
                        <Typography>Nombre tables: {params.row.espaces.rows[0].nb_table_espace}</Typography>
                        <Typography>Prix tables: {params.row.espaces.rows[0].prix_table_espace}</Typography>
                    </div>
                ),
        },
        { field: 'Espace 2', headerName: 'Espace 2',flex:0.9,renderCell: (params) =>
                (
                    <div>
                        <Typography> Prix m²: {params.row.espaces.rows[1].prix_surface_espace}</Typography>
                        <Typography>Nombre tables: {params.row.espaces.rows[1].nb_table_espace}</Typography>
                        <Typography>Prix tables: {params.row.espaces.rows[1].prix_table_espace}</Typography>
                    </div>
                ),
        },
        { field: 'Espace 3', headerName: 'Espace 3',flex:0.9,renderCell: (params) =>
                (
                    <div>
                        <Typography> Prix m²: {params.row.espaces.rows[2].prix_surface_espace}</Typography>
                        <Typography>Nombre tables: {params.row.espaces.rows[2].nb_table_espace}</Typography>
                        <Typography>Prix tables: {params.row.espaces.rows[2].prix_table_espace}</Typography>
                    </div>
                ),
        },
    ];


    function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }



    useEffect(() => {
        async function fetchData() {
            const response = await requestToBack('GET',null,`/festival`,authHeader())
            const body = await response[0]
            const festivals_d = body.message

            festivals_d.forEach(obj => renameKey(obj, 'id_festival', 'id'));
            const updatedJson = JSON.stringify(festivals_d);

            setFestivals(festivals_d)
            festivals_d.forEach((festival) => {
                if(festival.est_courant_festival ===true){
                    setValue(festival.id)
                }
            })

        }

        fetchData();

    },[body]);

    useEffect(() => { console.log(value) }, [value])




    return (
        <div style={{paddingTop: '2em'}}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid
                    rowHeight={80}
                    sortModel={[
                    {

                        field: 'id',
                        sort: 'desc',

                    },
                ]}

                          className={classes.root}
                          rows={festivals}
                          {...festivals} columns={columns} pageSize={5} />

            </div>
        </div>
    )
}

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
});

export default Festival
