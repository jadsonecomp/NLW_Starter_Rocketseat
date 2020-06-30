//importar a dependência do sqlite 3
const sqllite3 = require("sqlite3").verbose()  //verbose indica ao terminal que quero ver mensagens do banco

//criar o objeto que irá fazer operações no banco de dados
const db = new sqllite3.Database("./src/database/database.db")

module.exports = db

//comentário em bloco crtl + ;
//utilizar  o objeto de banco de dados para nossos operações
// db.serialize( () => {
//     //Com comandos sql:

//     //1 - criar tabelas
//     db.run(`
//         CREATE TABLE IF NOT EXISTS places(
//             id INTEGER PRIMARY KEY AUTOINCREMENT,
//             image TEXT,
//             name TEXT,
//             address TEXT,
//             address2 TEXT,
//             state TEXT,
//             city TEXT,
//             items TEXT        
//         );
//     `)

//     //2 - inserir dados
//     const query = `
//         INSERT INTO places(
//             image,
//             name,
//             address,
//             address2,
//             state,
//             city,
//             items     
//             ) VALUES(?,?,?,?,?,?,?);
//         `     
//     const values =  [
//         "https://images.unsplash.com/photo-1567393528677-d6adae7d4a0a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80",
//          "Papersider",
//          "Guilherme Gembala, Jardim América",
//          "N° 260",
//          "Santa Catarina",
//          "Rio do Sul",
//          "Resíduos Eletrônicos, Lâmpadas"    
//         ]  
    
    
//     function afterInsertData(err){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Cadastrado com sucesso")
//         console.log(this)
//     }
//     //descomentar se quiser inserir mais dados
//     db.run(query, values, afterInsertData)  //a chamada assim afterInsertData, estou passando por referencia, a chamada afterInsertData() estou executando a função diretamente

//     //3 - consultar dados tabela
//     db.all(`SELECT * FROM places`, function(err, rows){
//         if(err){
//             return console.log(err)
//         }
//         console.log("Aqui estão seu registros")
//         console.log(rows)    
//     })

//     //4 - deletar dados tabela
//     db.run(`DELETE FROM places WHERE id = ?`, [2], function(err){
//         if(err){
//             console.log(err)
//         }
//         console.log("Registro deletado com sucesso")
//     })
    
// })