
const exemplaresModel = require('../models/exemplaresModel');
const livrosModel = require('../models/livrosModel');

const exemplaresService = {
    async criar(dados) {
        if (!dados.livroId || !dados.codigoPatrimonio) {
            throw new Error("LivroId e código de patrimônio são obrigatórios.");
        }
        
        // Verifica se o livro existe no banco
        const livro = await livrosModel.buscarPorId(dados.livroId);
        if (!livro) {
            throw new Error("Livro não encontrado para este exemplar.");
        }

        dados.disponivel = true; // Todo exemplar novo entra como disponível
        return await exemplaresModel.inserir(dados);
    },
    async listar() {
        return await exemplaresModel.buscarTodas();
    },
    async buscarPorId(id) {
        return await exemplaresModel.buscarPorId(id);
    }
};

module.exports = exemplaresService;