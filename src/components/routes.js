import {Switch, Route} from "react-router-dom"

import App from "../App";
import React from "react";
import Jeu from "./jeu"
import Festival from "./festival"
import Contact from "./contact"
import Organisateur from "./organisateur"


const Routes = () => (
    <Switch>
        <Route exact path="/" component={App}/>
        <Route exact path="/festival" component={Festival}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/jeu" component={Jeu}/>
        <Route exact path="/organisateur" component={Organisateur}/>
    </Switch>
)

export default Routes