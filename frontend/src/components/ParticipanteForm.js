import React, { useState } from 'react';

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
    <form onSubmit={handleSubmit}>
      <h2>Cadastro de Participante</h2>
      <label>Nome Completo*
        <input name="nomeCompleto" value={form.nomeCompleto} onChange={handleChange} required />
      </label>
      <label>Nacionalidade*
        <input name="nacionalidade" value={form.nacionalidade} onChange={handleChange} required />
      </label>
      <label>Data de Nascimento*
        <input name="dataNascimento" type="date" value={form.dataNascimento} onChange={handleChange} required />
      </label>
      <label>Documento (CPF ou RG)*
        <input name="documento" value={form.documento} onChange={handleChange} required />
      </label>
      <label>E-mail*
        <input name="email" type="email" value={form.email} onChange={handleChange} required />
      </label>
      <label>Celular*
        <input name="celular" value={form.celular} onChange={handleChange} required />
      </label>
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
      <label>País*
        <input name="pais" value={form.pais} onChange={handleChange} required />
      </label>
      <label>Estado*
        <input name="estado" value={form.estado} onChange={handleChange} required />
      </label>
      <label>Município*
        <input name="municipio" value={form.municipio} onChange={handleChange} required />
      </label>
      <label>Tipo de Participante*
        <select name="tipo" value={form.tipo} onChange={handleChange} required>
          <option value="aluno">Aluno</option>
          <option value="professor">Professor</option>
        </select>
      </label>
      {form.tipo === 'professor' && (
        <>
          <label>Instituição*
            <input name="instituicao" value={form.instituicao} onChange={handleChange} required={form.tipo === 'professor'} />
          </label>
          <label>Matrícula*
            <input name="matricula" value={form.matricula} onChange={handleChange} required={form.tipo === 'professor'} />
          </label>
          <label>Link do Lattes*
            <input name="lattes" value={form.lattes} onChange={handleChange} required={form.tipo === 'professor'} />
          </label>
          <label>Nível de Ensino*
            <input name="nivelEnsino" value={form.nivelEnsino} onChange={handleChange} required={form.tipo === 'professor'} />
          </label>
        </>
      )}
      <label>Já participou de outras feiras? Quais?
        {form.outrasFeiras.map((f, idx) => (
          <input key={idx} value={f} onChange={e => handleFeirasChange(e, idx)} placeholder="Nome da feira" />
        ))}
        <button type="button" onClick={addFeira}>Adicionar feira</button>
      </label>
      <button type="submit">Cadastrar</button>
      {msg && <p>{msg}</p>}
    </form>
  );
}

export default ParticipanteForm; 