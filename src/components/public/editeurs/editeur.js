import React, {useEffect, useState} from 'react';
import {Accordion, AccordionSummary, Grid, Typography} from '@material-ui/core';
import JeuxReservesDetail from "../jeuxReserves/jeux_reserves_detail";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from '@material-ui/core/styles';
import '../../../styles/App.scss';
import {useAuthHeader} from 'react-auth-kit';

import {requestToBack} from "../../../utils/utils_functions"

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        padding: theme.spacing(2),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '90%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const Editeurs = () => {
    const classes = useStyles();
    const authHeader = useAuthHeader()
    const [editeurs, setEditeurs] = useState([])
    const [trig, setTrig] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await requestToBack('GET', null, `/public/festival/editeur`, authHeader())

            const editeurs = await response[0]
            if (response[1] !== 200) {
                setEditeurs("Impossible de fetch")
            } else {
                setEditeurs(editeurs)
            }


        }

        fetchData();

    }, [trig]);


    return (
        <div>
            <h1>Les jeux présents par éditeur</h1>

            <div style={{paddingTop: '2em'}}>
                <div style={{height: 400, width: '100%'}}>
                    <div className={classes.root}>
                        <Grid container spacing={2}>
                            {editeurs.map(editeur => {
                                const {id_societe, nom_societe} = editeur.societe

                                return (
                                    <Grid item xs={12} sm={6}>
                                        <Accordion>
                                            <AccordionSummary
                                                expandIcon={<ExpandMoreIcon/>}
                                                aria-controls="panel1a-content"
                                                id="panel1a-header"
                                            >
                                                <Typography className={classes.heading}>{nom_societe}</Typography>
                                                <Typography
                                                    className={classes.secondaryHeading}>{editeur.jeux.length} jeu(x)</Typography>
                                            </AccordionSummary>
                                            <JeuxReservesDetail jeux={editeur.jeux}/>
                                        </Accordion>
                                    </Grid>
                                )
                            })}
                        </Grid>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Editeurs
