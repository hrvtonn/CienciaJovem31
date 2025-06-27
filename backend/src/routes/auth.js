const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

const router = express.Router();

// Registro
router.post('/register', async (req, res) => {
  try {
    const { email, senha, nome, tipo } = req.body;
    const usuarioExistente = await Usuario.findOne({ email });
    if (usuarioExistente) return res.status(400).json({ msg: 'Usuário já existe' });
    const hash = await bcrypt.hash(senha, 10);
    const usuario = new Usuario({ email, senha: hash, nome, tipo });
    await usuario.save();
    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no registro', err });
  }
});

// Login
router.post('/login', async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ email });
    if (!usuario) return res.status(400).json({ msg: 'Usuário não encontrado' });
    const match = await bcrypt.compare(senha, usuario.senha);
    if (!match) return res.status(400).json({ msg: 'Senha incorreta' });
    const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, process.env.JWT_SECRET, { expiresIn: '1d' });
    res.json({ token, usuario: { id: usuario._id, nome: usuario.nome, tipo: usuario.tipo } });
  } catch (err) {
    res.status(500).json({ msg: 'Erro no login', err });
  }
});

module.exports = router; 