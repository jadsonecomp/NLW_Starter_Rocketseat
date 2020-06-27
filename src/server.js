//node init - iniciou meu node na máquima, npm init -y, npm install express, node src/server.js, após configurar meu package.json eu inicio o servidor com npm start
//para usar javascript no html, vou utilizar o template engine nunjucs npm install nunjucks
const express = require("express")
const server = express()

//configurar pasta pública
server.use(express.static("public"))


//utilizando template nunjucks
const nunjucks = require("nunjucks")
nunjucks.configure("src/views", {
    express: server,
    noCache: true
})


//configurar caminhos de minhas aplicação
//página inicial
//req: Requisição
//res: Resposta
server.get("/", (req, res) => {
    //res.sendfile(__dirname + "/views/index.html")
    return res.render("index.html", {title: "Seu marketplace de coleta de resídios"})
})

server.get("/create-point", (req, res) => {
    return res.render("create-point.html")
})

server.get("/search", (req, res) => {
    return res.render("search-results.html")
})


//ligar o servidor
server.listen(3000)