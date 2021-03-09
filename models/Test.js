const Sequelize = require('sequelize');
const db = require('../config/db');
const Cursos = require('./Cursos')
const Capitulos = require('./Capitulos')
const Preguntas = require('./Preguntas')
const PreguntasEnTest = require('./PreguntasEnTest')


const Test = db.define('test', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        allowNull: false
    }, 
    nombre :  Sequelize.STRING
    }
);



Test.belongsToMany(Preguntas,{
    through: PreguntasEnTest,
    as: 'preguntasTests'
  })


//Test.belongsTo(Cursos,{as:"curso"})

//Cursos.hasOne(Test,{as:"test"})


module.exports = Test;