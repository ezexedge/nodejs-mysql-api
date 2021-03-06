const Sequelize = require('sequelize');
const db = require('../config/db');
const Test = require('./Test')
const Preguntas  = require('./Preguntas')

const Respuestas = db.define('respuestas', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    respuestas :  Sequelize.STRING,
    correcta : Sequelize.BOOLEAN
    
   
    }
);




Respuestas.belongsTo(Preguntas,{as:"preguntas"})


  
  

module.exports = Respuestas;