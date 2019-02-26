const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');

const errorController = require('./controllers/404');
const sequelize = require('./helpers/database');

//Models
const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');

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
const shopRoutes = require('./routes/shop');


//This function registers a middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//The user will be able to access to the public folder 
// This only returns a middleware. For incoming requests this function is gonne be executed
app.use((req, res, next) => {
    User.findById(1)
    .then(user => {
        req.user = user;//Here we are adding a new field to out request object
        console.log('user', user);
        next();//We can continue with out next step
    })
    .catch(err => console.log(err));
});

//Routes
app.use('/admin', adminRoutes);
app.use(shopRoutes);

app.use(errorController.get404); 

Product.belongsTo(User, {constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);//Optional
Cart.belongsToMany(Product, { through: CartItem});
Product.belongsToMany(Cart, { through: CartItem});

//It looks for all the models that you have created and creates the models
sequelize.sync(/*{force: true}*/)//force true creates again the tables
.then(result => {
    return User.findById(1);
    //console.log(result);
})
.then(user => {
    if (!user) {
        return User.create({name: 'Hudson', email: 'carlosmigu27@hotmail.com'});
    }
    //return Promise.resolve(user);
    return user;
})
.then(user => {
    //console.log(user);
    return user.createCart();
})
.then(cart => {
    app.listen(4000, ()=> {
        console.log('Listening on port 4000')
    })
})
.catch(err => console.log(err));

