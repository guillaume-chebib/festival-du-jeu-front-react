import React, {useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Zone from "../zones/zone";
import {DataGrid} from "@material-ui/data-grid";
import {useHistory} from "react-router-dom";
import Checkbox from "@material-ui/core/Checkbox";

// const columns = [
//     { field: 'id', headerName: 'ID', width: 70 },
//     { field: 'titre', headerName: 'Titre jeu', width: 150 },
//     { field: 'joueurs', headerName: 'Joueurs', width: 100 },
//     { field: 'age_min', headerName: 'Age', width: 100 },
//     { field: 'duree', headerName: 'Durée', width: 120 },
//     { field: 'proto', headerName: 'Avant 1ère ?', width: 80 },
//     { field: 'recu', headerName: 'Reçu ?', width: 80 },
// ];
//
// const JeuxReserves =  ({jeux}) => {
//     const history = useHistory();
//
//     let allRows = []
//     jeux.map(jeu => {
//         let rows = {
//             id : jeu.id_jeu,
//             titre : jeu.titre_jeu,
//             joueurs : jeu.min_joueur_jeu +" - "+ jeu.max_joueur_jeu,
//             age_min : jeu.age_min_jeu + " ans",
//             duree : jeu.duree_jeu + " min",
//             proto : jeu.proto_jeu,
//             recu : jeu.recu_jeu_reserve
//         }
//         console.log("JEU :" +rows)
//         allRows = allRows.concat(rows)
//     })
//
//     console.log(allRows)
//
//
//     return (
//         <div style={{ height: 300, width: '100%' }}>
//             <DataGrid rows={allRows} columns={columns} pageSize={5}/>
//         </div>
//     );
// }

const useStyles = makeStyles({
    root: {
        width: '100%',
    },
    container: {
        maxHeight: 440,
    },
});

const columns = [
    { field: 'id_jeu', headerName: 'Id jeu', display: "none" },
    { field: 'titre_jeu', headerName: 'Titre du jeu' },
    { field: 'nom_societe', headerName: 'Editeur' },
    { field: 'min_joueur_jeu', headerName: 'Joueurs', hide: false },
    { field: 'age_min_jeu', headerName: 'Age min.', hide: false },
    { field: 'duree_jeu', headerName: 'Durée', hide: false },
    { field: 'proto_jeu', headerName: 'Avant 1ère ?', hide: false },
]

export const JeuxReservesDetail = ({jeux}) => {
    const classes = useStyles();
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    return (

        <Paper className={classes.root}>
            <TableContainer className={classes.container}>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <TableRow>
                            {columns.map((column) => (
                                <TableCell
                                    key={column.field}
                                    hidden={column.hide}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth, display: column.display}}
                                >
                                    {column.headerName}
                                </TableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {jeux.map(jeu => {
                            const {titre_jeu, id_jeu, nom_societe,min_joueur_jeu, max_joueur_jeu, age_min_jeu, duree_jeu, proto_jeu} = jeu

                            return (
                                <TableRow>
                                    <TableCell style={{display: "none"}}>{id_jeu}</TableCell>
                                    <TableCell>{titre_jeu}</TableCell>
                                    <TableCell>{nom_societe}</TableCell>
                                    <TableCell>{min_joueur_jeu} - {max_joueur_jeu}</TableCell>
                                    <TableCell>{age_min_jeu} ans</TableCell>
                                    <TableCell>{duree_jeu} min</TableCell>
                                    <TableCell padding="checkbox">
                                        <Checkbox
                                            checked={proto_jeu}
                                            disabled={true}
                                        />
                                    </TableCell>
                                </TableRow>
                            )
                            })
                        }
                        {/*{rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage).map((row) => {*/}
                        {/*    return (*/}
                        {/*        <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>*/}
                        {/*            {columns.map((column) => {*/}
                        {/*                const value = row[column.id];*/}
                        {/*                return (*/}
                        {/*                    <TableCell key={column.id} align={column.align}>*/}
                        {/*                        {column.format && typeof value === 'number' ? column.format(value) : value}*/}
                        {/*                    </TableCell>*/}
                        {/*                );*/}
                        {/*            })}*/}
                        {/*        </TableRow>*/}
                        {/*    );*/}
                        {/*})}*/}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 15]}
                component="div"
                count={jeux.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    );
}

export default JeuxReservesDetail

