const { Sequelize, DataTypes } = require("sequelize");
const userModel = require("./userModel");

require("dotenv").config();

const sequelize = new Sequelize(
  process.env.DB_DATABASE,
  process.env.DB_USERNAME,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: "mssql",
    port: process.env.DB_PORT,
    dialectOptions: {
      instanceName: "SQLEXPRESS",
      trustServerCertificate: true,
    },
    pool: {
      max: 50,
      min: 0,
      idle: 10000,
    },
  }
);

const testDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};

testDB();

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

const Users = userModel(sequelize, DataTypes);

db.Users = Users;

module.exports = db;
