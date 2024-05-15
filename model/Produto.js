const Sequelize = require('sequelize');
const db = require('./Banco.js');

class Produto extends Sequelize.Model { }
class Categoria extends Sequelize.Model { }

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
    },
    categoria_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
            model: 'categorias',
            key: 'id',
          },
    }
}, { sequelize: db, modelName: 'produtos' })

Categoria.init({
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    categoria: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, { sequelize: db, modelName: 'categorias' })


Produto.sync()
Categoria.sync()
Produto.belongsTo(Categoria, { foreignKey: 'categoria_id' });
Categoria.hasMany(Produto, { foreignKey: 'categoria_id' });
module.exports = { Produto, Categoria }