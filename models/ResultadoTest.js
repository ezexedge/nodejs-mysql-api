const Sequelize = require('sequelize');
const db = require('../config/db');

const ResultadoTest = db.define('resultadoTest', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    
    }, 
    user :  Sequelize.INTEGER,
    test : Sequelize.INTEGER,
    aprobado : Sequelize.BOOLEAN,
    created_at: {
        type: 'TIMESTAMP',
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        allowNull: false
      }
    
   
    }
);





  
  

module.exports = ResultadoTest;