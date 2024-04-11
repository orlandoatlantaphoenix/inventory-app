const {sequelize} = require('../db')
const { Item } = require('./Item');
const { User } = require('./User');
const { Order } = require('./Order');

User.hasMany(Order);
Order.belongsTo(User);

Order.belongsToMany(Item, { through: 'OrderItems'});
Item.belongsToMany(Order, { through: 'OrderItems'});

module.exports = {
  db: sequelize,
  Item, 
  User,
  Order
}