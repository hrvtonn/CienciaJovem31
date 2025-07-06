const express = require('express');
const { body, validationResult } = require('express-validator');
const Instituicao = require('../models/Instituicao');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/instituicoes:
 *   post:
 *     summary: Cadastra uma nova instituição
 *     tags: [Instituicao]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Instituição cadastrada
 *       400:
 *         description: Erro de validação
 */
router.post('/',
  body('nome').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const instituicao = new Instituicao(req.body);
      await instituicao.save();
      res.status(201).json(instituicao);
    } catch (err) {
      res.status(400).json({ msg: 'Erro ao cadastrar instituição', err });
    }
  }
);

/**
 * @swagger
 * /api/instituicoes:
 *   get:
 *     summary: Lista todas as instituições (protegido)
 *     tags: [Instituicao]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de instituições
 *       401:
 *         description: Não autorizado
 */
router.get('/', auth, async (req, res) => {
  try {
    const instituicoes = await Instituicao.find();
    res.json(instituicoes);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar instituições', err });
  }
});

module.exports = router;