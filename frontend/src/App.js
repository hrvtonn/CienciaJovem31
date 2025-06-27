import React, { useState } from 'react';
import ParticipanteForm from './components/ParticipanteForm';
import InstituicaoForm from './components/InstituicaoForm';
import ProjetoForm from './components/ProjetoForm';
import Login from './components/Login';
import Admin from './components/Admin';

function App() {
  const [page, setPage] = useState('participante');
  const [token, setToken] = useState(null);

  return (
    <div>
      <header>
        <h1>31ª Ciência Jovem</h1>
        <nav>
          <button onClick={() => setPage('participante')}>Participante</button>
          <button onClick={() => setPage('instituicao')}>Instituição</button>
          <button onClick={() => setPage('projeto')}>Projeto</button>
          <button onClick={() => setPage('login')}>Login</button>
          <button onClick={() => setPage('admin')}>Admin</button>
        </nav>
      </header>
      <main>
        {page === 'participante' && <ParticipanteForm />}
        {page === 'instituicao' && <InstituicaoForm />}
        {page === 'projeto' && <ProjetoForm />}
        {page === 'login' && <Login setToken={setToken} />}
        {page === 'admin' && <Admin token={token} />}
      </main>
    </div>
  );
}

export default App; 