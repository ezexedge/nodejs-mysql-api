const Sequelize = require('sequelize');
const db = require('../config/db');
const Cursos  = require('../models/Cursos')
const Capitulos = db.define('capitulos', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    nombre :  Sequelize.STRING,
    link :  Sequelize.STRING,
    casoDeExito: Sequelize.BOOLEAN,
    descripcion: Sequelize.STRING
    }
);





module.exports = Capitulos;