import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/pombo.jpg';
import api from '../../services/api'
import './styles.css';

export default function Logon() {
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');

  const history = useHistory();

  async function handleSignIn(e) {
    e.preventDefault();

    const data = {
      email,
      password,
    };

    try {
      const response = await api.post('/session', data);  

      localStorage.setItem('userName', response.data.name);
      alert('Sessão iniciada');
      history.push('/logado');
    } catch (err) {
      alert('Credenciais inválidas');
    }

  }

  return (
    <div className='body'>
      <div className='Container'>
        <form onSubmit={handleSignIn}>
          <img src={Logo} alt="LeColombe Royale logo" />
          <input
            type="email"
            placeholder="Endereço de e-mail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Senha"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
          <button type="submit">Entrar</button>
          <hr />
          <Link to="/">Criar conta grátis</Link>
        </form>
      </div>
    </div>
  );
}