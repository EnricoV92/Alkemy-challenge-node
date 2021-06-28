const { DataTypes } = require('sequelize');
const db = require('../db/connection');

const Serie = db.define('Serie', {
    imagen: {
        type: DataTypes.STRING
    },
    titulo: {
        type: DataTypes.STRING
    },
    fechaCreacion: {
        type: DataTypes.DATEONLY
    },
    calificacion: {
        type: DataTypes.FLOAT
    },
    activo: {
        type: DataTypes.BOOLEAN
    }
})

module.exports = Serie;