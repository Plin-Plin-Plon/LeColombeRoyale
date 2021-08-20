import React from 'react';
import * as AiIcons from 'react-icons/ai';
import {FiCoffee, FiHome, FiLogIn, FiShoppingCart} from "react-icons/fi";

export const SidebarData = [
  {
    title: 'Registro',
    path: '/register',
    icon: <AiIcons.AiOutlineAudit />,
    cName: 'nav-text'
  },

  {
    title: 'Cozinha',
    path: '/kitchen',
    icon: <FiCoffee/>,
    cName: 'nav-text'
  },

  {
    title: 'Logar',
    path: '/',
    icon: <FiLogIn />,
    cName: 'nav-text'
  },

  {
    title: 'Cadastrar quarto',
    path: '/createroom',
    icon: <AiIcons.AiFillHome />,
    cName: 'nav-text'
  },

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
  },

];