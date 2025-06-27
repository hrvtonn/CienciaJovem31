const mongoose = require('mongoose');

const AlunoSchema = new mongoose.Schema({
  nome: String,
  raca: String,
  genero: String,
  dataNascimento: Date,
});

const ProjetoSchema = new mongoose.Schema({
  categoria: { type: String, required: true },
  titulo: { type: String, required: true },
  resumo: { type: String },
  palavrasChave: [{ type: String }],
  introducao: { type: String },
  objetivos: { type: String },
  metodologia: { type: String },
  resultados: { type: String },
  bibliografia: { type: String },
  imagens: [{ type: String }],
  alunos: [AlunoSchema],
  escolaParticipaIdeiatec: { type: Boolean },
  tipoParticipacao: { type: String, enum: ['individual', 'dupla', 'trio', 'outro'] },
  criadoEm: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Projeto', ProjetoSchema); 