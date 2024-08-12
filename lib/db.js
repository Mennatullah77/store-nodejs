const MongoClient = require('mongodb').MongoClient;

let _db;

function initDb(url, cb) {
    if (_db) {
        console.warn('Database already initialized!');
        return cb(null, _db);
    }
    MongoClient.connect(url).then(
        client => {
            const db = client.db(); // Ensure that the URL includes the database name
            _db = db;
        
            
            // Initialize collections here if needed
            db.users = db.collection('users');
            db.products = db.collection('products');
            db.customers = db.collection('customers');
            
            console.log('Database connection established');
            return cb(null, _db);
        }
    )
    .catch(err => {
        console.error('Failed to connect to database!', err);
            return cb(err);
    })
   
}

function getDb() {
    return _db;
}

module.exports = {
    getDb,
    initDb
};
