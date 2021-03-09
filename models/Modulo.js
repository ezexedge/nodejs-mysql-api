const Sequelize = require('sequelize');
const db = require('../config/db');

const Usuarios = require('./Usuarios')
const Modulo = db.afterDestroy('modulo', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    nombre :  Sequelize.STRING(100),

    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    }
);



module.exports = Modulo;