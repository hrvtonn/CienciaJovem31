const express = require('express');
const Projeto = require('../models/Projeto');

const router = express.Router();

// Cadastro de projeto
router.post('/', async (req, res) => {
  try {
    const projeto = new Projeto(req.body);
    await projeto.save();
    res.status(201).json(projeto);
  } catch (err) {
    res.status(400).json({ msg: 'Erro ao cadastrar projeto', err });
  }
});

// Listar projetos
router.get('/', async (req, res) => {
  try {
    const projetos = await Projeto.find();
    res.json(projetos);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar projetos', err });
  }
});

module.exports = router; 