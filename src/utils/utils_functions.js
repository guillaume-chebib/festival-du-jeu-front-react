import {useAuthUser, useSignOut} from "react-auth-kit";
import React, {useEffect, useState} from "react";
import {Redirect} from "react-router-dom";


export function renameKey(obj, oldKey, newKey) { //permet de renommer les colonnes
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}


export function requestGetToBack(data) {

}

export async function requestToBack(verbe, data, route, token) {

    if (verbe !== 'GET') {

        const response = await fetch(`https://festival-du-jeu-api.herokuapp.com${route}`, {
            method: verbe,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify(data),
        });

        const body = await response.json()
        return [body, response.status]
    } else {
        const response = await fetch(`https://festival-du-jeu-api.herokuapp.com${route}`, {
            method: verbe,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        });

        const body = await response.json()
        return [body, response.status]
    }

}

export const IsAdmin = ({}) => {
    const signOut = useSignOut()
    const auth = useAuthUser()
    const [status, setStatus] = useState("")
    const [logoff, setLogoff] = useState("")

    useEffect(() => {
        let isAdmin = auth().superuser
        if (isAdmin === "false") {
            setStatus(<Redirect to="/login"/>)
            setLogoff(signOut)
        }
    })

    return (
        <div>
            {status}
            {logoff}
        </div>
    )
}
