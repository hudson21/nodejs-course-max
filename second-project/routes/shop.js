const path= require('path');

const express = require('express');

const router = express.Router();

const adminData = require('./admin');

router.get('/', (req, res, next) => {
    //__dirname points to the routes folder
    /*console.log(adminData.products);
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));*/
    const products = adminData.products;
    //This is to render the templating engine provided in app.js (it is appliable for any templating engine)
    res.render('shop', {
        prods: products, 
        pageTitle: 'Shop', 
        path: '/', 
        hasProducts: products.length > 0,
        activeShop: true,
        productCSS: true,
        //layout: false //this special key is understod by handlebars
    }); 
});

module.exports = router;