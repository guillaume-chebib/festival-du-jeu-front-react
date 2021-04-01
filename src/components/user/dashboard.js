import React, {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button'
import {useHistory} from "react-router-dom"
import {useAuthUser} from "react-auth-kit";
import {themeResponsive} from "../table/styles";
import Typography from "@material-ui/core/Typography";
import {ThemeProvider} from "@material-ui/core/styles";


const Dashboard = () => {

    const [response, setResponse] = useState("")
    const auth = useAuthUser()


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

    }, []);

    return (
        <div>
            <ThemeProvider theme={themeResponsive}>
                <Typography variant="h6" color="inherit">
                    {`Bienvenue, votre statut superuser est: ${auth().superuser}`}
                </Typography>
            </ThemeProvider>

        </div>
    );

}

export default Dashboard;
