const Config = require('./../model/Config')

exports.listarWhatsapp = async (req, res, next) => {
    try {
        const resultado = await Config.findOne({where: {parametro: 'whatsapp'}})
        res.send(JSON.stringify({ status: "sucesso", mensagem: resultado.dataValues.valor }))
    }
    catch (erro) {
        res.send(JSON.stringify({ status: 'falha', mensagem: 'ocorreu um erro ao consumir a api' }))
    }
}

exports.alterarWhatsapp = async (req, res, next) => {
    try {
        const resultado = await Config.update({valor: req.body.whatsapp}, {where: {parametro: 'whatsapp'}})
        if (resultado){
            res.send(JSON.stringify({ status: "sucesso", mensagem: resultado }))
        } else {
            res.send(JSON.stringify({ status: "falha", mensagem: 'falha ao alterar o número' }))
        }
    }
    catch (erro) {
        console.log(erro)
        res.send(JSON.stringify({ status: 'falha', mensagem: 'ocorreu um erro ao consumir a api' }))
    }
}

exports.cadastrarWhatsapp = async (req, res, next) => {
    try {
        console.log(req.body)
        console.log("pas")
        const resultado = await Config.create({parametro: 'whatsapp', valor: req.body.whatsapp})
        if (resultado){
            res.send(JSON.stringify({ status: "sucesso", mensagem: resultado }))
        } else {
            res.send(JSON.stringify({ status: "falha", mensagem: 'falha ao criar o número' }))
        }
    }
    catch (erro) {
        res.send(JSON.stringify({ status: 'falha', mensagem: 'ocorreu um erro ao consumir a api' }))
    }
}