import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api'
import Logo from '../../assets/pombo.jpg'
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Servicing() {
  const history = useHistory();


  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  const services = [
    {
      "id": 5,
      "descricao": "Sopa de espinafre com trakinas",
      "val": 999999
    },
    {
      "id": 1,
      "descricao": "Feijão com pipoca",
      "val": 12
    }
  ]


  return (
    <div className="body">
      <div className="container">
        <header>
          <div>
            <img src={Logo} alt="LeColombe Royale Kitchen logo"></img>
            <span>LeColombe Royale kitchen</span>
          </div>
          <button onClick={handleLogout} type="button">
            <FiPower size={18} color="#e02041"></FiPower>
          </button>
        </header>

        <h1>Nossos pratos:</h1>
        <div className="listContainer">
          <ul>
            {services.map(services => (
              <li key={services.id}>
                <strong>Código do prato: {services.id}</strong>
                <strong>Descrição:</strong>
                <p>{services.descricao}</p>
                <strong>Valor: {services.val}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}