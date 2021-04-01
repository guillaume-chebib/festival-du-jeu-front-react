import React, {useEffect, useState} from "react";
import {requestToBack} from "../../utils/utils_functions";
import {useAuthHeader} from "react-auth-kit";
import useStylesTableValueColor from "../table/styles";
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import {TextField} from "@material-ui/core";


const EspaceReservation = ({setTrig, reservation}) => {
    const classes = useStylesTableValueColor();

    const authHeader = useAuthHeader()
    const [espaces, setEspaces] = useState()


    useEffect(() => {
        async function fetchData() {
            setEspaces(reservation.allocations_espace)
        }

        fetchData();

    }, []);

    function subtotal(items) {
        // return items.map(({ price }) => price).reduce((sum, i) => sum + i, 0);
        return 0;
    }

    const invoiceSubtotal = subtotal(reservation);

    const handlePutAllocation = async (espace) => {
        const response = await requestToBack('PUT', espace, `/reservation/${reservation.id}/allocation_espace/${espace.id_espace}`, authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        handleChange(reservation)
    };

    const handleChange = async (reservation) => {
        let sommePrix = 0
        espaces.map(e => sommePrix += calculPrixRemise(e))
        reservation.prix_total_reservation = sommePrix + reservation.reduction_reservation
        const response = await requestToBack('PUT', reservation, `/reservation/${reservation.id_reservation}`, authHeader())
        const body = await response[0]
        if (response[1] !== 200) {
            console.log("erreur serveur")
        }
        setTrig(reservation)

    };

    const calculPrix = (row) => {
        const prix_table = (row.nb_table_allocation_espace * row.prix_table_espace)
        const prix_m2 = (row.m2_allocation_espace * row.prix_table_espace)
        return prix_table + prix_m2
    }
    const calculPrixRemise = (row) => {
        return calculPrix(row) - row.remise_allocation_espace
    }

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
                                        type="number"
                                        defaultValue={row.nb_table_allocation_espace}
                                        onChange={(event => {
                                            row.nb_table_allocation_espace = (event.target.value === "" ? 0 : event.target.value)
                                            handlePutAllocation(row)
                                        })}
                                    />
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        defaultValue={row.m2_allocation_espace}
                                        onChange={(event => {
                                            row.m2_allocation_espace = (event.target.value === "" ? 0 : event.target.value)
                                            handlePutAllocation(row)
                                        })}
                                    />

                                </TableCell>
                                <TableCell>
                                    {calculPrix(row)}
                                </TableCell>
                                <TableCell>
                                    <TextField
                                        type="number"
                                        defaultValue={row.remise_allocation_espace}
                                        onChange={(event => {
                                            row.remise_allocation_espace = (event.target.value === "" ? 0 : event.target.value)
                                            handlePutAllocation(row)
                                        })}
                                    />

                                </TableCell>
                                <TableCell>
                                    {calculPrixRemise(row)}
                                </TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell colSpan={5}>Supplément</TableCell>
                            <TableCell>
                                <TextField
                                    type="number"
                                    defaultValue={reservation.reduction_reservation}
                                    onChange={async (event) => {
                                        reservation.reduction_reservation = (event.target.value === "" ? 0 : event.target.value)
                                        handleChange(reservation)
                                        setTrig(reservation)
                                    }}
                                />
                            </TableCell>
                        </TableRow>
                        <TableRow style={{backgroundColor: '#739600'}}>
                            <TableCell colSpan={5}>Total</TableCell>
                            <TableCell>
                                {reservation.prix_total_reservation}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            }
        </div>


    )


}
export default EspaceReservation
