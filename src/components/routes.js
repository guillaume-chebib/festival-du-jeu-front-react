import {Switch, Route} from "react-router-dom"

import App from "../App";
import React from "react";
import Jeu from "./jeu"
import Festival from "./festival"
import Contact from "./contact"


const Routes = () => (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/festival" component={Festival}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/jeu" component={Jeu}/>
    </Switch>
)

export default Routes