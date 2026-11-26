const express = require('express');
const router = express.Router();
const livrosController = require('../controllers/livrosController');

router.post('/', livrosController.criar);
router.get('/', livrosController.listar);
router.get('/:id', livrosController.buscarPorId);
router.put('/:id', livrosController.atualizar);
router.delete('/:id', livrosController.deletar);

module.exports = router;