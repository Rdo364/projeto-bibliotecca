const exemplaresService = require('../services/exemplaresService');

const exemplaresController = {
    async criar(req, res) {
        try {
            const resultado = await exemplaresService.criar(req.body);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = exemplaresController;