const path= require('path');

const express = require('express');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    //__dirname points to the routes folder
    /*console.log(adminData.products);
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));*/
    const products = adminData.products;
    res.render('shop', {prods: products, pageTitle: 'Shop', path: '/'}); //This is to rende the templating engine provided in app.js (in this case pug)
});

module.exports = router;