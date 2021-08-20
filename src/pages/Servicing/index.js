import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api'
import Logout from '../../Components/Logout/Logout';

import KitchenLogo from '../../assets/ratatuile.png'
import './styles.css';

import Navbar from '../../Components/Navbar/Navbar';

export default function Servicing() {
  const [loading, setLoading] = useState(true);
  const [services, setServices] = useState([]);
  const [codigo, setCodigo] = useState("");

  useEffect(() => {
    if (loading) {
      async function fetchServices() {
        await api
          .get("servico/index")
          .then(res => {
            setLoading(false);
            setServices(res.data);
          }).catch(err => {
            console.log(err);
          });
      }

      fetchServices();
    }
  }, [loading])

  async function handleOrder() {
    async function loadData(key) {
      try {
        const data = await AsyncStorage.getItem(key);
        return data;
      } catch (err) {
        return null;
      }
    }

    const idPessoa = await loadData('user_id');
    const numero = await loadData('room');

    const data = {
      hospede: {
        idPessoa
      },
      quarto: {
        numero
      },
      servico: {
        idServico: codigo
      },
      concluido: false
    };

    await api
      .post("pedido/create", data)
      .then(res => {
        alert('Pedido criado com sucesso, aguarde a entrega do mesmo em seu quarto');
      }).catch(err => {
        alert('Houve um erro ao realizar o pedido, por favor tente novamente');
        console.log(err);
      })
  }

  return (
    <div className="body">
      <div className="container">
      <Navbar/>
        <header>
          <div>
            <img src={KitchenLogo} alt="LeColombe Royale Kitchen logo"></img>
            <span>LeColombe Royale kitchen</span>
          </div>
          <Logout />
        </header>
        <form>
          <input
            type="text"
            placeholder="Código do prato"
            value={codigo}
            onChange={e => setCodigo(e.target.value)}
          />
          <button onClick={handleOrder} type="button">
            Solicitar prato
          </button>
        </form>
        <h1>Nossos pratos:</h1>
        <div className="listContainer">
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
    </div>
  );
}