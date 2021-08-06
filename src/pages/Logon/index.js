import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Logo from '../../assets/pombo.jpg';
import api from '../../services/api'
import './styles.css';

export default function Logon() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');

  const history = useHistory();

  const storeData = async (key, value) => {
    try {
      await AsyncStorage.setItem(key, value);
    } catch (e) {
      alert("Login", "Houve um erro no login");
    }
  }

  async function handleSignIn(e) {
    e.preventDefault();

    const data = {
      usuario,
      senha
    };

    await api
      .post('/acesso/login', data)
      .then(async res => {
        await storeData('token', res.data.token);
        await storeData('username', usuario);
        
        alert('Sessão iniciada');
        history.push('/logado');
      }).catch(err => {
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
          <Link to="/">Criar conta grátis</Link>
        </form>
      </div>
    </div>
  );
}