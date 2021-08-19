import React, { useEffect, useState } from 'react';

import api from '../../services/api'
import Logout from '../../Components/Logout/Logout';
import history from "../../history";

import Logo from '../../assets/pombo.jpg'
import './styles.css';

export default function Servicing() {
  const [services, setServices] = useState([]);
  const [codigo, setCodigo] = useState("");

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
          <Logout />
        </header>
        <form>
          <input
          type="text"
          placeholder="Código do prato"
          value={codigo}
          onChange={e => setCodigo(e.target.value)}
          />
          <button>Solicitar prato</button>
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