const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

const db = {
    livros: [],
    exemplares: [],
    leitores: [],
    emprestimos: []
};

app.get('/', (value, res) => {
    res.json({ message: "API Biblioteca - Gabriel & João Lucas rodando com sucesso!" });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta http://localhost:${PORT}`);
});
