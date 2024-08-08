// Ensure to import required modules and configure app
const express = require('express');
const { initDb } = require('./lib/db');
const { getConfig } = require('./lib/config');
const path = require('path');
const colors = require('colors');
const admin = require('./routes/admin');
const product = require('./routes/product');

const app = express();
const config = getConfig();


app.set('view engine', 'ejs');
app.set('views', 'views');
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));


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
