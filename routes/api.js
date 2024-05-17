const express = require(`express`);
const path = require("path");
const apiRouter = express()
const UsuariosController = require('./../controller/UsuariosController')
const ProdutosController = require('./../controller/ProdutosController')
const ConfigController = require('./../controller/ConfigController')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit');
require('dotenv')

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 3,
    message: JSON.stringify({ status: "falha", mensagem: "Você atingiu o limite de tentativas de login. Por favor, tente novamente mais tarde." }),
    onLimitReached: (req, res, options) => {
        res.status(429).send(JSON.stringify({ status: "falha", mensagem: "Você atingiu o limite de tentativas de login. Por favor, tente novamente mais tarde." }));
    },
});


async function logado(req, res, next) {
    try {
        let token = req.headers['authorization']?.split(' ')[1]
        if (jwt.verify(token, process.env.SECRET)) {
            next()
        } else {
            res.status(401).send(JSON.stringify({ status: "falha", mensagem: "token inválido" }))
        }
    } catch (erro) {
        res.clearCookie("token");
        res.status(401).send(JSON.stringify({ status: "falha", mensagem: "token inválido" }))
    }
}

apiRouter.get('/auth', logado, async (req, res, next) => {
    res.send(JSON.stringify({ status: "sucesso", mensagem: "token válido" }))
})
apiRouter.post('/login', limiter, UsuariosController.tryLogin)
apiRouter.post('/produtos', logado, ProdutosController.cadastrarProduto)
apiRouter.get('/produtos', ProdutosController.listarProdutos)
apiRouter.get('/produtos/:categoria', ProdutosController.listarProdutosCategoria)
apiRouter.get('/produtos-painel', logado, ProdutosController.listarProdutosPainel)
apiRouter.post('/categorias', logado, ProdutosController.criarCategoria)
apiRouter.get('/categorias', ProdutosController.listarCategorias)
apiRouter.delete('/categorias/:id', logado, ProdutosController.deletarCategoria)
apiRouter.delete('/produtos', logado, ProdutosController.deletarProduto)
apiRouter.put('/produto', logado, ProdutosController.alterarPreco)
apiRouter.put('/produto-categoria', logado, ProdutosController.alterarCategoriaProduto)
apiRouter.put('/produto-foto', logado, ProdutosController.alterarFoto)
apiRouter.get('/whatsapp', ConfigController.listarWhatsapp)
apiRouter.put('/whatsapp', logado, ConfigController.alterarWhatsapp)
apiRouter.post('/whatsapp', logado, ConfigController.cadastrarWhatsapp)
apiRouter.put('/admin', logado, UsuariosController.alterarSenha)
UsuariosController.coringa()

module.exports = apiRouter