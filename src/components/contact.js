import React, { useEffect, useState} from 'react';


const Contact = () => {

    const [contacts,setContacts] = useState([])

    useEffect(
        async () => {
            // 2. Use a template string to set the URL:
            const response = await fetch(`/contact`);
            const body = await response.json();
            setFestivals(body.message)

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