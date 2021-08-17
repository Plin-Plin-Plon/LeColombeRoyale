import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Logo from '../../assets/pombo.jpg';
import api from '../../services/api';
import './styles.css';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FiPower, FiLogOut } from 'react-icons/fi';

export default function Guesthome() {

  const history = useHistory();

  /*useEffect(() =>{
    async function getUsername() {
      try {
        const username = await AsyncStorage.getItem('username').then(value => {
          setUsername(value);
        });
        return username;
      } catch (err) {
        return null;
      }
    }

    getUsername();
  })

  useEffect(() => {
    async function fetchAccomodation(){
      await api
        .get("hospedagem/index", 
        {id: id})
    }
  })*/

  const services = [
    {
      "idServico": 5,
      "nome": "pedido1",
      "descricao": "descricao do pedido 1 aaaaaaaaaaaaaaaaaaaaaaaa",
      "preco": 5001
    },

    {
      "idServico": 7,
      "nome": "pedido2",
      "descricao": "descricao do pedido 2 aaaaaaaaaaaaaaaaaaaaaaaa",
      "preco": 5001
    },

    {
      "idServico": 6,
      "nome": "pedido3",
      "descricao": "descricao do pedido 3 aaaaaaaaaaaaaaaaaaaaaaaa",
      "preco": 5001
    }
  ]
    

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  return (
    <div className="body">
      <div className="container">

        <header>
          <div>
            <img src={Logo} alt="LeColombe Royale Kitchen logo"></img>
            <span>Bem vindo usuário!</span>
          </div>
          <button onClick={handleLogout} type="button">
            <FiLogOut size={18} color="#e02041"></FiLogOut>
          </button>
        </header>
        <div className="Value">
          <div>
            <span>Numero do quarto: 420</span>
          </div>
          <span>Valor atual da estadia: R$ 00.00</span>
        </div>
        <div className="menuButton">
          <button>Veja nossos pratos</button>
        </div>
        <h1>Seus pedidos:</h1>
        <ul>
            {services.length !== 0 ?
              services.map(services => (
                <li key={services.idServico}>
                  <div className="title">
                    <strong>{services.nome}</strong>
                  </div>
                  <p>{services.descricao}</p>
                  <strong>Preço: R${services.preco}</strong>
                  <p>Código: {services.idServico}</p>
                </li>
              ))
              :
              <div className="no-service-found">
                <span>Nenhum prato encontrado</span>
              </div>
            }
          </ul>
      </div>
    </div>
  );
}