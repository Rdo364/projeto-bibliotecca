const { ObjectId } = require('mongodb');
const { getDB } = require('../config/database');

const collectionName = 'leitores'; // <--- É isso aqui que muda!

const leitoresModel = {
    async inserir(dados) {
        const db = getDB();
        return await db.collection(collectionName).insertOne(dados);
    },
    async buscarTodas() {
        const db = getDB();
        return await db.collection(collectionName).find().toArray();
    },
    async buscarPorId(id) {
        const db = getDB();
        return await db.collection(collectionName).findOne({ _id: new ObjectId(id) });
    },
    async atualizar(id, dados) {
        const db = getDB();
        return await db.collection(collectionName).updateOne(
            { _id: new ObjectId(id) },
            { $set: dados }
        );
    },
    async remover(id) {
        const db = getDB();
        return await db.collection(collectionName).deleteOne({ _id: new ObjectId(id) });
    }
};

module.exports = leitoresModel;