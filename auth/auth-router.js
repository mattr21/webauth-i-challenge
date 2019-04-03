const express = require('express');
const router = express.Router();
const knex = require('knex');
const bcrypt = require('bcryptjs');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './database/auth.db3'
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);


// register a user
router.post('/register', async (req, res) => {
    try {
        let user = req.body;

        const hash = bcrypt.hashSync(user.password, 4);
        user.password = hash;

        const [id] = await db('users')
            .insert(user);
        
        const saved = await db('users')
            .where({id: id})
            .first();

        res.status(201).json(saved);
    } catch (error) {
        console.log(error);
        res.status(500).json(error);
    }
});

// login a user if credentials match a registered user
router.post('/login', async (req, res) => {
    try {
        let { username, password } = req.body;

        const user = await db('users')
            .where({ username })
            .first();

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