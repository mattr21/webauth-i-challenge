const express = require('express');
const helmet = require('helmet');
const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);

const authRouter = require('../auth/auth-router.js')
const usersRouter = require('../users/users-router.js')

const server = express();

const sessionConfig = {
    name: 'monster',
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 60 * 10, // how long the sessions lasts (in milliseconds). 1 sec * 60 sec * 10 min 
        secure: false, // use cookie over https only. In production we change it to true with an env variable
        httpOnly: true, // JS can't access the cookie on the client
    },
    resave: false, // avoid recreating unchanged sessions
    saveUninitialized: false, // GDPR compliance - can use cookies by default?
    // store: new KnexSessionStore({
    //     knex: 
    // })
};

server.use(helmet());
server.use(express.json());
server.use(session(sessionConfig))

server.use('/api/auth', authRouter);
server.use('/api/users', usersRouter);

module.exports = server;