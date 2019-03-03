const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/404');
const mongoConnect = require('./helpers/database');

//This is for express-handlerbars 
//const expressHbs = require('express-handlebars');

const app = express();

//-------------------------------------------This is for express-handlebars-----------------------------------
/*app.engine('hbs', 
expressHbs({
    layoutsDir: 'views/layouts', 
    defaultLayout: 'main-layout', 
    extname: 'hbs'
}));*/
app.set('view engine', 'ejs');
app.set('views', 'views');
//-----------------------------------------------This is for pug----------------------------------------------
//Set a global configuration value for pug
//app.set('view engine', 'pug'); // In this way we are setting put to be recognized by express in the whole application
//app.set('views', 'views');

//Routes
const adminRoutes = require('./routes/admin');
//const shopRoutes = require('./routes/shop');


//This function registers a middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//The user will be able to access to the public folder 
// This only returns a middleware. For incoming requests this function is gonne be executed
app.use((req, res, next) => {
    /*User.findById(1)
    .then(user => {
        req.user = user;//Here we are adding a new field to out request object
        console.log('user', user);
        next();//We can continue with out next step
    })
    .catch(err => console.log(err));*/
});

//Routes
app.use('/admin', adminRoutes);
//app.use(shopRoutes);

app.use(errorController.get404); 

mongoConnect(() => {
    app.listen(4000);
});