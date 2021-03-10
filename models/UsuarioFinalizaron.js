const Sequelize = require('sequelize');
const db = require('../config/db');



const UsuarioFinalizaron = db.define('usuarioFinalizaron', {
    
    usuarioId: {
      type: Sequelize.INTEGER
    },
    resultado: {
        type: Sequelize.BOOLEAN
      },
      created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    });



module.exports = UsuarioFinalizaron;
