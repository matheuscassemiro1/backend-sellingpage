const express = require(`express`);
const path = require('path');

app = express()

exports.logotipo = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/img/logotipo.png'))

}

exports.favicon = function (req, res) {

    res.sendFile(path.join(__dirname, './../public/img/favicon.png'))

}


exports.img_produto = function (req, res) {
    res.sendFile(path.join(__dirname, `./../public/img/${req.params.codigo}`))
}