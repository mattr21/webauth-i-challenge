const express = require('express');
const server = express();
const helmet = require('helmet');
const usersRouter = require('./routers/users.router.js')

server.use(express.json());
server.use(helmet());
server.use('/api', usersRouter);

module.exports = server;