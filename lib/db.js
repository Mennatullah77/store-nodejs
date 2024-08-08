const MongoClient = require('mongodb').MongoClient;

let _db;

function initDb(url, cb) {
    if (_db) {
        console.warn('Trying to init DB again!');
        return cb(null, _db);
    }
    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true }, connected);

    function connected(err, client) {
        if (err) {
            console.log('Failed to connect to database!' + err);
            return cb(err);
        }
        const db = client.db(); // Assuming the URL contains the database name
        _db = db;

        db.users = db.collection('users');
        return cb(null, _db);
    }
}

function getDb() {
    return _db;
}

module.exports = {
    getDb,
    initDb
};
