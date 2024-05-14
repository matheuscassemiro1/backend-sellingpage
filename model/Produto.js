const Sequelize = require('sequelize');
const db = require('./Banco.js');

class Produto extends Sequelize.Model { }

Produto.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false
    },
    preco: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    imagem: {
        type: Sequelize.STRING,
        allowNull: true
    }

}, { sequelize: db, modelName: 'produtos' })

Produto.sync()
module.exports = Produto