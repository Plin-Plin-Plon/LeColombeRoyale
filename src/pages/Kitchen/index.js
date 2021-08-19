import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import api from '../../services/api'
import history from "../../history";
import Logout from '../../Components/Logout/Logout';

import Logo from '../../assets/pombo.jpg'
import './styles.css';

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (loading) {
      async function fetchNotConcludedOrders() {
        await api
          .get("pedido/index?concluido=false")
          .then(res => {
            setOrders(res.data);
            setLoading(false);
          }).catch(err => {
            alert('Houve um erro de conexão');
            console.log(err);
          })
      }

      fetchNotConcludedOrders();
    }
  }, [loading])

  async function handleItemConclusion(order) {
    const data = {
      idPedido: order.idPedido,
      concluido: true
    }

    await api
      .patch("pedido/update", data)
      .then(res => {
        alert('Pedido concluído com sucesso');
        setLoading(true);
      }).catch(err => {
        alert('Houve um erro ao concluir o pedido');
        console.log(err);
      })
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

        <h1>Pedidos pendentes:</h1>
        <div className="listContainer">
          <ul>
            {orders.length !== 0 ?
              orders.map(order => (
                <li key={order.idPedido}>
                  <div className="title">
                    <strong>{order.servico.nome}</strong>
                  </div>
                  <p>Código do pedido: {order.idPedido}</p>
                  <p>Código do prato: {order.servico.idServico}</p>
                  <p>{order.servico.descricao}</p>
                  <strong>Entregar no quarto: {order.quarto.numero}</strong>
                  <button onClick={() => {handleItemConclusion(order)}} type="button">
                    Concluido
                  </button>
                </li>
              ))
              :
              <div className="no-order-found">
                <span>Nenhum pedido pendente</span>
              </div>
            }
          </ul>
        </div>
      </div>
    </div>
  );
}