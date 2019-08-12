import React, { useState } from 'react';

import api from '../../Services/api';

import logo from '../../assets/logo.svg';
import './Login.css';

export default function Login({ history }) {
  const [username, setUsername] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    const response = await api.post('/devs', { username });
    const { _id } = response.data;
    
    history.push(`/Dash/${_id}`)

  }

  return (
    <div className="login-container">      
      <form onSubmit={handleSubmit}>
        <img src={logo} alt="TinDev" />
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Digite seu usuário do GitHub"
        />
        <button type="submit">Enviar</button>
      </form>
    </div>    
  );
}

