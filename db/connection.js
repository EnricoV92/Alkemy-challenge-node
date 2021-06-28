const { Sequelize } = require('sequelize');

const db = new Sequelize('alkemy_challenge', 'root', '', {
    
    host: 'localhost',
    dialect: 'mysql',
    
});

module.exports = db;