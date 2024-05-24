const express = require(`express`);
const imgRouter = require('./routes/img')
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser')
const cors = require('cors');
require('dotenv').config({ path: './.env', override: true })

//PERMITINDO ACESSO SEM MUITAS BURORACIAS NO CABEÇALHO

app = express()

app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, Cookie");
    next();
});

app.use(cors())
app.use(express.static(__dirname + '/public'))
app.disable('x-powered-by');
//REGRA PARA RECEBER DADOS VINDOS EM CABEÇALHO E CORPO DAS REQUISIÇÕES
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieparser());

app.use(`/api`, apiRouter);
app.use('/img', imgRouter)



app.listen('3001', function () {
    console.log('api ligada na porta 3001')
})