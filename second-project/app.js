const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//This function registers a middleware
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', (req, res, next) => {
    console.log('This always runs');
    next();
});

//Use allows us to use middlewares
/*app.use((req, res, next) => {
    console.log('In the middleware');
    next();// this allows the request to continue to the next middlewarein line 
});*/

app.use('/add-product', (req, res, next) => {
    //Send a response
    res.send('<form action="/product" method="POST"><input type="text" name="title"><button type="submit">Add Product</button></form>');
});

app.use('/product', (req, res, next) => {
    console.log(req.body);
    res.redirect('/');
});

app.use('/', (req, res, next) => {
    //Send a response
    res.send('<h1>Hello from Express</h1>');
});

app.listen(3000, () => {
    console.log('Listening on port 3000');
});