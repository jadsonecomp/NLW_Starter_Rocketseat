//node init - iniciou meu node na máquima, npm init -y, npm install express, node src/server.js, após configurar meu package.json eu inicio o servidor com npm start
//para usar javascript no html, vou utilizar o template engine nunjucs npm install nunjucks
const express = require("express")
const server = express()

//pegar o banco de dados
const db = require("./database/db")

//configurar pasta pública
server.use(express.static("public"))

//habilitar o uso do req.body na nossa aplicação
server.use(express.urlencoded({extended: true}))


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


    //req.query: Corresponde ao Query String de minha solicitação
    //console.log(req.query)

    return res.render("create-point.html")
})

server.post("/savepoint", (req, res) => {
    //req.body: o corpo do nosso formulário
    //console.log(req.body)

    //inserir dados no database
    const query = `
        INSERT INTO places(
            image,
            name,
            address,
            address2,
            state,
            city,
            items     
            ) VALUES(?,?,?,?,?,?,?);
        `     
    const values =  [
        req.body.image,
        req.body.name,
        req.body.address,
        req.body.address2,
        req.body.state,
        req.body.city,
        req.body.items     
        ]  
    
    
    function afterInsertData(err){
        if(err){
            console.log(err)
            return res.send("Erro no cadastro!")
        }
        console.log("Cadastrado com sucesso!")
        console.log(this)

        return res.render("create-point.html", {saved: true})
    }
    //descomentar se quiser inserir mais dados
    db.run(query, values, afterInsertData)  //a chamada assim afterInsertData, estou passando por referencia, a chamada afterInsertData() estou executando a função diretamente


})



server.get("/search", (req, res) => {

    const search = req.query.search

    if(search == ""){
        //pesquisa vazia
        return res.render("search-results.html", {total: 0})
    }

    //pegar os dados do banco de dados
    db.all(`SELECT * FROM places WHERE city LIKE '%${search}%'`, function(err, rows){
            if(err){
                return console.log(err)
            }
            console.log("Aqui estão seu registros")
            console.log(rows)    

            const total = rows.length;

            //mostrar a página html com os dados do banco de dados
            return res.render("search-results.html", {places: rows, total: total})
        }) 

})


//ligar o servidor
server.listen(3000)