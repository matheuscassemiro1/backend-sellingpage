document.getElementById('abrirModalNovoProduto').onclick = () => {

    //botaoFechaModal
    document.getElementById('botaoFechaModal').onclick = () => {
        document.getElementById('modalNovoProduto').classList.remove('d-block')
    }
    document.getElementById('modalNovoProduto').classList.add('d-block')

}

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





