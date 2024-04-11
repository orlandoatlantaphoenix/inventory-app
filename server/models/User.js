const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const User = sequelize.define("User", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING
});

module.exports = {
  db: sequelize,
  User,
};
