const mongoClient = require('mongodb').MongoClient;

mongoClient.connect(process.env.MONGO_CONNECTION, { useNewUrlParser: true })
  .then(conn => global.conn = conn.db(process.env.MONGO_DATABASE))
  .catch(err => console.log(err));

function insert(site, callback) {
  global.conn.collection('logs').insertOne(site, callback);
}

module.exports = { insert };
