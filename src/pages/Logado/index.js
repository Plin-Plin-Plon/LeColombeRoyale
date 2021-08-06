import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import './styles.css';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Logado() {
  const [username, setUsername] = useState("");

  useEffect(() =>{
    async function getUsername() {
      try {
        const username = await AsyncStorage.getItem('username').then(value => {
          setUsername(value);
        });
        return username;
      } catch (err) {
        return null;
      }
    }

    getUsername();
  })

  return (
    <p>logado como {username}</p>
  );
}