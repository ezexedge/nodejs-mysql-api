const Sequelize = require('sequelize');
const Cursos = require('./Cursos')
const db = require('../config/db');
const Mentoria = require('./Mentoria')
const Usuarios = require('./Usuarios')

const UsuarioInscripto = db.define('usuarioInscripto', {
    mentoriumId: {
        type: Sequelize.INTEGER
       
      },
      usuarioId: {
        type: Sequelize.INTEGER
      },
      email: {
        type: Sequelize.STRING
      },
      telefono: {
        type: Sequelize.STRING
      }
    });



module.exports = UsuarioInscripto;
