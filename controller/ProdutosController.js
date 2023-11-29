const { formidable } = require('formidable')
const fs = require('fs')
const path = require('path');
const Produto = require('.././model/Produto.js')

exports.cadastrarProduto = async function (req, res, next) {
    try {
        console.log("recebi requisição")

        let form = formidable({})

        let fields;
        let files;

        [fields, files] = await form.parse(req);
        console.log(fields, files)
        console.log("passei")
        if (files.imagem) {
            console.log("entrei")
            const caminhoTemporario = files.imagem[0].filepath;
            aux = files.imagem[0].originalFilename
            aux2 = aux.split('.')
            tipo = aux2[1]
            console.log("to aq")
            const novoCaminho = path.join(__dirname + './../public/img', `${files.imagem[0].newFilename}` + `.${aux2[1]}`);
            fs.renameSync(caminhoTemporario, novoCaminho);

            aux = await Produto.create({
                nome: fields.nome[0],
                preco: fields.preco[0],
                imagem: `${files.imagem[0].newFilename}.${aux2[1]}`
            })
            res.send(JSON.stringify({ status: 'sucesso', mensagem: aux }))
        }
        console.log("passei2")
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

exports.alterarProduto = async (req, res, next) => {
    try {
        const resultado = await Produto.update({ preco: req.body.preco, imagem: req.body.imagem }, { where: { id: req.body.id } })
        res.send(JSON.stringify({ status: "sucesso", mensagem: resultado }))
    }
    catch (erro) {
        console.log(erro)
    }
}

exports.alterarFoto = async (req, res, next) => {
    try {
        let form = formidable({})
        let fields;
        let files;
        [fields, files] = await form.parse(req);
        console.log(files, fields)
        if (!fields || !files) {
            res.send(JSON.stringify({ status: "falha", mensagem: "erro ao carregar a nova foto" }))
        } else {
            const consultaFotoAnterior = await Produto.findOne({ where: { id: fields.id[0] } })
            if (consultaFotoAnterior) {
                console.log(files)
                const caminhoTemporario = files.imagem[0].filepath;
                aux = files.imagem[0].mimetype
                aux2 = aux.split('/')
                tipo = aux2[1]
                const novoCaminho = path.join(__dirname + './../public/img', `${files.imagem[0].newFilename}` + `.${aux2[1]}`);
                console.log(novoCaminho)
                fs.renameSync(caminhoTemporario, novoCaminho);
                nomeFoto = `${files.imagem[0].newFilename}` + `.${aux2[1]}`
                const novaFoto = await Produto.update({ imagem: nomeFoto }, { where: { id: consultaFotoAnterior.dataValues.id } })

                caminhoFotoAntiga = path.join(__dirname + `./../public/img/${consultaFotoAnterior.dataValues.imagem}`)
                excluirFoto = fs.unlink(caminhoFotoAntiga, (erro) => {
                    if (erro) throw erro;
                    console.log('Foto antiga excluida com sucesso')
                })
                res.send(JSON.stringify({ status: "sucesso", mensagem: "a foto do produto foi alterada com sucesso" }))
            } else {
                res.send(JSON.stringify({ status: "falha", mensagem: "erro ao localizar o produto" }))
            }
        }

    } catch (erro) {
        console.log(erro)
        res.send(JSON.stringify({ status: "falha", mensagem: "erro ao consumir a api" }))
    }
    //_dirname + './../public/img
    //fs.unlink()
}

exports.deletarProduto = async (req, res, next) => {
    try {
        const consultaFotoAnterior = await Produto.findOne({ where: { id: req.body.id } })
        const resultado = await Produto.destroy({ where: { id: req.body.id } })
        caminhoFotoAntiga = path.join(__dirname + `./../public/img/${consultaFotoAnterior.dataValues.imagem}`)
        excluirFoto = fs.unlink(caminhoFotoAntiga, (erro) => {
            if (erro) throw erro;
            console.log('Foto antiga excluida com sucesso')
        })
        res.send(JSON.stringify({ status: "sucesso", mensagem: resultado }))
    } catch (erro) {
        console.log(erro)
    }   

}