import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import Logo from '../../assets/pombo.jpg';
import api from '../../services/api'
import './styles.css';

export default function Logon() {
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

  }

  return (
    <div className='body'>
      <div className='Container'>
        <form onSubmit={handleRegister}>
          <img src={Logo} alt="LeColombe Royale logo" />
          <input
            type="text"
            placeholder="Quarto"
            value={quarto}
            onChange={e => setQuarto(e.target.value)}
          />
          <input
            type="text"
            placeholder="Hospede"
            value={hospede}
            onChange={e => setHospede(e.target.value)}
          />
          <input
            type="text"
            placeholder="Data de entrada"
            value={datain}
            onChange={e => setDatain(e.target.value)}
          />
          <input
            type="text"
            placeholder="Data da saída"
            value={dataout}
            onChange={e => setDataout(e.target.value)}
          />
          <input
            type="text"
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