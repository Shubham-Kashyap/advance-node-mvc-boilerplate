const { Sequelize, Model, DataTypes } = require("sequelize");
require('dotenv').config();

console.log(process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD)

let sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
        host: process.env.DB_HOST,
        dialect: "mysql",
    }
);

const models = {
    user: require('../models/user')(sequelize)
}
const connectWithDatabase = () => {

    sequelize
        .authenticate()

}



exports.connectWithDatabase = connectWithDatabase;
exports.models = models;