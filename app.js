const express = require('express');
const {initDb} = require('./lib/db');
const { getConfig } = require('./lib/config');

const app = express();

const config = getConfig();

initDb(config.databaseConnectionString , async(err , db) => {
    if(err){
        console.log(colors.red(`Error connecting to MongoDB: ${err}`));
        process.exit(2);
    }
    app.db = db;
    app.config = config
    app.port = app.get('port')
    

})
app.use((req , res , next) => {
    res.send('Hello form express server')
})

app.listen(3100);