const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Character = db.define('Character', {
    imagen: {
        type: DataTypes.STRING
    },
    nombre: {
        type: DataTypes.STRING
    },
    peso: {
        type: DataTypes.INTEGER
    },
    historia: {
        type: DataTypes.STRING
    },
    activo: {
        type: DataTypes.BOOLEAN
    }

});

module.exports = Character;
