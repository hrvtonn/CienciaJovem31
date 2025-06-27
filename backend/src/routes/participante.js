const express = require('express');
const Participante = require('../models/Participante');

const router = express.Router();

// Cadastro de participante
router.post('/', async (req, res) => {
  try {
    const participante = new Participante(req.body);
    await participante.save();
    res.status(201).json(participante);
  } catch (err) {
    res.status(400).json({ msg: 'Erro ao cadastrar participante', err });
  }
});

// Listar participantes
router.get('/', async (req, res) => {
  try {
    const participantes = await Participante.find();
    res.json(participantes);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar participantes', err });
  }
});

module.exports = router; 