import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useHistory } from 'react-router-dom';

import { FiLogOut } from 'react-icons/fi';


export default function Logout() {
  const history = useHistory();

  async function handleLogout() {
    try {
      await AsyncStorage.clear();
      alert('Logout efetuado com sucesso');
      history.push('/');
    } catch (err) {
      alert('Logout', 'Houve um erro ao sair');
    }
  }
  
  return (
    <button onClick={handleLogout} type="button">
      <FiLogOut size={18} color="#e02041"></FiLogOut>
    </button>
  );
}
