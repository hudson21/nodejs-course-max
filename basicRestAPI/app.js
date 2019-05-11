const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');

const feedRoutes = require('./routes/feed');
const authRoutes = require('./routes/auth');

const MONGODB_URI =
  'mongodb+srv://AtlasAdmin:flute5816@cluster0-gucrc.mongodb.net/messages';

const app = express();

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'images')
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' +file.originalname);
    }
})
  
const fileFilter = (req, file, cb) => {
    if (
      file.mimetype === 'image/png' ||
      file.mimetype === 'image/jpg' ||
      file.mimetype === 'image/jpeg'
    ) {
      cb(null, true);
    } else {
      cb(null, false);
    }
};

//CORST Settings
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next(); 
});

//app.use(bodyParser.urlenconded()); // x-www-form-urencoded <form>
app.use(bodyParser.json());// application/json
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));


app.use('/feed', feedRoutes);
app.use('/auth', authRoutes);

//Error Handling Middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    res.status(status).json({message});
});

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(8080, () => {
        console.log('Listening on port 8080');
    });
})
.catch(err => console.log(err));
