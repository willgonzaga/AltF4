const fs = require('fs');
const express = require("express");
const app = express();
const { join } = require('path');
const path = require("path");
const dotenv = require('dotenv');
dotenv.config();
const { MongoClient } = require('mongodb');
const url = process.env.linkDB;
const client = new MongoClient(url);
const dbName = 'AltF4';

app.use(express.static(join(__dirname + '/public')));
app.set("views", path.join(__dirname + "/public/views"));
app.set("view engine", "ejs");

fs.readFile(__dirname + '/public/html/nav.html', (err, data) => {
    if (err) throw err;
    nav = data;
});

fs.readFile(__dirname + '/public/html/footer.html', (err, data) => {
    if (err) throw err;
    footer = data;
});

app.get("/", function (req, res) {
    async function main() {
        await client.connect();
        console.log('Acessando banco de dados');
        const db = client.db(dbName);
        const collection = db.collection('Noticias');
  
        var dbArray = await collection.find({}).toArray();
        var info = dbArray.map(newsinfo => {return newsinfo.infos.name + "\n" + newsinfo.infos.desc});

        conteudo = "";
        contador = 0;
        Object.values(info).slice().reverse().forEach(async val => {
            contador++;
            if(contador>5) {
                return;
            }
            conteudo = conteudo + "<section> \n" + val + "\n</section>\n";
        });

        res.render("index", { nav: nav, news: conteudo, footer: footer});

        return 'Desconectando banco de dados.';
    }
  
    main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
})

app.get("/noticias/:newsid", function (req, res) {
    var newid = req.params.newsid;
    async function main() {
        await client.connect();
        console.log('Acessando banco de dados');
        const db = client.db(dbName);
        const collection = db.collection('Noticias');
        
        var dbArray = await collection.find({newsid: newid}).toArray();
        if(dbArray != '') {
            var titulo = dbArray.map(newstitle => {return newstitle.titulo});
            var conteudo = dbArray.map(newscontent => {return newscontent.conteudo});
    
            res.render("noticia", { nav: nav, titulo: titulo, conteudo: conteudo, footer: footer});
        } else {
            res.send('Pagina não encontrada');
        }
        return 'Desconectando banco de dados.';
    }
    
    main()
        .then(console.log)
        .catch(console.error)
        .finally(() => client.close());
})

app.listen(3000, function() {
    console.log("http://localhost:3000");
})