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

// Teste
app.get('/', (req, res) => {
    res.json({ message: "API Biblioteca rodando com sucesso!" });
});

//Crud de Livros


app.post('/livros', (req, res) => {
    const { titulo, autor, isbn } = req.body;
    if (!titulo || !autor || !isbn) {
        return res.status(400).json({ error: "Título, autor e ISBN são obrigatórios." });
    }
    const novoLivro = { id: db.livros.length + 1, titulo, autor, isbn };
    db.livros.push(novoLivro);
    res.status(201).json(novoLivro);
});

app.get('/livros', (req, res) => {
    res.json(db.livros);
});

app.put('/livros/:id', (req, res) => {
    const { id } = req.params;
    const { titulo, autor, isbn } = req.body;
    const livro = db.livros.find(l => l.id === parseInt(id));
    
    if (!livro) return res.status(404).json({ error: "Livro não encontrado." });
    
    if (titulo) livro.titulo = titulo;
    if (autor) livro.autor = autor;
    if (isbn) livro.isbn = isbn;

    res.json(livro);
});

app.delete('/livros/:id', (req, res) => {
    const { id } = req.params;
    const index = db.livros.findIndex(l => l.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: "Livro não encontrado." });
    
    db.livros.splice(index, 1);
    res.status(204).send();
});

app.post('/exemplares', (req, res) => {
    const { livroId, codigoPatrimonio } = req.body;
    const livroExiste = db.livros.some(l => l.id === parseInt(livroId));
    
    if (!livroExiste) return res.status(400).json({ error: "Livro não encontrado para este exemplar." });
    if (!codigoPatrimonio) return res.status(400).json({ error: "Código de patrimônio é obrigatório." });

    const novoExemplar = { 
        id: db.exemplares.length + 1, 
        livroId: parseInt(livroId), 
        codigoPatrimonio,
        disponivel: true 
    };
    db.exemplares.push(novoExemplar);
    res.status(201).json(novoExemplar);
});


// Crud de Leitores

app.post('/leitores', (req, res) => {
    const { nome, email } = req.body;
    if (!nome || !email) return res.status(400).json({ error: "Nome e email são obrigatórios." });

    const novoLeitor = { 
        id: db.leitores.length + 1, 
        nome, 
        email, 
        bloqueado: false 
    };
    db.leitores.push(novoLeitor);
    res.status(201).json(novoLeitor);
});

app.get('/leitores', (req, res) => {
    res.json(db.leitores);
});

app.put('/leitores/:id', (req, res) => {
    const { id } = req.params;
    const { nome, email } = req.body;
    const leitor = db.leitores.find(l => l.id === parseInt(id));
    
    if (!leitor) return res.status(404).json({ error: "Leitor não encontrado." });
    
    if (nome) leitor.nome = nome;
    if (email) leitor.email = email;

    res.json(leitor);
});

app.delete('/leitores/:id', (req, res) => {
    const { id } = req.params;
    const index = db.leitores.findIndex(l => l.id === parseInt(id));
    if (index === -1) return res.status(404).json({ error: "Leitor não encontrado." });
    
    db.leitores.splice(index, 1);
    res.status(204).send();
});

app.listen(PORT, () => console.log(`Servidor rodando na porta http://localhost:${PORT}`));
