import {Switch, Route} from "react-router-dom"

import Accueil from "./accueil";
import React from "react";
import Jeu from "./jeu"
import Festival from "./festival"
import Contact from "./contact"
import Connexion from "./connexion";
import Organisateur from "./organisateur"
import { PrivateRoute } from 'react-auth-kit'
import Zone from "./zone"
import PrivateComponent from "./privateComponent";


const Routes = () => (
    <Switch>
        <Route exact path="/" component={Accueil}/>
        <Route exact path="/festival" component={Festival}/>
        <Route exact path="/contact" component={Contact}/>
        <Route exact path="/jeu" component={Jeu}/>
        <Route exact path="/login" component={Connexion}/>
        <Route exact path="/organisateur" component={Organisateur}/>
        <PrivateRoute component={PrivateComponent} path={'/privateRoute'} loginPath={'/login'} exact/>

        <Route exact path="/festival/:id/zone" component={Zone}/>
    </Switch>
)

export default Routes
