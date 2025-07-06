import React, { useState } from 'react';
import ParticipanteForm from './components/ParticipanteForm';
import InstituicaoForm from './components/InstituicaoForm';
import ProjetoForm from './components/ProjetoForm';
import Login from './components/Login';
import Admin from './components/Admin';
import Header from './components/layout/Header';
import Nav from './components/layout/Nav';
import { AuthProvider, useAuth } from './context/AuthContext';

function MainApp() {
  const [page, setPage] = useState('participante');
  const { token, setToken } = useAuth();

  return (
    <div>
      <Header />
      <Nav setPage={setPage} />
      <main>
        {page === 'participante' && <ParticipanteForm />}
        {page === 'instituicao' && <InstituicaoForm />}
        {page === 'projeto' && <ProjetoForm />}
        {page === 'login' && <Login setToken={setToken} />}
        {page === 'admin' && (token ? <Admin token={token} /> : <p>Acesso restrito. Faça login.</p>)}
      </main>
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <MainApp />
    </AuthProvider>
  );
}

export default App;