const bcrypt = require('bcryptjs');
const knex = require('knex');

const knexConfig = {
    client: 'sqlite3',
    connection: {
        filename: './database/auth.db3'
    },
    useNullAsDefault: true,
};

const db = knex(knexConfig);

async function restricted(req, res, next) {
    try {
        const { username, password } = req.headers;

        if (username && password) {
            const user = await db('users')
                .where({ username })
                .first();
    
            if (user && bcrypt.compareSync(password, user.password)) {
                next();
            } else {
                res.status(401).json({ message: `Wrong user and/or password provided` });
            }
        } else {
            res.status(401).json({ message: `No user and/or password provided` })
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = restricted;

