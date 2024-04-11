const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const User = sequelize.define("User", {
  name: Sequelize.STRING,
  email: Sequelize.STRING,
  password: Sequelize.STRING,
  isAdmin: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = {
  db: sequelize,
  User,
};
