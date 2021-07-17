import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api'
import Logo from '../../assets/pombo.jpg'
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Kitchen() {
  const history = useHistory();


  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  function handleItemConclusion(){
    //Função pra alterar o estados do pedido para concluido
  }

  return (
    <div className="body">
      <div className="container">
        <header>
          <div>
            <img src={Logo} alt="LeColombe Royale"></img>
            <span>LeColombe Royale kitchen</span>
          </div>
          <button onClick={handleLogout} type="button">
            <FiPower size={18} color="#e02041"></FiPower>
          </button>
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