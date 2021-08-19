import React from 'react'
import { Router, Route } from 'react-router-dom';
import history from "./history";

import Login from './pages/Login'
import Register from './pages/Register'
import Kitchen from './pages/Kitchen'
import Navbar from './Components/Navbar/Navbar'
import Acommodation from './pages/Accommodation'
import Servicing from './pages/Servicing'
import GuestHome from './pages/GuestHome'

export default function routes() {
  return (
    <Router history={history}>
      <Navbar />
      <switch>
        <Route exact path="/" component={Login} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/kitchen" component={Kitchen} />
        <Route exact path="/accomodation" component={Acommodation} />
        <Route exact path="/servicing" component={Servicing} />
        <Route exact path="/guesthome" component={GuestHome} />
      </switch>
    </Router>
  );
}