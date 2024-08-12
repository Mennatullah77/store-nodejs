// Ensure to import required modules and configure app
const express = require('express');
const { initDb } = require('./lib/db');
const { getConfig , updateConfigLocal } = require('./lib/config');
const path = require('path');
const colors = require('colors');
const cookieParser = require('cookie-parser')
const session = require('express-session')
const sessionStore = require('connect-mongodb-session')(session)
const crypto = require('crypto')


const admin = require('./routes/admin');
const product = require('./routes/product');
const { url } = require('inspector');
const { Collection } = require('mongodb');
const { random } = require('lodash');


const app = express();
const config = getConfig();

const sessionstore = new sessionStore(
   { uri: config.databaseConnectionString,
    collection: 'sessions'}
)

//setting up secretSession and secretCookie in the setting-local file
if(!config.secretSession || config.secretSession === null ){
    const randomString = crypto.randomBytes(20).toString('hex');
    config.secretSession = randomString;
    updateConfigLocal({ secretSession: randomString });
}

if(!config.cookieSession || config.cookieSession === null ){
    const randomString = crypto.randomBytes(20).toString('hex');
    config.cookieSession = randomString;
    updateConfigLocal({ cookieSession: randomString });
}


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(cookieParser(config.secretCookie))
app.use(session({
    resave: true,
    saveUninitialized: true,
    secret: config.secretSession,
    cookie: {
        path: '/',
        httpOnly: true,
        maxAge: 900000
    },
    store: sessionstore
}))



initDb(config.databaseConnectionString,async (err, db) => {
    if (err) {
        console.log(colors.red(`Error connecting to MongoDB: ${err}`));
        process.exit(2);
    }
    app.db = db;
    app.config = config;
    
    app.use('/', product);
    app.use('/', admin);


    app.use((req, res, next) => {
        const err = new Error('Not Found');
        err.status = 404;
        next(err);
    });

    app.listen(3100, () => {
        console.log('Server is running on port 3100');
    });
});
