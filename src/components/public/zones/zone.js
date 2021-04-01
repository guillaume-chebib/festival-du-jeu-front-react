import React, {useEffect, useState} from 'react';
import {Accordion, AccordionSummary, Grid, Typography} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {makeStyles} from '@material-ui/core/styles';
import JeuxReservesDetail from '../jeuxReserves/jeux_reserves_detail'
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


const Zones = () => {
    const classes = useStyles();
    const authHeader = useAuthHeader()
    const [zones,setZones] = useState([])
    const [trig, setTrig] = useState([])

    useEffect(() => {
        async function fetchData() {
            const response = await requestToBack('GET',null,`/public/festival/zone`,authHeader())

            const zones = await response[0]
            if (response[1] !== 200) {
                setZones("Impossible de fetch")
            }
            else {
                setZones(zones)
            }


        }

        fetchData();

    },[trig]);


    return (
        <div>
            <h1>Test Zone</h1>
            <div style={{paddingTop: '2em'}}>
                <div style={{ height: 400, width: '100%' }}>
                    <div className={classes.root}>
                        <Grid container spacing={2}>
                        {zones.map(zone => {
                        const {id_zone, nom_zone} = zone.zone

                        return (
                             <Grid item xs={12} sm={6}>
                                 <Accordion>
                                        <AccordionSummary
                                            expandIcon={<ExpandMoreIcon/>}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header"
                                        >
                                            <Typography className={classes.heading}>{nom_zone}</Typography>
                                            <Typography className={classes.secondaryHeading}>{zone.jeux.length} jeu(x)</Typography>
                                        </AccordionSummary>
                                        <JeuxReservesDetail jeux={zone.jeux}/>
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

export default Zones
