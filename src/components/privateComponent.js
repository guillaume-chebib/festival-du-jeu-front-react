import React from 'react';
import {useAuthHeader, useAuthUser} from 'react-auth-kit'


const PrivateComponent = () => {

    const auth = useAuthUser()
    const authHeader = useAuthHeader()



    return (
        <div className="App">
            <p>{`Bonjour, votre id: ${auth().uid}, votre statut est superuser: ${auth().superuser}`}</p>
            <p>{authHeader()}</p>
        </div>
    );

}

export default PrivateComponent;
