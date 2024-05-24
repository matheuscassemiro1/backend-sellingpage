const Sequelize = require("sequelize");
const pg = require("pg")

const sequelize = new Sequelize(process.env.DB_NAME,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD, {
    host: 'ep-dawn-band-a4m5hehl-pooler.us-east-1.aws.neon.tech',
    dialect: 'postgres',
    port: '5432',
    timezone: '-03:00',
    dialectOptions: {
        dateStrings: true,
        typeCast: true,
        timezone: "-03:00",
        ssl: {
            require: false
        },
        dialectModule: pg,
        module: pg
    },
    dialectModule: pg,
    timezone: "-03:00",
});

sequelize.authenticate()
    .then(function () {
        console.log("Banco de dados conectado com sucesso.");
    }).catch(function () {
        console.log("Não foi possível se conectar ao banco de dados")
    })


module.exports = sequelize;