import React, { useState, useEffect } from 'react';
import history from "../../history";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import Logout from '../../Components/Logout/Logout';
import RateButton from '../../Components/RateButton/RateButton';

import Logo from '../../assets/PC.png';
import './styles.css';

export default function Home() {
  const [username, setUsername] = useState("");
  const [roomNumber, setRoomNumber] = useState(null);
  const [totalValue, setTotalValue] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function asyncLoadData(key, setData) {
      try {
        const data = await AsyncStorage.getItem(key).then(value => {
          setData(value);
        });
        return data;
      } catch (err) {
        return null;
      }
    }

    asyncLoadData('username', setUsername);
  }, []);

  async function syncLoadData(key) {
    try {
      const data = await AsyncStorage.getItem(key);
      return data;
    } catch (err) {
      return null;
    }
  }

  useEffect(() => {
    if (loading) {
      async function fetchAccomodation() {
        const userId = await syncLoadData('user_id');

        await api
          .get(`hospedagem/index?idHospede=${userId}`)
          .then(async res => {
            try {
              await AsyncStorage.setItem('accomodation_id', res.data.idHospedagem);
              await AsyncStorage.setItem('room', res.data.quarto.numero);
              setRoomNumber(res.data.quarto.numero);
              setTotalValue(res.data.valorTotal);
              setOrders(res.data.pedidos);
            } catch (err) {
              setRoomNumber(null);
              await AsyncStorage.removeItem('accomodation_id');
              await AsyncStorage.removeItem('room');
            }

            setLoading(false);
          }).catch(async err => {
            console.log(err);
          })
      }

      fetchAccomodation();
    }
  }, [loading]);

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

        {!loading && roomNumber ? (
          <>
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
                orders.map(order => (
                  <li key={order.idPedido}>
                    <div className="title">
                      <strong>{order.servico.nome} {order.concluido ? null : "- Pedido pendente"}</strong>
                    </div>
                    <p>{order.servico.descricao}</p>
                    <strong>Preço: R${order.servico.preco}</strong>
                    <p>Código: {order.idPedido}</p>
                    {order.concluido ?
                      <>
                        <strong>Avaliação do pedido: {order.avaliacaoServico ? order.avaliacaoServico : "não avaliado"}</strong>
                        {!order.avaliacaoServico ? <RateButton value={order.avaliacaoServico} idPedido={order.idPedido} /> : null}
                      </> :
                      null}
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
          </>
        ) : !loading && !roomNumber ? (
          <div>
            <span>
              Não encontramos sua hospedagem.
              Por favor, entre em contato com um gerente do hotel.
            </span>
          </div>
        ) : (
          <div>
            <span>
              Carregando informações da sua hospedagem
            </span>
          </div>
        )}
      </div>
    </div>
  );
}