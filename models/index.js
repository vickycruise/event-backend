"use strict";

const { Sequelize, DataTypes } = require("sequelize");
const config = require("../config/config.js"); // Path to your config file
const fs = require("fs");
const path = require("path");

const env = process.env.NODE_ENV || "development";
const configEnv = config[env];
const sequelize = new Sequelize(
  configEnv.database,
  configEnv.username,
  configEnv.password,
  configEnv
);

// Initialize the db object
const db = {};

// Read the models folder and load all models except index.js
fs.readdirSync(__dirname)
  .filter((file) => file !== "index.js")
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model; // Add model to db object
  });

// Apply associations (if any)
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db); // Call associate function
  }
});

// Add sequelize and Sequelize to db object for easier access
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
