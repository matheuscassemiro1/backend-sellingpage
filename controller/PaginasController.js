const path = require('path');

exports.login = (req, res, next) => {
    res.sendFile(path.join(__dirname, `../public/pages/login.html`))
}

exports.gestao = (req, res, next) => {
    res.sendFile(path.join(__dirname, `../public/pages/gestao.html`))
}

exports.produtos = (req, res, next) => {
    res.sendFile(path.join(__dirname, `../public/pages/produtos.html`))
}