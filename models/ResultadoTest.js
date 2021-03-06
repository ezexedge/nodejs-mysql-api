const Sequelize = require('sequelize');
const db = require('../config/db');

const ResultadoTest = db.define('resultadoTest', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true
    
    }, 
    user :  Sequelize.INTEGER,
    test : Sequelize.INTEGER,
    aprobado : Sequelize.BOOLEAN
    
   
    }
);





  
  

module.exports = ResultadoTest;