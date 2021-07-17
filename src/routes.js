import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom';

import Logon from './pages/Logon'
import Logado from './pages/Logado'
import Register from './pages/Register'
import Kitchen from './pages/Kitchen'

export default function routes() {
  return (
    <BrowserRouter>
      <switch>
        <Route path="/logon" component={Logon} />
        <Route path="/logado" component={Logado} />
        <Route path="/" exact component={Register} />
        <Route path="/kitchen" exact component={Kitchen} />
      </switch>
    </BrowserRouter>
  );
}