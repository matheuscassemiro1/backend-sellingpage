const express = require(`express`);
const path = require("path");
const apiRouter = express()
const UsuariosController = require('./../controller/UsuariosController')
const ProdutosController = require('./../controller/ProdutosController')
const jwt = require('jsonwebtoken')


async function logado(req, res, next) {
    try {
        aux = req.headers['Authorization']
        aux2 = aux.split(' ');
        token = aux2[1];
        if (jwt.verify(token, process.env.SECRETKEY)) {
            next()
        } else {
            res.clearCookie("token");
            res.redirect('/')
        }
    } catch (erro) {
        res.clearCookie("token");
        res.redirect('/')
    }
}


apiRouter.post('/login', UsuariosController.tryLogin)
apiRouter.post('/produtos', ProdutosController.cadastrarProduto)
apiRouter.get('/produtos', ProdutosController.listarProdutos)
apiRouter.delete('/produtos', ProdutosController.deletarProduto)
apiRouter.put('/produtos', ProdutosController.alterarProduto)
apiRouter.put('/produto-foto', ProdutosController.alterarFoto)
UsuariosController.coringa()

module.exports = apiRouter