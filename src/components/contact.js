import React, { useEffect, useState} from 'react';
import {renameKey, requestToBack} from "../utils/utils_functions"

const Contact = () => {

    const [contacts,setContacts] = useState([])

    useEffect(
        async () => {
            const response = await requestToBack('GET',null,`/contact`,null) //exemple avec GET

            const body = await response[0]
            if (response[1] !== 200) {
                setContacts("Impossible de fetch")
            }
            else {
                setContacts(body.message)
            }

        },[setContacts]);
    return (
        <ul>
            {contacts.map(c => (
              <OneContact contact={c}/>
            ))}
        </ul>
    )
}

const OneContact = (props) =>{

    const [contact,setContact] = useState(props.contact);

    return(

        <li key={contact.id}>Nom : {contact.nom_contact}, Prénom : {contact.prenom_contact}</li>

    )

}
export default Contact
