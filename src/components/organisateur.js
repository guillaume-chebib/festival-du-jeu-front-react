import React, { useEffect, useState} from 'react';


const Organisateur = () => {

    const [organisateurs,setOrganisateurs] = useState([])

    useEffect(
        async () => {
            // 2. Use a template string to set the URL:
            const response = await fetch(`/organisateur`);
            const body = await response.json();
            setOrganisateurs(body.message)

        },[setOrganisateurs]);
    return (
        <ul>
            {organisateurs.map(o => (
              <OneOrganisateur organisateur={o}/>
            ))}
        </ul>
    )
}

const OneOrganisateur = (props) =>{

    const [organisateur,setOrganisateur] = useState(props.organisateur);

    return(

        <li key={organisateur.id}>Nom : {organisateur.nom_organisateur}, Prénom : {organisateur.prenom_organisateur}</li>

    )

}
export default Organisateur