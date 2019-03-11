const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');
const mongoDBStore = require('connect-mongodb-session')(session);

const errorController = require('./controllers/404');
const User = require('./models/user');

const MONGODB_URI = 'mongodb+srv://AtlasAdmin:flute5816@cluster0-gucrc.mongodb.net/shop';

//This is for express-handlerbars 
//const expressHbs = require('express-handlebars');

const app = express();
//Here we are creating a mongoDb Session
const store = new mongoDBStore({
    uri: MONGODB_URI,
    collection: 'sessions'
});

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
const authRoutes = require('./routes/auth');

//This function registers a middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));//The user will be able to access to the public folder 

//---------------------------Initializing our Session----------------------------------------------------------------
app.use(session({
    secret: 'mySecret', 
    resave: false, 
    saveUninitialized: false,
    store
})); //Here we are setting a session

app.use((req, res, next) => {
    
});

//resave: The session will not be saved in every request that is done
//saveUninitialized: This ensures that no session get saved for a request that it does not need to be saved
//-------------------------------------------------------------------------------------------------------------------

// This only returns a middleware. For incoming requests this function is gonne be executed
app.use((req, res, next) => {
    User.findById('5c8348da52730353cc1fa48c')
    .then(user => {
        req.user = user;
        console.log('user', user);
        next();//We can continue with out next step
    })
    .catch(err => console.log(err));
});

//Routes

app.use('/admin', adminRoutes);
app.use(shopRoutes);
app.use(authRoutes);

app.use(errorController.get404); 

mongoose.connect(MONGODB_URI)
.then(result => {
    User.findOne().then(user => {
        if (!user) {
            const user = new User({
                name: 'Hudson',
                email: 'carlos.hudson@hp.com',
                cart: {
                    items: []
                }
            });
            user.save();
        }
    });
    app.listen(4000, () => {
        console.log('Listening on port 4000');
    });
})
.catch(err => console.log(err));