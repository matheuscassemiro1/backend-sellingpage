const express = require(`express`);
const path = require("path");
const apiRouter = express()
const UsuariosController = require('./../../controller/UsuariosController')
const ProdutosController = require('./../../controller/ProdutosController')
const jwt = require('jsonwebtoken')


apiRouter.post('/login', UsuariosController.tryLogin)
apiRouter.post('/produtos', ProdutosController.cadastrarProduto)
apiRouter.get('/produtos', ProdutosController.listarProdutos)
apiRouter.delete('/produtos', ProdutosController.deletarProduto)
apiRouter.put('/produtos', ProdutosController.alterarProduto)
apiRouter.put('/produto-foto', ProdutosController.alterarFoto)
UsuariosController.coringa()

module.exports = apiRouter