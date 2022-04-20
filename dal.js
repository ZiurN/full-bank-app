const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';
let db = null;

MongoClient.connect(url, {useUnifiedTopology: true}, (err, client) => {
	console.log('Connected!');
	db = client.db('database');
});

function createUser (name, email, password) {
	return new Promise((resolve, reject) => {
		const collection = db.collection('users');
		const doc = {name, email, password, balance: 0};
		collection.insertOne(doc, {w:1}, (err, result) => {
			err ? reject(err) : resolve(doc);
		});
	})
}

function returnAllUsers () {
	return new Promise((resolve, reject) => {
		const costumers = db.collection('users').find({}).toArray((err, docs) => {
			err ? reject(err) : resolve(docs);
		});
	});
}

module.exports = {createUser, returnAllUsers};