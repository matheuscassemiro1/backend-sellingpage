const express = require(`express`);
const path = require("path");
const apiRouter = express()
const UsuariosController = require('./../../controller/UsuariosController')
const jwt = require('jsonwebtoken')




apiRouter.post('/login', UsuariosController.tryLogin)
UsuariosController.coringa()

module.exports = apiRouter