import React from 'react';
import * as AiIcons from 'react-icons/ai';
import { FiHome, FiShoppingCart, FiUserMinus } from "react-icons/fi";

export const SidebarDataCli = [

  {
    title: 'Cadastrar hospedagem',
    path: '/accommodation',
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
  },

  {
    title: 'Finalizar estadia',
    path: '/finish',
    icon: <FiUserMinus />,
    cName: 'nav-text'
  }

];