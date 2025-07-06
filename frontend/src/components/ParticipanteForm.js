import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';

const initialState = {
  nomeCompleto: '', nacionalidade: '', dataNascimento: '', documento: '', email: '', celular: '', genero: '', raca: '', pais: '', estado: '', municipio: '', tipo: 'aluno', instituicao: '', matricula: '', lattes: '', nivelEnsino: '', outrasFeiras: ['']
};

function ParticipanteForm() {
  const [form, setForm] = useState(initialState);
  const [msg, setMsg] = useState('');

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  }

  function handleFeirasChange(e, idx) {
    const novas = [...form.outrasFeiras];
    novas[idx] = e.target.value;
    setForm({ ...form, outrasFeiras: novas });
  }

  function addFeira() {
    setForm({ ...form, outrasFeiras: [...form.outrasFeiras, ''] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    // Validação básica
    if (!form.email.match(/^[^@\s]+@[^@\s]+\.[^@\s]+$/)) {
      setMsg('E-mail inválido.');
      return;
    }
    if (!form.celular.match(/^\d{9,}$/)) {
      setMsg('Celular deve conter ao menos 9 dígitos.');
      return;
    }
    try {
      const res = await fetch('http://localhost:5000/api/participantes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setMsg('Cadastro realizado com sucesso!');
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
        <h2>Cadastro de Participante</h2>
        {msg && <Alert severity={msg.includes('sucesso') ? 'success' : 'error'} sx={{ mb: 2 }}>{msg}</Alert>}
        <TextField label="Nome Completo*" name="nomeCompleto" value={form.nomeCompleto} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Nacionalidade*" name="nacionalidade" value={form.nacionalidade} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Data de Nascimento*" name="dataNascimento" type="date" value={form.dataNascimento} onChange={handleChange} required fullWidth margin="normal" InputLabelProps={{ shrink: true }} />
        <TextField label="Documento (CPF ou RG)*" name="documento" value={form.documento} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="E-mail*" name="email" type="email" value={form.email} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Celular*" name="celular" value={form.celular} onChange={handleChange} required fullWidth margin="normal" />
        <label>Identidade de Gênero*
          <select name="genero" value={form.genero} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="mulher cis">Mulher cis</option>
            <option value="homem cis">Homem cis</option>
            <option value="mulher trans">Mulher trans</option>
            <option value="homem trans">Homem trans</option>
            <option value="não-binário">Não-binário</option>
            <option value="outro">Outro</option>
          </select>
        </label>
        <label>Raça*
          <select name="raca" value={form.raca} onChange={handleChange} required>
            <option value="">Selecione</option>
            <option value="branca">Branca</option>
            <option value="preta">Preta</option>
            <option value="parda">Parda</option>
            <option value="amarela">Amarela</option>
            <option value="indígena">Indígena</option>
            <option value="outro">Outro</option>
          </select>
        </label>
        <TextField label="País*" name="pais" value={form.pais} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Estado*" name="estado" value={form.estado} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Município*" name="municipio" value={form.municipio} onChange={handleChange} required fullWidth margin="normal" />
        <label>Tipo de Participante*
          <select name="tipo" value={form.tipo} onChange={handleChange} required>
            <option value="aluno">Aluno</option>
            <option value="professor">Professor</option>
          </select>
        </label>
        {form.tipo === 'professor' && (
          <>
            <TextField label="Instituição*" name="instituicao" value={form.instituicao} onChange={handleChange} required={form.tipo === 'professor'} fullWidth margin="normal" />
            <TextField label="Matrícula*" name="matricula" value={form.matricula} onChange={handleChange} required={form.tipo === 'professor'} fullWidth margin="normal" />
            <TextField label="Link do Lattes*" name="lattes" value={form.lattes} onChange={handleChange} required={form.tipo === 'professor'} fullWidth margin="normal" />
            <TextField label="Nível de Ensino*" name="nivelEnsino" value={form.nivelEnsino} onChange={handleChange} required={form.tipo === 'professor'} fullWidth margin="normal" />
          </>
        )}
        <label>Já participou de outras feiras? Quais?
          {form.outrasFeiras.map((f, idx) => (
            <input key={idx} value={f} onChange={e => handleFeirasChange(e, idx)} placeholder="Nome da feira" />
          ))}
          <button type="button" onClick={addFeira}>Adicionar feira</button>
        </label>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Cadastrar</Button>
      </form>
    </Paper>
  );
}

export default ParticipanteForm;