import React, { useEffect, useState } from 'react';
import api from '../../services/api'
import { cpfMask } from "masks-br";

import Logo from '../../assets/PC.png';
import './styles.css';

export default function FinishAccommodation() {
  const [CPF, setCPF] = useState('');

  async function handleFinish(e){
    e.preventDefault();
  }

  return (
    <div className='body'>
    <div className='Container'>
      <form onSubmit={handleFinish}>
        <img src={Logo} alt="LeColombe Royale logo" />
        <input
          type="text"
          placeholder="CPF"
          value={CPF}
          onChange={e => setCPF(cpfMask(e.target.value))}
        />
        <button type="submit">Finalizar estadia</button>
      </form>

    </div>
  </div>
    );
}