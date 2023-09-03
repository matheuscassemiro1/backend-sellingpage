function funcaoAbrirModal() {
    document.getElementById('abrirModalNovoProduto').onclick = () => {

        //botaoFechaModal
        document.getElementById('botaoFechaModal').onclick = () => {
            document.getElementById('modalNovoProduto').classList.remove('d-block')
        }
        document.getElementById('modalNovoProduto').classList.add('d-block')

    }
}

function funcaoModalAlterarFoto() {
    document.getElementById('formularioAlterarFoto').addEventListener('submit', async (e) => {
        e.preventDefault()
        idProduto = document.getElementById('idProdutoAltFoto')
        novaImagem = document.getElementById('novaImagem')
        if (idProduto.textContent == '' || novaImagem.value == '') {
            alert('Houve um erro ao alterar a foto. Recarregue a página e faça novamente.')
        } else {
            aux = idProduto.textContent.split('#')
            const id_produto = aux[1]

            let formdata = new FormData()
            let novaImagem = document.getElementById("novaImagem");
            formdata.append('imagem', novaImagem.files[0]);
            formdata.append('id', id_produto);

            fetch('http://localhost:80/api/produto-foto', {
                method: 'PUT',
                body: formdata
            }).then(async (retorno) => {
                retorno = await retorno.json()
                if (retorno.status == "sucesso") {
                    alert('A foto do produto foi alterada com sucesso')
                    location.reload()
                } else {
                    alert(retorno.status)
                }
            })
        }
    })
}

function funcaoFormulario() {
    document.getElementById('formularioProduto').addEventListener('submit', async (e) => {
        e.preventDefault();
        let nomeDoProduto = document.getElementById("nomeDoProduto");
        let preco = document.getElementById("precoDoProduto");
        let imagem = document.getElementById("arquivo");
        if (nomeDoProduto.value == '' || preco.value == '' || imagem.value == '') {
            alert("Existem campos que não foram preenchidos")
        }
        else {
            preco = precoDoProduto.value.replace(',', '.')
            let formdata = new FormData()
            let arquivo = document.getElementById("arquivo");
            formdata.append('imagem', arquivo.files[0]);
            formdata.append('nome', nomeDoProduto.value);
            formdata.append('preco', preco);
            fetch('http://localhost:80/api/produtos', {
                method: 'POST',
                body: formdata
            }).then(async function (retorno) {
                aux = await retorno.json()
                if (aux.status == 'sucesso') {
                    alert(`${nomeDoProduto.value} cadastrado no valor de R$ ${precoDoProduto.value}`)
                    location.reload()
                }
                else {
                    console.log(retorno)
                    alert('Não foi possível abrir o seu chamado, tente novamente.')
                    //location.reload()
                }
            })
        }

    })

}

