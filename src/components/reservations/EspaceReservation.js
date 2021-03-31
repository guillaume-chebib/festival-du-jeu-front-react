import React, {useEffect, useState} from "react";
import {renameKey, requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import {DataGrid} from "@material-ui/data-grid";
import useStylesTableValueColor from "../table/styles";
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {TextField} from "@material-ui/core";



const EspaceReservation = ({setTrig,reservation}) => {
    const classes = useStylesTableValueColor();

    const authHeader = useAuthHeader()
    const [espaces,setEspaces] = useState()
    const [espaceReserv,setEspaceReserv] = useState()

    const handleChangeStatus = async (event) => {

    };

    // const columns = [
    //     { field: 'id', headerName: 'ID', hide: false },
    //     { field : 'nom_espace', headerName: 'Zone', flex: 1},
    //     { field : 'nombre_table', headerName: 'Nombre de table', flex: 1},
    //     { field : 'nombre_m2', headerName: 'Nombre de m²', flex: 1},
    //     { field : 'prix_calcule', headerName: 'Prix calculé', flex: 1},
    //     { field : 'remise', headerName: 'Remise', flex: 1},
    //     { field : 'prix_totalt', headerName: 'Pri total', flex: 1},
    //
    // ]

    useEffect(() => {

        async function fetchData() {

            const [responseEspaceFestival] = await Promise.all([
                await requestToBack('GET',null,`/festival/`+reservation.id_festival+'/espace',authHeader())
            ]);

            const bodyReservation = await responseEspaceFestival[0]
            const list_espace = bodyReservation.message


            if (responseEspaceFestival[1] !== 200) {
                console.log(responseEspaceFestival[1])
            }
            else {
                list_espace.rows.forEach(obj => renameKey(obj, 'id_espace', 'id'));
                setEspaces(list_espace.rows)

            }




        }

        fetchData();

    },[]);

    return (
        // <div>
        //     {espaces &&
        //     <div style={{paddingTop: '2em'}}>
        //         <div style={{ height: 400, width: '100%' }}>
        //             <DataGrid sortModel={[
        //                 {
        //
        //                     field: 'id',
        //                     sort: 'desc',
        //
        //                 },
        //             ]}
        //                       className={classes.root}
        //                       rows={espaces}
        //                       {...espaces} columns={columns} pageSize={5} />
        //         </div>
        //     </div>
        //     }
        // </div>
        <div>
            {espaces &&
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {espaces.map((row) => (
                            <TableRow key={row.nom_espace}>
                                <TableCell>{row.nom_espace}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </div>


    )


}
export default EspaceReservation
