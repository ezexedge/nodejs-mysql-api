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
    link :  Sequelize.INTEGER,
    casoDeExito: Sequelize.BOOLEAN,
    descripcion: Sequelize.STRING,
    linkPrev: Sequelize.INTEGER,
    speaker: Sequelize.STRING
    }
);





module.exports = Capitulos;