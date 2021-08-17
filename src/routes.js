import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Login from './pages/Login'
import Logado from './pages/Logado'
import Register from './pages/Register'
import Kitchen from './pages/Kitchen'
import Navbar from './Components/Navbar/Navbar'
import Acommodation from './pages/Accommodation'
import Servicing from './pages/Servicing'
import GuestHome from './pages/GuestHome'

export default function routes() {
  return (
    <BrowserRouter>
    <Navbar/>
      <switch>
        <Route path="/login" component={Login} />
        <Route path="/logado" component={Logado} />
        <Route path="/" exact component={Register} />
        <Route path="/kitchen" exact component={Kitchen} />
        <Route path="/accomodation" exact component={Acommodation} />
        <Route path="/servicing" exact component={Servicing} />
        <Route path="/guesthome" exact component={GuestHome} />
      </switch>
    </BrowserRouter>
  );
}