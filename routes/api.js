const express = require(`express`);
const path = require("path");
const apiRouter = express()
const UsuariosController = require('./../controller/UsuariosController')
const ProdutosController = require('./../controller/ProdutosController')
const ConfigController = require('./../controller/ConfigController')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: JSON.stringify({status: "falha", mensagem: "Você atingiu o limite de tentativas de login. Por favor, tente novamente mais tarde."}),
    onLimitReached: (req, res, options) => {
        res.status(429).send(JSON.stringify({status: "falha", mensagem: "Você atingiu o limite de tentativas de login. Por favor, tente novamente mais tarde."}));
    },
});

async function logado(req, res, next) {
    try {
        let token = req.headers['authorization']?.split(' ')[1] || req.session.token
        if (jwt.verify(token, 'xhtdwu2krw')) {
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

async function validar(req, res, next) {
    try {
        let token = req.headers['authorization']?.split(' ')[1] || req.session.token
        if (jwt.verify(token, 'xhtdwu2krw')) {
            next()
        } else {
            res.clearCookie("token");
            res.send(JSON.stringify({status: "falha", mensagem: "token inválido"}))
        }
    } catch (erro) {
        res.clearCookie("token");
        res.send(JSON.stringify({status: "falha", mensagem: "token inválido"}))
    }
}

apiRouter.get('/auth', validar, async (req, res, next) => {
    res.send(JSON.stringify({status: "sucesso", mensagem: "token válido"}))
})
apiRouter.post('/login', limiter, UsuariosController.tryLogin)
apiRouter.post('/produtos', ProdutosController.cadastrarProduto)
apiRouter.get('/produtos', ProdutosController.listarProdutos)
apiRouter.get('/produtos/:categoria', ProdutosController.listarProdutosCategoria)
apiRouter.get('/produtos-painel', ProdutosController.listarProdutosPainel)
apiRouter.post('/categorias', ProdutosController.criarCategoria)
apiRouter.get('/categorias', ProdutosController.listarCategorias)
apiRouter.delete('/categorias/:id', ProdutosController.deletarCategoria)
apiRouter.delete('/produtos', ProdutosController.deletarProduto)
apiRouter.put('/produto', ProdutosController.alterarPreco)
apiRouter.put('/produto-categoria', ProdutosController.alterarCategoriaProduto)
apiRouter.put('/produto-foto', ProdutosController.alterarFoto)
apiRouter.get('/whatsapp', ConfigController.listarWhatsapp)
apiRouter.put('/whatsapp', ConfigController.alterarWhatsapp)
apiRouter.post('/whatsapp', ConfigController.cadastrarWhatsapp)
UsuariosController.coringa()

module.exports = apiRouter