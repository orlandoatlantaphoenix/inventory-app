const {Sequelize } = require('sequelize')
const {sequelize} = require('../db')

const Order = sequelize.define("Order", {
  user: Sequelize.STRING,
});

module.exports = {
  db: sequelize,
  Order,
};
