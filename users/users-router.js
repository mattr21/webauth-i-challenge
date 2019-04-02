const express = require('express');
const router = express.Router();
const knex = require('knex');
const restricted = require('../auth/restricted-middleware.js')

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './database/auth.db3'
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);


// retrieve all users if the user is logged in (done with middleware)
router.get('/', restricted, async (req, res) => {
    try {
        const users = await db('users')
            .select('id', 'username', 'password'); 
        
        res.json(users);
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;