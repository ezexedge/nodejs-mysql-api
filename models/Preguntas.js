const Sequelize = require('sequelize');
const db = require('../config/db');
const Test = require('./Test')
const PreguntasTest = require('./PreguntasTest')
const Preguntas = db.define('preguntas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    pregunta :  Sequelize.STRING
    
   
    }
);




  
  

module.exports = Preguntas;