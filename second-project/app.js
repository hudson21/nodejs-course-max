const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

//This is for express-handlerbars 
const expressHbs = require('express-handlebars');

const app = express();

//-------------------------------------------This is for express-handlebars-----------------------------------
app.engine('hbs', expressHbs);
app.set('view engine', 'hbs');
app.set('views', 'views');
//-----------------------------------------------This is for pug----------------------------------------------
//Set a global configuration value for pug
//app.set('view engine', 'pug'); // In this way we are setting put to be recognized by express in the whole application
//app.set('views', 'views');

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
    //res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));
    res.status(404).render('404', {pageTitle: 'Page Not Found'});
}); 

app.listen(4000, () => {
    console.log('Listening on port 4000');
});