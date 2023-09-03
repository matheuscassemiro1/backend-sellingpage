async function listarProdutosIndex() {
  await fetch('http://localhost/api/produtos', {
    method: "GET",
    headers: { 'Content-type': "application/json" }
  }).then(async (retorno) => {
    retorno = await retorno.json()
    if (retorno.status == 'sucesso') {
      retorno.mensagem.forEach((produto) => {
        const modalProduto = document.createElement('div')
        modalProduto.classList.add('col-md-3')
        modalProduto.style = "align-items: center; display: block;"
        modalProduto.id = `modalProduto${produto.id}`
        document.getElementById('produtos').appendChild(modalProduto)

        const modalCard = document.createElement('div')
        modalCard.id = `modalCard${produto.id}`
        modalCard.classList.add('card')
        modalCard.classList.add('flex-row')
        modalCard.classList.add('mb-4')
        modalCard.classList.add('shadow-sm')
        document.getElementById(`modalProduto${produto.id}`).appendChild(modalCard)

        const modalBody = document.createElement('div')
        modalBody.id = `modalBody${produto.id}`
        modalBody.classList.add('card-body')
        modalBody.classList.add('d-flex')
        modalBody.classList.add('flex-column')
        modalBody.classList.add('align-items-center')
        document.getElementById(`modalCard${produto.id}`).appendChild(modalBody)

        const h3NomeProduto = document.createElement('h3')
        h3NomeProduto.classList.add('mb-0')
        h3NomeProduto.id = `h3NProduto${produto.id}`
        document.getElementById(`modalBody${produto.id}`).appendChild(h3NomeProduto)

        const nomeProduto = document.createElement('span')
        nomeProduto.classList.add('text')
        nomeProduto.style = 'font-family: cursive;'
        nomeProduto.textContent = produto.nome
        document.getElementById(`h3NProduto${produto.id}`).appendChild(nomeProduto)

        const imagemProduto = document.createElement('img')
        imagemProduto.classList.add('card-img-right')
        imagemProduto.classList.add('flex-auto')
        imagemProduto.classList.add('d-lg-block')
        imagemProduto.classList.add('mb-2')
        imagemProduto.setAttribute('data-src', `http://localhost/imagens/${produto.imagem}`)
        imagemProduto.src = `http://localhost/imagens/${produto.imagem}`
        imagemProduto.style = `width: 100px; height: 250px;`
        document.getElementById(`modalBody${produto.id}`).appendChild(imagemProduto)

        const divAleatoria = document.createElement('div')
        document.getElementById(`modalBody${produto.id}`).appendChild(divAleatoria)

        const spanTextoPorPreco = document.createElement('span')
        spanTextoPorPreco.classList.add('shadow-lg')
        spanTextoPorPreco.classList.add('bg-white')
        spanTextoPorPreco.classList.add('rounded')
        spanTextoPorPreco.style = 'position: absolute; margin-top: 4.5rem; margin-left: 8rem; font-family: serif; font-size: large; font-weight: bold;'
        spanTextoPorPreco.textContent = 'Por'
        document.getElementById(`modalBody${produto.id}`).appendChild(spanTextoPorPreco)

        const precoProduto = document.createElement('span')
        precoProduto.classList.add('shadow-lg')
        precoProduto.classList.add('p-1')
        precoProduto.classList.add('bg-success')
        precoProduto.classList.add('rounded')
        precoProduto.style = 'position: absolute; margin-top: 6rem; margin-left: 12rem; font-family: serif; font-size: large; font-weight: bold; color: rgb(255, 255, 255); font-family: cursive;'
        precoProduto.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`
        document.getElementById(`modalBody${produto.id}`).appendChild(precoProduto)

        const botaoAdCarrinho = document.createElement('button')
        botaoAdCarrinho.classList.add('btn')
        botaoAdCarrinho.classList.add('btn-info')
        botaoAdCarrinho.style = 'position: absolute; margin-top: 10rem; margin-left: -12rem; width: 5rem; height: 4rem; font-size: 12px;'
        botaoAdCarrinho.textContent = 'Adicionar ao Carrinho'
        document.getElementById(`modalBody${produto.id}`).appendChild(botaoAdCarrinho)

        const divBotao = document.createElement('div')
        divBotao.id = `botoes${produto.id}`
        document.getElementById(`modalBody${produto.id}`).appendChild(divBotao)

        const botaoPedir = document.createElement('button')
        botaoPedir.id = 'botoes'
        botaoPedir.classList.add('btn')
        botaoPedir.classList.add('btn-success')
        botaoPedir.style = 'width: 14rem;'
        botaoPedir.textContent = 'Pedir agora'
        document.getElementById(`botoes${produto.id}`).appendChild(botaoPedir)
      })
    } else {
      alert('Falha')
    }
  })
}

module.exports = { listarProdutosIndex }