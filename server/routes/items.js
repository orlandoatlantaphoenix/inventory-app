const express = require("express");
const router = express.Router();
const {Item}= require('../models/index');

//GET all items
router.get('/', async (req, res, next) => {
    try {
        const items = await Item.findAll();
        res.status(200).json(items);
    } catch (error) {
        res.status(500).json({ message: `Server Error`});
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
        res.status(500).json({ message: `Server Error`});
        next(error);
    }
})

//CREATE new item
router.post('/', async (req, res, next) => {
    try {
        const { name, description, price, category, image } = req.body;
        const newItem = await Item.create({ name, description, price, category, image });
        !newItem ? res.status(400).json({ message: `Item Not Created` }) :
            res.status(201).json(newItem);
    } catch (error) {
        res.status(500).json({ message: `Server Error`});
        next(error);
    }
})

//DELETE one item
router.delete('/:id', async (req, res, next) => {
    try{
        const itemId = req.params.id;
        const deletedItem = await Item.destroy({
            where: {
                id: itemId,
            }
        })
        if (deletedItem)
            res.status(200).json({message: deletedItem.name + " has been deleted!"})
        else
            res.status(500).json({message: "no item deleted"})

    } catch (error){
        res.status(500).json({ message: `Server Error`});
        next(error);
    }
})

//UPDATE one item
router.put('/:id', async (req, res, next) => {
    try {
        const [updatedRowCount, updatedItem] = await Item.update(req.body, {
            where: {
                id: req.params.id
            },
            returning: true,
        })

        if (updatedItem)
            res.status(200).json({message: "Item has been updated!"})
        else
            res.status(500).json({message: "no item updated"})

    } catch (error) {
        res.status(500).json({ message: `Server Error`});
        next(error);
    }
})

module.exports = router;