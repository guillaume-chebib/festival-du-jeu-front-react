import React, { useEffect, useState} from 'react';
import { useParams } from "react-router-dom";
import { Accordion, AccordionSummary, AccordionDetails, Typography } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { DataGrid } from '@material-ui/data-grid';


import '../styles/App.scss';


const Zone = () => {

    let {id} = useParams();

    return(
        <div>
            <h1>Test Zone</h1>
            <Zones id={id}/>
        </div>
    )
}

const Zones = ({id}) => {

    const [zones,setZones] = useState([]) //contient tous les festivals
    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const [expanded, setExpanded] = React.useState(false);

    useEffect(
        async () => {
            const response = await fetch(`/festival/${id}/zone`);
            const body = await response.json();
            const zones = body.message

            zones.map((z) => console.log(z))

            setZones(body.message)

        },[id]);
    return (
        <div style={{paddingTop: '2em'}}>
            <div style={{ height: 400, width: '100%' }}>
                {zones.map(zone => {
                    const {id_zone, nom_zone} = zone.zone
                    return (
                        <Accordion expanded={expanded === id_zone} onChange={handleChange(id_zone)}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon/>}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                            >
                                <Typography>{nom_zone}</Typography>
                            </AccordionSummary>
                            {zone.jeux.map(jeu => {
                                const {titre_jeu} = jeu

                                return (
                                    <AccordionDetails>
                                        <Typography>
                                            {titre_jeu}
                                        </Typography>
                                    </AccordionDetails>
                                )
                                })
                            }
                        </Accordion>
                    )
                })}
            </div>
        </div>
    )
}

export default Zone
