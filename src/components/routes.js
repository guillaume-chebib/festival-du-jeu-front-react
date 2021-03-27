import {Switch, Route} from "react-router-dom"

import Accueil from "./accueil";
import React from "react";
import Jeu from "./jeux/jeu"
import Festival from "./festivals/festival"
import Contact from "./contact"
import Connexion from "./connexion";
import Organisateur from "./organisateur/organisateur"
import AjoutOrganisateur from "./organisateur/ajoutOrganisateur"
import { PrivateRoute } from 'react-auth-kit'
import Zone from "./zone"
import PrivateComponent from "./privateComponent";
import Societe from "./societes/societe";
import Dashboard from "./user/dashboard";
import SuiviExposants from "./suivi/suivi_exposants/suivi_exposants"
import SuiviReservations from "./suivi/suivi_reservations/suivi_reservations"


const Routes = () => (
    <Switch>
        <Route exact path="/" component={Accueil}/>
        <PrivateRoute exact path="/festival" loginPath={'/login'} component={Festival}/>
        <PrivateRoute exact path="/contact" loginPath={'/login'} component={Contact}/>
        <PrivateRoute exact path="/jeu" loginPath={'/login'} component={Jeu}/>
        <PrivateRoute exact path="/festival/:id/exposants" loginPath={'/login'} component={SuiviExposants}/>
        <PrivateRoute exact path="/festival/:id/reservations" loginPath={'/login'} component={SuiviReservations}/>
        <Route exact path="/login" component={Connexion}/>
        <PrivateRoute exact path="/organisateur" loginPath={'/login'} component={Organisateur}/>
        <PrivateRoute exact path="/organisateur/ajout" loginPath={'/login'} component={AjoutOrganisateur}/>
        <PrivateRoute component={PrivateComponent} path={'/privateRoute'} loginPath={'/login'} exact/>
        <PrivateRoute exact path="/festival/:id/zone"  loginPath={'/login'} component={Zone}/>
        <PrivateRoute exact path="/societe"  loginPath={'/login'} component={Societe}/>
        <PrivateRoute loginPath={'/login'} exact path="/dashboard" component={Dashboard}/>
    </Switch>
)

export default Routes
