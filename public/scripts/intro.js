// objeto - possuem propriedade e funcionalidade

const pessoa = {
    altura: "1.80m",
    idade: 24,
    solteiro: true,
    correr(){
      document.write("Run Forrest")
    }
  }
  
  pessoa.correr()
  
  //Array - Vetor: coleção de dados
  
  const colecaoDeBolinhas = ["blue", "green", 10, {name: "myName"}]
  
  document.write(colecaoDeBolinhas[3].name)
  
  //Funções
  //registra função
  function sayMyName(name){
    document.write(name)
  }
  //executa função
  sayMyName(" Jadson ")
  sayMyName(" Ana ")
  
  //Condicionais
  
  const notaFinal = 8
  
  if(notaFinal >= 5){
    document.write(" Aprovado ")  
  }else{
    document.write(" Reprovado ")
  }
  
  //Loops - repetições
  
  for(i=0; i<10; i++){
    document.write("<p> Alo </p>")
  }
  
  for(i=0; i<10; i++){
    document.write(`<p> ${i} </p>`)
  }