const { DataTypes, UUIDV4 } = require('sequelize');
const db = require('../db/connection');

const User = db.define('User', {
    uid: {
        type: DataTypes.UUID,
        defaultValue: UUIDV4,
        primaryKey: true
      },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }

});



module.exports = User;