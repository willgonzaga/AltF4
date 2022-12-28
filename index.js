const express = require("express");
const app = express();
const { join } = require('path');


app.use(express.static(join(__dirname + '/public')));
app.get("/", function (req, res) {
    res.sendFile(__dirname + "/public/html/index.html");
})

app.listen(3000, function() {
    console.log("http://localhost:3000")
})

const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');
const url = process.env.linkDB;
const client = new MongoClient(url);
const dbName = 'AltF4';

async function main() {
    // Use connect method to connect to the server
    await client.connect();
    console.log('Connected successfully to server');
    const db = client.db(dbName);
    const collection = db.collection('Noticias');
  
    var teste = await collection.find({}).toArray();
    console.log(teste)
  
    return 'done.';
}
  
  main()
    .then(console.log)
    .catch(console.error)
    .finally(() => client.close());