const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const app = express();

//Routes
const adminData = require('./routes/admin');
const shopRoutes = require('./routes/shop');

//This function registers a middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//The user will be able to access to the public folder 

//Routes
app.use('/admin', adminData.routes);
app.use(shopRoutes);

app.use((req, res, next) => {
    res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
}); 

app.listen(3000, () => {
    console.log('Listening on port 3000');
});