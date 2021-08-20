import React, { useEffect, useState } from 'react';
import { cpfMask } from "masks-br";

import history from "../../history";
import api from '../../services/api'
import Navbar from '../../Components/Navbar/Navbar';

import Logo from '../../assets/PC.png';
import './styles.css';

export default function FinishAccommodation() {
  const [CPF, setCPF] = useState('');

  async function handleFinish(e) {
    console.log("AQUI");
    e.preventDefault();

    await api
      .get(`hospede/index?cpf=${CPF}`)
      .then(async res => {
        if (res.data.message) {
          alert(res.data.message);
        } else {
          await api
            .get(`hospedagem/index?idHospede=${res.data.idPessoa}`)
            .then(async res => {
              if (res.data.message) {
                alert(res.data.message);
              } else {
                await api
                  .patch(`hospedagem/update?idHospedagem=${res.data.idHospedagem}&atual=${false}`)
                  .then(async res => {
                    if (res.data.message) {
                      alert(res.data.message);
                    } else {
                      alert('Hospedagem finalizada com sucesso!');
                      history.push("/kitchen");
                    }
                  }).catch(async err => {
                    console.log(err);
                    alert('Houve um erro na finalização da hospedagem');
                  })
              }
            }).catch(async err => {
              console.log(err);
              alert('Erro na procura da hospedagem do hóspede especificado');
            })
        }
      }).catch(async err => {
        console.log(err);
        alert('Erro na procura do hóspede, tente novamente');
      })
  }

  return (
    <div className='body'>
      <Navbar />
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