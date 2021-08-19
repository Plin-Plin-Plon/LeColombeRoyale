import React from 'react'
import { Router, Route, Switch } from 'react-router-dom';
import history from "./history";

import Login from './pages/Login'
import Register from './pages/Register'
import Kitchen from './pages/Kitchen'
import Navbar from './Components/Navbar/Navbar'
import Acommodation from './pages/Accommodation'
import Servicing from './pages/Servicing'
import Home from './pages/Home'

export default function Routes() {
  return (
    <Router history={history}>
      <Navbar />
      <Switch>
        <Route path="/" exact component={Login} />
        <Route path="/register" component={Register} />
        <Route path="/kitchen" component={Kitchen} />
        <Route path="/accomodation" component={Acommodation} />
        <Route path="/servicing" component={Servicing} />
        <Route path="/home" component={Home} />
      </Switch>
    </Router>
  );
}