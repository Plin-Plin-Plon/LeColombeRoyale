import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/PC.png';
import api from '../../services/api'
import './styles.css';
import { cpfMask } from "masks-br";

export default function Login() {
  const [quarto, setQuarto] = useState('');
  const [hospede, setHospede] = useState('');
  const [datain, setDatain] = useState('');
  const [dataout, setDataout] = useState('');
  const [value, setValue] = useState('');

  const history = useHistory();

  async function handleRegister(e) {
    e.preventDefault();

    const data = {
      quarto,
      hospede,
      datain,
      dataout,
      value
    };

    history.push('/home');

  }

  return (
    <div className='body'>
      <div className='Container'>
        <form onSubmit={handleRegister}>
          <img src={Logo} alt="LeColombe Royale logo" />
          <input
            type="number"
            placeholder="Quarto"
            value={quarto}
            onChange={e => setQuarto(e.target.value)}
          />
          <input
            type="text"
            placeholder="CPF do hospede"
            maxLength="14"
            value={hospede}
            onChange={e => setHospede(cpfMask(e.target.value))}
          />
          <input
            type="date"
            placeholder="Data de entrada"
            value={datain}
            onChange={e => setDatain(e.target.value)}
          />
          <input
            type="date"
            placeholder="Data da saída"
            value={dataout}
            onChange={e => setDataout(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor da diária"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button type="submit">Cadastrar Hospedagem</button>
        </form>
      </div>
    </div>
  );
}