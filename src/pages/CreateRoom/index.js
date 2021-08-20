import React, { useEffect, useState } from 'react';

import api from '../../services/api'
import Logout from '../../Components/Logout/Logout';
import './styles.css';
import Logo from '../../assets/PC.png';

import Navbar from '../../Components/Navbar/Navbar';

export default function CreateRoom() {
  const [number, setNumber] = useState('');
  const [roomType, setRoomType] = useState('');
  const [value, setValue] = useState('');

  async function handleRoomCreation(e) {
    e.preventDefault();

    const data = {
      number,
      roomType,
      value
    };

    
  }

  return (
    <div className='body'>
      <Navbar />
      <div className='Container'>
        <form onSubmit={handleRoomCreation}>
          <img src={Logo} alt="LeColombe Royale logo" />
          <input
            type="number"
            placeholder="Numero do quarto"
            value={number}
            onChange={e => setNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tipo do quarto"
            value={roomType}
            onChange={e => setRoomType(e.target.value)}
          />
          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={e => setValue(e.target.value)}
          />
          <button type="submit">Entrar</button>
        </form>
      </div>
    </div>
  );
}