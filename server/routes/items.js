const express = require("express");
const router = express.Router();
const {Item}= require('../models/index');

//GET all items
router.get('/', async (req, res, next) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (error) {
        next(error);
    }
})

//GET one item
router.get('/:id', async (req, res, next) => {
    try {
        const item = await Item.findByPk(req.params.id);
        !item ? res.status(404).json({ message: `Item Not Found` }) :
            res.status(200).json(item);
    } catch (error) {
        next(error);
    }
})

module.exports = router;