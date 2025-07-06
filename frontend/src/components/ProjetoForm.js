import React, { useState } from 'react';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';

const initialAluno = { nome: '', raca: '', genero: '', dataNascimento: '' };
const initialState = {
  categoria: '', titulo: '', resumo: '', palavrasChave: '', introducao: '', objetivos: '', metodologia: '', resultados: '', bibliografia: '', imagens: '', alunos: [initialAluno], escolaParticipaIdeiatec: false, tipoParticipacao: ''
};

function ProjetoForm() {
  const [form, setForm] = useState(initialState);
  const [msg, setMsg] = useState('');

  function handleChange(e) {
    const { name, value, type, checked } = e.target;
    setForm({ ...form, [name]: type === 'checkbox' ? checked : value });
  }

  function handleAlunoChange(e, idx) {
    const { name, value } = e.target;
    const novos = [...form.alunos];
    novos[idx][name] = value;
    setForm({ ...form, alunos: novos });
  }

  function addAluno() {
    setForm({ ...form, alunos: [...form.alunos, initialAluno] });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setMsg('');
    if (!form.titulo || form.titulo.length < 5) {
      setMsg('Título do projeto muito curto.');
      return;
    }
    const palavrasChaveArr = form.palavrasChave.split(',').map(p => p.trim());
    const imagensArr = form.imagens.split(',').map(i => i.trim());
    const body = { ...form, palavrasChave: palavrasChaveArr, imagens: imagensArr };
    try {
      const res = await fetch('http://localhost:5000/api/projetos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body)
      });
      if (res.ok) {
        setMsg('Projeto cadastrado com sucesso!');
        setForm(initialState);
      } else {
        setMsg('Erro ao cadastrar. Verifique os campos.');
      }
    } catch {
      setMsg('Erro de conexão.');
    }
  }

  return (
    <Paper elevation={3} sx={{ p: 3, maxWidth: 700, margin: '24px auto' }}>
      <form onSubmit={handleSubmit}>
        <h2>Cadastro de Projeto</h2>
        {msg && <Alert severity={msg.includes('sucesso') ? 'success' : 'error'} sx={{ mb: 2 }}>{msg}</Alert>}
        <TextField label="Título*" name="titulo" value={form.titulo} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Resumo*" name="resumo" value={form.resumo} onChange={handleChange} required fullWidth margin="normal" multiline rows={4} />
        <TextField label="Palavras-chave (separadas por vírgula)*" name="palavrasChave" value={form.palavrasChave} onChange={handleChange} required fullWidth margin="normal" />
        <TextField label="Introdução*" name="introducao" value={form.introducao} onChange={handleChange} required fullWidth margin="normal" multiline rows={4} />
        <TextField label="Objetivos*" name="objetivos" value={form.objetivos} onChange={handleChange} required fullWidth margin="normal" multiline rows={4} />
        <TextField label="Metodologia*" name="metodologia" value={form.metodologia} onChange={handleChange} required fullWidth margin="normal" multiline rows={4} />
        <TextField label="Resultados e Discussões*" name="resultados" value={form.resultados} onChange={handleChange} required fullWidth margin="normal" multiline rows={4} />
        <TextField label="Bibliografia*" name="bibliografia" value={form.bibliografia} onChange={handleChange} required fullWidth margin="normal" multiline rows={4} />
        <TextField label="Imagens (URLs separadas por vírgula)" name="imagens" value={form.imagens} onChange={handleChange} fullWidth margin="normal" />
        <fieldset>
          <legend>Dados dos Alunos</legend>
          {form.alunos.map((aluno, idx) => (
            <div key={idx} style={{border: '1px solid #ccc', margin: '1rem 0', padding: '1rem', borderRadius: '4px'}}>
              <TextField label="Nome*" name="nome" value={aluno.nome} onChange={e => handleAlunoChange(e, idx)} required fullWidth margin="normal" />
              <Select label="Raça*" name="raca" value={aluno.raca} onChange={e => handleAlunoChange(e, idx)} required fullWidth margin="normal">
                <MenuItem value=""><em>Selecione</em></MenuItem>
                <MenuItem value="branca">Branca</MenuItem>
                <MenuItem value="preta">Preta</MenuItem>
                <MenuItem value="parda">Parda</MenuItem>
                <MenuItem value="amarela">Amarela</MenuItem>
                <MenuItem value="indígena">Indígena</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
              </Select>
              <Select label="Gênero*" name="genero" value={aluno.genero} onChange={e => handleAlunoChange(e, idx)} required fullWidth margin="normal">
                <MenuItem value=""><em>Selecione</em></MenuItem>
                <MenuItem value="mulher cis">Mulher cis</MenuItem>
                <MenuItem value="homem cis">Homem cis</MenuItem>
                <MenuItem value="mulher trans">Mulher trans</MenuItem>
                <MenuItem value="homem trans">Homem trans</MenuItem>
                <MenuItem value="não-binário">Não-binário</MenuItem>
                <MenuItem value="outro">Outro</MenuItem>
              </Select>
              <TextField label="Data de Nascimento*" name="dataNascimento" type="date" value={aluno.dataNascimento} onChange={e => handleAlunoChange(e, idx)} required fullWidth margin="normal" />
            </div>
          ))}
          <Button type="button" onClick={addAluno} variant="outlined" sx={{ mt: 2 }}>Adicionar aluno</Button>
        </fieldset>
        <label>
          <input type="checkbox" name="escolaParticipaIdeiatec" checked={form.escolaParticipaIdeiatec} onChange={handleChange} />
          Escola participa do Ideiatec
        </label>
        <Select label="Tipo de Participação*" name="tipoParticipacao" value={form.tipoParticipacao} onChange={handleChange} required fullWidth margin="normal">
          <MenuItem value=""><em>Selecione</em></MenuItem>
          <MenuItem value="individual">Individual</MenuItem>
          <MenuItem value="dupla">Dupla</MenuItem>
          <MenuItem value="trio">Trio</MenuItem>
          <MenuItem value="outro">Outro</MenuItem>
        </Select>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>Cadastrar</Button>
      </form>
    </Paper>
  );
}

export default ProjetoForm;