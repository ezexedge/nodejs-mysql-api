const Sequelize = require('sequelize');
const db = require('../config/db');



const PreguntasEnTest = db.define('preguntasEnTest', {
      
      preguntaId: {
        type: Sequelize.INTEGER
      }, 
      testId: {
        type: Sequelize.INTEGER
      },
    });



module.exports = PreguntasEnTest;
