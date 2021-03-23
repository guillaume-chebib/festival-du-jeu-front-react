

export function renameKey ( obj, oldKey, newKey ) { //permet de renommer les colonnes
    obj[newKey] = obj[oldKey];
    delete obj[oldKey];
}


export function requestGetToBack(data){

}

export async function requestToBack(verbe,data,route,token){

    if(verbe !== 'GET') {

        const response = await fetch(route, {
            method: verbe,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
            body: JSON.stringify(data),
        });

        const body = await response.json()
        return [body,response.status]
    }
    else{
        const response = await fetch(route, {
            method: verbe,
            headers: {
                'Content-Type': 'application/json',
                Authorization: token
            },
        });

        const body = await response.json()
        return [body,response.status]
    }

}
