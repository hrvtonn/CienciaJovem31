const mongoose = require('mongoose');

const InstituicaoSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  pais: { type: String, required: true },
  estado: { type: String, required: true },
  municipio: { type: String, required: true },
  endereco: { type: String, required: true },
  tempoIntegralMEC: { type: Boolean, required: true },
  tipoOferta: { type: String, enum: ['integral', 'regular', 'EJA'], required: true },
  tipologiaMunicipio: { type: String, required: true },
  gre: { type: String },
  ideb: { type: Number },
  idhm: { type: Number },
});

module.exports = mongoose.model('Instituicao', InstituicaoSchema); 