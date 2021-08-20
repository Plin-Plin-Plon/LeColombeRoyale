import React, { useState, useEffect } from 'react';
import { cpfMask } from "masks-br";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Logo from '../../assets/PC.png';

import history from "../../history";
import api from '../../services/api'

import Navbar from '../../Components/Navbar/Navbar';

import './styles.css';

export default function Login() {
  const [quartoIndex, setQuartoIndex] = useState(0);
  const [rooms, setRooms] = useState([]);
  const [hospede, setHospede] = useState('');
  const [datain, setDatain] = useState('');
  const [dataout, setDataout] = useState('');

  useEffect(() => {
    async function fetchRooms() {
      await api
        .get("quarto/index")
        .then(res => {
          setRooms(res.data);
        }).catch(err => {
          console.log(err);
        })
    }

    fetchRooms();
  }, [])

  async function syncLoadData(key) {
    try {
      const data = await AsyncStorage.getItem(key);
      return data;
    } catch (err) {
      return null;
    }
  }

  async function handleRegister(e) {
    e.preventDefault();

    const userId = await syncLoadData('user_id');
    const room = rooms[quartoIndex];

    const data = {
      hospede: {
        idPessoa: userId
      },
      quarto: {
        numero: room.numero
      },
      dataChegada: datain,
      dataSaida: dataout,
      diaria: room.valor,
      valorTotal: room.valor,
      atual: true
    };

    await api
      .post("hospedagem/create", data)
      .then(async res => {
        await AsyncStorage.setItem('accomodation_id', res.data.idHospedagem);
        await AsyncStorage.setItem('room', res.data.quarto.numero);
        history.push("/home");
      }).catch(async err => {
        await AsyncStorage.removeItem('accomodation_id');
        await AsyncStorage.removeItem('room');
        alert('Houve um erro no cadastro da hospedagem');
      })
  }

  return (
    <div className='body'>
      <div className='Container'>
        <Navbar/>
        <form onSubmit={handleRegister}>
          <img src={Logo} alt="LeColombe Royale logo" />
          <select placeholder="Quarto" onChange={e => setQuartoIndex(e.target.value)}>
            {rooms.map((quarto, index) => {
              return (
                <option key={quarto.numero} value={index}>Quarto: {quarto.numero}</option>
              )
            })}
          </select>
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
          <button type="submit">Cadastrar Hospedagem</button>
        </form>
      </div>
    </div>
  );
}