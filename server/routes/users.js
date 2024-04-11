const express = require("express");
const router = express.Router();
const { User } = require("../models/index");

// GET /users
router.get("/", async (req, res, next) => {
    try {
        const users = await User.findAll();
        res.send(users);
    } catch (error) {
        next(error);
    }
});

// CREATE /users
router.post("/", async (req, res, next) => {
    try {
        const { name, email, password } = req.body;
        const newUser = await User.create({ name, email, password });
        !newUser ? res.status(400).json({ message: `User Not Created`}) :
        res.status(201).json(newUser);
    } catch (error) {
        res.status(500).json({ message: `Server Error`});
        next(error);
    }
});

// GET /users/{userId}
router.get("/:id", async (req, res, next) => {
    try {
        const user = await User.findByPk(req.params.id);
        !user ? res.status(400).json({ message: `User Not Found`}) :
        res.status(201).json(user);
    } catch (error) {
        res.status(500).json({ message: `Server Error`});
        next(error);
    }
});

module.exports = router;