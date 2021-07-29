import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/pombo.jpg';
import api from '../../services/api'
import './styles.css';

export default function Logon() {
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmation, setConfirmation] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      email,
      username,
      password,
    };

  }

  return (
    <div className='body'>
      <div className='Container'>
        <form onSubmit={handleRegister}>
          <img src={Logo} alt="LeColombe Royale logo" />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="text"
            placeholder="Nome de usuário"
            value={username}
            onChange={e => setUsername(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirmar Senha"
            value={confirmation}
            onChange={e => setConfirmation(e.target.value)}
          />
          <button type="submit">Cadastrar acesso</button>
        </form>
      </div>
    </div>
  );
}