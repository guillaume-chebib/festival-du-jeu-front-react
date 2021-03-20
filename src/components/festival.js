import React, { useEffect, useState} from 'react';
import {TextField} from '@material-ui/core';
import {Button} from "@material-ui/core";
import { DataGrid, ColDef, ValueGetterParams, CellParams, GridApi } from '@material-ui/data-grid';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core/styles';
import useStylesTableValueColor from "./table/styles";





import '../styles/App.scss';


const Festival = () => {

    const year = new Date().getFullYear()

    const [annee,setAnnee] = useState(year) // contient le contenu à ajouter
    const [nom,setNom] = useState("") // contient le contenu à ajouter
    const [reponse,setReponse] = useState("") //reponse depuis le back

    const handleSubmit = async e => {
        e.preventDefault();
        const response = await fetch('/festival', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ nom: nom, annee: annee }),
        });
        const body = await response.json()
        if (response.status !== 200) {

        }
        else {
            setReponse(body)
        }

    };

    return(
        <div>
            <h1>Test</h1>
            <form noValidate autoComplete="off" onSubmit={handleSubmit} >
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


    const columns = [ //structure du tableau des festivals
        {
            field: "",
            headerName: "",
            sortable: false,
            width: 150,
            disableClickEventBubbling: true,
            renderCell: (params: CellParams) => {
                const onClick = async () => {
                    const api: GridApi = params.api;
                    const fields = api
                        .getAllColumns()
                        .map((c) => c.field)
                        .filter((c) => c !== "__check__" && !!c);
                    const thisRow = {};

                    fields.forEach((f) => {
                        thisRow[f] = params.getValue(f);
                    });

                    let festivalPlusActif;
                    let festivalActif;
                    festivals.map((festival) =>{
                        if(value===festival.id){
                            festivalPlusActif = festival
                            festivalPlusActif.est_courant_festival = false
                        }
                        if(thisRow["id"]===festival.id){
                            festivalActif = festival
                            festivalActif.est_courant_festival = true
                        }
                    })
                    console.log(festivalPlusActif)
                    console.log(festivalActif)


                    console.log(thisRow)


                    const response = await fetch(`/festival/${festivalPlusActif.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(festivalPlusActif),
                    });
                    const body = await response.json()
                    if (response.status !== 200) {
                        console.log("erreur serveur")
                    }
                    console.log(body.message)
                    setValue("")


                    const response1 = await fetch(`/festival/${festivalActif.id}`, {
                        method: 'PUT',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(festivalActif),
                    });
                    const body1 = await response1.json()
                    if (response1.status !== 200) {
                        console.log("erreur serveur")
                    }
                    console.log(body1.message)
                    setValue(thisRow["id"])
                };

                return <Button onClick={onClick}>Rendre actif</Button>;
            }
        },
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'Actif ?', headerName: 'Actif ?', width: 100,valueGetter: (params) =>
                `${params.getValue('est_courant_festival')?"Actif" : "Non actif"}`,
            cellClassName: (params) =>
                clsx('super-app', {
                    neutral: params.getValue('est_courant_festival') === false,
                    positive: params.getValue('est_courant_festival') === true,
                }),},
        { field: 'nom_festival', headerName: 'Nom du festival', width: 400 },
        { field: 'annee_festival', headerName: 'Annee du festival',type: 'date', width: 200 },
    ];


    function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }


    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/festival`);
            const body = await response.json();
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



    async function setActif(id) {
        // console.log(id)
        // let change;
        // festivals.map((festival) => {
        //     //console.log(festival.id,id)
        //     if(festival.id === parseInt(id[id.length-1])){
        //         change = festival
        //         change.est_courant_festival = true
        //     }
        // })
        // //console.log(change,id)
        // const response = await fetch(`/festival/${id}`, {
        //     method: 'PUT',
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        //     body: JSON.stringify(change),
        // });
        // const body = await response.json()
        // if (response.status !== 200) {
        //     console.log("erreur serveur")
        // }
        // console.log(body.message)

    }



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
