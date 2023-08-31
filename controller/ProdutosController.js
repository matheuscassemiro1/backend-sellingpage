const { formidable } = require('formidable')
const fs = require('fs')
const path = require('path');

exports.cadastrarProduto = async function (req, res, next) {
    //RECEBER A IMAGEM
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

        const ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
        const ipv4 = ip.split(':').pop();
        aux = await Produto.create({
            autor: req.session['nome'],
            setor: req.session['setor'],
            titulo: fields.titulo[0],
            descricao: fields.preco[0],
            estado: 'em andamento',
            ip_autor: ipv4,
            codigo_imagem: files.imagem[0].newFilename
        })
        res.send(JSON.stringify({ status: 'sucesso', chamados: aux }))
    }
}