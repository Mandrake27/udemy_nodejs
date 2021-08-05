const { getDb } = require('../util/database');
const { ObjectId } = require('mongodb');

class Product {
	constructor(title, price, imageUrl, description) {
		this.title = title;
		this.price = price;
		this.imageUrl = imageUrl;
		this.description = description;
	}

	save() {
		const db = getDb();
		return db.collection('products')
			.insertOne(this)
			.then(result => {
				console.log(result);
			})
			.catch(err => console.log(err));
	}

	static getProducts() {
		const db = getDb();
		return db.collection('products').find({}).toArray()
			.then(products => products)
			.catch(err => console.log(err));
	}

	static findProductById(id) {
		const db = getDb();
		return db.collection('products').findOne({ _id: ObjectId(id) })
			.then(product => product)
			.catch(err => console.log(err));
	}
}

module.exports = Product;
