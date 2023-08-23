const express = require(`express`);
const session = require('express-session');
const store = new session.MemoryStore;
const path = require('path');
const pageRouter = require('./app/routes/pages')
const imgRouter = require('./routes/img')
const apiRouter = require('./routes/api')
const Chamado = require("./app/model/Chamado")
const Usuario = require("./app/model/Usuario")
const bcrypt = require('bcrypt')
const bodyParser = require('body-parser');

//USADO PRA UTURAMENTE DELETAR AS IMAGENS
const fs = require('fs/promises')


app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
});
app = express()

app.use(express.static(__dirname + '/app/public'))

app.disable('x-powered-by');


//REGRAS DE SESSÃO BASEADA EM COOKIES
app.use(session({
    secret: 'xhtdwu2rw',
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


app.use('/imagens', imgRouter)
app.use(`/pages`, pageRouter);
app.use(`/api`, apiRouter);

app.listen('80', function () {
    console.log('ouvindo na porta 80')
})