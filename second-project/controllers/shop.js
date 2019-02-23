const Product = require('../models/product');

exports.getProducts = (req, res, next) => {
    //__dirname points to the routes folder
    /*console.log(adminData.products);
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));*/
    //This is to render the templating engine provided in app.js (it is appliable for any templating engine)
    Product.fetchAll((products) => {
        res.render('shop/product-list', {
            prods: products, 
            pageTitle: 'All Products', 
            path: '/products', 
            //layout: false //this special key is understod by handlebars
        }); 
    });  
};

exports.getIndex = (req, res, next) => {
    Product.fetchAll((products) => {
        res.render('shop/index', {
            prods: products, 
            pageTitle: 'Shop', 
            path: '/', 
        }); 
    });  
};

exports.getCart = (req, res, next) => {
    res.render('shop/cart', {
        path: '/cart',
        pageTitle: 'Your Cart'
    });
};

exports.getCheckout = (req, res, next) => {
    res.render('shop/checkout', {
        path: '/checkout',
        pageTitle: 'Checkout'
    });
};

exports.getOrders = (req, res, next) => {
    res.render('shop/orders', {
        path: '/orders',
        pageTitle: 'Your Orders'
    });
};