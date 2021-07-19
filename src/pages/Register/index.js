import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import './styles.css';
import api from '../../services/api'
import Logo from '../../assets/pombo.jpg'

export default function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      name,
      email,
      password,
    };

    try {
      const response = await api.post('/user', data);

      alert('Cadastrado com sucesso');
      history.push('/logon');

    } catch (err) {
      alert('Erro no cadastro, tente novamente');
    }

  }

  return (
    <div className="body">
      <div className="register-container">
        <form onSubmit={handleRegister}>
          <img src={Logo} alt="LeColombe Royale logo" />
          <input
            type="text"
            placeholder="Nome de usuário"
            value={name}
            onChange={e => setName(e.target.value)}
          />
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
          <button type="submit">Cadastrar usuário</button>
          <hr />
          <Link to="/logon">Fazer login</Link>
        </form>
      </div>
    </div>
  );
}