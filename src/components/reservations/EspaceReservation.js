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
    function subtotal(items) {
        // return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
        return 0;
    }
    const invoiceSubtotal = subtotal(reservation);

    const handlePutAllocation = async (espace) => {
        const response = await requestToBack('PUT',espace,`/reservation/${reservation.id}/allocation_espace/${espace.id_espace}`,authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }

    };

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
                                <TableCell>
                                    <TextField
                                        defaultValue={row.nb_table_allocation_espace}
                                        onChange={(event => {
                                            row.nb_table_allocation_espace = event.target.value
                                            handlePutAllocation(row)
                                        })}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        defaultValue={row.m2_allocation_espace}
                                        onChange={(event => {
                                            row.m2_allocation_espace = event.target.value
                                            handlePutAllocation(row)
                                        })}
                                    />

                                </TableCell>
                                <TableCell>0</TableCell>
                                <TableCell>
                                    <TextField
                                        defaultValue={row.remise_allocation_espace}
                                        onChange={(event => {
                                            row.remise_allocation_espace = event.target.value
                                            handlePutAllocation(row)
                                        })}
                                    />

                                </TableCell>
                                <TableCell>0</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={3}>Supplément</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>0</TableCell>
                            <TableCell>{(invoiceSubtotal)}</TableCell>
                        </TableRow>
                        <TableRow  style={{backgroundColor:'red'}}>
                            <TableCell colSpan={5}>Total</TableCell>
                            <TableCell>{(invoiceSubtotal)}</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </div>


    )


}
export default EspaceReservation
