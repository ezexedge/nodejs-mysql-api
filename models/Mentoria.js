const Sequelize = require('sequelize');
const db = require('../config/db');
const Cursos = require('./Cursos')
const Usuarios = require('./Usuarios')
const UsuarioInscripto = require('./UsuarioInscripto')

const Mentoria = db.define('mentoria', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    nombre: Sequelize.STRING,
    tema: Sequelize.STRING,
    linkDeReunion: Sequelize.STRING,
    cupo: Sequelize.INTEGER,
    speaker: Sequelize.STRING,
    hora: Sequelize.STRING,
    imagen: Sequelize.STRING,
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    }
);




  

module.exports = Mentoria;