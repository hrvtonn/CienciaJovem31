const express = require('express');
const Instituicao = require('../models/Instituicao');

const router = express.Router();

// Cadastro de instituição
router.post('/', async (req, res) => {
  try {
    const instituicao = new Instituicao(req.body);
    await instituicao.save();
    res.status(201).json(instituicao);
  } catch (err) {
    res.status(400).json({ msg: 'Erro ao cadastrar instituição', err });
  }
});

// Listar instituições
router.get('/', async (req, res) => {
  try {
    const instituicoes = await Instituicao.find();
    res.json(instituicoes);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar instituições', err });
  }
});

module.exports = router; 