import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function NewIncident() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [value, setValue] = useState('');

  const ongId = localStorage.getItem('ongId');

  const history = useHistory();

  const handleNewIncident = async e => {
    e.preventDefault();

    try {
      await api.post('incidents', { title, description, value }, { headers: { Authorization: ongId } });

      history.push('/profile');
    } catch (err) {
      alert('Erro ao cadastrar caso, tente novamente.');
    }
  }

  return (
    <div className="new-incident-container">
      <div className="content">
        <section>
          <img alt="Be The Hero" src={logoImg} title="Be The Hero" />
          <h1>Cadastrar novo caso</h1>
          <p>Descreva o caso detalhadamente para encontrar um herói para resolver isso.</p>
          <Link className="back-link" to="/profile" title="Voltar para home">
            <FiArrowLeft color="#e02041" size={16} />
            Voltar para home
          </Link>
        </section>
        <form onSubmit={handleNewIncident}>
          <input placeholder="Título do caso" value={title} onChange={e => setTitle(e.target.value)} />
          <textarea placeholder="Descrição" value={description} onChange={e => setDescription(e.target.value)} />
          <input placeholder="Valor em reais" value={value} onChange={e => setValue(e.target.value)} />
          <button className="button" type="submit">Cadastrar</button>
        </form>
      </div>
    </div>
  );
}