const Sequelize = require('sequelize');
const db = require('./Banco.js');

class Config extends Sequelize.Model { }

Config.init({
    parametro: {
        type: Sequelize.STRING,
        primaryKey: true
    },
    valor: {
        type: Sequelize.STRING,
        allowNull: false,
    }
}, { sequelize: db, modelName: 'configs' })

Config.sync()
module.exports = Config