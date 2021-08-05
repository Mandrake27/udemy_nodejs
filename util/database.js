const { MongoClient } = require('mongodb');

let _db;

const mongoConnect = (callback) => {
	MongoClient.connect('mongodb+srv://mandrake:Futureisunstopable27@mongouniversitytasks.o1uvl.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
		.then(client => {
			console.log('Connected!');
			_db = client.db('shop');
			callback()
		})
		.catch(err => {
			throw new Error(err);
		});
};

const getDb = () => {
	if (!_db) {
		throw new Error('No database!');
	}
	return _db;
};

module.exports = {
	mongoConnect,
	getDb
}