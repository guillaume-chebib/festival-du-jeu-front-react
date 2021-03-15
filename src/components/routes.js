import {Switch, Route} from "react-router-dom"

import App from "../App";
import React from "react";
import Jeu from "./jeu"
import Festival from "./festival"


const Routes = () => (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/festival" component={Festival}/>
    </Switch>
)

export default Routes