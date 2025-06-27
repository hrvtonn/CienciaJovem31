import React, { useEffect, useState } from 'react';

function Admin({ token }) {
  const [projetos, setProjetos] = useState([]);
  const [msg, setMsg] = useState('');

  useEffect(() => {
    async function fetchProjetos() {
      try {
        const res = await fetch('http://localhost:5000/api/projetos');
        const data = await res.json();
        setProjetos(data);
      } catch {
        setMsg('Erro ao buscar projetos.');
      }
    }
    fetchProjetos();
  }, []);

  return (
    <div>
      <h2>Administração - Projetos Submetidos</h2>
      {msg && <p>{msg}</p>}
      <ul>
        {projetos.map((p, idx) => (
          <li key={p._id || idx}>
            <strong>{p.titulo}</strong> - Categoria: {p.categoria} <br />
            <em>{p.resumo}</em>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Admin; 