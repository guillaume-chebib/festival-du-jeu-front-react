import React, { useEffect, useState,useCallback} from 'react';
import Button from '@material-ui/core/Button'
import  {useHistory} from "react-router-dom"

import './App.css';

const App = () => {

  const [response,setResponse] = useState("")

  useEffect( () => {
    const callApi = async () => {
      const response = await fetch('/home');
      const body = await response.json();
      if (response.status !== 200) throw Error(body.message);
      return body;
    };
    const test = async () => {
      try {
        let res = await callApi()
        console.log(res)
        await setResponse(res.message)
      }
      catch (e) {
        console.log(e)
      }
    }
    test()
  },[setResponse]);

  const history = useHistory();
  const handleOnClick = useCallback(() => history.push('/festival'), [history]);

  return (
      <div className="App">
        <p>{response}</p>
        <Button variant="contained" color="primary" onClick={handleOnClick}>
          Hello World
        </Button>
      </div>
  );

}

export default App;