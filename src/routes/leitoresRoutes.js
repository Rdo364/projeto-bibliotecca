const express = require('express');
const router = express.Router();
const leitoresController = require('../controllers/leitoresController');

router.post('/', leitoresController.criar);
router.get('/', leitoresController.listar);
router.get('/:id', leitoresController.buscarPorId);
router.put('/:id', leitoresController.atualizar);
router.delete('/:id', leitoresController.deletar);

module.exports = router;