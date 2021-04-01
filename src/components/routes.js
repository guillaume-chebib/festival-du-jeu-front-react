import {Redirect, Route, Switch} from "react-router-dom"

import Accueil from "./accueil";
import React from "react";
import Jeu from "./jeux/jeu"
import Festival from "./festivals/festival"
import Contact from "./contact"
import Connexion from "./connexion";
import Organisateur from "./organisateur/organisateur"
import AjoutOrganisateur from "./organisateur/ajoutOrganisateur"
import {PrivateRoute} from 'react-auth-kit'
import Zones from "./public/zones/zone"
import PrivateComponent from "./privateComponent";
import Societe from "./societes/societe";
import Dashboard from "./user/dashboard";
import SuiviExposants from "./suivi/suivi_exposants/suivi_exposants"
import SuiviReservations from "./suivi/suivi_reservations/suivi_reservations"

import JeuxReserves from "./jeux_reserves/jeuxReserves";
import Reservation from "./reservations/reservation"
import ListJeux from "./public/jeuxReserves/listJeux";
import Editeurs from "./public/editeurs/editeur";
import RedirectReservation from "./reservations/redirectReservation";


const Routes = () => (
    <Switch>
        <Route exact path="/" component={Accueil}/>
        <PrivateRoute exact path="/festival" loginPath={'/login'} component={Festival}/>
        <PrivateRoute exact path="/reservation" loginPath={'/login'} component={RedirectReservation}/>
        <PrivateRoute exact path="/contact" loginPath={'/login'} component={Contact}/>
        <PrivateRoute exact path="/jeu" loginPath={'/login'} component={Jeu}/>
        <PrivateRoute exact path="/festival/:id/exposants" loginPath={'/login'} component={SuiviExposants}/>
        <PrivateRoute exact path="/festival/:id/reservation/:id_reservation/jeuxReserves" loginPath={'/login'} component={JeuxReserves}/>
        <PrivateRoute exact path="/festival/:id/reservations" loginPath={'/login'} component={SuiviReservations}/>
        <PrivateRoute exact path="/reservation/:id" loginPath={'/login'} component={Reservation}/>
        <Route exact path="/login" component={Connexion}/>
        <PrivateRoute exact path="/organisateur" loginPath={'/login'} component={Organisateur}/>
        <PrivateRoute exact path="/organisateur/ajout" loginPath={'/login'} component={AjoutOrganisateur}/>
        <PrivateRoute component={PrivateComponent} path={'/privateRoute'} loginPath={'/login'} exact/>
        <PrivateRoute exact path="/societe"  loginPath={'/login'} component={Societe}/>
        <PrivateRoute loginPath={'/login'} exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/public/zone" component={Zones}/>
        <Route exact path="/public/jeu" component={ListJeux}/>
        <Route exact path="/public/editeur" component={Editeurs}/>
        <Route path="*">
                <Redirect to="/" />
        </Route>
    </Switch>
)

export default Routes
