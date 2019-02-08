const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Routes
const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//This function registers a middleware
app.use(bodyParser.urlencoded({ extended: false }));

//Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}); 

app.listen(3000, () => {
    console.log('Listening on port 3000');
});