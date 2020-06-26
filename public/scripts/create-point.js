// Faz uma busca pelo elemento, no caso o select de nome uf

function populateUfs(){
    const ufSelect = document.querySelector("select[name=uf]")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then( (res)=>{ return res.json() } )   // poderia reescrever como res => res.json()
        .then( states => {

            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }

        })
}

populateUfs()

function getCities(event){
    const citySelect = document.querySelector("select[name=city]")  // posso declarar assim tb: document.querySelector("[name=city]")
    
    const stateInput = document.querySelector("input[name=state]")

    const urlValue = event.target.value

    const indexOfSelectedState = event.target.selectedIndex
    //console.log("indexOfSelectedState: " + indexOfSelectedState)
    //console.log("stateInput.value: " + stateInput.value)
    stateInput.value = event.target.options[indexOfSelectedState].text
    //console.log("stateInput.value: " + stateInput.value)

    console.log(event.target.value) //valor do evento

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${urlValue}/municipios`

    citySelect.innerHTML = `<option value="">Selecione a Cidade</option>`
    citySelect.disabled = true

    fetch(url)
        .then( (res)=>{ return res.json() } )   // poderia reescrever como res => res.json()
        .then( cities => {

            for(const city of cities){
                citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
            }

            citySelect.disabled = false

        })




}

document.
    querySelector("select[name=uf]").
    addEventListener("change", getCities) 




//itens de coleta
//pegar todos os li

const itensToCollected = document.querySelectorAll(".items-grid li")

for(const item of itensToCollected){   //adiciona o evento do click em todos os elementos da lista
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")  //adiciona ou remove a classe 'selected'/ se tiver adicionado ele remove e se não tiver ele adiciona


    const itemId = itemLi.dataset.id

    //verifico se tem items selecionados para adicionar no array selectedItems
    //pegar itens selecionados
    const alreadySelected = selectedItems.findIndex(function(item){  //posso escrever assim (item =>)
        const itemFound = (item == itemId)
        return itemFound
    })


    //caso já esteja selecionado, retirar da coleção
    if(alreadySelected >= 0){
        //tirar da seleção
        const filteredItems = selectedItems.filter(item =>{
            const itemIsDifferent = (item != itemId)
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else{
        //caso não esteja, adiciono
        selectedItems.push(itemId)      
    }


    //atualizar o campo escondido com os itens selecionados
    collectedItems.value = selectedItems
    

}