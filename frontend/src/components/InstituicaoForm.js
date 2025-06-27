import React, { useState } from 'react';

const initialState = {
  nome: '', pais: '', estado: '', municipio: '', endereco: '', tempoIntegralMEC: false, tipoOferta: '', tipologiaMunicipio: '', gre: '', ideb: '', idhm: ''
};

function InstituicaoForm() {
  const [form, setForm] = useState(initialState);
  const [msg, setMsg] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    try {
      const res = await fetch('http://localhost:5000/api/instituicoes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMsg('Instituição cadastrada com sucesso!');
        setForm(initialState);
      } else {
        setMsg('Erro ao cadastrar. Verifique os campos.');
      }
    } catch {
      setMsg('Erro de conexão.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Instituição</h2>
      <label>Nome da Instituição*
        <input name="nome" value={form.nome} onChange={handleChange} required />
      </label>
      <label>País*
        <input name="pais" value={form.pais} onChange={handleChange} required />
      </label>
      <label>Estado*
        <input name="estado" value={form.estado} onChange={handleChange} required />
      </label>
      <label>Município*
        <input name="municipio" value={form.municipio} onChange={handleChange} required />
      </label>
      <label>Endereço*
        <input name="endereco" value={form.endereco} onChange={handleChange} required />
      </label>
      <label>
        <input type="checkbox" name="tempoIntegralMEC" checked={form.tempoIntegralMEC} onChange={handleChange} />
        Participa do Programa Escola em Tempo Integral (MEC)
      </label>
      <label>Tipo de Oferta*
        <select name="tipoOferta" value={form.tipoOferta} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="integral">Integral</option>
          <option value="regular">Regular</option>
          <option value="EJA">EJA</option>
        </select>
      </label>
      <label>Tipologia do Município*
        <select name="tipologiaMunicipio" value={form.tipologiaMunicipio} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="urbano">Urbano</option>
          <option value="rural">Rural</option>
          <option value="outro">Outro</option>
        </select>
      </label>
      <label>GRE
        <input name="gre" value={form.gre} onChange={handleChange} />
      </label>
      <label>IDEB
        <input name="ideb" value={form.ideb} onChange={handleChange} type="number" step="0.01" />
      </label>
      <label>IDHM
        <input name="idhm" value={form.idhm} onChange={handleChange} type="number" step="0.01" />
      </label>
      <button type="submit">Cadastrar</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default InstituicaoForm; 