import React, { useEffect, useState} from 'react';
import Button from "@material-ui/core/Button";
import  {useHistory} from "react-router-dom"

const Organisateur = () => {

    const history = useHistory();
    const [organisateurs,setOrganisateurs] = useState([])

    useEffect(
        async () => {
            // 2. Use a template string to set the URL:
            const response = await fetch(`/organisateur`);
            const body = await response.json();
            setOrganisateurs(body.message)

        },[setOrganisateurs]);
    return (
        <div>
            <Button variant="contained" color="primary" onClick={() => history.push('/organisateur/ajout')}>
                Ajouter un organisateur
            </Button>
            <ul>
                {organisateurs.map(o => (
                    <OneOrganisateur organisateur={o}/>
                ))}
            </ul>
        </div>
    )
}

const OneOrganisateur = (props) =>{

    const [organisateur,setOrganisateur] = useState(props.organisateur);

    return(

        <li key={organisateur.id}>Nom : {organisateur.nom_organisateur}, Prénom : {organisateur.prenom_organisateur}</li>

    )

}
export default Organisateur
