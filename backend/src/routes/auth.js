const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { body, validationResult } = require('express-validator');
const Usuario = require('../models/Usuario');

const router = express.Router();

/**
 * @swagger
 * /api/auth/register:
 *   post:
 *     summary: Registra um novo usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *               nome:
 *                 type: string
 *               tipo:
 *                 type: string
 *     responses:
 *       201:
 *         description: Usuário registrado com sucesso
 *       400:
 *         description: Usuário já existe
 */
router.post('/register',
  body('email').isEmail(),
  body('senha').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
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
  }
);

/**
 * @swagger
 * /api/auth/login:
 *   post:
 *     summary: Realiza login de usuário
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               senha:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       400:
 *         description: Usuário não encontrado ou senha incorreta
 */
router.post('/login',
  body('email').isEmail(),
  body('senha').isLength({ min: 6 }),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const { email, senha } = req.body;
      const usuario = await Usuario.findOne({ email });
      if (!usuario) return res.status(400).json({ msg: 'Usuário não encontrado' });
      const match = await bcrypt.compare(senha, usuario.senha);
      if (!match) return res.status(400).json({ msg: 'Senha incorreta' });
      const token = jwt.sign({ id: usuario._id, tipo: usuario.tipo }, process.env.JWT_SECRET || 'segredo', { expiresIn: '1d' });
      res.json({ token, usuario: { id: usuario._id, nome: usuario.nome, tipo: usuario.tipo } });
    } catch (err) {
      res.status(500).json({ msg: 'Erro no login', err });
    }
  }
);

module.exports = router;