import React from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import history from "./history";

import Login from './pages/Login';
import Register from './pages/Register';
import Kitchen from './pages/Kitchen';
import Accommodation from './pages/Accommodation';
import Servicing from './pages/Servicing';
import Home from './pages/Home';
import Room from './pages/CreateRoom'
import Details from './pages/MyAccount'
import Finish from './pages/FinishAccommodation'

export default function Routes() {
  return (
    <Router history={history}>
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/kitchen" component={Kitchen} />
        <Route path="/accommodation" component={Accommodation} />
        <Route path="/servicing" component={Servicing} />
        <Route path="/home" component={Home} />
        <Route path="/createroom" component={Room} />
        <Route path="/details" component={Details} />
        <Route path="/finish" component={Finish} />
      </Switch>
    </Router>
  );
}