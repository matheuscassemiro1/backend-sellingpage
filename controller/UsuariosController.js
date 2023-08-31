const Usuario = require("./../model/Usuario");
const bcrypt = require('bcrypt')
require('dotenv').config()
const jwt = require('jsonwebtoken')

const jwtOptions = { expiresIn: 1000 }


exports.tryLogin = async function (req, res, next) {
    try {
        aux = await Usuario.findOne({ where: { login: req.body.login } })
        if (bcrypt.compareSync(req.body.senha, aux.dataValues.senha)) {
            token = jwt.sign({ login: aux.dataValues.login, dono: aux.dataValues.dono, refreshToken: false }, process.env.SECRETKEY, jwtOptions)
            res.cookie('token', `bearer ${token}`, { maxAge: 5*60*1000, httpOnly: true, sameSite: 'strict' });
            res.send(JSON.stringify({ status: 'sucesso', mensagem: token }))
        }
        else {
            console.log(req.body.login, req.body.senha)
            res.send(JSON.stringify({ status: 'falha', mensagem: `login ou senha incorretos` }))
        }
    }

    catch {
        console.log(req.body.login, req.body.senha)
        res.send(JSON.stringify({ status: 'falha', mensagem: `login ou senha incorretos` }))
    }
}


exports.coringa = async function () {
    aux = await Usuario.findOne({ where: { login: 'admin' } })
    if (!aux) {
        pass = bcrypt.hashSync('admin', 10)
        aux = await Usuario.create({
            login: 'admin',
            senha: pass,
            dono: true,
        })
        console.log('ADM GERAL CRIADO')
    }
}
