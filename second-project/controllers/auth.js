const User = require('../models/user');

exports.getLogin = (req, res, next) => { 
    /*const isLoggedIn = req.get('Cookie').split('=')[1] === 'true';
    console.log(isLoggedIn);*/
    console.log(req.session.isLoggedIn);
    res.render("auth/login", {
        path: "/login",
        pageTitle: "Login",
        isAuthenticated: false,
    });
};

exports.postLogin = (req, res, next) => {
    //res.setHeader('Set-Cookie', 'loggedIn=true; ');//HttpOnly;Secure=;Domain=;Max-Age=10 //Here we are setting a Cookie
    User.findById('5c8348da52730353cc1fa48c')
    .then(user => {
        req.session.isLoggedIn = true;
        req.session.user = user;
        res.redirect('/');
    })
    .catch(err => console.log(err));    
};

exports.postLogout = (req, res, next) => {
    req.session.destroy((err) => {
        console.log(err);
        res.redirect('/');
    });  
};

