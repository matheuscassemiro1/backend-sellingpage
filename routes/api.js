const express = require(`express`);
const path = require("path");
const apiRouter = express()
const UsuariosController = require('./../controller/UsuariosController')
const ProdutosController = require('./../controller/ProdutosController')
const jwt = require('jsonwebtoken')
const rateLimit = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 5 * 60 * 1000, // Define o intervalo de tempo em milissegundos (aqui, 5 minutos)
    max: 3, // Define o número máximo de requisições permitidas nesse intervalo de tempo
    message: JSON.stringify({status: "falha", mensagem: "Você atingiu o limite de tentativas de login. Por favor, tente novamente mais tarde."}),
    onLimitReached: (req, res, options) => {
        // Aqui, você pode enviar um alerta ou mensagem de erro para o cliente quando o limite for atingido
        res.status(429).send(JSON.stringify({status: "falha", mensagem: "Você atingiu o limite de tentativas de login. Por favor, tente novamente mais tarde."}));
    },
});

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
apiRouter.delete('/produtos', ProdutosController.deletarProduto)
apiRouter.put('/produto', ProdutosController.alterarProduto)
apiRouter.put('/produto-foto', ProdutosController.alterarFoto)
UsuariosController.coringa()

module.exports = apiRouter