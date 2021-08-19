import React from 'react';
import * as AiIcons from 'react-icons/ai';
import {FiCoffee, FiHome, FiLogIn, FiShoppingCart} from "react-icons/fi";

export const SidebarData = [

  {
    title: 'Cadastrar hospedagem',
    path: '/accomodation',
    icon: <FiHome />,
    cName: 'nav-text'
  },

  {
    title: 'Serviços',
    path: '/servicing',
    icon: <FiShoppingCart />,
    cName: 'nav-text'
  },

  {
    title: 'Minha hospedagem',
    path: '/home',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  }

];