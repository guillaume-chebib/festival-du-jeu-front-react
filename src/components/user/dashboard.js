import React, { useEffect, useState,useCallback} from 'react';
import Button from '@material-ui/core/Button'
import  {useHistory} from "react-router-dom"
import {requestToBack} from "../../utils/utils_functions";


const Dashboard = () => {

    const [response,setResponse] = useState("")

    useEffect(() => {
        async function fetchData() {
            // const response = await requestToBack('GET',null,`/home`,null)
            //
            // const body = await response[0]
            // if (response[1] !== 200) {
            //     setResponse("Impossible de fetch")
            // }
            // else {
            //     setResponse(body.message)
            // }
        }
        fetchData()

    },[]);

    const history = useHistory();

    return (
        <div className="App">
            <p>{response}</p>
            <Button variant="contained" color="primary"  onClick={() => history.push('/festival')}>
                Les festivals
            </Button>
            <Button variant="contained" color="primary" onClick={() => history.push('/privateRoute')}>
                Page protegée
            </Button>
            <Button variant="contained" color="primary" onClick={() => history.push('/organisateur')}>
                Gérer les organisateurs
            </Button>
            <Button variant="contained" color="primary" onClick={() => history.push('/jeu')}>
                Jeux
            </Button>
        </div>
    );

}

export default Dashboard;
