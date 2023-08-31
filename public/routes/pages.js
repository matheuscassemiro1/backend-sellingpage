const express = require(`express`);
const path = require("path");
const pageRouter = express()
const PaginasController = require('./../../controller/PaginasController')
const jwt = require('jsonwebtoken')

async function logado(req, res, next) {
    try {
        aux = req.cookies['token']
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

pageRouter.get('/login', PaginasController.login)
pageRouter.get('/gestao', logado, PaginasController.gestao)
pageRouter.get('/produtos', logado, PaginasController.produtos)

module.exports = pageRouter