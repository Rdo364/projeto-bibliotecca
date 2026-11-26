const emprestimosModel = require('../models/emprestimosModel');
const leitoresModel = require('../models/leitoresModel');
const exemplaresModel = require('../models/exemplaresModel');

const emprestimosService = {
    async criar(leitorId, exemplarId) {
        const leitor = await leitoresModel.buscarPorId(leitorId);
        const exemplar = await exemplaresModel.buscarPorId(exemplarId);

        if (!leitor) throw new Error("Leitor não encontrado.");
        if (!exemplar) throw new Error("Exemplar não encontrado.");
        if (!exemplar.disponivel) throw new Error("Este exemplar já está emprestado.");
        if (leitor.bloqueado) throw new Error("Empréstimo negado. O leitor está bloqueado.");

        // Busca todos os empréstimos para checar regras
        const todosEmprestimos = await emprestimosModel.buscarTodas();
        
        const hoje = new Date();
        const possuiAtrasos = todosEmprestimos.some(e => 
            e.leitorId === leitorId && 
            e.status === "ATIVO" && 
            new Date(e.dataDevolucaoPrevista) < hoje
        );

        if (possuiAtrasos) {
            await leitoresModel.atualizar(leitorId, { bloqueado: true });
            throw new Error("Empréstimo negado. O leitor possui pendências de atraso.");
        }

        const emprestimosAtivos = todosEmprestimos.filter(e => e.leitorId === leitorId && e.status === "ATIVO");
        if (emprestimosAtivos.length >= 3) {
            throw new Error("Empréstimo negado. Limite máximo de 3 livros atingido.");
        }

        // Prepara os dados do empréstimo
        const dataEmprestimo = new Date();
        const dataDevolucaoPrevista = new Date();
        dataDevolucaoPrevista.setDate(dataEmprestimo.getDate() + 7);

        const novoEmprestimo = {
            leitorId,
            exemplarId,
            dataEmprestimo,
            dataDevolucaoPrevista,
            dataDevolucaoReal: null,
            status: "ATIVO"
        };

        // Atualiza exemplar para indisponível e salva empréstimo
        await exemplaresModel.atualizar(exemplarId, { disponivel: false });
        return await emprestimosModel.inserir(novoEmprestimo);
    }
};

module.exports = emprestimosService;