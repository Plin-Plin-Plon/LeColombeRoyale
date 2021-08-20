import { useState } from "react";
import history from "../../history";

import api from '../../services/api';

export default function RateButton({ avaliacao, idPedido }) {
  const [value, setValue] = useState(avaliacao ? avaliacao : 0);

  async function handleAvaliacao() {
    const data = {
      avaliacaoServico: value,
      idPedido: idPedido,
      concluido: true
    };
    
    await api
      .patch("pedido/update", data)
      .then(res => {
        alert('Pedido avaliado com sucesso');
        history.go(0);
      }).catch(err => {
        alert('Não foi possível avaliar o pedido');
        console.log(err);
      })
  }

  return (
    <>
      <select value={value} onChange={e => setValue(e.target.value)}>
        <option value={0}>0</option>
        <option value={0.5}>0.5</option>
        <option value={1.0}>1.0</option>
        <option value={1.5}>1.5</option>
        <option value={2.0}>2.0</option>
        <option value={2.5}>2.5</option>
        <option value={3.0}>3.0</option>
        <option value={3.5}>3.5</option>
        <option value={4.0}>4.0</option>
        <option value={4.5}>4.5</option>
        <option value={5.0}>5.0</option>
      </select>

      <div className="menuButton">
        <button type="button" onClick={() => handleAvaliacao() }>
          Avaliar
        </button>
      </div>
    </>
  );
}