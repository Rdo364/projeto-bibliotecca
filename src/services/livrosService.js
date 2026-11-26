const livrosModel = require('../models/livrosModel');

const livrosService = {
    async criar(dados) {
        if (!dados.titulo || !dados.autor || !dados.isbn) {
            throw new Error("Título, autor e ISBN são obrigatórios.");
        }
        return await livrosModel.inserir(dados);
    },
    async listar() {
        return await livrosModel.buscarTodas();
    },
    async buscarPorId(id) {
        return await livrosModel.buscarPorId(id);
    },
    async atualizar(id, dados) {
        return await livrosModel.atualizar(id, dados);
    },
    async deletar(id) {
        return await livrosModel.remover(id);
    }
};

module.exports = livrosService;