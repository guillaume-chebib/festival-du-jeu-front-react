import React, { useEffect, useState,useCallback} from 'react';
import Button from '@material-ui/core/Button'
import  {useHistory} from "react-router-dom"
import {requestToBack} from "../utils/utils_functions";
import Alert from "@material-ui/lab/Alert";


const Accueil = () => {

    const [response,setResponse] = useState("")

    useEffect(() => {
        async function fetchData() {
            const response = await requestToBack('GET',null,`/home`,null)

            const body = await response[0]
            if (response[1] !== 200) {
                setResponse("Impossible de fetch")
            }
            else {
                setResponse(body.message)
            }
        }
        fetchData()

    },[]);

    const history = useHistory();

    return (
        <div className="App">
            <p>{response}</p>
        </div>
    );

}

export default Accueil;
