const {Sequelize} = require('sequelize')
const {sequelize} = require('../db')

const Item = sequelize.define("item", {
  Name: Sequelize.STRING,
  Description: Sequelize.STRING,
  Price: Sequelize.INTEGER,
  Category: Sequelize.STRING,
  Image: Sequelize.STRING
});

module.exports = {
  db: sequelize,
  Item,
};
