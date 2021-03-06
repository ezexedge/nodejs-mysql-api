const Sequelize = require('sequelize');
const db = require('../config/db');



const UsuarioCapitulo = db.define('usuarioCapitulo', {
      
      cursoId: {
        type: Sequelize.INTEGER
      }, 
      usuarioId: {
        type: Sequelize.INTEGER
      },
  capituloId: {
        type: Sequelize.INTEGER
       
      }
    });



module.exports = UsuarioCapitulo;
