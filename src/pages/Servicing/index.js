import React, { useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api'
import Logo from '../../assets/pombo.jpg'
import { FiPower, FiTrash2 } from 'react-icons/fi';

export default function Servicing() {
  const [services, setServices] = useState([]);
  const history = useHistory();

  function handleLogout() {
    localStorage.clear();
    history.push('/');
  }

  useEffect(() => {
    async function fetchServices() {
      await api
        .get("servico/index")
        .then(res => {
          setServices(res.data);
        }).catch(err => {
          console.log(err);
        });
    }

    fetchServices();
  })

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