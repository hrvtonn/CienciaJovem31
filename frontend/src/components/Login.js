import React, { useState } from 'react';

function Login({ setToken }) {
  const [form, setForm] = useState({ email: '', senha: '' });
  const [msg, setMsg] = useState('');

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (res.ok) {
        setToken(data.token);
        setMsg('Login realizado!');
      } else {
        setMsg(data.msg || 'Erro ao logar.');
      }
    } catch {
      setMsg('Erro de conexão.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login de Professor/Admin</h2>
      <label>E-mail
        <input name="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>Senha
        <input name="senha" type="password" value={form.senha} onChange={handleChange} required />
      </label>
      <button type="submit">Entrar</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default Login; 