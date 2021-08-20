import React, { useState } from 'react';
import api from '../../services/api'
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
      numero: number,
      tipo: roomType,
      valor: value,
      vago: true
    };

    await api
      .post("quarto/create", data)
      .then(res => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
          alert('Quarto criado com sucesso');
        }
      }).catch(err => {
        alert('Houve um erro na criação do quarto');
      })
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
          <button type="submit">Cadastrar quarto</button>
        </form>
      </div>
    </div>
  );
}