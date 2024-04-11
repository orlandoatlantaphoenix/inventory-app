const express = require("express");
const router = express.Router();
const { Order, Item, User } = require("../models/index");

// GET /orders
router.get("/", async (req, res, next) => {
    try {
        const orders = await Order.findAll({ include: Item });
        res.send(orders);
    } catch (error) {
        next(error);
    }
});

// CREATE /orders
router.post("/", async (req, res, next) => {
    try {
        const { user, items } = req.body;
        console.log(user)
        const userToAdd = await User.findByPk(user.id);
        if(!userToAdd) return res.status(404).json({ message: `Order Not Created, User Not Found`})

        const newOrder = await Order.create({ user: userToAdd.name });
        !newOrder ? res.status(400).json({ message: `Order Not Created`}) : 
        await newOrder.setUser(userToAdd);

        if(!items){
            return res.status(201).json(newOrder);
        }

        for (const item of items){
            const itemToAdd = await Item.findByPk(item.id);
            !itemToAdd ? res.status(404).json({ message: `Item Not Found`}) :
            newOrder.addItem(itemToAdd);
        }
        
        res.status(201).json(newOrder);
    } catch (error) {
        res.status(500).json({ message: `Server Error`});
        next(error);
    }
});

module.exports = router;