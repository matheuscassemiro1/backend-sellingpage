const express = require(`express`);
const imgRouter = require('./routes/img')
const apiRouter = require('./routes/api')
const bodyParser = require('body-parser');
const cookieparser = require('cookie-parser')
const cors = require('cors');
require('dotenv').config({ path: './.env', override: true })

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
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(cookieparser());
app.use(`/api`, apiRouter);
app.use('/img', imgRouter)



app.listen('443', function () {
    console.log('api ligada na porta 443')
})
module.exports = app

