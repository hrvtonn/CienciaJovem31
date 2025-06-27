import React, { useState } from 'react';

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
        setMsg('Projeto submetido com sucesso!');
        setForm(initialState);
      } else {
        setMsg('Erro ao submeter. Verifique os campos.');
      }
    } catch {
      setMsg('Erro de conexão.');
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h2>Submissão de Projeto</h2>
      <label>Categoria*
        <select name="categoria" value={form.categoria} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="Ensino Médio">Ensino Médio</option>
          <option value="Infantil">Infantil</option>
          <option value="EJA">EJA</option>
          <option value="outro">Outro</option>
        </select>
      </label>
      <label>Título*
        <input name="titulo" value={form.titulo} onChange={handleChange} required />
      </label>
      <label>Resumo*
        <textarea name="resumo" value={form.resumo} onChange={handleChange} required />
      </label>
      <label>Palavras-chave (separadas por vírgula)*
        <input name="palavrasChave" value={form.palavrasChave} onChange={handleChange} required />
      </label>
      <label>Introdução*
        <textarea name="introducao" value={form.introducao} onChange={handleChange} required />
      </label>
      <label>Objetivos*
        <textarea name="objetivos" value={form.objetivos} onChange={handleChange} required />
      </label>
      <label>Metodologia*
        <textarea name="metodologia" value={form.metodologia} onChange={handleChange} required />
      </label>
      <label>Resultados e Discussões*
        <textarea name="resultados" value={form.resultados} onChange={handleChange} required />
      </label>
      <label>Bibliografia*
        <textarea name="bibliografia" value={form.bibliografia} onChange={handleChange} required />
      </label>
      <label>Imagens (URLs separadas por vírgula)
        <input name="imagens" value={form.imagens} onChange={handleChange} />
      </label>
      <fieldset>
        <legend>Dados dos Alunos</legend>
        {form.alunos.map((aluno, idx) => (
          <div key={idx} style={{border: '1px solid #ccc', margin: '1rem 0', padding: '1rem', borderRadius: '4px'}}>
            <label>Nome*
              <input name="nome" value={aluno.nome} onChange={e => handleAlunoChange(e, idx)} required />
            </label>
            <label>Raça*
              <select name="raca" value={aluno.raca} onChange={e => handleAlunoChange(e, idx)} required>
                <option value="">Selecione</option>
                <option value="branca">Branca</option>
                <option value="preta">Preta</option>
                <option value="parda">Parda</option>
                <option value="amarela">Amarela</option>
                <option value="indígena">Indígena</option>
                <option value="outro">Outro</option>
              </select>
            </label>
            <label>Gênero*
              <select name="genero" value={aluno.genero} onChange={e => handleAlunoChange(e, idx)} required>
                <option value="">Selecione</option>
                <option value="mulher cis">Mulher cis</option>
                <option value="homem cis">Homem cis</option>
                <option value="mulher trans">Mulher trans</option>
                <option value="homem trans">Homem trans</option>
                <option value="não-binário">Não-binário</option>
                <option value="outro">Outro</option>
              </select>
            </label>
            <label>Data de Nascimento*
              <input name="dataNascimento" type="date" value={aluno.dataNascimento} onChange={e => handleAlunoChange(e, idx)} required />
            </label>
          </div>
        ))}
        <button type="button" onClick={addAluno}>Adicionar aluno</button>
      </fieldset>
      <label>
        <input type="checkbox" name="escolaParticipaIdeiatec" checked={form.escolaParticipaIdeiatec} onChange={handleChange} />
        Escola participa do Ideiatec
      </label>
      <label>Tipo de Participação*
        <select name="tipoParticipacao" value={form.tipoParticipacao} onChange={handleChange} required>
          <option value="">Selecione</option>
          <option value="individual">Individual</option>
          <option value="dupla">Dupla</option>
          <option value="trio">Trio</option>
          <option value="outro">Outro</option>
        </select>
      </label>
      <button type="submit">Submeter Projeto</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default ProjetoForm; 