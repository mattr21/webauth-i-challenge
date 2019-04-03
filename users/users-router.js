const express = require('express');
const router = express.Router();
const Users = require('./users-model.js');
const restricted = require('../auth/restricted-middleware.js')

// retrieve all users if the user is logged in (done with middleware)
router.get('/', restricted, async (req, res) => {
    try {
        const users = await Users.find();
        
        res.json(users);
    } catch (error) {
        res.send(error)
    }
});

module.exports = router;