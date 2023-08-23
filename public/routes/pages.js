const express = require(`express`);
const path = require("path");
const pageRouter = express()
const PaginasController = require('./../../controller/PaginasController')


pageRouter.get('/login', PaginasController.login)
pageRouter.get('/gestao', PaginasController.gestao)
pageRouter.get('/produtos', PaginasController.produtos)

module.exports = pageRouter