const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list', {
      prods: products,
      pageTitle: 'All Products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const { productId } = req.params;
  Product.findByProductId(productId, product => {
    res.render('shop/product-detail', {
      product,
      pageTitle: product.title,
      path: '',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index', {
      prods: products,
      pageTitle: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart(cart => {
    res.render('shop/cart', {
      path: '/cart',
      pageTitle: 'Your Cart',
      cart,
    });
  });
};

exports.postCart = (req, res, next) => {
  const { productId } = req.body;
  Product.findByProductId(productId, product => {
    Cart.addProduct(productId, product.price);
  });
  res.redirect('/cart');
};

exports.postDeleteFromCart = (req, res, next) => {
  const { productId } = req.body;
  Cart.removeFromCart(productId);
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};