async function carregarProdutos() {
    await fetch('http://localhost/api/produtos', {
        method: "GET",
        headers: { 'Content-type': "application/json" }
    }).then(async (retorno) => {
        retorno = await retorno.json()
        if (retorno.status == "sucesso") {
            retorno.mensagem.forEach((produto) => {
                const divProduto = document.createElement('div')
                divProduto.id = produto.id
                divProduto.classList.add('col-md-3')
                divProduto.style.display = 'block'
                document.getElementById('conteudo').appendChild(divProduto)

                const div2Produto = document.createElement('div')
                div2Produto.id = `div2${produto.id}`
                div2Produto.classList.add('card')
                div2Produto.classList.add('flex-row')
                div2Produto.classList.add('mb-4')
                div2Produto.classList.add('ml-1')
                div2Produto.classList.add('px-1')
                div2Produto.classList.add('text-center')
                div2Produto.style = 'Width: 18rem;'
                document.getElementById(`${divProduto.id}`).appendChild(div2Produto)

                const div3Produto = document.createElement('div')
                div3Produto.classList.add('card-body')
                div3Produto.id = `div3${produto.id}`
                document.getElementById(`${div2Produto.id}`).appendChild(div3Produto)

                const nomeProduto = document.createElement('h5')
                nomeProduto.classList.add('card-title')
                nomeProduto.textContent = produto.nome
                document.getElementById(div3Produto.id).appendChild(nomeProduto)

                const imagemProduto = document.createElement('img')
                imagemProduto.src = `http://localhost/imagens/${produto.imagem}`
                imagemProduto.style = 'Width: 150px; height: 250px'
                imagemProduto.classList.add('mb-2')
                document.getElementById(div3Produto.id).appendChild(imagemProduto)
                const precoProduto = document.createElement('h6')
                precoProduto.classList.add('card-subtitle')
                precoProduto.classList.add('mb-2')
                precoProduto.classList.add('text-muted')
                precoProduto.textContent = `R$ ${produto.preco.toFixed(2).replace('.', ',')}`
                document.getElementById(div3Produto.id).appendChild(precoProduto)

                const divBotoes = document.createElement('div')
                divBotoes.classList.style = 'display: inline-block;'
                divBotoes.id = `botoes${produto.id}`
                document.getElementById(div3Produto.id).appendChild(divBotoes)

                const botaoAltPreco = document.createElement('button')
                botaoAltPreco.classList.add('btn')
                botaoAltPreco.classList.add('btn-warning')
                botaoAltPreco.textContent = 'Alterar Preço'
                botaoAltPreco.onclick = async () => {
                    if (confirm(`Deseja mesmo alterar o preço do produto ${produto.nome}?`)) {
                        novoPreco = prompt('Insira o novo preço do produto:')
                        await fetch('http://localhost/api/produtos', {
                            method: 'PUT',
                            headers: {
                                'Content-type': 'application/json'
                            },
                            body: JSON.stringify({ id: produto.id, preco: novoPreco })
                        }).then(async (retorno) => {
                            retorno = await retorno.json()
                            if (retorno.status == 'sucesso') {
                                alert(`O produto ${produto.nome} teve seu preço alterado com sucesso!`)
                                location.reload()
                            } else {
                                alert(retorno.mensagem)
                            }
                        })
                    }


                }
                document.getElementById(divBotoes.id).appendChild(botaoAltPreco)
                const botaoAltFoto = document.createElement('button')
                botaoAltFoto.classList.add('btn')
                botaoAltFoto.classList.add('btn-info')
                botaoAltFoto.textContent = 'Alterar Foto'
                botaoAltFoto.onclick = async () => {

                    const modalAlt = document.getElementById('modalAlterarFotoProduto')
                    const botaoFecharModalAlt = document.getElementById('botaoFechaAlterarFoto')
                    botaoFecharModalAlt.onclick = () => {
                        modalAlt.classList.remove('d-block')
                    }
                    document.getElementById('produtoNome').textContent = produto.nome
                    document.getElementById('idProdutoAltFoto').textContent = `#${produto.id}`
                    modalAlt.classList.add('d-block')

                }

                document.getElementById(divBotoes.id).appendChild(botaoAltFoto)
                const botaoExcluir = document.createElement('button')
                botaoExcluir.classList.add('btn')
                botaoExcluir.classList.add('btn-danger')
                botaoExcluir.textContent = 'Excluir Produto'
                botaoExcluir.onclick = async () => {
                    await fetch('http://localhost/api/produtos', {
                        method: 'DELETE',
                        headers: {
                            'Content-type': 'application/json'
                        },
                        body: JSON.stringify({ id: produto.id, imagem: produto.imagem })
                    }).then(async (retorno) => {
                        retorno = await retorno.json()
                        if (retorno.status == 'sucesso') {
                            alert(`O produto ${produto.nome} foi excluido com sucesso!`)
                            location.reload()
                        } else {
                            alert(retorno.mensagem)
                        }
                    })
                }
                document.getElementById(divBotoes.id).appendChild(botaoExcluir)

            })
        }
    })
}

module.exports = { funcaoAbrirModal, funcaoFormulario, carregarProdutos, funcaoModalAlterarFoto }

