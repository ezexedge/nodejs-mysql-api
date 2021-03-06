const Sequelize = require('sequelize');
const db = require('../config/db');



const PreguntasTest = db.afterDestroy('preguntasTest', {
      
      preguntaId: {
        type: Sequelize.INTEGER
      }, 
      testId: {
        type: Sequelize.INTEGER
      },
    });



module.exports = PreguntasTest;
