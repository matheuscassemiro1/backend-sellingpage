const express = require(`express`);
const session = require('express-session');
const store = new session.MemoryStore;
const path = require('path');
const imgRouter = require('./routes/img')
const apiRouter = require('./routes/api')
const Produto = require("./model/Produto")
const Usuario = require("./model/Usuario")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser')
const cors=require('cors');
require('dotenv').config()


//USADO PRA UTURAMENTE DELETAR AS IMAGENS
const fs = require('fs/promises')

//PERMITINDO ACESSO SEM MUITAS BURORACIAS NO CABEÇALHO

app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie");
    next();
  });

app.use(cors())

app.use(express.static(__dirname + '/public'))

app.disable('x-powered-by');


//REGRAS DE SESSÃO BASEADA EM COOKIES
app.use(session({
    secret: 'xcvjrmtmrcs2k23',
    resave: false,
    cookie: { maxAge: 28800000 },
    saveUninitialized: false,
    store
}))

//REGRA PARA RECEBER DADOS VINDOS EM CABEÇALHO E CORPO DAS REQUISIÇÕES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(`/api`, apiRouter);

app.use(cookieparser());


//app.use('/imagens', imgRouter)



app.listen('3001', function () {
    console.log('api ligada na porta 3001')
})