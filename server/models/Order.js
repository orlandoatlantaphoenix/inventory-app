const {Sequelize } = require('sequelize')
const {sequelize} = require('../db')

const Order = sequelize.define("Order", {
  user: Sequelize.STRING,
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0
  }
});

module.exports = {
  db: sequelize,
  Order,
};
