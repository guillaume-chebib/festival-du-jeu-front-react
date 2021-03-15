import {Switch, Route} from "react-router-dom"

import App from "../App";
import React from "react";
import Jeu from "./jeu"



const Routes = () => (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/jeu" component={Jeu}/>
    </Switch>
)

export default Routes