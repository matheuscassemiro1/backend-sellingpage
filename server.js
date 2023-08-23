const express = require(`express`);
const session = require('express-session');
const store = new session.MemoryStore;
const path = require('path');
const pageRouter = require('./public/routes/pages')
const imgRouter = require('./public/routes/img')
const apiRouter = require('./public/routes/api')
const Produto = require("./model/Produto")
const Usuario = require("./model/Usuario")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

//USADO PRA UTURAMENTE DELETAR AS IMAGENS
const fs = require('fs/promises')

app = express()

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});


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

app.get('/', async function (req, res, next) {

    res.sendFile(path.join(__dirname, './public/pages/index.html'))


})


//app.use('/imagens', imgRouter)
app.use(`/pages`, pageRouter);
//app.use(`/api`, apiRouter);

app.listen('80', function () {
    console.log('ouvindo na porta 80')
})