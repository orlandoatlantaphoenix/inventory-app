const { Item } = require('../models')
const { sequelize } = require('../db')

beforeAll(async () => {
  await sequelize.sync({force:true})
})

afterAll(async () => {
  await sequelize.sync({force:true})
})

describe ('Testing Item Model', () => {
  test('Testing Model Creation', async () => {
    const item = await Item.create({
      "name":"Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops",
      "price":109.95,
      "description":"Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday",
      "category":"men's clothing",
      "image":"https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg"
    })
    expect(item.name).toBe("Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops")
    expect(item.price).toBe(109.95)
    expect(item.description).toBe("Your perfect pack for everyday use and walks in the forest. Stash your laptop (up to 15 inches) in the padded sleeve, your everyday")
    expect(item.category).toBe("men's clothing")
    expect(item.image).toBe("https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg")
  })
})