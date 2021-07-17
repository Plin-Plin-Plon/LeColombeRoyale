import React from 'react';
import './styles.css';

export default function Logado() {
    const userName = localStorage.getItem('userName');


    return(
        <p>logado como {userName}</p>
    );
}