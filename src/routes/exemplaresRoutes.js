const express = require('express');
const router = express.Router();
const exemplaresController = require('../controllers/exemplaresController');

router.post('/', exemplaresController.criar);

module.exports = router;