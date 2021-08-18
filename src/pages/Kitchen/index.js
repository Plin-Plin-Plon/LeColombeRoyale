import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';

import api from '../../services/api'
import Logout from '../../Components/Logout/Logout';

import Logo from '../../assets/pombo.jpg'
import './styles.css';

export default function Kitchen() {
  const history = useHistory();

  function handleItemConclusion() {
    //Função pra alterar o estados do pedido para concluido
  }

  return (
    <div className="body">
      <div className="container">
        <header>
          <div>
            <img src={Logo} alt="LeColombe Royale Kitchen logo"></img>
            <span>LeColombe Royale kitchen</span>
          </div>
          <Logout />
        </header>

        <h1>Pratos pendentes:</h1>
        <div className="listContainer">
          <ul>
            <li>
              <strong>Código do prato: 1</strong>
              <strong>Descrição:</strong>
              <p>Que descrição boa</p>
              <strong>Entregar no quarto: 9</strong>
              <button>Concluido</button>
            </li>

            <li>
              <strong>Código do prato: 1</strong>
              <strong>Descrição:</strong>
              <p>Que descrição boa</p>
              <strong>Entregar no quarto: 9</strong>
              <button>Concluido</button>
            </li>

            <li>
              <strong>Código do prato: 1</strong>
              <strong>Descrição:</strong>
              <p>Que descrição boa</p>
              <strong>Entregar no quarto: 9</strong>
              <button>Concluido</button>
            </li>

            <li>
              <strong>Código do prato: 1</strong>
              <strong>Descrição:</strong>
              <p>Que descrição boa</p>
              <strong>Entregar no quarto: 9</strong>
              <button>Concluido</button>
            </li>

            <li>
              <strong>Código do prato: 1</strong>
              <strong>Descrição:</strong>
              <p>Que descrição boa</p>
              <strong>Entregar no quarto: 9</strong>
              <button>Concluido</button>
            </li>

            <li>
              <strong>Código do prato: 1</strong>
              <strong>Descrição:</strong>
              <p>Que descrição boa</p>
              <strong>Entregar no quarto: 9</strong>
              <button>Concluido</button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}