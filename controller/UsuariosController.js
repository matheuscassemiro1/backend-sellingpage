const Usuario = require("./../model/Usuario");
const bcrypt = require('bcryptjs')
require('dotenv')
const jwt = require('jsonwebtoken')

const jwtOptions = { expiresIn: '3h' }


exports.tryLogin = async function (req, res, next) {
    try {
        aux = await Usuario.findOne({ where: { login: req.body.login } })
        if (bcrypt.compareSync(req.body.senha, aux.dataValues.senha)) {
            token = jwt.sign({ login: aux.dataValues.login, dono: aux.dataValues.dono, refreshToken: false }, process.env.SECRET, jwtOptions)
            res.send(JSON.stringify({ status: 'sucesso', mensagem: token }))
        }
        else {
            res.status(400).send(JSON.stringify({ status: 'falha', mensagem: `login ou senha incorretos` }))
        }
    }
    catch {
        console.log(req.body.login, req.body.senha)
        res.status(500).send(JSON.stringify({ status: 'falha', mensagem: `login ou senha incorretos` }))
    }
}

exports.alterarSenha = async function (req, res, next) {
    try {
        if (req.body.token == process.env.TOKEN_PASS) {
            pass = bcrypt.hashSync(req.body.senha, 10)
            const resposta = await Usuario.update({ senha: pass }, { where: { login: 'admin' } })
            if (resposta) {
                res.send(JSON.stringify({ status: 'sucesso', mensagem: resposta }))
            } else {
                throw new Error("Falha ao inserir a nova senha")
            }
        } else {
            throw new Error("Token inválido")
        }
    } catch (error) {
        console.log(error)
        res.status(400).send(JSON.stringify({ status: 'falha', mensagem: error.message }))
    }
}

exports.coringa = async function () {
    aux = await Usuario.findOne({ where: { login: 'admin' } })
    if (!aux) {
        pass = bcrypt.hashSync(process.env.FPASSWORD, 10)
        aux = await Usuario.create({
            login: 'admin',
            senha: pass,
            dono: true,
        })
        console.log('ADM GERAL CRIADO')
    }
}
