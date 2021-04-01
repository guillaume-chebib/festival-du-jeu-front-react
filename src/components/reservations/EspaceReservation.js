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



    useEffect(() => {
        async function fetchData() {
            console.log("Allocation" + reservation.id)
            setEspaces(reservation.allocations_espace)
        }

        fetchData();

    },[]);

    return (
        <div>
            {espaces &&
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Nom</TableCell>
                            <TableCell>nb Tables</TableCell>
                            <TableCell>nb m2</TableCell>
                            <TableCell>Prix calculé</TableCell>
                            <TableCell>Remise</TableCell>
                            <TableCell>Prix total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {espaces.map((row) => (
                            <TableRow key={row.nom_espace}>
                                <TableCell>{row.nom_espace}</TableCell>
                                <TableCell>{row.nb_table_allocation_espace}</TableCell>
                                <TableCell>{row.m2_allocation_espace}</TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>{row.remise_allocation_espace}</TableCell>
                                <TableCell>0</TableCell>

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
