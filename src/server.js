//node init - iniciou meu node na máquima, npm init -y, npm install express, node src/server.js, após configurar meu package.json eu inicio o servidor com npm start
//para usar javascript no html, vou utilizar o template engine nunjucs npm install nunjucks
const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

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

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places`, function(err, rows){
            if(err){
                return console.log(err)
            }
            console.log("Aqui estão seu registros")
            console.log(rows)    

            //mostrar a página html com os dados do banco de dados
            return res.render("search-results.html", {places: rows})
        }) 

})


//ligar o servidor
server.listen(3000)