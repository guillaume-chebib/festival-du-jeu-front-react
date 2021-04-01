import React, { useEffect, useState} from 'react';
import {TextField} from '@material-ui/core';
import {Button} from "@material-ui/core";
import { DataGrid, ColDef, ValueGetterParams, CellParams, GridApi } from '@material-ui/data-grid';
import clsx from 'clsx';
import {makeStyles, ThemeProvider} from '@material-ui/core/styles';
import useStylesTableValueColor, {themeResponsive} from "../table/styles";
import {useAuthHeader} from 'react-auth-kit'
import Typography from "@material-ui/core/Typography";

import '../../styles/App.scss';
import {requestToBack} from "../../utils/utils_functions";
import {themeFestival} from "../styles/themes";
import {AddFestivalModal} from "./addFestivalModal";
import {UpdateFestival} from "./updateFestival";
import RedirectReservation from "../reservations/redirectReservation";
import {useHistory} from "react-router-dom";

const Festival = () => {

    const year = new Date().getFullYear()
    const [openAddFestival, setOpenAddFestival] = useState(false)
    const [reponse,setReponse] = useState("") //reponse depuis le back
    const [festival,setFestival] = useState({annee_festival:year})
    const authHeader = useAuthHeader()


    const onClickOpenAddFestival = () => {
        setOpenAddFestival(true);
    };

    const onCloseAddFestival = () => {
        setOpenAddFestival(false);
    };

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await requestToBack('POST',festival,`/festival`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {

        }
        else {
            setReponse(body)
            setOpenAddFestival(false)
        }
    };
    return(
        <div>
            <Button type="submit" variant="contained" color="secondary" onClick={onClickOpenAddFestival}> Ajouter un festival</Button>
            <AddFestivalModal titre="Ajouter un festival" setRow={setFestival} onClose={onCloseAddFestival} onAdd={handleSubmit} open={openAddFestival}/>
            <Festivals body={reponse}/>
        </div>
    )
}



const Festivals = ({body}) => {
    const classes = useStylesTableValueColor();

    const history = useHistory();
    const [festivals,setFestivals] = useState([]) //contient tous les festivals
    const [value, setValue] = useState(""); //contient le festival courant actif
    const authHeader = useAuthHeader()
    const [trig,setTrig] = useState()


    const columns = [ //structure du tableau des festivals
        {
            field: "",
            headerName: "",
            sortable: false,
            flex:0.8,
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
                        <ThemeProvider theme={themeResponsive}>
                            <Typography variant="subtitle2">Rendre actif</Typography>
                        </ThemeProvider>
                    </Button>
                </ThemeProvider>)
            }
        },
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Actif ?', headerName: 'Actif ?',flex:0.6,valueGetter: (params) =>
                `${params.getValue('est_courant_festival')?"Actif" : "Non actif"}`,
            cellClassName: (params) =>
                clsx('super-app', {
                    neutral: params.getValue('est_courant_festival') === false,
                    positive: params.getValue('est_courant_festival') === true,
                }),},
        { field: 'nom_festival', headerName: 'Nom du festival', flex:2 , renderCell: (params) =>(
                <>
                    <ThemeProvider theme={themeResponsive}>
                        <Typography variant="subtitle2">
                            {params.row.nom_festival}
                        </Typography>
                    </ThemeProvider>
                </>
            ) },
        { field: 'annee_festival', headerName: 'Année',type: 'date', flex:0.5,renderCell: (params) =>(
            <>
                <ThemeProvider theme={themeResponsive}>
                    <Typography variant="subtitle2">
                        {params.row.annee_festival}
                    </Typography>
                </ThemeProvider>
            </>
            ) },
        { field: 'Espace 1', headerName: 'Espace 1',flex:0.9,renderCell: (params) =>
                (
                    <div>
                        <ThemeProvider theme={themeResponsive}>
                        <Typography variant="subtitle2"> Prix m²: {params.row.espaces[0].prix_surface_espace}</Typography>
                        <Typography variant="subtitle2">Nombre tables: {params.row.espaces[0].nb_table_espace}</Typography>
                        <Typography variant="subtitle2">Prix tables: {params.row.espaces[0].prix_table_espace}</Typography>
                        </ThemeProvider>
                    </div>
                ),
        },
        { field: 'Espace 2', headerName: 'Espace 2',flex:0.9,renderCell: (params) =>
                (
                    <div>
                        <ThemeProvider theme={themeResponsive}>
                            <Typography variant="subtitle2"> Prix m²: {params.row.espaces[1].prix_surface_espace}</Typography>
                            <Typography variant="subtitle2">Nombre tables: {params.row.espaces[1].nb_table_espace}</Typography>
                            <Typography variant="subtitle2">Prix tables: {params.row.espaces[1].prix_table_espace}</Typography>
                        </ThemeProvider>
                    </div>
                ),
        },
        { field: 'Espace 3', headerName: 'Espace 3',flex:0.9,renderCell: (params) =>
                (
                    <div>
                        <ThemeProvider theme={themeResponsive}>
                            <Typography variant="subtitle2"> Prix m²: {params.row.espaces[2].prix_surface_espace}</Typography>
                            <Typography variant="subtitle2">Nombre tables: {params.row.espaces[2].nb_table_espace}</Typography>
                            <Typography variant="subtitle2">Prix tables: {params.row.espaces[2].prix_table_espace}</Typography>
                        </ThemeProvider>
                    </div>
                ),
        },
        {
            field: "Update",
            headerName: "",
            sortable: false,
            flex:0.6,
            disableClickEventBubbling: true,
            renderCell: (params) => {

                return  <UpdateFestival row={params.row} setTrig={setTrig}/>

            }
        },
        {
            field: "Reservation",
            headerName: "",
            sortable: false,
            flex:0.6,
            disableClickEventBubbling: true,
            renderCell: (params) => {

                return  <Button
                        onClick={event => {
                            history.push("/festival/"+ params.row.id+"/reservations");
                        }}
                        color="primary"
                        variant="contained"
                >
                    Reservations
                </Button>

            }
        }
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
            console.log(festivals_d)
            setFestivals(festivals_d)
            festivals_d.forEach((festival) => {
                if(festival.est_courant_festival ===true){
                    setValue(festival.id)
                }
            })

        }

        fetchData();

    },[body,trig]);


    return (
        <div style={{paddingTop: '2em'}}>
            <div style={{ height: 500, width: '100%' }}>
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
                          {...festivals} columns={columns} pageSize={4} />

            </div>
        </div>

    )
}



export default Festival
