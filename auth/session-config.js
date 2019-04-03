const session = require('express-session');
const KnexSessionStore = require('connect-session-knex')(session);
const configuredKnex = require('../database/dbConfig.js');

module.exports = {
    name: 'monster',
    secret: 'keep it secret, keep it safe!',
    cookie: {
        maxAge: 1000 * 60 * 10, // how long the sessions lasts (in milliseconds). 1 sec * 60 sec * 10 min 
        secure: false, // use cookie over https only. In production we change it to true with an env variable
        httpOnly: true, // JS can't access the cookie on the client
    },
    resave: false, // avoid recreating unchanged sessions
    saveUninitialized: false, // GDPR compliance - can use cookies by default?
    store: new KnexSessionStore({
        knex: configuredKnex,
        tablename: 'sessions',
        sidfieldname: 'sid',
        createtable: true,
        clearInterval: 1000 * 60 * 30 // delete expired sessions 
    }),
};