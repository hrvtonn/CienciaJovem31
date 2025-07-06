const express = require('express');
const { body, validationResult } = require('express-validator');
const Participante = require('../models/Participante');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/participantes:
 *   post:
 *     summary: Cadastra um novo participante
 *     tags: [Participante]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Participante cadastrado
 *       400:
 *         description: Erro de validação
 */
router.post('/',
  body('nomeCompleto').notEmpty(),
  body('email').isEmail(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const participante = new Participante(req.body);
      await participante.save();
      res.status(201).json(participante);
    } catch (err) {
      res.status(400).json({ msg: 'Erro ao cadastrar participante', err });
    }
  }
);

/**
 * @swagger
 * /api/participantes:
 *   get:
 *     summary: Lista todos os participantes (protegido)
 *     tags: [Participante]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de participantes
 *       401:
 *         description: Não autorizado
 */
router.get('/', auth, async (req, res) => {
  try {
    const participantes = await Participante.find();
    res.json(participantes);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar participantes', err });
  }
});

module.exports = router;