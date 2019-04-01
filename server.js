const express = require('express');
const server = express();
const helmet = require('helmet');
// add router(s) once they exist
// i.e. const [name]Router = require('[router file path]');

server.use(express.json());
server.use(helmet());
// add router(s) once they exist
// i.e. server.use('[base api path]', [name]Router);

module.exports = server;