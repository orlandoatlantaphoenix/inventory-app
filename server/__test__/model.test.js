const { Item } = require('../models/index')
const { db } = require('../db')

beforeAll(async () => {
  await db.sync({force:true})
})
afterAll(async () => {
  await db.sync({force:true})
})