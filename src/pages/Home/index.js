import React, { useState, useEffect } from 'react';
import history from "../../history";
import Spinner	from "react-spinners/PulseLoader";
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import Logout from '../../Components/Logout/Logout';
import RateButton from '../../Components/RateButton/RateButton';

import Logo from '../../assets/PC.png';
import './styles.css';

import Navbar from '../../Components/Navbar/Navbar';

export default function Home() {
  const [username, setUsername] = useState("");
  const [roomNumber, setRoomNumber] = useState(null);
  const [totalValue, setTotalValue] = useState("");
  const [orders, setOrders] = useState([]);
  const [recommendedServices, setRecommendedServices] = useState([]);
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
      async function fetchAccommodation() {
        const userId = await syncLoadData('user_id');

        await api
          .get(`hospedagem/index?idHospede=${userId}`)
          .then(async res => {
            try {
              await AsyncStorage.setItem('accommodation_id', res.data.idHospedagem);
              await AsyncStorage.setItem('room', res.data.quarto.numero);
              setRoomNumber(res.data.quarto.numero);
              setTotalValue(res.data.valorTotal);
              setOrders(res.data.pedidos);
            } catch (err) {
              setRoomNumber(null);
              await AsyncStorage.removeItem('accommodation_id');
              await AsyncStorage.removeItem('room');
            }

            setLoading(false);
          }).catch(async err => {
            console.log(err);
          })
      }

      async function fetchRecommendedServices() {
        const userId = await syncLoadData('user_id');

        await api
          .get(`servico/recommend?idPessoa=${userId}`)
          .then(async res => {
            setRecommendedServices(res.data);
          }).catch(async err => {
            console.log(err);
          })
      }

      fetchAccommodation();
      fetchRecommendedServices();
    }
  }, [loading]);

  async function navigateToServices() {
    history.push('/servicing');
  }

  return (
    <div className="body">
      <Navbar />
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
              {recommendedServices.length !== 0 ? <h1>Recomendamos para você:</h1> : null}
              <ul>
                {recommendedServices.length !== 0 ?
                  recommendedServices.map(service => (
                    <li key={service.idServico}>
                      <div className="title">
                        <strong>{service.nome}</strong>
                      </div>
                      <p>{service.descricao}</p>
                      <p>Código: {service.idServico}</p>

                      <div className="menuButton">
                        <button onClick={navigateToServices} type="button">
                          Veja-o em nossos serviços
                        </button>
                      </div>
                    </li>
                  ))
                  : null}
              </ul>
            </ul>
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
            <Spinner loading={loading} size={15} />
          </div>
        )}
      </div>
    </div>
  );
}