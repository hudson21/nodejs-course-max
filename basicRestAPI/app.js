const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const graphqlHttp = require('express-graphql');

const graphQLSchema = require('./graphql/schema');
const graphQLResolver = require('./graphql/resolvers');
const auth = require('./middleware/auth');

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

app.use(auth);

//CORST Settings
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    //This is for graphQL Settings on the client (OPTIONS)
    if (req.method === 'OPTIONS') {
      return res.sendStatus(200);
    }
    next(); 
});


//app.use(bodyParser.urlenconded()); // x-www-form-urencoded <form>
app.use(bodyParser.json());// application/json
app.use(multer({ storage: storage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use('/graphql', graphqlHttp({
  schema: graphQLSchema,
  rootValue: graphQLResolver,
  graphiql: true,
  formatError(err) {
    //Original error will be set by graphQL when it detecs and error throwing in your code
    if (!err.originalError) {
      return err;
    }
    const data = err.originalError.data;
    const message = err.message || 'An error ocurred.';
    const code = err.originalError.code || 500;
    return { message, status: code, data };
  }
}));

//Error Handling Middleware
app.use((error, req, res, next) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({message, data});
});

mongoose.connect(MONGODB_URI)
.then(result => {
    app.listen(8080, () => {
        console.log('Listening on port 8080');
    });
})
.catch(err => console.log(err));
