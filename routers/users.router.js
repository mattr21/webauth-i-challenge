const express = require('express');
const router = express.Router();
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './data/[db name].db3'
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);

// add endpoints

module.exports = router;