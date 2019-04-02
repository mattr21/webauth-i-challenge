const express = require('express');
const router = express.Router();
const knex = require('knex');
const bcrypt = require('bcryptjs');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/auth.db3'
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);

// test to make sure server is setup
router.get('/test', (req, res) => {
    res.send('test');
});

// register a user
router.post('/register', async (req, res) => {
    try {
        let user = req.body;

        const hash = bcrypt.hashSync(user.password, 2);
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

module.exports = router;