import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

import history from "../../history";
import api from '../../services/api'

import Logo from '../../assets/PC.png';
import './styles.css';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  useEffect(() => {
    async function checkLoggedUser() {
      try {
        const logged = await AsyncStorage.getItem('user_id');

        if (logged) {
          history.push("/home");
        }
      } catch (err) {
        return null;
      }
    }

    checkLoggedUser();
  }, [])

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      alert("Houve um erro no login");
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();

    const data = {
      usuario,
      senha
    };

    await api
      .post('acesso/login', data)
      .then(async res => {
        await storeData('token', res.data.token);
        await storeData('username', usuario);
        await storeData('user_id', res.data.idPessoa);
        alert('Sessão iniciada');

        await api
          .get(`hospedagem/index?idHospede=${res.data.idPessoa}`)
          .then(async res => {
            try {
              await AsyncStorage.setItem('accomodation_id', res.data.idHospedagem);
              await AsyncStorage.setItem('room', res.data.quarto.numero);
              history.push("/home");
            } catch (err) {
              await AsyncStorage.removeItem('accomodation_id');
              await AsyncStorage.removeItem('room');
              history.push('/accomodation');
            }
          }).catch(async err => {
            history.push('/accomodation');
          })
      }).catch(async err => {
        await AsyncStorage.clear();
        alert('Credenciais inválidas');
        console.log(err);
      });
  }

  return (
    <div className='body'>
      <div className='Container'>
        <form onSubmit={handleSignIn}>
          <img src={Logo} alt="LeColombe Royale logo" />
          <input
            type="text"
            placeholder="Nome de usuário"
            value={usuario}
            onChange={e => setUsuario(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={e => setSenha(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/register">Criar conta grátis</Link>
        </form>
      </div>
    </div>
  );
}