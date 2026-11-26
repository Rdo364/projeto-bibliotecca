const leitoresService = require('../services/leitoresService');

const leitoresController = {
    async criar(req, res) {
        try {
            const resultado = await leitoresService.criar(req.body);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async listar(req, res) {
        try {
            const leitores = await leitoresService.listar();
            res.json(leitores);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar leitores." });
        }
    },
    async buscarPorId(req, res) {
        try {
            const leitor = await leitoresService.buscarPorId(req.params.id);
            if (!leitor) return res.status(404).json({ error: "Leitor não encontrado." });
            res.json(leitor);
        } catch (error) {
            res.status(400).json({ error: "ID inválido." });
        }
    },
    async atualizar(req, res) {
        try {
            const resultado = await leitoresService.atualizar(req.params.id, req.body);
            res.json({ message: "Leitor atualizado com sucesso", resultado });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async deletar(req, res) {
        try {
            await leitoresService.deletar(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = leitoresController;