const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');
const url = process.env.linkDB;
const client = new MongoClient(url);
const dbName = 'AltF4';

async function main() {
    await client.connect();
    console.log('Acessando banco de dados');
    const db = client.db(dbName);
    const collection = db.collection('Noticias');

    await collection.insertOne({infos: {name: "<a href='/noticias/teste'>Teste</a>", desc: "<p>Descrição Teste</p>"}, newsid: "teste", titulo: "Titulo Teste", conteudo: "Conteudo Teste"})

    return 'Desconectando banco de dados.';
}

main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());