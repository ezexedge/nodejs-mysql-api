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
       
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });



module.exports = UsuarioCapitulo;
