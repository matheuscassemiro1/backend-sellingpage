const Sequelize = require('sequelize');
const db = require('./Banco.js');

class Usuario extends Sequelize.Model { }

Usuario.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    login: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    senha: {
        type: Sequelize.STRING,
        allowNull: false
    },
    dono: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    }
}, { sequelize: db, modelName: 'usuarios' })

Usuario.sync()
module.exports = Usuario