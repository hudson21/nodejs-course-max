const path= require('path');

const express = require('express');

const router = express.Router();

router.get('/', (req, res, next) => {
    //__dirname points to the routes folder
    res.sendFile(path.join(__dirname, '../', 'views', 'shop.html'));
});

module.exports = router;