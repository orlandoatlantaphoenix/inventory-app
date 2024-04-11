const express = require("express");
const router = express.Router();
const { Order, Item } = require("../models/index");

// GET /orders
router.get("/", async (req, res, next) => {
    try {
        const orders = await Order.findAll({ include: Item });
        res.send(orders);
    } catch (error) {
        next(error);
    }
});

// CREATE /order
router.post("/", async (req, res, next) => {
    try {
        const { items, total } = req.body;
        const newOrder = await Order.create({ user: null, total });
        if(!newOrder) return res.status(400).json({ message: `Order Not Created`}); 

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

// GET /orders/{orderId}
router.get('/:id', async (req, res, next) => {
    try {
        const order = await Order.findByPk(req.params.id, { include: Item });
        console.log(order)
        !order ? res.status(404).json({ message: `Order Not Found`}) :
            res.status(200).json(order)
    } catch (error) {
        res.status(500).json({ message: `Server Error`});
        next(error);
    }
})

module.exports = router;