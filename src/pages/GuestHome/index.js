import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import Logout from '../../Components/Logout/Logout';

import Logo from '../../assets/pombo.jpg';
import './styles.css';

export default function Guesthome() {
  const [username, setUsername] = useState("");
  const [userId, setUserId] = useState("");
  const [roomNumber, setRoomNumber] = useState("");
  const [totalValue, setTotalValue] = useState("");
  const [orders, setOrders] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function loadData(key, setData) {
      try {
        const data = await AsyncStorage.getItem(key).then(value => {
          setData(value);
        });
        return data;
      } catch (err) {
        return null;
      }
    }

    loadData('username', setUsername);
    loadData('user_id', setUserId);
  })

  useEffect(() => {
    if (userId) {
      async function fetchAccomodation() {
        await api
          .get(`hospedagem/index?idHospede=${userId}`)
          .then(async res => {
            setRoomNumber(res.data.quarto.numero);
            setTotalValue(res.data.valorTotal);
            setOrders(res.data.pedidos);
          }).catch(async err => {
            console.log(err);
          })
      }

      fetchAccomodation();
    }
  }, [userId]);

  async function navigateToServices() {
    history.push('/servicing');
  }

  return (
    <div className="body">
      <div className="container">

        <header>
          <div>
            <img src={Logo} alt="LeColombe Royale Kitchen logo"></img>
            <span>Bem vindo, {username}!</span>
          </div>
          <Logout />
        </header>

        <div className="Value">
          <div>
            <span>Numero do quarto: {roomNumber}</span>
          </div>
          <span>Valor atual da estadia: R$ {totalValue}</span>
        </div>
        <div className="menuButton">
          <button onClick={navigateToServices} type="button">
            Veja nossos pratos
          </button>
        </div>

        <h1>Seus pedidos:</h1>
        <ul>
          {orders.length !== 0 ?
            orders.map(orders => (
              <li key={orders.idPedido}>
                <div className="title">
                  <strong>{orders.servico.nome}</strong>
                </div>
                <p>{orders.servico.descricao}</p>
                <strong>Preço: R${orders.servico.preco}</strong>
                <strong>Avaliação: {orders.avaliacaoServico ? orders.avaliacaoServico : "não avaliado"}</strong>
                <p>Código: {orders.idPedido}</p>
              </li>
            ))
            :
            <div className="no-service-found">
              <span>Nenhum pedido encontrado</span>
            </div>
          }
        </ul>
        <h1>Recomendamos para você: </h1>
        
        <div className="menuButton">
          <button onClick={navigateToServices} type="button">
            Fazer um pedido
          </button>
        </div>
      </div>
    </div>
  );
}