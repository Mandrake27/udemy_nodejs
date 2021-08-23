const { getDb } = require('../util/database');
const { ObjectId } = require('mongodb');

class Product {
  constructor(title, price, imageUrl, description, userId) {
    this.title = title;
    this.price = price;
    this.imageUrl = imageUrl;
    this.description = description;
    this.userId = userId;
  }

  save() {
    const db = getDb();
    return db.collection('products')
      .insertOne(this);
  }

  static getProducts() {
    const db = getDb();
    return db.collection('products').find({}).toArray();
  }

  static findById(id) {
    const db = getDb();
    return db.collection('products').findOne({ _id: ObjectId(id) });
  }

  static updateProduct({ _id, ...updatedData }) {
    const db = getDb();
    return db.collection('products').updateOne({ _id: ObjectId(_id) }, { $set: updatedData })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }

  static deleteProductById(id) {
    const db = getDb();
    return db.collection('products').deleteOne({ _id: ObjectId(id) })
      .then(result => console.log(result))
      .catch(err => console.log(err));
  }
}

module.exports = Product;
