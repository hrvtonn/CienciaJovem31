import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import MenuItem from '@mui/material/MenuItem';

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
    if (!form.nome || form.nome.length < 3) {
      setMsg('Nome da instituição muito curto.');
      return;
    }
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
    <Paper elevation={3} sx={{ p: 3, maxWidth: 600, margin: '24px auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Instituição</h2>
        {msg && <Alert severity={msg.includes('sucesso') ? 'success' : 'error'} sx={{ mb: 2 }}>{msg}</Alert>}
        <TextField label="Nome da Instituição*" name="nome" value={form.nome} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="País*" name="pais" value={form.pais} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Estado*" name="estado" value={form.estado} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Município*" name="municipio" value={form.municipio} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Endereço*" name="endereco" value={form.endereco} onChange={handleChange} required fullWidth margin="normal" />
        <label>
          <input type="checkbox" name="tempoIntegralMEC" checked={form.tempoIntegralMEC} onChange={handleChange} />
          Participa do Programa Escola em Tempo Integral (MEC)
        </label>
        <TextField select label="Tipo de Oferta*" name="tipoOferta" value={form.tipoOferta} onChange={handleChange} required fullWidth margin="normal">
          <MenuItem value=""><em>Selecione</em></MenuItem>
          <MenuItem value="integral">Integral</MenuItem>
          <MenuItem value="regular">Regular</MenuItem>
          <MenuItem value="EJA">EJA</MenuItem>
        </TextField>
        <TextField select label="Tipologia do Município*" name="tipologiaMunicipio" value={form.tipologiaMunicipio} onChange={handleChange} required fullWidth margin="normal">
          <MenuItem value=""><em>Selecione</em></MenuItem>
          <MenuItem value="urbano">Urbano</MenuItem>
          <MenuItem value="rural">Rural</MenuItem>
          <MenuItem value="outro">Outro</MenuItem>
        </TextField>
        <TextField label="GRE" name="gre" value={form.gre} onChange={handleChange} fullWidth margin="normal" />
        <TextField label="IDEB" name="ideb" value={form.ideb} onChange={handleChange} type="number" step="0.01" fullWidth margin="normal" />
        <TextField label="IDHM" name="idhm" value={form.idhm} onChange={handleChange} type="number" step="0.01" fullWidth margin="normal" />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Cadastrar</Button>
      </form>
    </Paper>
  );
}

export default InstituicaoForm;