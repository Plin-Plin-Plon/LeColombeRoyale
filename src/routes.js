import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Logon from './pages/Logon'
import Logado from './pages/Logado'
import Register from './pages/Register'
import Kitchen from './pages/Kitchen'
import Access from './pages/Access'
import Navbar from './Components/Navbar/Navbar'
import Acommodation from './pages/Accommodation'
import Servicing from './pages/Servicing'

export default function routes() {
  return (
    <BrowserRouter>
    <Navbar/>
      <switch>
        <Route path="/logon" component={Logon} />
        <Route path="/logado" component={Logado} />
        <Route path="/" exact component={Register} />
        <Route path="/kitchen" exact component={Kitchen} />
        <Route path="/access" exact component={Access} />
        <Route path="/accomodation" exact component={Acommodation} />
        <Route path="/servicing" exact component={Servicing} />
      </switch>
    </BrowserRouter>
  );
}