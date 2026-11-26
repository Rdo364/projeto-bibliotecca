const { MongoClient } = require('mongodb');
require('dotenv').config();

const url = process.env.MONGO_URL;
const dbName = process.env.DB_NAME;

let db;

async function connectDB() {
    if (db) return db;
    try {
        const client = new MongoClient(url);
        await client.connect();
        console.log('Conectado ao MongoDB ');
        db = client.db(dbName);
        return db;
    } catch (error) {
        console.error('Erro ao conectar no MongoDB ', error);
        process.exit(1);
    }
}

function getDB() {
    if (!db) {
        throw new Error("Banco de dados nao inicializado");
    }
    return db;
}

module.exports = { connectDB, getDB };