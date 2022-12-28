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