const mongoose = require('mongoose');

const ParticipanteSchema = new mongoose.Schema({
  nomeCompleto: { type: String, required: true },
  nacionalidade: { type: String, required: true },
  dataNascimento: { type: Date, required: true },
  documento: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  celular: { type: String, required: true },
  genero: { type: String, required: true },
  raca: { type: String, required: true },
  pais: { type: String, required: true },
  estado: { type: String, required: true },
  municipio: { type: String, required: true },
  tipo: { type: String, enum: ['aluno', 'professor'], required: true },
  // Campos para professor
  instituicao: { type: String },
  matricula: { type: String },
  lattes: { type: String },
  nivelEnsino: { type: String },
  // Participação em outras feiras
  outrasFeiras: [{ type: String }],
});

module.exports = mongoose.model('Participante', ParticipanteSchema); 