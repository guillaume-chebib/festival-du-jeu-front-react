import React from 'react';
import {useAuthUser} from 'react-auth-kit'


const PrivateComponent = () => {

    const auth = useAuthUser()



    return (
        <div className="App">
            <p>{`Bonjour, votre id: ${auth().uid}, votre statut est superuser: ${auth().superuser}`}</p>
        </div>
    );

}

export default PrivateComponent;
