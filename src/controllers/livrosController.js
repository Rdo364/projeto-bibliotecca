const livrosService = require('../services/livrosService');

const livrosController = {
    async criar(req, res) {
        try {
            const resultado = await livrosService.criar(req.body);
            res.status(201).json(resultado);
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async listar(req, res) {
        try {
            const livros = await livrosService.listar();
            res.json(livros);
        } catch (error) {
            res.status(500).json({ error: "Erro ao buscar livros." });
        }
    },
    async buscarPorId(req, res) {
        try {
            const livro = await livrosService.buscarPorId(req.params.id);
            if (!livro) return res.status(404).json({ error: "Livro não encontrado." });
            res.json(livro);
        } catch (error) {
            res.status(400).json({ error: "ID inválido." });
        }
    },
    async atualizar(req, res) {
        try {
            const resultado = await livrosService.atualizar(req.params.id, req.body);
            res.json({ message: "Livro atualizado com sucesso", resultado });
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    },
    async deletar(req, res) {
        try {
            await livrosService.deletar(req.params.id);
            res.status(204).send();
        } catch (error) {
            res.status(400).json({ error: error.message });
        }
    }
};

module.exports = livrosController;