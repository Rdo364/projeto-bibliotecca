require('dotenv').config();
const express = require('express');
const { connectDB } = require('./src/config/database');

const livrosRoutes = require('./src/routes/livrosRoutes');
const leitoresRoutes = require('./src/routes/leitoresRoutes');
const exemplaresRoutes = require('./src/routes/exemplaresRoutes');
const emprestimosRoutes = require('./src/routes/emprestimosRoutes');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());


app.use('/livros', livrosRoutes);
app.use('/leitores', leitoresRoutes);
app.use('/exemplares', exemplaresRoutes);
app.use('/emprestimos', emprestimosRoutes);

app.get('/', (req, res) => {
    res.json({ message: "API rodando" });
});

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Servidor rodando na porta http://localhost:${PORT}`);
    });
});