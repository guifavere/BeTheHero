import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiLogIn } from 'react-icons/fi';

import api from '../../services/api';
import './styles.css';
import heroesImg from '../../assets/heroes.png';
import logoImg from '../../assets/logo.svg';

export default function Logon() {
  const [id, setId] = useState('');

  const history = useHistory();

  const handleLogin = async e => {
    e.preventDefault();

    try {
      const res = await api.post('sessions', { id });

      localStorage.setItem('ongId', id);
      localStorage.setItem('ongName', res.data.name);

      history.push('/profile');
    } catch (err) {
      alert('Falha no login, tente novamente');
    }
  }

  return (
    <div className="logon-container">
      <section className="form">
        <img alt="Be The Hero" src={logoImg} title="Be The Hero" />
        <form onSubmit={handleLogin}>
          <h1>Faça seu logon</h1>
          <input placeholder="Sua ID" value={id} onChange={e => setId(e.target.value)} />
          <button className="button" type="submit">Entrar</button>
          <Link className="back-link" to="/register" title="Não tenho cadastro">
            <FiLogIn color="#e02041" size={16} />
            Não tenho cadastro
          </Link>
        </form>
      </section>
      <img alt="Heroes" src={heroesImg} title="Heroes" />
    </div>
  );
}
