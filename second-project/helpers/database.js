const Sequelize = require('sequelize');

const sequelize = new Sequelize('node_complete', 'root', '9512GOld@=', {
    dialect: 'mysql',
    host: 'localhost'
});

module.exports = sequelize;