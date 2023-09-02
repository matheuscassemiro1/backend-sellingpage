const { formidable } = require('formidable')
const fs = require('fs')
const path = require('path');
const Produto = require('.././model/Produto.js')

exports.cadastrarProduto = async function (req, res, next) {
    try {
        let form = formidable({})
        let fields;
        let files;
        [fields, files] = await form.parse(req);
        if (files.imagem) {
            const caminhoTemporario = files.imagem[0].filepath;
            aux = files.imagem[0].originalFilename
            aux2 = aux.split('.')
            tipo = aux2[1]
            const novoCaminho = path.join(__dirname + './../public/img', `${files.imagem[0].newFilename}` + `.${aux2[1]}`);
            fs.renameSync(caminhoTemporario, novoCaminho);
            aux = await Produto.create({
                nome: fields.nome[0],
                preco: fields.preco[0],
                imagem: `${files.imagem[0].newFilename}.${aux2[1]}`
            })
            res.send(JSON.stringify({ status: 'sucesso', chamados: aux }))
        }
    } catch (erro) {
        console.log(erro)
    }
    //RECEBER A IMAGEM

}

exports.listarProdutos = async (req, res, next) => {
    try {
        const resultado = await Produto.findAll()
        res.send(JSON.stringify({ status: "sucesso", mensagem: resultado }))
    }
    catch (erro) {
        console.log(erro)
    }
}


exports.deletarProduto = async (req, res, next) => {
    try {
        const resultado = await Produto.destroy({ where: { id: req.body.id } })
        res.send(JSON.stringify({ status: "sucesso", mensagem: resultado }))
    } catch (erro) {

    }

}