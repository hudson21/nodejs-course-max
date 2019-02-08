const path = require('path');

//This refers to the main module that starts your application 
module.exports = path.dirname(process.mainModule.filename);