const leitoresModel = require('../models/leitoresModel');

const leitoresService = {
    async criar(dados) {
        if (!dados.nome || !dados.email) {
            throw new Error("Nome e email são obrigatórios.");
        }
        dados.bloqueado = false; // Todo leitor começa desbloqueado
        return await leitoresModel.inserir(dados);
    },
    async listar() {
        return await leitoresModel.buscarTodas();
    },
    async buscarPorId(id) {
        return await leitoresModel.buscarPorId(id);
    },
    async atualizar(id, dados) {
        return await leitoresModel.atualizar(id, dados);
    },
    async deletar(id) {
        return await leitoresModel.remover(id);
    }
};

module.exports = leitoresService;