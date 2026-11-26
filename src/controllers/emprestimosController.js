const emprestimosService = require('../services/emprestimosService');

const emprestimosController = {
    async criar(req, res) {
        try {
            const { leitorId, exemplarId } = req.body;
            const resultado = await emprestimosService.criar(leitorId, exemplarId);
            res.status(201).json(resultado);
        } catch (error) {
            // Se cair aqui, é porque bateu em alguma regra de negócio (ex: leitor bloqueado)
            res.status(403).json({ error: error.message }); 
        }
    }
};

module.exports = emprestimosController;