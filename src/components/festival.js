import React, { useEffect, useState} from 'react';
import {TextField} from '@material-ui/core';
import {Button} from "@material-ui/core";
import { DataGrid } from '@material-ui/data-grid';


import '../styles/App.scss';


const Festival = () => {

    const year = new Date().getFullYear();

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
                <TextField required id="outlined-required" isRequired="true" label="Nom du festival" variant="outlined" onChange={e => setNom(e.target.value )}/>
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

    const [festivals,setFestivals] = useState([]) //contient tous les festivals


    const columns = [ //structure du tableau des festivals
        { field: 'id', headerName: 'ID', hide: true },
        { field: 'nom_festival', headerName: 'Nom du festival', width: 400 },
        { field: 'annee_festival', headerName: 'Annee du festival',type: 'number', width: 200 },
    ];


    function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    useEffect(
        async () => {
            const response = await fetch(`/festival`);
            const body = await response.json();
            const festivals = body.message

            festivals.forEach( obj => renameKey( obj, 'id_festival', 'id' ) );
            const updatedJson = JSON.stringify( festivals );

            console.log( updatedJson );
            setFestivals(body.message)

        },[body]);
    return (
        <div style={{paddingTop: '2em'}}>
            <div style={{ height: 400, width: '100%' }}>
                <DataGrid rows={festivals} columns={columns} pageSize={5} />
            </div>
        </div>
    )
}

export default Festival