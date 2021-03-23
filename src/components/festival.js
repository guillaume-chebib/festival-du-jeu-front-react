import React, { useEffect, useState} from 'react';
import {TextField} from '@material-ui/core';
import {Button} from "@material-ui/core";
import { DataGrid, ColDef, ValueGetterParams, CellParams, GridApi } from '@material-ui/data-grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useStylesTableValueColor from "./table/styles";
import {useAuthHeader} from 'react-auth-kit'

import '../styles/App.scss';
import {requestToBack} from "../utils/utils_functions";


const Festival = () => {

    const year = new Date().getFullYear()

    const [annee,setAnnee] = useState(year) // contient le contenu à ajouter
    const [nom,setNom] = useState("") // contient le contenu à ajouter
    const [reponse,setReponse] = useState("") //reponse depuis le back
    const authHeader = useAuthHeader()


    const handleSubmit = async e => {
        e.preventDefault();
        const response = await requestToBack('POST',{ nom_festival: nom, annee_festival: annee },`/festival`,authHeader())

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
                <TextField required id="outlined-required" isrequired="true" label="Nom du festival" variant="outlined" onChange={e => setNom(e.target.value )}/>
                <TextField
                    id="outlined-number"
                    label="Année du festival"
                    type="number"
                    defaultValue={year}
                    InputLabelProps={{
                        shrink: true,
                    }}
                    variant="outlined"
                    onChange={e => setAnnee(e.target.value )}
                />
                <Button type="submit" variant="contained" color="primary">Soumettre</Button>
            </form>
            <Festivals body={reponse}/>
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
            flex:0.5,
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

                return  <Button variant="outlined" size="small" onClick={onClick} color="primary">
                    Rendre actif
                </Button>
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
        { field: 'annee_festival', headerName: 'Annee du festival',type: 'date', flex:0.5 },
    ];


    function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }


    useEffect(() => {
        async function fetchData() {
            const response = await requestToBack('GET',null,`/festival`,authHeader())
            const body = await response[0]
            const festivals = body.message

            festivals.forEach(obj => renameKey(obj, 'id_festival', 'id'));
            const updatedJson = JSON.stringify(festivals);

            console.log(updatedJson);
            setFestivals(body.message)
            await body.message.map(async (festival) => { if(festival.est_courant_festival ===true){
                await setValue(festival.id)
            }

            })
        }

        fetchData();

        },[body]);

    useEffect(() => { console.log(value) }, [value])



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
