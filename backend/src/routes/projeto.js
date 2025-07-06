const express = require('express');
const { body, validationResult } = require('express-validator');
const Projeto = require('../models/Projeto');
const auth = require('../middleware/auth');

const router = express.Router();

/**
 * @swagger
 * /api/projetos:
 *   post:
 *     summary: Cadastra um novo projeto
 *     tags: [Projeto]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *     responses:
 *       201:
 *         description: Projeto cadastrado
 *       400:
 *         description: Erro de validação
 */
router.post('/',
  body('titulo').notEmpty(),
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    try {
      const projeto = new Projeto(req.body);
      await projeto.save();
      res.status(201).json(projeto);
    } catch (err) {
      res.status(400).json({ msg: 'Erro ao cadastrar projeto', err });
    }
  }
);

/**
 * @swagger
 * /api/projetos:
 *   get:
 *     summary: Lista todos os projetos (protegido)
 *     tags: [Projeto]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de projetos
 *       401:
 *         description: Não autorizado
 */
router.get('/', auth, async (req, res) => {
  try {
    const projetos = await Projeto.find();
    res.json(projetos);
  } catch (err) {
    res.status(500).json({ msg: 'Erro ao buscar projetos', err });
  }
});

module.exports = router;