const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;

let _db;

const mongoConnect = (callback) => {
    MongoClient.connect('mongodb+srv://Lenovo:flute5816@cluster0-gucrc.mongodb.net/shop?retryWrites=true')
    //MongoClient.connect('mongodb+srv://Link:flute5816@cluster0-gucrc.mongodb.net/shop?retryWrites=true')
    .then(client => {
        console.log('Connected');
        _db = client.db();
        callback();
    })
    .catch(err => {
        console.log(err);
        throw err;
    });
};

const getDb = () => {
    if (_db) {
        return _db;
    }
    throw 'No Database Found'
};

//module.exports = mongoConnect;
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;


