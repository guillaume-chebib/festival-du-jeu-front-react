import React, { useEffect, useState} from 'react';
import {useAuthHeader} from 'react-auth-kit';
import {renameKey, requestToBack} from "../utils/utils_functions"
import TableContainer from "@material-ui/core/TableContainer";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import {TableCell} from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import TableBody from "@material-ui/core/TableBody";

const Contact = () => {
    const authHeader = useAuthHeader()
    const [contacts,setContacts] = useState([])

    useEffect(
        async () => {
            const response = await requestToBack('GET',null,`/contact`,authHeader())

            const body = await response[0]
            if (response[1] !== 200) {
                setContacts("Impossible de fetch")
            }
            else {
                setContacts(body.message)
            }

        },[]);

    return (
        <TableContainer component={Paper}>
            <Table aria-label="simple table">
                <TableHead>
                    <TableRow>
                        <TableCell>Nom</TableCell>
                        <TableCell>Prénom</TableCell>
                        <TableCell>Email</TableCell>
                        <TableCell>Telephones</TableCell>
                        <TableCell>Fonction</TableCell>
                        <TableCell>Est principal ?</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {contacts.map((row) => (
                        <TableRow key={row.nom_contact}>
                            <TableCell>{row.nom_contact}</TableCell>
                            <TableCell>{row.prenom_contact}</TableCell>
                            <TableCell>{row.email_contact}</TableCell>
                            <TableCell>Fixe : {row.telephone_fixe_contact}<br/> Portable :{row.telephone_portable_contact}</TableCell>
                            <TableCell>{row.fonction_contact}</TableCell>
                            <TableCell>{row.est_principal_contact}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    )
}

export default Contact
