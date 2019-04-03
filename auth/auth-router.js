const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const Users = require('../users/users-model.js');

// register a user
router.post('/register', async (req, res) => {
    try {
        let user = req.body;

        const hash = bcrypt.hashSync(user.password, 4);
        user.password = hash;

        const saved = await Users.add(user)

        res.status(201).json(saved);
    } catch (error) {
        res.status(500).json(error);
    }
});

// login a user if credentials match a registered user
router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;

        const user = await Users.findBy({ username }).first();

        if (user && bcrypt.compareSync(password, user.password)) {
            req.session.user = user;

            res.status(200).json({ message: `Welcome ${user.username}!` });
        } else {
            res.status(401).json({ message: `YOU SHALL NOT PASS!!!` });
        }
    } catch (error) {
        res.status(500).json(error);
    }
});

module.exports = router;