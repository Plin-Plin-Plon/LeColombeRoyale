import React, { useState, useEffect } from 'react';

import AsyncStorage from '@react-native-async-storage/async-storage';

import api from '../../services/api';
import Logout from '../../Components/Logout/Logout';
import Logo from '../../assets/PC.png';
import Spinner from "react-spinners/PulseLoader";

import Navbar from '../../Components/Navbar/Navbar';

import './styless.css';

export default function MyAcoount() {
  const [loading, setLoading] = useState(true);
  const [hospede, setHospede] = useState({});


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
      async function fetchUserData() {
        const userId = await syncLoadData('user_id');

        await (await api
          .get(`hospede/index?id=${userId}`))
          .then(res => {
            setHospede(res.data)
          })
          .catch(err => {
            console.log(err)
            alert("Erro na coleta dos dados")
          })

        setLoading(false);
      }
      fetchUserData();
    }
  }, [loading]);

  return (
    <div className="body">
      <Navbar />
      <div className="container">
        <header>
          <div>
            <img src={Logo} alt="LeColombe Royale Kitchen logo"></img>
          </div>
          <Logout />
        </header>
        {!loading ? (
          <>
            <strong src="./styless.css">Nome:</strong>
            <p>{hospede.nome}</p>
            <strong>CPF: </strong>
            <p>{hospede.cpf}</p>
            <strong>E-mail: </strong>
            <p>{hospede.email}</p>
            <strong>Cidade: </strong>
            <p>{hospede.cidade}</p>
            <strong>Bairro: </strong>
            <p>{hospede.bairro}</p>
            <strong>Logradouro: </strong>
            <p>{hospede.logradouro}</p>
            <strong>Celular: </strong>
            <p>{hospede.celular}</p>
          </>
        ) : (
          <div>
            <span>
              Carregando informações da sua conta
            </span>
            <Spinner loading={loading} size={15} />
          </div>
        )}
      </div>
    </div >
  );
}