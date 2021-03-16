import React from 'react';
import Navbar from "./components/navbar";
import Routes from "./components/routes";
import {BrowserRouter as Router} from "react-router-dom";

const App = () => {

  return (
      <div className="App">
        <Router>
          <Navbar/>
          <Routes/>
        </Router>
      </div>
  );

}

export default App;