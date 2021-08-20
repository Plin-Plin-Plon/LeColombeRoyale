import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { FiHome, FiShoppingCart } from "react-icons/fi";

export const SidebarDataCli = [

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

  {
    title: 'Detalhes da conta',
    path: '/details',
    icon: <AiIcons.AiOutlineAudit />,
    cName: 'nav-text'
  }

];