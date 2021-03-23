import React, { useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import  {useHistory} from "react-router-dom"
import {CellParams, DataGrid, GridApi} from '@material-ui/data-grid';
import Fab from '@material-ui/core/Fab';
import EditIcon from '@material-ui/icons/Edit';
import Modal from '@material-ui/core/Modal';
import { ThemeProvider} from '@material-ui/core/styles';
import DeleteIcon from '@material-ui/icons/Delete';
import {useStylesThemeFestival,themeFestival} from "../styles/themes";
import {UpdateDeleteOrganisateur} from "./updateDeleteOrganisateur";

const Organisateur = () => {

    const history = useHistory();
    const [organisateurs,setOrganisateurs] = useState([])
    const [trig,setTrig] = useState([])
    const styles = useStylesThemeFestival()

    const columns = [
        { field: 'id', headerName: 'ID', hide: true},
        {field: 'nom_organisateur', headerName: 'Nom', flex:0.5},
        {field: 'prenom_organisateur', headerName: 'Prenom', flex: 0.5},
        {field: 'email_organisateur', headerName: 'Adresse Mail', flex: 1},
        {
            field: "",
            headerName: "",
            sortable: false,
            flex:1,
            disableClickEventBubbling: true,
            renderCell: (params: CellParams) => {

                return <UpdateDeleteOrganisateur row={params.row} setTrig={setTrig}/>
            }
        }
    ]


    function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
        obj[newKey] = obj[oldKey];
        delete obj[oldKey];
    }

    useEffect(() => {
        async function fetchData() {
            const response = await fetch(`/organisateur`);
            const body = await response.json();

            const organisateur = body.message
            organisateur.forEach(obj => renameKey(obj, 'id_organisateur', 'id'));
            setOrganisateurs(organisateur)
            console.log(organisateur)
        }

        fetchData();

    },[trig]);


    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => history.push('/organisateur/ajout')}>
                Ajouter un organisateur
            </Button>
            <div style={{paddingTop: '2em'}}>
                <div style={{ height: 400, width: '100%' }}>
                    <DataGrid sortModel={[
                        {

                            field: 'id',
                            sort: 'desc',

                        },
                    ]}
                              rows={organisateurs}
                              {...organisateurs} columns={columns} pageSize={5} />

                </div>
            </div>

        </div>
    )
}


const EditModal = () =>{

    return (
        <div>
            <h2 id="simple-modal-title">Text in a modal</h2>
            <p id="simple-modal-description">
                Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </p>
        </div>
    )
}

export default Organisateur
