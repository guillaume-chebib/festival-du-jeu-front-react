import React, { useEffect, useState} from 'react';


const Festival = () => {

    const [festivals,setFestivals] = useState([])

    useEffect(
        async () => {
            // 2. Use a template string to set the URL:
            const response = await fetch(`/festival`);
            const body = await response.json();
            setFestivals(body.message)

        },[setFestivals]);
    return (
        <ul>
            {festivals.map(f => (
              <OneFestival festival={f}/>
            ))}
        </ul>
    )
}

const OneFestival = (props) =>{

    const [festival,setFestival] = useState(props.festival);

    return(

        <li key={festival.id}>Nom : {festival.nom_festival}, Année: {festival.annee_festival}</li>

    )

}
export default Festival