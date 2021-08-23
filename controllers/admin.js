const Product = require('../models/product');

exports.getAddProduct = (req, res) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product',
    path: '/admin/add-product',
    editing: false,
  });
};

exports.postAddProduct = (req, res) => {
  const { title, price, description, imageUrl } = req.body;
  const { _id } = req.user;
  const product = new Product(title, price, imageUrl, description, _id);
  product.save()
    .then(() => {
      res.redirect('/admin/products');
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.getEditProduct = (req, res) => {
  const { edit } = req.query;
  const { id } = req.params;
  Product.findById(id)
    .then(product => {
      res.render('admin/edit-product', {
        pageTitle: 'Edit Product',
        path: '/admin/edit-product',
        editing: Boolean(edit),
        product,
      });
    })
    .catch((err) => console.log(err));
};

exports.postEditProduct = (req, res) => {
  Product.updateProduct(req.body)
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

exports.postDeleteProduct = (req, res) => {
  const { _id } = req.body;
  Product.deleteProductById(_id)
    .then(() => res.redirect('/admin/products'))
    .catch((err) => console.log(err));
};

exports.getProducts = (req, res) => {
  Product.getProducts()
    .then((products) => {
      res.render('admin/products', {
        prods: products,
        pageTitle: 'Admin Products',
        path: '/admin/products',
      });
    })
    .catch((err) => console.log(err));
};
