import React, { useEffect, useState,useCallback} from 'react';
import Button from '@material-ui/core/Button'
import  {useHistory} from "react-router-dom"
import {requestToBack} from "../utils/utils_functions";
import Carousel from 'react-material-ui-carousel'
import {Paper} from "@material-ui/core";
import Container from '@material-ui/core/Container';

const Accueil = () => {

    var items = [
        {
            name: "Random Name #1",
            description: "Probably the most random thing you have ever seen!"
        },
        {
            name: "Random Name #2",
            description: "Hello World!"
        }
    ]

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
            <Container maxWidth="lg">
                <Carousel>
                    {
                        items.map( (item, i) => <Item key={i} item={item} /> )
                    }
                </Carousel>
                <p>{response}</p>
            </Container>

        </div>
    );

}
const Item = ({item}) =>
{
    return (
        <Paper>
            <h2>{item.name}</h2>
            <p>{item.description}</p>

            <Button className="CheckButton">
                Check it out!
            </Button>
        </Paper>
    )
}
export default Accueil;
