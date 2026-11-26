const express = require('express');
const router = express.Router();
const emprestimosController = require('../controllers/emprestimosController');

router.post('/', emprestimosController.criar);

module.exports = router;